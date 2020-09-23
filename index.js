#!/usr/bin/env node

const request = require("request");
const colors = require("colors");
const fs = require("fs");
const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

// If the user doesn't enter any arguments/filenames, it exits the process
if (process.argv.length === 2) {
    console.log("Usage: url-fi [FILENAME]")
    process.exit(1)
}

let sFlag = false;

for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] == '-s') {
        sFlag = true;
    }
}

// If the user enters any arguments/filenames, starts process.
// --version or -v: prints tool name & version
// filename: checks broken links
for (let i = 2; i < process.argv.length; i++) {
    let arg = process.argv[i];
    if (arg.startsWith("-")) {
        if (arg == "--v" || arg == "--version" || arg == "-v" || arg == "-version") {
            console.log("Tool Name: url-fi")
            console.log("Version: 0.1")
        }
    } else {
        fs.readFile(arg, 'utf8', function (err, data) {
            if (err) {
                console.log(colors.red(err));
                process.exit(1);
            }
            let links = data.match(regex);
            for (let i = 0; i < links.length; i = i + 2) {
                let link = links[i];
                if (link.startsWith("https://")) {
                    checkUrl(link);
                    if (sFlag) {
                        checkUrl(link.replace(/^https/, "http"));
                    }
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

// Checks the link is broken or not
// - status code 200: good
// - status code 400, 404: broken
// - otherwise: unknown
function checkUrl(url) {
    request({ method: 'HEAD', uri: url }, function (err, res, body) {
        if (err) {
            console.log(colors.red(`${err} ${url}`));
            //process.exit(1);
        } else if (res.statusCode == 200) {
            console.log(colors.green(`[PASSED] [200] ${url}`));
        } else if (res.statusCode == 404 || res.statusCode == 400) {
            console.log(colors.red(`[FAILED] [${res.statusCode}] ${url}`));
        } else {
            console.log(colors.grey(`[UNKNOWN] [${res.statusCode}] ${url}`))
        }
    })
}