import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Uses the installed browser and native CDP; no test dependencies are required.
const browserPath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const profile = await mkdtemp(join(tmpdir(), "white-aura-browser-"));
const browser = spawn(browserPath, ["--headless=new", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=9333", `--user-data-dir=${profile}`, "about:blank"], { windowsHide: true, stdio: "ignore" });
let socket;
try {
  let tabs;
  for (let attempt = 0; attempt < 50; attempt++) {
    try { tabs = await fetch("http://127.0.0.1:9333/json/list").then(response => response.json()); break; }
    catch { await new Promise(resolve => setTimeout(resolve, 200)); }
  }
  assert.ok(tabs?.length, "Chrome debugging endpoint must start");
  socket = new WebSocket(tabs.find(tab => tab.type === "page").webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let id = 0;
  const pending = new Map();
  const runtimeErrors = [];
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === "Runtime.exceptionThrown") runtimeErrors.push(message.params.exceptionDetails.text);
    if (message.id) {
      const request = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) request.reject(new Error(JSON.stringify(message.error)));
      else request.resolve(message.result);
    }
  };
  const cdp = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id;
    pending.set(requestId, { resolve, reject });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });
  const evaluate = async expression => {
    const response = await cdp("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    assert.ok(!response.exceptionDetails, JSON.stringify(response.exceptionDetails));
    return response.result.value;
  };
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await mkdir("artifacts", { recursive: true });
  for (const [name, width, height] of [["desktop", 1440, 1000], ["tablet", 768, 1024], ["mobile", 390, 844], ["small-mobile", 320, 740], ["large-mobile", 430, 932]]) {
    await cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 760 });
    await cdp("Page.navigate", { url: "http://127.0.0.1:5173" });
    await wait(1200);
    await evaluate("document.fonts.ready.then(() => true)");
    assert.equal(await evaluate("document.querySelectorAll('.invitation-home').length"), 1);
    assert.equal(await evaluate("document.querySelectorAll('.site-header').length"), 0);
    assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"), false, `${name}: cover overflow`);
    assert.equal(await evaluate("document.querySelector('#cover-title').textContent"), "White Aura");
    assert.equal(await evaluate("document.querySelectorAll('audio').length"), 0, "Cover must not play music");
    const coverScreenshot = await cdp("Page.captureScreenshot", { format: "png" });
    await writeFile(`artifacts/cover-${name}.png`, Buffer.from(coverScreenshot.data, "base64"));
    await evaluate("document.querySelector('.invitation-home-button').scrollIntoView({block:'center',behavior:'instant'})");
    const button = await evaluate("(() => { const r = document.querySelector('.invitation-home-button').getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()");
    await cdp("Input.dispatchMouseEvent", { type: "mousePressed", ...button, button: "left", clickCount: 1 });
    await cdp("Input.dispatchMouseEvent", { type: "mouseReleased", ...button, button: "left", clickCount: 1 });
    await wait(700);
    assert.equal(await evaluate("location.hash"), "#top");
    assert.equal(await evaluate("document.querySelectorAll('.invitation-home').length"), 0);
    assert.equal(await evaluate("document.activeElement.id"), "hero-title");
    assert.equal(await evaluate("getComputedStyle(document.querySelector('#hero-title')).outlineStyle"), "none", "Heading must not show a focus border");
    assert.equal(await evaluate("document.querySelector('audio').paused"), false);
    assert.equal(await evaluate("document.querySelector('audio').loop"), true);
    assert.equal(await evaluate("document.querySelectorAll('.music-toggle').length"), 0);
    await evaluate("window.innerAudio = document.querySelector('audio'); history.back(); true");
    await wait(300);
    assert.equal(await evaluate("document.querySelectorAll('.invitation-home').length"), 1);
    assert.equal(await evaluate("document.querySelectorAll('audio').length"), 0);
    assert.equal(await evaluate("window.innerAudio.paused"), true, "Music must stop when returning to the cover");
    await evaluate("history.forward()");
    await wait(700);
    assert.equal(await evaluate("document.querySelector('audio').paused"), false);
    console.log(`PASS ${name}: silent cover, music only inside, back/forward navigation, and no heading border`);
    await evaluate("(async () => { for (const image of document.querySelectorAll('main img')) { image.scrollIntoView({behavior:'instant'}); await image.decode(); } window.scrollTo({top:0,behavior:'instant'}); })()");
    const state = await evaluate(`(() => ({title:document.title,overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.querySelectorAll('main img:not(.project-credit-logo)')].map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0})),brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).map(a=>a.outerHTML),external:[...document.querySelectorAll('a[target="_blank"]')].every(a=>a.rel.includes('noopener')),share:document.querySelector('.button--share').href}))()`);
    assert.equal(state.overflow, false, `${name}: horizontal overflow`);
    assert.equal(state.images.length, 2);
    assert.ok(state.images.every(image => image.loaded));
    assert.notEqual(state.images[0].src, state.images[1].src);
    assert.ok(state.images[0].src.includes("housewarming-preview.jpeg"));
    assert.ok(state.images[1].src.includes("whiteaura-second.jpeg"));
    assert.ok(await evaluate("document.querySelector('.project-credit').textContent.includes('A project by') && document.querySelector('.project-credit-logo').alt === 'Hatchwhite' && document.querySelector('.project-credit-logo').naturalWidth > 0"));
    const familyNames = await evaluate("[...document.querySelectorAll('.family-name')].map(element => element.textContent)");
    assert.ok(familyNames.includes("Rajeeb") && familyNames.includes("Raneesha"));
    assert.deepEqual(state.brokenAnchors, []);
    assert.ok(state.external);
    assert.equal(await evaluate("getComputedStyle(document.querySelector('.site-header')).position"), "sticky");
    const sharedText = new URL(state.share).searchParams.get("text");
    for (const text of ["White Aura", "Riyas & Ameera", "17 December 2026", "5:00 PM", "9:00 PM", "IST", "Vattamkulam", "http://127.0.0.1:5173/"]) assert.ok(sharedText.includes(text), `Missing share detail: ${text}`);
    if (width < 760) {
      const mobileLayout = await evaluate(`(() => ({
        menuHeight:document.querySelector('.menu-toggle').getBoundingClientRect().height,
        bodySize:parseFloat(getComputedStyle(document.querySelector('.invitation-message')).fontSize),
        heroDetails:getComputedStyle(document.querySelector('.mobile-hero-details')).display
      }))()`);
      assert.ok(mobileLayout.menuHeight >= 44, "Mobile controls need comfortable tap targets");
      assert.ok(mobileLayout.bodySize >= 14, "Mobile invitation text must stay readable");
      assert.notEqual(mobileLayout.heroDetails, "none");
      assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");
      await evaluate("document.querySelector('.menu-toggle').click()");
      assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "true");
      await evaluate("document.querySelector('.nav-links a[href=\"#family\"]').click()");
      assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");
    }
    assert.equal(await evaluate("document.querySelectorAll('.nav-rsvp, .rsvp-dialog').length"), 0);
    assert.equal(await evaluate("[...document.querySelectorAll('.eyebrow, .nav-links a, .family-name')].some(e => /^\\d+\\s*\\//.test(e.textContent.trim()))"), false);
    assert.equal(await evaluate("document.querySelectorAll('.family-name .micro-label').length"), 0);
    await evaluate("window.scrollTo({top:500,behavior:'instant'})");
    await wait(100);
    assert.equal(await evaluate("document.querySelector('.site-header').classList.contains('is-scrolled')"), true);
    const revealCount = await evaluate("document.querySelectorAll('.reveal').length");
    for (let index = 0; index < revealCount; index++) {
      await evaluate(`document.querySelectorAll('.reveal')[${index}].scrollIntoView({behavior:'instant',block:'center'})`);
      await wait(100);
    }
    await evaluate("window.scrollTo({top:0,behavior:'instant'})");
    await wait(800);
    const layout = await cdp("Page.getLayoutMetrics");
    const screenshot = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: layout.cssContentSize.height, scale: 1 } });
    await writeFile(`artifacts/${name}.png`, Buffer.from(screenshot.data, "base64"));
    console.log(`PASS ${name}: layout, house image, anchors, external links, sharing, no RSVP or numbering, screenshot (${width} × ${layout.cssContentSize.height})`);
  }
  const readCountdown = () => evaluate("[...document.querySelectorAll('.countdown-unit strong')].map(e=>e.textContent).join(':')");
  const before = await readCountdown();
  await wait(1200);
  assert.notEqual(await readCountdown(), before, "Countdown must update each second");
  await cdp("Emulation.setTimezoneOverride", { timezoneId: "America/New_York" });
  await cdp("Page.reload");
  await wait(700);
  const newYork = await readCountdown();
  await cdp("Emulation.setTimezoneOverride", { timezoneId: "Asia/Kolkata" });
  await cdp("Page.reload");
  await wait(700);
  assert.equal((await readCountdown()).split(':').slice(0,2).join(':'), newYork.split(':').slice(0,2).join(':'));
  await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await cdp("Page.addScriptToEvaluateOnNewDocument", { source: "Date.now = () => new Date('2026-12-18T00:00:00Z').getTime();" });
  await cdp("Page.reload");
  await wait(700);
  assert.ok((await evaluate("document.querySelector('.countdown-complete').textContent")).includes("new chapter has begun"));
  assert.equal(await evaluate("getComputedStyle(document.documentElement).scrollBehavior"), "auto");
  assert.equal(await evaluate("document.querySelectorAll('.reveal-ready').length"), 0);
  assert.deepEqual(runtimeErrors, []);
  console.log("PASS countdown ticking, timezone independence, completed event, reduced motion, and no runtime exceptions");
} finally {
  socket?.close();
  browser.kill();
}
