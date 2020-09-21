# URL-FI

This is a command-line tool for finding and reporting dead links (e.g., broken URLs) in a file. Users might use this tool to help locate broken URLs in an HTML page, text file, and so on.

## How to Set up the Tool
1. Copy and paste the link into a terminal or visual studio code with the following command: git clone https://github.com/hyunjiLeeTech/URL-FI.git
2. To start the tool use the cd command to make sure you are in the correct folder and then install all the dependencies using the npm command: npm i 
3. Enter the command to start the tool. You need to mention the file name.

## Features
### Output Format - Color
![output-colour](https://lh3.googleusercontent.com/TiBG8E-xrvK4UJYIPNoKwKuyzWbQbtnUvLC_cpaxeiyjO8037Qz0Mm0kO6K1iX49mekTtfx6tkp0ro6w2nX8H_C3hK8Njz8QIC6gC9uK8yUZQkaVQZVohdXrpCzVRbh82HKe5IiQOA)
<br/>This tool checks whether the link is broken or not. There are four status code it checks
- 200: If the status code is 200, it means the link is good. It prints out the result with green color
- 400 or 404: If the status code is 400 or 404, it means the link is brokn. If prints out the result with red color
- Else: If the status code is not among those numbers, it means it has an unknown issue with status code. It prints out the result with grey color

### Checks Both http:// and https://
When the link starts with https://, this tool checks whether the link is broken or not if it changes to http://.
<br/>Also, when the link starts with http://, this tool checks whether the lilnk is broken or not if the changes to https://.

### Argument
![output-version](https://lh3.googleusercontent.com/3CY4IUaZ8Ws29jX_1IyRFEndUjxGdXvf7zO4HLY53Y-Ty1g44yjQCgcu-m3VKnJJRTZcJ3hSIu21ww3x_KDESrzemCDylNPh1p6WivpWbiqVvTF0C08_Z_n3NlCaM33rCr9wI6jIlQ)
<br/>Running the tool with the v or version argument prints the name of the tool and its version