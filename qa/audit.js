const { spawn } = require('child_process'), fs = require('fs'), sleep = ms => new Promise(r => setTimeout(r, ms));
const BASE = process.argv[2] || 'http://localhost:5173';
const DEVICES = [['se1', 320, 568], ['se', 375, 667], ['s8', 360, 740], ['i13', 390, 844], ['px7', 412, 915], ['i14pm', 430, 932], ['land', 844, 390], ['tab', 768, 1024]];
const only = process.argv[3] ? process.argv[3].split(',') : null;
(async () => {
  const report = {};
  for (const [tag, W, H] of DEVICES) {
    if (only && !only.includes(tag)) continue;
    const ch = spawn('chromium', ['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9891','--window-size='+W+','+H,'--user-data-dir='+__dirname+'/profaud'+tag,'about:blank'], { stdio: 'ignore' });
    await sleep(2300);
    const tabs = await (await fetch('http://localhost:9891/json')).json();
    const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
    let id = 0; const pend = {}, errs = []; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); if (d.method === 'Runtime.exceptionThrown') errs.push(JSON.stringify(d.params.exceptionDetails.exception || d.params.exceptionDetails).slice(0, 200)); };
    const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
    const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.value;
    const shots = [];
    const shot = async () => shots.push((await send('Page.captureScreenshot')).data);
    await send('Runtime.enable'); await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: true });
    await send('Emulation.setTouchEmulationEnabled', { enabled: true });
    const R = { dev: tag + ' ' + W + 'x' + H, issues: [] };
    const overflow = async (label) => { const o = await ev(`(()=>{const w=innerWidth,out=[];document.querySelectorAll('body *').forEach(e=>{const s=getComputedStyle(e);if(s.position==='fixed'&&e.id!=='launch-veil'&&e.id!=='arrive'||true){const r=e.getBoundingClientRect();if(r.width>0&&r.height>0&&(r.right>w+2||r.left<-2)&&!e.closest('.pn')&&!e.closest('#stage')&&e.tagName!=='CANVAS'&&getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none'&&!e.closest('#launch-veil')&&!e.closest('#arrive'))out.push((e.id||e.className||e.tagName).toString().slice(0,30)+':'+Math.round(r.left)+'→'+Math.round(r.right))}});return {sw:document.documentElement.scrollWidth,w,out:out.slice(0,6)}})()`); if (o.sw > o.w + 1 || o.out.length) R.issues.push(label + ' overflow ' + JSON.stringify(o)); };
    // gateway
    await send('Page.navigate', { url: BASE + '/portfolio/gateway.html' }); await sleep(1200); await shot(); await sleep(5200); await shot();
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: W / 2, y: H / 2, button: 'left', clickCount: 1 }); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: W / 2, y: H / 2, button: 'left', clickCount: 1 });
    await sleep(1800); await shot();
    await ev("localStorage.removeItem('gw-tour')");
    const w1 = () => ev(`window.dispatchEvent(new WheelEvent('wheel',{deltaY:60,cancelable:true}))`);
    const type = async n => { for (let i = 0; i < n; i++) { await w1(); await sleep(45); } };
    await type(9); await sleep(2600); await overflow('gw step0'); await shot();            // ultimafetch executed
    for (let i = 0; i < 10; i++) { await w1(); await sleep(40); } await sleep(700); await type(14); await sleep(2600); await overflow('gw step1'); await shot();
    // jump to the last command
    await ev("document.getElementById('skip-btn').click()"); await sleep(1700); await overflow('gw launch'); await shot(); await sleep(1800); await shot();
    // carousel
    await send('Page.navigate', { url: BASE + '/portfolio/proyectos.html' }); await sleep(4200); await overflow('carousel'); await shot();
    for (const k of [0, 1, 2]) { await ev(`__carousel.open(${k})`); await sleep(2400); await overflow('sheet ' + k); await shot(); await ev('__carousel.close()'); await sleep(1500); }
    shots.forEach((d, i) => fs.writeFileSync(`${__dirname}/audit/${tag}_${String(i).padStart(2, '0')}.png`, Buffer.from(d, 'base64')));
    R.errors = errs.length; report[tag] = R; console.log(JSON.stringify(R)); ch.kill(); await sleep(500);
  }
  fs.writeFileSync(__dirname + '/audit/report.json', JSON.stringify(report, null, 1));
})();
