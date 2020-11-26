const findFilesInDir = require("./findFilesInDir");
const colors = require("colors");

const originalConsoleLogFn = global.console.log;
const originalConsoleErrorFn = global.console.error;

describe("find files in directory tests", () => {
  let logOutput = null;
  let errorOutput = null;

  function testLogFn(...args) {
    logOutput = logOutput || [];
    args.forEach((arg) => logOutput.push(arg));
  }

  function testErrorFn(...args) {
    errorOutput = errorOutput || [];
    args.forEach((arg) => errorOutput.push(arg));
  }

  function finalize(output) {
    if (output && Array.isArray(output)) {
      return output.join("");
    }
    return output;
  }

  beforeEach(() => {
    global.console.log = testLogFn;
    global.console.error = testErrorFn;

    logOutput = null;
    errorOutput = null;
  });

  afterEach(() => {
    global.console.log = originalConsoleLogFn;
    global.console.error = originalConsoleErrorFn;

    logOutput = null;
    errorOutput = null;
  });

  test("pass an empty path should print error message", () => {
    findFilesInDir("");
    const expected = colors.yellow(
      "Error: ENOENT: no such file or directory, scandir",
    );
    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });
});
