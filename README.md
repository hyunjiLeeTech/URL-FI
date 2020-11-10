# URL-FI

This is a command-line tool for finding and reporting dead links (e.g., broken URLs) in a file. Users might use this tool to help locate broken URLs in an HTML page, text file, and so on. This tool can handle multiple files at the same time. You can provide path
instead of file name with option -r.

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

### ignore URL pattern(s) using a text file (Argument -i)

For example, if you write 'https://www.google.com" in the text file (ignore-urls.txt), then run the command \$ tool-name --ignore ignore-urls.txt index.html. Your tool will check all URLs in index.html, but ignore the URLs in ignore-url.txt which is "https://www.google.com" in this case.

### Checks all the files in a directory path (Argument -r)

When you enter -r argument, this tool recursively map test all the files in the directory path (You must enter path not file name).

### Check links in Telescope posts (Argument -t)

When you enter -t argument, this tool checks the recent 10 posts in Telescopes. The post links are from local server (localhost:3000/posts)

### Helping option

When you enter -h argument, this tool prints out the usage of this tool.

## Argument

![output-arguments](https://lh3.googleusercontent.com/CqJJXYthdvGPTtH3aIgA3NHz6a0IU5OwrbrB8GKnzsA3mHRmXCAKXSoC0B8A32iGy5s1zC9BvsZbhoT4X1mcWlb_qYF8wWW8eMpuisw33vrkQuqyC6XSNxhdy6cp_KeNagykzfQuMQ)
<br/> Multiple arguments can be used at the same time (ex. url-fi -vsh [FILENAME])
<br/>1. -v: Running the tool with the v argument prints the name of the tool and its version 2. -s: Running the tool with the s argument checks whether http:// urls actually work using https:// 3. -h: Running the tool with the h argument prints the usage of the tool
<br/>2. -s: Running the tool with the s argument checks whether http:// urls actually work using https://
<br/>3. -h: Running the tool with the h argument prints the usage of the tool
<br/>4. -r: Runnting the tool with the r argument check all the files in the given path and find wrong URL
