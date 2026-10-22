const { spawn } = require('child_process'), fs = require('fs'); const OUT = __dirname, sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const W = +process.argv[2] || 1440, H = +process.argv[3] || 900, tag = process.argv[4] || 'd';
  const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9777','--window-size='+W+','+H,'--user-data-dir='+OUT+'/prof3'+tag,'about:blank'], { stdio: 'ignore' });
  await sleep(2500);
  const tabs = await (await fetch('http://localhost:9777/json')).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}, errs = [];
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); if (d.method === 'Runtime.exceptionThrown') errs.push(JSON.stringify(d.params.exceptionDetails).slice(0, 400)); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;
  const shot = async n => fs.writeFileSync(`${OUT}/car_${tag}_${n}.png`, Buffer.from((await send('Page.captureScreenshot')).data, 'base64'));
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 800 });
  await send('Page.navigate', { url: 'http://localhost:5173/portfolio/proyectos.html' }); await sleep(3500);
  await shot('1_rest');
  await ev('__carousel.S = __carousel.pitch * 0.5'); await sleep(250); await shot('2_mid_wave');
  for (let i = 0; i < 10; i++) { await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: W / 2, y: Math.round(H * .66), deltaX: 0, deltaY: 120 }); await sleep(50); }
  await sleep(120); await shot('3_scrolling'); await sleep(1500); await shot('4_settled');
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: W / 2, y: Math.round(H * .66) });
  for (const t of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type: t, x: W / 2, y: Math.round(H * .66), button: 'left', clickCount: 1 });
  await sleep(250); await shot('5_open_a'); await sleep(500); await shot('6_open_b'); await sleep(1200); await shot('7_open_c');
  console.log('opened:', await ev('!!document.querySelector(".sheet")'), 'sheet:', await ev('JSON.stringify(document.querySelector(".sheet")?.getBoundingClientRect())'));
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }); await sleep(250); await shot('8_closing'); await sleep(900);
  console.log('closed:', !(await ev('!!document.querySelector(".sheet")')), 'active:', await ev('document.getElementById("curName").textContent'), 'errors:', errs.length, errs[0] || '');
  await shot('9_closed');
  ch.kill();
})();
