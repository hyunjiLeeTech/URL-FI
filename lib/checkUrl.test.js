const checkUrl = require("./checkUrl");
const colors = require("colors");

describe("checkUrl test", () => {
  test("print pass message when status flag is 1 (good) and the url is passed case", async () => {
    const expected = colors.green("[PASSED] [200] http://s9y.org\n");
    const result = await checkUrl("http://s9y.org", 1);
    expect(result).toEqual(expected);
  });

  test("print fail message when status flag is 1 (good) and the url is failed case", async () => {
    const expected = colors.red(
      "[FAILED] [404] http://en.wikipedia.org/wiki/Hackergotchi\n",
    );
    const result = await checkUrl(
      "http://en.wikipedia.org/wiki/Hackergotchi",
      1,
    );
    expect(result).toEqual(expected);
  });

  test("print warning message when status flag is 1 (good) and the url is warning case", async () => {
    const expected = colors.yellow(
      "Error: getaddrinfo ENOTFOUND rickeyre.ca http://rickeyre.ca/open-source-feed.xml\n",
    );
    const result = await checkUrl("http://rickeyre.ca/open-source-feed.xml", 1);
    expect(result).toEqual(expected);
  });

  test("print pass message when status flag is 2 (good) and the url is passed case", async () => {
    const expected = colors.green("[PASSED] [200] http://s9y.org\n");
    const result = await checkUrl("http://s9y.org", 2);
    expect(result).toEqual(expected);
  });

  test("print nothing when status flag is 2 (good) and the url is failed case", async () => {
    const expected = "";
    const result = await checkUrl(
      "http://en.wikipedia.org/wiki/Hackergotchi",
      2,
    );
    expect(result).toEqual(expected);
  });

  test("print nothing when status flag is 2 (good) and the url is warning case", async () => {
    const expected = "";
    const result = await checkUrl("http://rickeyre.ca/open-source-feed.xml", 2);
    expect(result).toEqual(expected);
  });

  test("print nothing when status flag is 3 (bad) and the url is passed case", async () => {
    const expected = "";
    const result = await checkUrl("http://s9y.org", 3);
    expect(result).toEqual(expected);
  });

  test("print fail message when status flag is 3 (bad) and the url is failed case", async () => {
    const expected = colors.red(
      "[FAILED] [404] http://en.wikipedia.org/wiki/Hackergotchi\n",
    );
    const result = await checkUrl(
      "http://en.wikipedia.org/wiki/Hackergotchi",
      3,
    );
    expect(result).toEqual(expected);
  });

  test("print warning message when status flag is 3 (bad) and the url is warning case", async () => {
    const expected = colors.yellow(
      "Error: getaddrinfo ENOTFOUND rickeyre.ca http://rickeyre.ca/open-source-feed.xmln\n",
    );
    const result = await checkUrl("http://rickeyre.ca/open-source-feed.xml", 3);
    expect(result).toEqual(expected);
  });
});
