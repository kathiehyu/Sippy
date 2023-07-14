const axios = require("axios");
const fs = require("fs");
const writeStream = fs.createWriteStream("Output.txt");
const config = require("../config.js");
console.log(config.ACCESS_TOKEN);
// const dotenv = require("dotenv").config({debug: true, override: true});

async function getToken() {
    writeStream.write("RETRIEVING AUTHORIZATION TOKEN\n");
    axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(config.CLIENT_ID + ":" + config.CLIENT_SECRET, 'utf-8').toString('base64')
        },
        params: {
            grant_type: 'client_credentials'
        }
    })
    .then(response => {
        writeStream.write("response status: " + response.status + "\n");
        writeStream.write("response data: " + response.data);
        writeStream.write(JSON.stringify(response.data));
        let access_token = response.data.access_token;
        console.log("got response access token: " + access_token);
        fs.readFile("./config.js", (err, data) => {
            if (err) {
                console.log("caught error while reading");
                console.log(err);
            }
            let exp = new RegExp('^.*ACCESS_TOKEN.*$', 'm');
            let newString = data.toString().replace(exp, 'ACCESS_TOKEN = "' + access_token + '";');
            fs.writeFile("./config.js", newString, 'utf-8', (error) => {
                if (error) {
                    console.log("caught error while writing");
                    console.log(error);
                }
            });
            console.log("finished writing?");
        });
        // dotenv.populate(process.env, {ACCESS_TOKEN: access_token}, {override: true, debug: true});
        // process.env.ACCESS_TOKEN = access_token;
        // process.env.ACCESS_TOKEN = response.data.access_token;
        // console.log("token retrieved: " + process.env.ACCESS_TOKEN);
    })
    .catch(err => {
        console.log(err);
        if (err.response) {
            console.log("caught error???");
            writeStream.write(JSON.stringify(err.response.status));
            writeStream.write(JSON.stringify(err.response.data));
        }
    })
}

async function userInfo() {
    writeStream.write("RETRIEVING USER INFO\n");
    console.log("current access token:" + config.ACCESS_TOKEN);
    axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + config.ACCESS_TOKEN
        }
    })
    .then(response => {
        writeStream.write("response status: " + response.status + "\n");
        // writeStream.write("response data: " + response.data);
        writeStream.write(JSON.stringify(response.data));
        let display_name = response.data.display_name;
        let followersNum = response.data.followers.total;
        console.log("user data retrieved:");
        console.log("display name: " + display_name);
        console.log("number of followers: " + followersNum);
    })
    .catch(err => {
        // how to check for invalid token?
        if (err.response) {
            console.log("caught error while accessing user data");
            writeStream.write(JSON.stringify(err.response.status));
            writeStream.write(JSON.stringify(err.response.data));
            if (err.response.status == 401) {
                console.log("Could not authenticate user. Please log in using `spp -l`");
            }
        }
    });
}

module.exports = {
    getToken,
    userInfo
}