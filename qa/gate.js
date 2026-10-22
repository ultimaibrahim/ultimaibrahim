const { spawn } = require('child_process'), fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9821','--window-size=1440,900','--user-data-dir='+__dirname+'/profgate','about:blank'], { stdio: 'ignore' });
  await sleep(2500);
  const tabs = await (await fetch('http://localhost:9821/json')).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}, errs = []; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); if (d.method === 'Runtime.exceptionThrown') errs.push(JSON.stringify(d.params.exceptionDetails.exception).slice(0, 300)); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;
  const shot = async n => fs.writeFileSync(`${__dirname}/g_${n}.png`, Buffer.from((await send('Page.captureScreenshot')).data, 'base64'));
  await send('Runtime.enable'); await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:5173/portfolio/gateway.html' }); await sleep(6200);
  await shot('1_gate'); console.log('gate on', await ev("document.getElementById('start-gate').classList.contains('on')"), 'booting', await ev('booting'));
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 720, y: 450, button: 'left', clickCount: 1 }); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 720, y: 450, button: 'left', clickCount: 1 });
  await sleep(1800); await shot('2_started');
  console.log('booting', await ev('booting'), 'sound', await ev("localStorage.getItem('gw-sound')"), 'errors', errs.length, errs[0] || ''); ch.kill();
})();
