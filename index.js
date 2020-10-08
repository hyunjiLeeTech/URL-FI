#!/usr/bin/env node

const request = require("request");
const path = require("path");
const colors = require("colors");
const fs = require("fs");
const linkRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
const goodRegex = /\-\-good/;
const badRegex = /\-\-bad/;
const allRegex = /\-\-all/;
let exitFlag = true;
let statusFlag = 1; // 1: all, 2: good, 3: bad

// If the user doesn't enter any arguments/filenames, it exits the process
if (process.argv.length === 2) {
    console.log("Usage: url-fi [argument(s)] [FILENAME]")
    console.log("-v: print the tool name and its version")
    console.log("-s: check whether http:// work using https://")
    console.log("-h: display the usage of this tool")
    process.exit(1)
}

// for option -s, -h, and -v
// If user enter -s, the program checks whether http:// actually work using https://
// If user enter -h, the program prints out the usage of this tool
let sFlag = false;
for (let i = 2; i < process.argv.length; i++) {
    let arg = process.argv[i];
    if (arg.startsWith('-')) {
        if (arg.includes("s")) {
            sFlag = true;
        }

        if (arg.includes("h")) {
            console.log("Usage: url-fi [FILENAME]")
        }

        if (arg.includes("v")) {
            console.log("Tool Name: url-fi")
            console.log("Version: 0.1")
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
for (let i = 2; i < process.argv.length; i++) {
    let arg = process.argv[i];
    if (!arg.startsWith("-")) {
        fs.readFile(path.normalize(arg), 'utf8', function (err, data) {
            if (err) {
                console.log(colors.red(err));
                exitFlag = false;
                process.exit(1);
            }
            let links = data.match(linkRegex);
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

if (exitFlag) {
    process.exit(0);
} else {
    process.exit(1);
}

// Checks the link is broken or not
// - status code 200: good
// - status code 400, 404: broken
// - otherwise: unknown
function checkUrl(url) {
    request({ method: 'HEAD', uri: url }, function (err, res, body) {
        if (err) {
            exitFlag = false;
            if (statusFlag != 2) {
                console.log(colors.yellow(`${err} ${url}`));
            }
        } else if (res.statusCode == 200) {
            if (statusFlag != 3) {
                console.log(colors.green(`[PASSED] [200] ${url}`));
            }
        } else if (res.statusCode == 404 || res.statusCode == 400) {
            exitFlag = false;
            if (statusFlag != 2) {
                console.log(colors.red(`[FAILED] [${res.statusCode}] ${url}`));
            }
        } else {
            exitFlag = false;
            if (statusFlag != 2) {
                console.log(colors.grey(`[UNKNOWN] [${res.statusCode}] ${url}`))
            }
        }
    })
}
