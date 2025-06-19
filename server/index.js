const express = require('express');
const app = express();

// 서버 시작 로그
console.log('=== 서버 시작 시도 ===');

// 가장 기본적인 라우트
app.get('/', (req, res) => {
  res.send('서버가 작동 중입니다!');
});

// 포트 설정
const port = parseInt(process.env.PORT) || 8080;

// 서버 시작
app.listen(port, '0.0.0.0', () => {
  console.log(`=== 서버가 포트 ${port}에서 시작됨 ===`);
});