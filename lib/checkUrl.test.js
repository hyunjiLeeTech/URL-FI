const checkUrl = require("./checkUrl");
const colors = require("colors");

describe("checkUrl test", () => {
  test("print pass message when status flag is 1 (good) and the url is passed case", async () => {
    const expected = "[PASSED] [200] http://s9y.org\n";

    try {
      expect(checkUrl("http://s9y.org", 1)).resolves.toBe(
        colors.green(expected),
      );
    } catch (err) {}
  });

  test("print fail message when status flag is 1 (good) and the url is failed case", async () => {
    const expected =
      "[FAILED] [404] http://en.wikipedia.org/wiki/Hackergotchi\n";
    try {
      expect(
        checkUrl("http://en.wikipedia.org/wiki/Hackergotchi", 1),
      ).resolves.toBe(colors.red(expected));
    } catch (err) {}
  });

  test("print warning message when status flag is 1 (good) and the url is warning case", async () => {
    const expected =
      "Error: getaddrinfo ENOTFOUND rickeyre.ca http://rickeyre.ca/open-source-feed.xml\n";
    try {
      expect(
        checkUrl("http://rickeyre.ca/open-source-feed.xml", 1),
      ).resolves.toBe(colors.yellow(expected));
    } catch (err) {}
  });

  test("print pass message when status flag is 2 (good) and the url is passed case", async () => {
    const expected = "[PASSED] [200] http://s9y.org\n";
    try {
      expect(checkUrl("http://s9y.org", 2)).resolves.toBe(
        colors.green(expected),
      );
    } catch (err) {}
  });

  test("print nothing when status flag is 2 (good) and the url is failed case", async () => {
    const expected = "";
    try {
      expect(
        checkUrl("http://en.wikipedia.org/wiki/Hackergotchi", 2),
      ).resolves.toBe(expected);
    } catch (err) {}
  });

  test("print nothing when status flag is 2 (good) and the url is warning case", async () => {
    const expected = "";
    try {
      expect(
        checkUrl("http://rickeyre.ca/open-source-feed.xml", 2),
      ).resolves.toBe(expected);
    } catch (err) {}
  });

  test("print nothing when status flag is 3 (bad) and the url is passed case", async () => {
    const expected = "";
    try {
      expect(checkUrl("http://s9y.org", 3)).resolves.toBe(expected);
    } catch (err) {}
  });

  test("print fail message when status flag is 3 (bad) and the url is failed case", async () => {
    const expected =
      "[FAILED] [404] http://en.wikipedia.org/wiki/Hackergotchi\n";
    try {
      expect(
        checkUrl("http://en.wikipedia.org/wiki/Hackergotchi", 3),
      ).resolves.toBe(colors.red(expected));
    } catch (err) {}
  });

  test("print warning message when status flag is 3 (bad) and the url is warning case", async () => {
    const expected =
      "Error: getaddrinfo ENOTFOUND rickeyre.ca http://rickeyre.ca/open-source-feed.xml\n";
    try {
      expect(
        checkUrl("http://rickeyre.ca/open-source-feed.xml", 3),
      ).resolves.toBe(colors.yellow(expected));
    } catch (err) {}
  });
});
