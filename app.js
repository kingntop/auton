
const fs = require('fs');
const http = require('http');
const express = require('express');

const app = express();
const router = express.Router();

app.use(express.static('public'));
// Certificate 인증서 경로
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/cs.raiid.ai/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/cs.raiid.ai/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/cs.raiid.ai/chain.pem', 'utf8');

// const credentials = {
// 	key: privateKey,
// 	cert: certificate,
// 	ca: ca
// };

app.get('/', function(req, res) {
    res.send('hello world');
});

// https://velog.io/@jeong3320/apachereverse-proxy%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
// Starting both http & https servers
const httpServer = http.createServer(app);



httpServer.listen(8081, () => {
	console.log('HTTP Server running on port 8081');
});

// httpsServer.listen(443, () => {
// 	console.log('HTTPS Server running on port 443');
// })