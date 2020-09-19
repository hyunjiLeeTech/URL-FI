#!/usr/bin/env node

var request = require("request");

if (process.argv.length === 2) {
    console.log("Usage: url-fi FILENAME")
    process.exit(1)
} else {
    var fs = require("fs");
    var filename = process.argv[2];
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;
        let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        var links = data.match(regex);
        for (var i = 0; i < links.length; i = i + 2) {
            var link = links[i];
            checkUrl(link);
        }
    })
}


async function checkUrl(url) {
    await urlValidate(url);
}

async function urlValidate(url) {
    request({ method: 'HEAD', uri: url }, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            console.log("[PASSED] [200] " + url);
        } else if (!err && res.statusCode == 404) {
            console.log("[FAILED] [404] " + url);
        } else if (!err && res.statusCode == 400) {
            console.log("[FAILED] [400] " + url);
        } else {
            console.log("[UNKNOWN] " + url)
        }
    }
    )
}