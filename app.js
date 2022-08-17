
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const shell_exec_1 = require("shell-exec");

const app = express();
app.use(express.static('public'));
// Certificate 인증서 경로
const privateKey = fs.readFileSync('/etc/letsencrypt/live/cs.raiid.ai/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/cs.raiid.ai/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/cs.raiid.ai/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use((req, res) => {
	res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.get('/tw', async (request, response, next) => {
    let resJosn = {};
    // (0, shell_exec_1.default)('/home/spacebank/twright/tw.sh').then(console.log).catch(console.log);
    resJosn = {
        code: 'S001',
        message: 'Success'
    };
    response.jsonp(resJosn);
    // response.send('callback' + '('+ JSON.stringify(resJosn) + ');');
});

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
})