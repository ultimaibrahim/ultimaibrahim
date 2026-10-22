const { spawn } = require('child_process'), fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const W = +process.argv[2] || 1440, H = +process.argv[3] || 900, tag = process.argv[4] || 'd';
  const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9811','--window-size='+W+','+H,'--user-data-dir='+__dirname+'/profsh'+tag,'about:blank'], { stdio: 'ignore' });
  await sleep(2500);
  const tabs = await (await fetch('http://localhost:9811/json')).json();
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}, errs = []; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); if (d.method === 'Runtime.exceptionThrown') errs.push(JSON.stringify(d.params.exceptionDetails.exception).slice(0, 300)); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.value;
  const shot = async n => fs.writeFileSync(`${__dirname}/sh_${tag}_${n}.png`, Buffer.from((await send('Page.captureScreenshot')).data, 'base64'));
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 800 });
  await send('Page.navigate', { url: 'http://localhost:5173/portfolio/proyectos.html' }); await sleep(3500);
  // frame cost proxy
  console.log('frames/s', await ev(`new Promise(r=>{let n=0;const t0=performance.now();const f=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(Math.round(n/2))};requestAnimationFrame(f)})`));
  for (const k of [2, 0, 1]) {
    await ev(`__carousel.open(${k})`); await sleep(2800); await shot('open' + k); await ev('__carousel.close()'); await sleep(1500);
  }
  // close from a different project than the one opened: it should glide and land
  await ev('__carousel.close()'); await sleep(1800);
  console.log('after close: sheet', await ev('!!document.querySelector(".sheet")'), 'panelsHidden', await ev('[...document.querySelectorAll(".pn")].filter(p=>p.style.opacity==="0").length'));
  await shot('closed');
  // open+close same panel
  await ev(`(()=>{const e=document.querySelector('.pn[data-k="1"]');__carousel.open(1)})()`); await sleep(900); await ev('__carousel.close()'); await sleep(250); await shot('closing_mid'); await sleep(1200);
  console.log('errors', errs.length, errs[0] || '');
  ch.kill();
})();
