#!/usr/bin/env node

// moduels
const request = require("request");
const path = require("path");
const colors = require("colors");
const fs = require("fs");

// regexes
const linkRegex = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
const goodRegex = /\-\-good/;
const badRegex = /\-\-bad/;
const allRegex = /\-\-all/;

// flags
let statusFlag = 1; // 1: all, 2: good, 3: bad
let sFlag = false; // check -s argument.  true: -s exists, false: -s not exist
let rFlag = false; // check -r argument. true: -r exists, false: -r not exist
let iFlag = false; // check -i argument. true: -i exists, false: -i not exist

// others
let ignoredLink = [];

process.exitCode = 0 // 0: all links are good & no error, 1: at least one link is bad or error

// print out the help message of the tool
function CliHelpMsg() {
    console.log("Usage : url-fi [argument(s)] [FILENAME/DIR_PATH]")
    console.log("-v : print the tool name and its version")
    console.log("-s : check whether http:// work using https://")
    console.log("-h : display the usage of this tool")
    console.log("-r : do the test for all files in the following directory")
    console.log("-i : ignore the links on the ignore file. The ignore file should have at lease one url link")
    console.log("\n----------------------------------------------------------")
    console.log("-------------------------Example--------------------------\n")
    console.log("Usage : url-fi -v [FILENAME]")
    console.log("Usage : url-fi -s [FILENAME]")
    console.log("Usage : url-fi -h [FILENAME]")
    console.log("Usage : url-fi -r [DIRECTORY_PATH]")
    console.log("Usage : url-fi -i [IGNORE_URL_LIST_FILE] [FILENAME]")
    console.log("\n----------------------------------------------------------")
    console.log("----------------------------------------------------------")
}

// -r option detail
// Find all the files in the path
// Map through the files and find wrong URL
function findFilesInDir(path) {
    try {
        let files = fs.readdirSync(path, { encoding: "utf-8", withFileTypes: true })

        files = files.filter(file => {
            return !file.isDirectory() && !file.name.endsWith('.js')
        });

        files.map(file => {
            let content = 0;
            try {
                content = fs.readFileSync(`${path}/${file.name}`, { encoding: "utf-8" })
            } catch (error) {
                console.log(colors.yellow(`${error}`));
            }
            let links = content.match(linkRegex);
            for (let i = 0; links && i < links.length; i++) {
                let link = links[i];
                if (link.startsWith("https://")) {
                    checkUrl(link);
                } else {
                    checkUrl(link);
                    if (sFlag) {
                        checkUrl(link.replace(/^http/, "https"));
                    }
                }
            }
        })
    } catch (error) {
        console.log(colors.yellow(`${error}`));
    }
}

// If the user doesn't enter any arguments/filenames, it exits the process
if (process.argv.length === 2) {
    CliHelpMsg();
    process.exit(1)
}

// for option -s, -h, and -v
// If user enter -s, the program checks whether http:// actually work using https://
// If user enter -h, the program prints out the usage of this tool
// If user enter -r, the program will run recursively all files in the give path
for (let i = 2; i < process.argv.length; i++) {
    let arg = process.argv[i];
    if (arg.startsWith('-')) {
        if (arg.includes("s")) {
            sFlag = true;
        }
        if (arg.includes("h")) {
            CliHelpMsg();
        }

        if (arg.includes("v")) {
            console.log("Tool Name: url-fi")
            console.log("Version: 0.1")
        }

        if (arg.includes("i")) {
            iFlag = true;
        }
        if (arg.includes("r")) {
            rFlag = true;
            findFilesInDir(process.argv[3])
        }
    }

    if (arg.match(goodRegex)) {
        statusFlag = 2;
    } else if (arg.match(badRegex)) {
        statusFlag = 3;
    } else if (arg.match(allRegex)) {
        statusFlag = 1;
    }

}


// If the user enters any arguments/filenames, starts process.
// --version or -v: prints tool name & version
// filename: checks broken links
if (!rFlag) {
    for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if (iFlag) {
            arg = process.argv[++i];
            data = fs.readFileSync(arg, 'utf8');
            array = data.split("\n");
            string = "";
            for (let i = 0; i < array.length; i++) {

                if (!array[i].trim().startsWith("#")) {
                    string += array[i];
                }
            }
            ignoredLink = string.match(linkRegex);
            if (ignoredLink == null) {
                console.log(colors.red("The ignore file is invalid.  It doesn't use http:// or https://"));
                process.exit(1);
            }
            iFlag = false;
            i++;
        }

        arg = process.argv[i];

        if (!arg.startsWith("-")) {
            fs.readFile(path.normalize(arg), 'utf8', function (err, data) {
                if (err) {
                    console.log(colors.red(err));
                    process.exit(1);
                }
                let links = data.match(linkRegex);
                //ignore the links
                links = links.filter(val => !ignoredLink.includes(val));
                for (let i = 0; i < links.length; i++) {
                    let link = links[i];
                    if (link.startsWith("https://")) {
                        checkUrl(link);
                    } else {
                        checkUrl(link);
                        if (sFlag) {
                            checkUrl(link.replace(/^http/, "https"));
                        }
                    }
                }
            })
        }
    }
}

// Checks the link is broken or not
// - status code 200: good
// - status code 400, 404: broken
// - otherwise: unknown
function checkUrl(url) {
    request({ method: 'HEAD', uri: url }, function (err, res, body) {
        if (err) {
            process.exitCode = 1;
            if (statusFlag != 2) {
                console.log(colors.yellow(`${err} ${url}`));
            }
        } else if (res.statusCode == 200) {
            if (statusFlag != 3) {
                console.log(colors.green(`[PASSED] [200] ${url}`));
            }
        } else if (res.statusCode == 404 || res.statusCode == 400) {
            process.exitCode = 1;
            if (statusFlag != 2) {
                console.log(colors.red(`[FAILED] [${res.statusCode}] ${url}`));
            }
        } else {
            process.exitCode = 1;
            if (statusFlag != 2) {
                console.log(colors.grey(`[UNKNOWN] [${res.statusCode}] ${url}`))
            }
        }
    })
}
