#!/usr/bin/env node

const request = require("request");
const path = require("path");
const colors = require("colors");
const fs = require("fs").promises;
const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

// If the user doesn't enter any arguments/filenames, it exits the process
if (process.argv.length === 2) {
  console.log("Usage: url-fi [argument(s)] [FILENAME]");
  console.log("-v: print the tool name and its version");
  console.log("-s: check whether http:// work using https://");
  console.log("-h: display the usage of this tool");
}

// for option -s, -h, and -v
// If user enter -s, the program checks whether http:// actually work using https://
// If user enter -h, the program prints out the usage of this tool
let sFlag = false;
let files = [];
for (let i = 2; i < process.argv.length; i++) {
  let arg = process.argv[i];
  if (arg.startsWith("-")) {
    if (arg.includes("s")) {
      sFlag = true;
    }

    if (arg.includes("h")) {
      console.log("Usage: url-fi [FILENAME]");
    }

    if (arg.includes("v")) {
      console.log("Tool Name: url-fi");
      console.log("Version: 0.1");
    }
  } else {
    if (checkFile(arg)) files.push(arg);
  }
}

// Aggregates links from one or multiple files
async function readArgFile() {
  try {
    console.log(colors.cyan(`${files.length} file/s found`));
    let data;
    for (let file of files) {
      data += await fs.readFile(file, "utf8");
    }
    return data;
  } catch (err) {
    console.error(err);
  }
}

// If the user enters any arguments/filenames, starts process.
// --version or -v: prints tool name & version
// filename: checks broken links
async function sendHeadRequests(uList) {
  let urlList = uList.toString();
  urlList = urlList.match(regex);
  console.log(colors.cyan(`${urlList.length} links collected`));

  if (sFlag) {
    urlList = urlList.map((links) => {
      return links.replace(/^http/, "https");
    });
    console.log(colors.magenta("Testing http links with https"));
  }

  for (link of urlList) {
    checkUrl(link);
  }
}

// Main sequence
if (files.length > 0) {
  readArgFile()
    .then((data) => sendHeadRequests(data))
    .catch((err) => {
      console.error(err);
    });
}

// Checks the link is broken or not
// - status code 200: good
// - status code 400, 404: broken
// - otherwise: unknown
function checkUrl(url) {
  request({ method: "HEAD", uri: url }, function (err, res, body) {
    if (err) {
      console.log(colors.yellow(`${err} ${url}`));
    } else if (res.statusCode == 200) {
      console.log(colors.green(`[PASSED] [200] ${url}`));
    } else if (res.statusCode == 404 || res.statusCode == 400) {
      console.log(colors.red(`[FAILED] [${res.statusCode}] ${url}`));
    } else {
      console.log(colors.grey(`[UNKNOWN] [${res.statusCode}] ${url}`));
    }
  });
}

// Checks if argument provided is a file
async function checkFile(arg) {
  try {
    const stat = await fs.lstat(arg);
    return stat.isFile();
  } catch (err) {
    console.error(err);
  }
}
