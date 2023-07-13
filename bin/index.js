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
    describe: "Display user info including name, follower/following count, and Spotify ID",
    type: "boolean",
    demandOption: false
 })
 .help(true) 
 .argv;

if (yargs.argv._.length == 0) {
    yargs.showHelp();
}