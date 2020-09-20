# URL-FI

This is a command-line tool for finding and reporting dead links (e.g., broken URLs) in a file. Users might use this tool to help locate broken URLs in an HTML page, text file, and so on.

## How to Set up the Tool
1. Copy and paste the link into a terminal or visual studio code with the following command: git clone https://github.com/hyunjiLeeTech/URL-FI.git
2. To start the tool use the cd command to make sure you are in the correct folder and then install all the dependencies using the npm command: npm i 
3. Enter the command to start the tool. You need to mention the file name.

## Output Format - Color
![output-colour](https://lh3.googleusercontent.com/9svcCU3m5SHv3VB5Io9bz5auzoNu3c1JFKZSGaKX-po6Kt0zZbkSedyK2QWDaiLVpTxvgzQk5hyHe030pMBN7tD5c2x8QPnyz9_ibixc8Pl8V4ckeSn4t4w8CKS-zNFg1JDunUQFrw)
<br/>This tool checks whether the link is broken or not. There are four status code it checks
- 200: If the status code is 200, it means the link is good. It prints out the result with green color
- 400 or 404: If the status code is 400 or 404, it means the link is brokn. If prints out the result with red color
- Else: If the status code is not among those numbers, it means it has an unknown issue with status code. It prints out the result with grey color

## Checks Both http:// and https://
When the link starts with https://, this tool checks whether the link is broken or not if it changes to http://.
Also, when the link starts with http://, this tool checks whether the lilnk is broken or not if the changes to https://.