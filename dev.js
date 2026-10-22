// Live-reload dev server, zero deps: node dev.js [port]  → http://localhost:5173
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = +process.argv[2] || 5173, clients = new Set();
const types = { '.html': 'text/html', '.js': 'text/javascript', '.jsx': 'text/babel', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json' };
const reload = '<script>new EventSource("/__reload").onmessage=()=>location.reload()</script>';
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
    clients.add(res); req.on('close', () => clients.delete(res)); return;
  }
  const file = path.join(root, path.normalize(url === '/' ? 'index.html' : url));
  if (!file.startsWith(root) || file.includes(path.sep + '.git')) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404).end('not found'); return; }
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': (types[ext] || 'application/octet-stream') + '; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(ext === '.html' ? buf.toString().replace('</body>', reload + '</body>') : buf);
  });
}).listen(port, () => console.log(`dev → http://localhost:${port}  (live reload on html/js/jsx/css)`));
let t; fs.watch(root, { recursive: true }, (_, f) => {
  if (!f || f.startsWith('.git') || !/\.(html|js|jsx|css|svg)$/.test(f)) return;
  clearTimeout(t); t = setTimeout(() => clients.forEach(c => c.write('data: r\n\n')), 80);
});
