const { spawn } = require('child_process'), fs = require('fs'); const OUT = __dirname, sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const W = +process.argv[2], H = +process.argv[3], tag = process.argv[4];
  const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9791','--window-size='+W+','+H,'--user-data-dir='+OUT+'/profl'+tag,'about:blank'], { stdio: 'ignore' });
  await sleep(2500);
  const tabs = await (await fetch('http://localhost:9791/json')).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}, errs = []; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); if (d.method === 'Runtime.exceptionThrown') errs.push(JSON.stringify(d.params.exceptionDetails).slice(0, 300)); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;
  const shot = async n => fs.writeFileSync(`${OUT}/l_${tag}_${n}.png`, Buffer.from((await send('Page.captureScreenshot')).data, 'base64'));
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 800 });
  await send('Page.navigate', { url: 'http://localhost:5173/portfolio/gateway.html' }); await sleep(6500);
  const w1 = () => ev(`window.dispatchEvent(new WheelEvent('wheel',{deltaY:60,cancelable:true}))`);
  const cmds = ['ultimafetch','whoami --verbose','cat /etc/manifesto.md','systemctl status etoile.service mise.service','ultima open portfolio'];
  for (let s = 0; s < 5; s++) {
    for (let i = 0; i < Math.ceil(cmds[s].length / 2) + 1; i++) { await w1(); await sleep(40); }
    console.log('step',s,await ev('JSON.stringify([currentStep,stepState,charProgress])')); if (s === 4) break;
    await sleep(2200); for (let i = 0; i < 9; i++) { await w1(); await sleep(40); } await sleep(1100);
  }
  await sleep(250); await shot('1_zoom_typed'); await sleep(1100); await shot('2_log');
  for (let i = 0; i < 60; i++) { if (await ev("document.getElementById('launch-veil').children.length>0")) break; await sleep(150); }
  await sleep(380); await shot('3_curtain'); await sleep(2600);
  console.log('url:', await ev('location.pathname'), 'errors', errs.length, errs[0] || '');
  await sleep(500); await shot('4_arrive_a'); await sleep(900); await shot('5_arrived');
  ch.kill();
})();
