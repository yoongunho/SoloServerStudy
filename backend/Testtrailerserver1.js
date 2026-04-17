import http from 'http';
import https from 'https';
import fs from 'fs';
import { PORT, HTTP_PORT, SSL_CERT, SSL_KEY, DOMAIN, CORS_HEADERS, ADMIN_PATH } from './config.js';
import { handleRegister }                      from './routes/register.js';
import { handleStatic }                        from './routes/static.js';
import { handleTrailerGet, handleAdminUpdate, handleAdminAuth } from './routes/admin.js';

// ── 요청 라우팅 ──────────────────────────────────────────
// URL과 메서드를 보고 적절한 핸들러로 분기
function handleRequest(req, res) {

  // CORS preflight 요청 처리
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  // 사전등록 이메일 저장
  if (req.url === '/api/register' && req.method === 'POST') {
    handleRegister(req, res);
    return;
  }

  // 현재 트레일러 URL 조회 (메인 페이지에서 호출)
  if (req.url === '/api/trailer' && req.method === 'GET') {
    handleTrailerGet(req, res);
    return;
  }

  // 관리자 비밀번호 인증
  if (req.url === '/api/admin/auth' && req.method === 'POST') {
    handleAdminAuth(req, res);
    return;
  }

  // 관리자 트레일러 URL 업데이트 (관리자 페이지에서 호출)
  if (req.url === '/api/admin/trailer' && req.method === 'POST') {
    handleAdminUpdate(req, res);
    return;
  }

  // 특수 관리자 URL → admin.html로 내부 리라우팅
  if (req.url === ADMIN_PATH || req.url === ADMIN_PATH + '/') {
    req.url = '/admin.html';
  }

  // 그 외 모든 요청은 정적 파일 서빙
  handleStatic(req, res);
}

// ── HTTPS 서버 (443포트) ─────────────────────────────────
const sslOptions = {
  cert: fs.readFileSync(SSL_CERT),
  key:  fs.readFileSync(SSL_KEY),
};
https.createServer(sslOptions, handleRequest).listen(PORT, '0.0.0.0', () => {
  console.log(`HTTPS 서버 실행 중: https://${DOMAIN}`);
});

// ── HTTP → HTTPS 리다이렉트 (80포트) ────────────────────
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${DOMAIN}${req.url}` });
  res.end();
}).listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`HTTP(${HTTP_PORT}) → HTTPS 리다이렉트 중`);
});
