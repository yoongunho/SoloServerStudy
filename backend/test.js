import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api/hello' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: '안녕하세요! 백엔드 서버입니다.' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: '페이지를 찾을 수 없습니다.' }));
  }
});

server.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
