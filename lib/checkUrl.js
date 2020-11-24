const request = require("request");
const colors = require("colors");

// Checks the link is broken or not
// - status code 200: good
// - status code 400, 404: broken
// - otherwise: unknown
function checkUrl(url, statusFlag) {
  return new Promise((resolve) => {
    request({method: "HEAD", uri: url}, function (err, res, body) {
      if (err) {
        process.exitCode = 1;
        if (statusFlag != 2) {
          resolve(colors.yellow(`${err} ${url}\n`));
        } else {
          resolve("");
        }
      } else if (res.statusCode == 200) {
        if (statusFlag != 3) {
          resolve(colors.green(`[PASSED] [200] ${url}\n`));
        } else {
          resolve("");
        }
      } else if (res.statusCode == 404 || res.statusCode == 400) {
        process.exitCode = 1;
        if (statusFlag != 2) {
          resolve(colors.red(`[FAILED] [${res.statusCode}] ${url}\n`));
        } else {
          resolve("");
        }
      } else {
        process.exitCode = 1;
        if (statusFlag != 2) {
          resolve(colors.grey(`[UNKNOWN] [${res.statusCode}] ${url}\n`));
        } else {
          resolve("");
        }
      }
    });
  });
}

module.exports = checkUrl;
