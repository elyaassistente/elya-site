const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 8001;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
};

const server = http.createServer((req, res) => {
  let filePath = decodeURIComponent(req.url);
  
  // Remove query string
  if (filePath.includes('?')) {
    filePath = filePath.split('?')[0];
  }
  
  // Default to index.html
  if (filePath === '/') {
    filePath = '/index.html';
  }
  
  // Se não tem extensão, adiciona .html
  const ext = path.extname(filePath);
  if (!ext) {
    filePath += '.html';
  }
  
  const safePath = filePath.replace(/^\/+/, '');
  const fullPath = path.join(ROOT, safePath);
  
  // Verifica se o arquivo existe
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>404 - Página não encontrada</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #2C5F7F; }
          </style>
        </head>
        <body>
          <h1>404 - Página não encontrada</h1>
          <p>A página que você está procurando não existe.</p>
          <p><a href="/">Voltar para Home</a></p>
        </body>
        </html>
      `);
      return;
    }
    
    // Lê e serve o arquivo
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro interno do servidor');
        return;
      }
      
      const fileExt = path.extname(fullPath);
      const contentType = MIME_TYPES[fileExt] || 'application/octet-stream';
      
      res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
      res.end(data);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Diretório: ${ROOT}`);
});
