const checkUrl = require("./checkUrl");

const request = require("request");

//telescope url
const telescopeUrl = "http://localhost:3000/posts";

// Check telescope's recent 10 posts link
function checkTelescopePosts(sFlag, statusFlag) {
  request(telescopeUrl, async function (err, res, body) {
    let postIds = JSON.parse(body);
    for (let i = 0; i < postIds.length; i++) {
      let postUrl = `${telescopeUrl}/${postIds[i].id}`;
      console.log(await checkUrl(postUrl, statusFlag));

      if (sFlag) {
        console.log(
          await checkUrl(postUrl.replace(/^http/, "https"), statusFlag),
        );
      }
    }
  });
}

module.exports = checkTelescopePosts;
