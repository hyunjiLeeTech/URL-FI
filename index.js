#!/usr/bin/env node

const request = require("request");
const colors = require("colors");
const fs = require("fs");
const regex = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

function CliHelpMsg(){
    console.log("Usage : url-fi [argument(s)] [FILENAME/DIR_PATH]")
    console.log("-v : print the tool name and its version")
    console.log("-s : check whether http:// work using https://")
    console.log("-h : display the usage of this tool")
    console.log("-r : do the test for all files in the following directory")
    console.log("\n----------------------------------------------------------")
    console.log("-------------------------Example--------------------------\n")
    console.log("Usage : url-fi -s [FILENAME]")
    console.log("Usage : url-fi -r [DIRECTORY_PATH]")
    console.log("\n----------------------------------------------------------")
    console.log("----------------------------------------------------------")
}

// -r option detail
// Find all the files in the path
// Map through the files and find wrong URL
function findFilesInDir(path){
    try {
        let files = fs.readdirSync(path, { encoding: "utf-8",withFileTypes:true })

        files = files.filter(file=>{
            return !file.isDirectory() && !file.name.endsWith('.js')
        });   

        files.map(file=>{
            let content = 0;
            try {
                content = fs.readFileSync(`${path}/${file.name}`, {encoding: "utf-8"})
            } catch (error) {
                console.log(colors.yellow(`${error}`));
            }
            let links = content.match(regex);
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
let sFlag = false;
let rFlag = false;
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
        if (arg.includes("r")) {
            rFlag = true;
            findFilesInDir(process.argv[3])
        }
    }
}


// If the user enters any arguments/filenames, starts process.
// --version or -v: prints tool name & version
// filename: checks broken links

if(!rFlag){
    for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if (!arg.startsWith("-")) {
            fs.readFile(arg, 'utf8', function (err, data) {
                if (err) {
                    console.log(colors.red(err));
                    process.exit(1);
                }
                let links = data.match(regex);

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
            console.log(colors.yellow(`${err} ${url}`));
        } else if (res.statusCode == 200) {
            console.log(colors.green(`[PASSED] [200] ${url}`));
        } else if (res.statusCode == 404 || res.statusCode == 400) {
            console.log(colors.red(`[FAILED] [${res.statusCode}] ${url}`));
        } else {
            console.log(colors.grey(`[UNKNOWN] [${res.statusCode}] ${url}`))
        }
    })
}