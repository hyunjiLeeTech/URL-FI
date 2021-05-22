const printResult = require("./printResult");
const colors = require("colors");

describe("printResult test", () => {
  test("print pass message when status flag is 1 (good) and the url is passed case", async () => {
    const expected = colors.green("[PASSED] [200] http://www.wordpress.com\n");
    const result = await printResult("http://www.wordpress.com", 1);
    expect(result).toEqual(expected);
  });

  test("print fail message when status flag is 1 (good) and the url is failed case", async () => {
    const expected = colors.red(
      "[FAILED] [404] http://en.wikipedia.org/wiki/Hackergotchi\n",
    );
    const result = await printResult(
      "http://en.wikipedia.org/wiki/Hackergotchi",
      1,
    );
    expect(result).toEqual(expected);
  });

  test("print warning message when status flag is 1 (good) and the url is warning case", async () => {
    const expected = colors.yellow(
      "Error: getaddrinfo ENOTFOUND rickeyre.ca http://rickeyre.ca/open-source-feed.xml\n",
    );
    const result = await printResult(
      "http://rickeyre.ca/open-source-feed.xml",
      1,
    );
    expect(result).toEqual(expected);
  });

  test("print pass message when status flag is 2 (good) and the url is passed case", async () => {
    const expected = colors.green("[PASSED] [200] http://www.wordpress.com\n");
    const result = await printResult("http://www.wordpress.com", 2);
    expect(result).toEqual(expected);
  });

  test("print nothing when status flag is 2 (good) and the url is failed case", async () => {
    const expected = "";
    const result = await printResult(
      "http://en.wikipedia.org/wiki/Hackergotchi",
      2,
    );
    expect(result).toEqual(expected);
  });

  test("print nothing when status flag is 2 (good) and the url is warning case", async () => {
    const expected = "";
    const result = await printResult(
      "http://rickeyre.ca/open-source-feed.xml",
      2,
    );
    expect(result).toEqual(expected);
  });

  test("print nothing when status flag is 3 (bad) and the url is passed case", async () => {
    const expected = "";
    const result = await printResult("http://www.wordpress.com", 3);
    expect(result).toEqual(expected);
  });

  test("print fail message when status flag is 3 (bad) and the url is failed case", async () => {
    const expected = colors.red(
      "[FAILED] [404] http://en.wikipedia.org/wiki/Hackergotchi\n",
    );
    const result = await printResult(
      "http://en.wikipedia.org/wiki/Hackergotchi",
      3,
    );
    expect(result).toEqual(expected);
  });

  test("print warning message when status flag is 3 (bad) and the url is warning case", async () => {
    const expected = colors.yellow(
      "Error: getaddrinfo ENOTFOUND rickeyre.ca http://rickeyre.ca/open-source-feed.xml\n",
    );
    const result = await printResult(
      "http://rickeyre.ca/open-source-feed.xml",
      3,
    );
    expect(result).toEqual(expected);
  });

  test("print unknown message when response is 502 and flag is bad", async () => {
    const expected = colors.grey("[UNKNOWN] [502] https://httpstat.us/502\n");

    const result = await printResult("https://httpstat.us/502", 3);
    expect(result).toEqual(expected);
  });

  test("do not print message when response is 502 and flag is good", async () => {
    const expected = "";

    const result = await printResult("https://httpstat.us/502", 2);
    expect(result).toEqual(expected);
  });
});
