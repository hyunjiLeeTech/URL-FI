const path = require("path");
const fs = require("fs");

function readFile(arg, linkRegex, ignoredLink) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.normalize(arg), "utf8", async function (err, data) {
      if (err) {
        reject(err);
      } else {
        let links = data.match(linkRegex);
        links = links.filter((val) => !ignoredLink.includes(val));
        resolve(links);
      }
    });
  });
}

module.exports = readFile;
