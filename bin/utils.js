let access_token = null;
const axios = require("axios");
const fs = require("fs");
const writeStream = fs.createWriteStream("Output.txt");

async function getToken() {
    console.log("RETRIEVING AUTHORIZATION TOKEN");
    // axios.post('https://accounts.spotify.com/api/token', )
    axios({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from('fd395b28c49548cd9084dfbec1771276:a9a8d02154654773a9907039694797be', 'utf-8').toString('base64')
        },
        params: {
            grant_type: 'client_credentials'
        }
    })
    // axios.post('https://accounts.spotify.com/api/token', {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: "grant_type=client_credentials&client_id=fd395b28c49548cd9084dfbec1771276&client_secret=a9a8d02154654773a9907039694797be"
    // })
    .then(response => {
        writeStream.write("response status: " + response.status + "\n");
        writeStream.write("response data: " + response.data);
        writeStream.write(JSON.stringify(response.data));
        access_token = response.data.access_token;
        console.log("token retrieved: " + access_token);
    })
    .catch(err => {
        if (err.response) {
            console.log("caught error???");
            writeStream.write(JSON.stringify(err.response.status));
            writeStream.write(JSON.stringify(err.response.data));
        }
    })
}

async function userInfo() {
    console.log("RETRIEVING USER INFO");
    axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    })
    .then(response => {
        if (response.status.data.error.message == 'Invalid access token') {
            console.log("Could not find current user. Please sign in using 'spp -l' or 'spp --login'");
        } else {
            writeStream.writeFile("response status: " + response.status);
            // console.log(JSON.stringify(response));
            // console.log("Display Name:" + response.display_name);
        }
    })
}

module.exports = {
    getToken,
    userInfo,
    access_token
}