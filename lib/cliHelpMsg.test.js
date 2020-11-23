const cliHelpMsg = require("./cliHelpMsg");

const originalConsoleLogFn = global.console.log;

describe("cliHelpMsg test", () => {
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

  test("print help message works", () => {
    cliHelpMsg();
    const expected =
      "Usage : url-fi [argument(s)] [FILENAME/DIR_PATH]" +
      "-v : print the tool name and its version" +
      "-s : check whether http:// work using https://" +
      "-h : display the usage of this tool" +
      "-r : do the test for all files in the following directory" +
      "-i : ignore the links on the ignore file. The ignore file should have at lease one url link" +
      "-t : check the website named Telescope's recent 10 post links" +
      "\n----------------------------------------------------------" +
      "-------------------------Example--------------------------" +
      "\nUsage : url-fi -v [FILENAME]" +
      "Usage : url-fi -s [FILENAME]" +
      "Usage : url-fi -h [FILENAME]" +
      "Usage : url-fi -r [DIRECTORY_PATH]" +
      "Usage : url-fi -i [IGNORE_URL_LIST_FILE] [FILENAME]" +
      "Usage : url-fi -t" +
      "\n----------------------------------------------------------" +
      "----------------------------------------------------------";

    expect(finalize(logOutput)).toEqual(expected);
  });
});
