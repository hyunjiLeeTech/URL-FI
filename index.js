#!/usr/bin/env node

console.log("Hello, here is my first CLI tool")
console.log(process.argv.length)

if (process.argv.length === 2) {
    console.log("Usage: url-fi FILENAME")
} else {
    console.log("It has at least one argument")
    console.log(process.argv[2])
}