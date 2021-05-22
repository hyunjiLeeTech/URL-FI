const checkUrl = require("./checkUrl");

async function check(links, statusFlag, sFlag) {
  for (link of links) {
    process.stdout.write(await checkUrl(link, statusFlag));

    if (link.startsWith("http://")) {
      if (sFlag) {
        process.stdout.write(
          await checkUrl(link.replace(/^http/, "https"), statusFlag),
        );
      }
    }
  }
}

module.exports = check;
