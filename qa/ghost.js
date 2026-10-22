const { spawn } = require('child_process'), fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9851','--window-size=1440,900','--user-data-dir='+__dirname+'/profghost','about:blank'], { stdio: 'ignore' });
  await sleep(2500);
  const tabs = await (await fetch('http://localhost:9851/json')).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}, errs = []; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); if (d.method === 'Runtime.exceptionThrown') errs.push(JSON.stringify(d.params.exceptionDetails.exception).slice(0, 300)); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;
  await send('Runtime.enable'); await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:5173/portfolio/gateway.html' }); await sleep(6300);
  await ev("localStorage.removeItem('gw-tour')");
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 720, y: 400, button: 'left', clickCount: 1 }); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 720, y: 400, button: 'left', clickCount: 1 });
  await sleep(1500);
  await ev("geassTarget='left'"); await sleep(1800);
  await ev("geassTarget='right'");
  const shots = [];
  for (let i = 0; i < 6; i++) { shots.push((await send('Page.captureScreenshot', { format: 'jpeg', quality: 60 })).data); await sleep(60); }
  shots.forEach((d, i) => fs.writeFileSync(`${__dirname}/gh_${i}.jpg`, Buffer.from(d, 'base64')));
  console.log('errors', errs.length, errs[0] || ''); ch.kill();
})();
