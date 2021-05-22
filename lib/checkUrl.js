const printResult = require("./printResult");

async function checkUrl(links, statusFlag, sFlag) {
  for (link of links) {
    process.stdout.write(await printResult(link, statusFlag));

    if (link.startsWith("http://")) {
      if (sFlag) {
        process.stdout.write(
          await printResult(link.replace(/^http/, "https"), statusFlag),
        );
      }
    }
  }
}

module.exports = checkUrl;
