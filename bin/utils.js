function getToken() {
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "grant_type=client_credentials&client_id=fd395b28c49548cd9084dfbec1771276&client_secret=a9a8d02154654773a9907039694797be"
    })
    .then(response => response.json())
    .then(response => {
        console.log(JSON.stringify(response));
        return response.access_token;
    })
}

module.exports = {
    getToken
}