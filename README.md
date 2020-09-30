# URL-FI

This is a command-line tool for finding and reporting dead links (e.g., broken URLs) in a file. Users might use this tool to help locate broken URLs in an HTML page, text file, and so on. This tool can handle multiple files at the same time.

## How to Set up the Tool
1. Copy and paste the link into a terminal or visual studio code with the following command: git clone https://github.com/hyunjiLeeTech/URL-FI.git
2. To start the tool use the cd command to make sure you are in the correct folder and then install all the dependencies using the npm command: npm i 
3. Enter the command to start the tool. You need to mention the file name.

## Synopsis
url-fi [OPTION] [FILENAME]

## Features
### Output Format - Color
![output-colour](https://lh3.googleusercontent.com/TiBG8E-xrvK4UJYIPNoKwKuyzWbQbtnUvLC_cpaxeiyjO8037Qz0Mm0kO6K1iX49mekTtfx6tkp0ro6w2nX8H_C3hK8Njz8QIC6gC9uK8yUZQkaVQZVohdXrpCzVRbh82HKe5IiQOA)
<br/>This tool checks whether the link is broken or not. There are four status code it checks
- 200: If the status code is 200, it means the link is good. It prints out the result with green color
- 400 or 404: If the status code is 400 or 404, it means the link is broken. If prints out the result with red color
- Else: If the status code is not among those numbers, it means it has an unknown issue with status code. It prints out the result with a grey color

### Checks Both http:// and https:// (Argument -s)
If you enter -s argument, this tool checks both http:// and https://
When the link starts with https://, this tool checks whether the link is broken or not if it changes to http://.
<br/>Also, when the link starts with http://, this tool checks whether the lilnk is broken or not if the changes to https://.

### Helping option
When you enter -h argument, this tool prints out the usage of this tool.

## Argument
![output-arguments](https://lh3.googleusercontent.com/CqJJXYthdvGPTtH3aIgA3NHz6a0IU5OwrbrB8GKnzsA3mHRmXCAKXSoC0B8A32iGy5s1zC9BvsZbhoT4X1mcWlb_qYF8wWW8eMpuisw33vrkQuqyC6XSNxhdy6cp_KeNagykzfQuMQ)
<br/> Multiple arguments can be used at the same time (ex. url-fi -vsh [FILENAME])
<br/>1. -v: Running the tool with the v argument prints the name of the tool and its version
2. -s: Running the tool with the s argument checks whether http:// urls actually work using https://
3. -h: Running the tool with the h argument prints the usage of the tool
4. -r: Runnting the tool with the r argument check all the files in the given path and find wrong URL