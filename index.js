#!/usr/bin/env node

const request = require("request");
const colors = require("colors");
const fs = require("fs");
const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

if (process.argv.length === 2) {
    console.log("Usage: url-fi [FILENAME]")
    process.exit(1)
} else {
    for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if (arg.startsWith("--")) {
            if (arg == "--v" || arg == "--version") {
                console.log("Tool Name: url-fi")
                console.log("Version: 0.1")
            }
        } else {
            fs.readFile(arg, 'utf8', function (err, data) {
                if (err) {
                    console.log(colors.red("ERROR: " + err));
                    process.exit(1);
                }
                let links = data.match(regex);
                for (let i = 0; i < links.length; i = i + 2) {
                    let link = links[i];
                    if (link.startsWith("https://")) {
                        checkUrl(link);
                        checkUrl(link.replace(/^https/, "http"));
                    } else {
                        checkUrl(link);
                        checkUrl(link.replace(/^http/, "https"));
                    }
                }
            })
        }
    }
}


async function checkUrl(url) {
    request({ method: 'HEAD', uri: url }, function (err, res, body) {
        if (err) {
            console.log(colors.red("ERROR: " + err))
            process.exit(1);
        }

        if (res.statusCode == 200) {
            console.log(colors.green(`[PASSED] [200] ${url}`));
        } else if (res.statusCode == 404 || res.statusCode == 400) {
            console.log(colors.red(`[FAILED] [${res.statusCode}] ${url}`));
        } else {
            console.log(colors.grey(`[UNKNOWN] ${url}`))
        }
    })
}