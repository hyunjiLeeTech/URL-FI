# URL-FI

## How to Set up the Tool

1. Copy and paste the link into a terminal or visual studio code with the following command: `git clone https://github.com/hyunjiLeeTech/URL-FI.git`
2. Use the cd command to make sure you are in the correct folder and then install all the dependencies using the npm command: `npm i`
3. Make a symbolic link of the command using `npm link`
4. Enter the command along with a filename to use the tool.

## Formatting - How to Run Prettier Formatter

This command-line tool use 'Prettier' formatter for formatting. The detailed document about the prettier is the following: [prettier](https://prettier.io/)

1. Open the terminal
2. Enter `npm run prettier`

- If you want to ignore certain file, add the file on the '.prettierignore' file.
- If you want to check whether the fiels are formatted or not, run `npm run prettier-check`

## How to run Linter

This command-lint tool use 'Linter' to avoid code patterns lead to bugs. The detailed document about the Linter is the following: [Linter](https://eslint.org/)

1. Open the terminal
2. Enter `npm run eslint`

- If you want to ignore certain file, add the file name on the '.eslintignore' file.

## IDE Integration

When you try to contribute to this project, please check whether the formatter (Prettier) and Linter is automatically working when you save the file. If it does not work, please install 'Prettier' extension.
