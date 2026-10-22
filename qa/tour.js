const { spawn } = require('child_process'), fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const PROF = __dirname + '/proftour';
  const run = async (name, fn) => {
    const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9841','--window-size=1440,900','--user-data-dir='+PROF,'about:blank'], { stdio: 'ignore' });
    await sleep(2500);
    const tabs = await (await fetch('http://localhost:9841/json')).json();
    const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
    let id = 0; const pend = {}, errs = []; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); if (d.method === 'Runtime.exceptionThrown') errs.push(JSON.stringify(d.params.exceptionDetails.exception).slice(0, 300)); };
    const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
    const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;
    const shot = async n => fs.writeFileSync(`${__dirname}/t_${n}.png`, Buffer.from((await send('Page.captureScreenshot')).data, 'base64'));
    await send('Runtime.enable'); await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://localhost:5173/portfolio/gateway.html' }); await sleep(6300);
    const click = async () => { await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 720, y: 400, button: 'left', clickCount: 1 }); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 720, y: 400, button: 'left', clickCount: 1 }); };
    await fn({ ev, shot, click, send, sleep }); console.log(name, 'errors', errs.length, errs[0] || '');
    ch.kill(); await sleep(600);
  };
  await run('new user', async ({ ev, shot, click }) => {
    await click(); await sleep(1500);
    console.log(' skip label:', await ev("document.getElementById('skip-btn').textContent"), '| again hidden:', await ev("document.getElementById('again-btn').hidden"));
    await shot('1_new'); await ev("document.getElementById('skip-btn').click()"); await sleep(1800);
    console.log(' after skip: step', await ev('currentStep'), 'state', await ev('stepState')); await shot('2_skipping'); await sleep(5500);
    console.log(' path:', await ev('location.pathname'), '| gw-tour:', await ev("localStorage.getItem('gw-tour')"));
  });
  await run('returning', async ({ ev, shot, click }) => {
    await click(); await sleep(1500);
    console.log(' skip label:', await ev("document.getElementById('skip-btn').textContent"), '| again hidden:', await ev("document.getElementById('again-btn').hidden"), '| step', await ev('currentStep'));
    await shot('3_returning');
    for (let i = 0; i < 6; i++) { await ev("window.dispatchEvent(new WheelEvent('wheel',{deltaY:60,cancelable:true}))"); await sleep(60); }
    await sleep(500); console.log(' typing:', await ev("document.querySelector('.cmd-text')?.textContent"));
    await ev("document.getElementById('skip-btn').click()"); await sleep(2500); console.log(' path after skip:', await ev('location.pathname'));
  });
})();
