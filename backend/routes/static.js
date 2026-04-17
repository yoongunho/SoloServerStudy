import fs from 'fs';
import path from 'path';
import { FRONTEND_DIR, CORS_HEADERS, MIME_TYPES } from '../config.js';

// ── 정적 파일 서빙 ───────────────────────────────────────
// / 요청은 메인 HTML로, 나머지는 frontend 폴더 기준 경로로 처리
// 경로 탈출(디렉토리 트래버설) 공격 방지 포함
export function handleStatic(req, res) {
  let filePath = req.url === '/'
    ? path.join(FRONTEND_DIR, 'Testtrailersite1.html')
    : path.join(FRONTEND_DIR, req.url);

  // frontend 폴더 밖 경로 접근 차단
  if (!filePath.startsWith(FRONTEND_DIR)) {
    res.writeHead(403, CORS_HEADERS);
    res.end('Forbidden');
    return;
  }

  const ext         = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { ...CORS_HEADERS, 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }
    res.writeHead(200, { ...CORS_HEADERS, 'Content-Type': contentType });
    res.end(data);
  });
}
