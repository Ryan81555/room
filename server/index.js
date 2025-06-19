// 기본 Node.js Express 서버 및 요청사항 API 뼈대
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = process.env.PORT || 8080;
const DATA_FILE = path.join(__dirname, 'data.json');
const ADMIN_VISIT_FILE = path.join(__dirname, 'admin_visitors.json');

// === 여기 추가 ===
app.use(express.static(__dirname)); // server 폴더 내 모든 파일 서비스

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '요청.html'));
});
// ===============

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// 데이터 파일 읽기
function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  try { return JSON.parse(raw); } catch { return []; }
}
// 데이터 파일 쓰기
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// 관리자 접속 기록 및 위치 관제 기능 제거(위치조회 없이 IP만 기록)
function readAdminVisits() {
  if (!fs.existsSync(ADMIN_VISIT_FILE)) return [];
  const raw = fs.readFileSync(ADMIN_VISIT_FILE, 'utf-8');
  try { return JSON.parse(raw); } catch { return []; }
}
function writeAdminVisits(data) {
  fs.writeFileSync(ADMIN_VISIT_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
// IP 위치 캐시
const ipLocationCache = {};
async function getLocationByIP(ip) {
  if (ipLocationCache[ip]) return ipLocationCache[ip];
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,query,status`);
    const data = await res.json();
    if (data.status === 'success') {
      const loc = `${data.country} ${data.regionName} ${data.city}`.trim();
      ipLocationCache[ip] = loc;
      return loc;
    }
  } catch {}
  return 'Unknown';
}

// 요청사항 전체 조회
app.get('/api/requests', (req, res) => {
  const data = readData();
  res.json(data);
});

// 요청사항 등록
app.post('/api/requests', (req, res) => {
  const { room, phone, type, detail } = req.body;
  if (!room || !type) return res.status(400).json({ error: '필수 항목 누락' });

  // IP 추출
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress || '';

  const data = readData();
  const now = Date.now();

  // 최근 3분 내 동일 요청 체크
  const isDuplicate = data.some(r =>
    r.room === room &&
    r.phone === phone &&
    r.ip === ip &&
    now - new Date(r.createdAt).getTime() < 3 * 60 * 1000 // 3분(180초)
  );
  if (isDuplicate) {
    return res.status(429).json({ error: '최근 3분 내 동일 정보로 이미 요청이 접수되었습니다.' });
  }

  // ip 필드 저장
  const newRequest = {
    id: Date.now(),
    room,
    phone,
    type,
    detail: detail || '',
    status: '대기',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ip,
  };
  data.push(newRequest);
  writeData(data);
  res.json(newRequest);
});

// 요청사항 상태 변경
app.patch('/api/requests/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const data = readData();
  const idx = data.findIndex(r => String(r.id) === String(id));
  if (idx === -1) return res.status(404).json({ error: '요청사항 없음' });
  data[idx].status = status;
  data[idx].updatedAt = new Date().toISOString();
  writeData(data);
  res.json(data[idx]);
});

// 관리자 접속 기록 (POST)
app.post('/api/admin-visit', (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress || '';
  const now = Date.now();
  let visits = readAdminVisits().filter(v => now - v.time < 20*60*1000); // 최근 20분
  let found = visits.find(v => v.ip === ip);
  if (found) {
    found.time = now;
  } else {
    visits.push({ ip, time: now });
  }
  writeAdminVisits(visits);
  res.json({ ok: true });
});

// 관리자 접속자 리스트 (GET)
app.get('/api/admin-visitors', (req, res) => {
  const visits = readAdminVisits().filter(v => Date.now() - v.time < 20*60*1000);
  res.json(visits);
});