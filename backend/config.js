import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PORT           = parseInt(process.env.PORT)       || 443;
export const HTTP_PORT      = parseInt(process.env.HTTP_PORT)  || 80;
export const DOMAIN         = process.env.DOMAIN               || 'localhost';
export const SSL_CERT       = process.env.SSL_CERT;
export const SSL_KEY        = process.env.SSL_KEY;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const ADMIN_PATH     = process.env.ADMIN_PATH           || '/admin';

export const FRONTEND_DIR = path.join(__dirname, '../frontend');
export const EMAILS_FILE  = path.join(__dirname, 'registered_emails.json');
export const TRAILER_FILE = path.join(__dirname, 'trailer.json');

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
