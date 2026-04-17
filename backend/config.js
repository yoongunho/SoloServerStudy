import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PORT         = 443;
export const HTTP_PORT    = 80;
export const SSL_CERT     = '/etc/letsencrypt/live/studyserver.mooo.com/fullchain.pem';
export const SSL_KEY      = '/etc/letsencrypt/live/studyserver.mooo.com/privkey.pem';
export const FRONTEND_DIR = path.join(__dirname, '../frontend');
export const EMAILS_FILE   = path.join(__dirname, 'registered_emails.json');
export const TRAILER_FILE  = path.join(__dirname, 'trailer.json');
export const ADMIN_PASSWORD = 'siecle2026!';
export const ADMIN_PATH     = '/admin-siecle';

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};
