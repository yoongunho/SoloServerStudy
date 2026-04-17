import fs from 'fs';
import { TRAILER_FILE, ADMIN_PASSWORD, CORS_HEADERS } from '../config.js';

// ── trailer.json 읽기 ────────────────────────────────────
function readTrailer() {
  try {
    return JSON.parse(fs.readFileSync(TRAILER_FILE, 'utf8'));
  } catch {
    return { url: '' };
  }
}

// ── trailer.json 저장 ────────────────────────────────────
function writeTrailer(data) {
  fs.writeFileSync(TRAILER_FILE, JSON.stringify(data, null, 2));
}

// ── GET /api/trailer ─────────────────────────────────────
// 현재 설정된 트레일러 URL을 메인 페이지에 반환
export function handleTrailerGet(req, res) {
  const data = readTrailer();
  res.writeHead(200, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// ── POST /api/admin/trailer ──────────────────────────────
// 관리자 비밀번호 검증 후 트레일러 URL 업데이트
export function handleAdminUpdate(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try {
      const { password, url } = JSON.parse(body);

      // 비밀번호 불일치 시 401 반환
      if (password !== ADMIN_PASSWORD) {
        res.writeHead(401, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, message: '비밀번호가 틀렸습니다.' }));
        return;
      }

      writeTrailer({ url: url || '' });
      res.writeHead(200, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch {
      res.writeHead(400, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, message: '잘못된 요청입니다.' }));
    }
  });
}
