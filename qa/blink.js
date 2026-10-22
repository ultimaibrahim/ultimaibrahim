const { spawn } = require('child_process'), fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const W = 390, H = 844;
  const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9901','--window-size='+W+','+H,'--user-data-dir='+__dirname+'/profblink','about:blank'], { stdio: 'ignore' });
  await sleep(2500);
  const tabs = await (await fetch('http://localhost:9901/json')).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}, errs = []; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); if (d.method === 'Runtime.exceptionThrown') errs.push(JSON.stringify(d.params.exceptionDetails.exception || d.params.exceptionDetails).slice(0, 200)); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;
  await send('Runtime.enable'); await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: true });
  await send('Page.navigate', { url: 'https://ultimaibrahim.dev/?v=${Date.now()}' }); await sleep(11000);
  const inner = e => ev(`document.querySelector('iframe').contentWindow.eval(${JSON.stringify(e)})`);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 200, y: 400, button: 'left', clickCount: 1 }); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 200, y: 400, button: 'left', clickCount: 1 });
  await sleep(1500); await inner("document.getElementById('skip-btn').click()");
  // wait until the launch log is done and the curtain starts, then sample frames
  let n = 0; const frames = [];
  for (let i = 0; i < 200; i++) { const veil = await inner("document.getElementById('launch-veil').children.length"); if (veil > 0) break; await sleep(100); }
  const t0 = Date.now();
  while (Date.now() - t0 < 5200) { const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 40 }); frames.push({ t: Date.now() - t0, d: r.data }); }
  fs.mkdirSync(__dirname + '/blink', { recursive: true });
  frames.forEach((f, i) => fs.writeFileSync(`${__dirname}/blink/f${String(i).padStart(3, '0')}.jpg`, Buffer.from(f.d, 'base64')));
  console.log('frames', frames.length, 'iframes now', await ev("[...document.querySelectorAll('iframe')].map(f=>f.src.split('/').pop())"), 'errors', errs.length, errs[0] || '');
  ch.kill();
})();
