import fs from 'fs';
import { EMAILS_FILE, CORS_HEADERS } from '../config.js';

// ── 이메일 저장 파일 없으면 빈 배열로 초기화 ────────────
if (!fs.existsSync(EMAILS_FILE)) {
  fs.writeFileSync(EMAILS_FILE, JSON.stringify([]));
}

// ── POST /api/register ───────────────────────────────────
// 이메일 형식 검증 → 중복 확인 → registered_emails.json에 저장
export function handleRegister(req, res) {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    try {
      const { email } = JSON.parse(body);

      // 이메일 형식 검증
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.writeHead(400, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '유효하지 않은 이메일입니다.' }));
        return;
      }

      const emails = JSON.parse(fs.readFileSync(EMAILS_FILE));

      // 중복 이메일 확인
      if (emails.includes(email)) {
        res.writeHead(409, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '이미 등록된 이메일입니다.' }));
        return;
      }

      // 이메일 저장
      emails.push(email);
      fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
      console.log(`사전등록 완료: ${email} (총 ${emails.length}명)`);

      res.writeHead(200, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '사전등록이 완료되었습니다.' }));
    } catch {
      res.writeHead(400, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: '잘못된 요청입니다.' }));
    }
  });
}
