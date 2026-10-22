const { spawn } = require('child_process'), fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const W = +process.argv[2], H = +process.argv[3], tag = process.argv[4];
  const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9801','--window-size='+W+','+H,'--user-data-dir='+__dirname+'/profb'+tag,'about:blank'], { stdio: 'ignore' });
  await sleep(2500);
  const tabs = await (await fetch('http://localhost:9801/json')).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}, errs = []; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); if (d.method === 'Runtime.exceptionThrown') errs.push(JSON.stringify(d.params.exceptionDetails.exception).slice(0, 300)); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;
  const shot = async n => fs.writeFileSync(`${__dirname}/b_${tag}_${n}.png`, Buffer.from((await send('Page.captureScreenshot')).data, 'base64'));
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 800 });
  await send('Page.navigate', { url: 'http://localhost:5173/portfolio/gateway.html' });
  await sleep(900); await shot('1'); await sleep(1500); await shot('2'); await sleep(1100); await shot('3'); await sleep(900); await shot('4'); await sleep(1800); await shot('5');
  console.log('booting', await ev('booting'), 'body', await ev('document.body.className'), 'errors', errs.length, errs[0] || '');
  ch.kill();
})();
