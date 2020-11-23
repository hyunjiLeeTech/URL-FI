const request = require("request");
const colors = require("colors");

// Checks the link is broken or not
// - status code 200: good
// - status code 400, 404: broken
// - otherwise: unknown
function checkUrl(url, statusFlag) {
  request({method: "HEAD", uri: url}, function (err, res, body) {
    if (err) {
      process.exitCode = 1;
      if (statusFlag != 2) {
        console.log(colors.yellow(`${err} ${url}`));
      }
    } else if (res.statusCode == 200) {
      if (statusFlag != 3) {
        console.log(colors.green(`[PASSED] [200] ${url}`));
      }
    } else if (res.statusCode == 404 || res.statusCode == 400) {
      process.exitCode = 1;
      if (statusFlag != 2) {
        console.log(colors.red(`[FAILED] [${res.statusCode}] ${url}`));
      }
    } else {
      process.exitCode = 1;
      if (statusFlag != 2) {
        console.log(colors.grey(`[UNKNOWN] [${res.statusCode}] ${url}`));
      }
    }
  });
}

module.exports = checkUrl;
