const versionInfo = require("./versionInfo");

describe("versionInfo fnc test", () => {
  let logOutput = null;
  function testLogFn(...args) {
    logOutput = logOutput || [];
    args.forEach((arg) => logOutput.push(arg));
  }

  function finalize(output) {
    if (output && Array.isArray(output)) {
      return output.join("");
    }

    return output;
  }

  beforeEach(() => {
    global.console.log = testLogFn;
  });

  test("print version information works", () => {
    versionInfo();
    const expected = "Tool Name: url-fi" + "Version: 0.1";

    expect(finalize(logOutput)).toEqual(expected);
  });
});
