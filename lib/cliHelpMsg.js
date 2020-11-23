// print out the help message of the tool
function CliHelpMsg() {
  console.log("Usage : url-fi [argument(s)] [FILENAME/DIR_PATH]");
  console.log("-v : print the tool name and its version");
  console.log("-s : check whether http:// work using https://");
  console.log("-h : display the usage of this tool");
  console.log("-r : do the test for all files in the following directory");
  console.log(
    "-i : ignore the links on the ignore file. The ignore file should have at lease one url link",
  );
  console.log("-t : check the website named Telescope's recent 10 post links");
  console.log("\n----------------------------------------------------------");
  console.log("-------------------------Example--------------------------\n");
  console.log("Usage : url-fi -v [FILENAME]");
  console.log("Usage : url-fi -s [FILENAME]");
  console.log("Usage : url-fi -h [FILENAME]");
  console.log("Usage : url-fi -r [DIRECTORY_PATH]");
  console.log("Usage : url-fi -i [IGNORE_URL_LIST_FILE] [FILENAME]");
  console.log("Usage : url-fi -t");
  console.log("\n----------------------------------------------------------");
  console.log("----------------------------------------------------------");
}

module.exports = CliHelpMsg;
