const checkUrl = require("./checkUrl");

const colors = require("colors");
const fs = require("fs");

const linkRegex = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

// -r option detail
// Find all the files in the path
// Map through the files and find wrong URL
function findFilesInDir(path, statusFlag, sFlag) {
  try {
    let files = fs.readdirSync(path, {
      encoding: "utf-8",
      withFileTypes: true,
    });

    files = files.filter((file) => {
      return !file.isDirectory() && !file.name.endsWith(".js");
    });

    files.map((file) => {
      let content = 0;
      try {
        content = fs.readFileSync(`${path}/${file.name}`, {
          encoding: "utf-8",
        });
      } catch (error) {
        console.log(colors.yellow(`${error}`));
      }
      let links = content.match(linkRegex);
      for (let i = 0; links && i < links.length; i++) {
        let link = links[i];
        if (link.startsWith("https://")) {
          checkUrl(link, statusFlag);
        } else {
          checkUrl(link, statusFlag);
          if (sFlag) {
            checkUrl(link.replace(/^http/, "https"), statusFlag);
          }
        }
      }
    });
  } catch (error) {
    console.log(colors.yellow(`${error}`));
  }
}

module.exports = findFilesInDir;
