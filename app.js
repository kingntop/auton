
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');


const shell_exec_1 = require("shell-exec");

const app = express();
const router = express.Router();

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

app.get('/', function(req, res) {
    res.send('hello world');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.get('/tw', async (request, response, next) => {
    let resJosn = {};
    (0, shell_exec_1.default)('/root/auton/sc.sh').then(console.log).catch(console.log);
    resJosn = {
        code: 'S001',
        message: 'Success'
    };
    response.jsonp(resJosn);
    // response.send('callback' + '('+ JSON.stringify(resJosn) + ');');
});


app.get('/case1', async (request, response, next) => {
    let resJosn = {};

     
  {
    "values": [
      [
        "1",
        "대구분",
        "중구분",
        "소구분1",
        "소구분2",
        "소구분3",
        "비밀번호 리셋을 어떻게 하나요?",
        "비밀번호 리셋을 하는 방법은 다음과 같습니다.",
        "http://daum.net",
        "https://tippingkorea.co.kr/data/education/15614238911.png"
      ]
      ],
    "schema_type": "1.0"
  }
    
  
    resJosn = {
        [
            [
            '1',
            '대구분',
            '중구분',
            '소구분1',
            '소구분2',
            '소구분3',
            '비밀번호 리셋을 어떻게 하나요?',
            '비밀번호 리셋을 하는 방법은 다음과 같습니다.',
            'http://daum.net',
            'https://tippingkorea.co.kr/data/education/15614238911.png'
            ]
        ],
        schema_type : '1.0'
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