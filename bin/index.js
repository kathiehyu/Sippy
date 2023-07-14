#! /usr/bin/env node
const yargs = require("yargs");
const utils = require("./utils");

const usage = "\nUsage: manage spotify playback, tracks, and playlists";
const options = yargs 
 .usage(usage) 
 .option("p", {
    alias:"pause",
    describe: "Pause audio playback",
    type: "boolean",
    demandOption: false
})
 .option("u", {
    alias: "userInfo",
    describe: "Display current user info",
    type: "boolean",
    demandOption: false
 })
 .option("l", {
    alias: "login",
    describe: "Redirects to Spotify login page in browser",
    type: "boolean",
    demandOption: false
 })
 .help(true) 
 .argv;

if (yargs.argv.u) {
    console.log("Handling argument u");
    utils.userInfo();
    return;
}
if (yargs.argv.l) {
    console.log("Logging in ....");
    utils.getToken();
    return;
}
if (yargs.argv._.length == 0) {
    yargs.showHelp();
}