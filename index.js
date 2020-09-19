#!/usr/bin/env node

console.log("Hello, here is my first CLI tool")
console.log(process.argv.length)

if (process.argv.length === 2) {
    console.log("Usage: url-fi FILENAME")
    process.exit(1)
} else {
    var fs = require("fs");
    var filename = process.argv[2];
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;
        console.log("OK: " + filename);
        console.log(data);
    })
}

console.log("test")