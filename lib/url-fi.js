// lib functions
const CliHelpMsg = require("./cliHelpMsg");
const checkTelescopePosts = require("./checkTelescopePosts");
const findFilesInDir = require("./findFilesInDir");
const versionInfo = require("./versionInfo");
const readFile = require("./readFile");
const checkUrl = require("./checkUrl");

// moduels
const path = require("path");
const colors = require("colors");
const fs = require("fs");

// regexes
const linkRegex = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
const goodRegex = /--good/;
const badRegex = /--bad/;
const allRegex = /--all/;

function url_fi() {
  // flags
  let statusFlag = 1; // 1: all, 2: good, 3: bad

  // argument flags. true: exists, false: not exists
  let sFlag = false;
  let rFlag = false;
  let iFlag = false;

  // others
  let ignoredLink = [];

  process.exitCode = 0; // 0: all links are good & no error, 1: at least one link is bad or error

  // If the user doesn't enter any arguments/filenames, it exits the process
  if (process.argv.length === 2) {
    CliHelpMsg();
    process.exit(1);
  }

  // for option -s, -h, and -v
  // If user enter -s, the program checks whether http:// actually work using https://
  // If user enter -h, the program prints out the usage of this tool
  // If user enter -r, the program will run recursively all files in the give path
  for (let i = 2; i < process.argv.length; i++) {
    let arg = process.argv[i];
    if (arg.startsWith("-")) {
      if (arg.includes("s")) {
        sFlag = true;
      }
      if (arg.includes("h")) {
        CliHelpMsg();
      }

      if (arg.includes("v")) {
        versionInfo();
      }

      if (arg.includes("i")) {
        iFlag = true;
      }

      if (arg.includes("r")) {
        rFlag = true;
        findFilesInDir(process.argv[3], statusFlag, sFlag);
      }

      if (arg.includes("t")) {
        tFlag = true;
        checkTelescopePosts(sFlag, statusFlag);
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
        data = fs.readFileSync(arg, "utf8");
        array = data.split("\n");
        string = "";
        for (let i = 0; i < array.length; i++) {
          if (!array[i].trim().startsWith("#")) {
            string += array[i];
          }
        }
        ignoredLink = string.match(linkRegex);
        if (ignoredLink == null) {
          console.log(
            colors.red(
              "The ignore file is invalid.  It doesn't use http:// or https://",
            ),
          );
          process.exit(1);
        }
        iFlag = false;
        i++;
      }

      arg = process.argv[i];

      if (!arg.startsWith("-")) {
        readFile(arg, linkRegex, ignoredLink)
          .then((data) => {
            let links = data;
            checkUrl(links, statusFlag, sFlag);
          })
          .catch((err) => {
            console.log(colors.red(err));
            process.exit(1);
          });
      }
    }
  }
}

module.exports = url_fi;
