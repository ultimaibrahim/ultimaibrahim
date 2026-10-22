const { spawn } = require('child_process'), fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9861','--window-size=800,600','--user-data-dir='+__dirname+'/proffav','about:blank'], { stdio: 'ignore' });
  await sleep(2500);
  const tabs = await (await fetch('http://localhost:9861/json')).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.value;
  await send('Runtime.enable'); await send('Page.enable'); await send('Page.navigate', { url: 'http://localhost:5173/portfolio/proyectos.html' }); await sleep(2500);
  const modes = [{ mode: 'ring' }, { mode: 'mark' }, { mode: 'proj', id: 'etoile', acc: '#C084FC' }, { mode: 'proj', id: 'mise', acc: '#9DE3BD' }, { mode: 'proj', id: 'signo', acc: '#F2B8D8' }];
  const out = [];
  for (const m of modes) { out.push(await ev(`(async()=>{Fav.set(${JSON.stringify(m)});await new Promise(r=>setTimeout(r,200));return document.querySelector('link[rel~=icon]').href})()`)); }
  fs.writeFileSync(__dirname + '/fav.json', JSON.stringify(out)); ch.kill();
})();
