// ==UserScript==
// @name         FrontendPath → Claude
// @namespace    frontend-yol-xeritesi
// @version      2.3
// @description  Types the “Learn more” question from FrontendPath into your already open Claude tab and sends it.
// @match        https://claude.ai/*
// @match        http://localhost/*
// @match        http://127.0.0.1/*
// @match        https://frontend-path-psi.vercel.app/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// ==/UserScript==

(function () {
  'use strict';

  const TAB_KEY = 'claudeTab'; // { id, t } — sualları qəbul edən Claude tabı
  const MSG_KEY = 'claudeMsg'; // { to, text, chat, n } — göndərilən sual
  const STALE_MS = 3000;

  /** Element görünənə qədər gözləyir (maks. 20 san). */
  function waitFor(find, timeout = 20000) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      (function tick() {
        const el = find();
        if (el) return resolve(el);
        if (Date.now() - start > timeout) return reject(new Error('tapılmadı'));
        setTimeout(tick, 250);
      })();
    });
  }

  /* ---------------- yol xəritəsi saytı ---------------- */
  if (location.hostname !== 'claude.ai') {
    // Sayt sualı `claude-ask` hadisəsi ilə göndərir. Açıq Claude tabı varsa,
    // sual ora ötürülür və sayt yeni tab açmır.
    document.addEventListener('claude-ask', (e) => {
      const tab = GM_getValue(TAB_KEY, null);
      if (!tab || Date.now() - tab.t > STALE_MS) return; // Claude tabı yoxdur
      const { text, chat } = JSON.parse(e.detail);
      GM_setValue(MSG_KEY, { to: tab.id, text, chat, n: Math.random() });
      document.documentElement.setAttribute('data-claude-ask-sent', '');
    });
    return;
  }

  /* ---------------- claude.ai ---------------- */
  const me = Math.random().toString(36).slice(2);

  async function submit(text) {
    try {
      const editor = await waitFor(() => document.querySelector('div[contenteditable="true"]'));
      editor.focus();
      document.execCommand('selectAll', false);
      document.execCommand('insertText', false, text);

      // Göndər düyməsi aktivləşənə qədər gözlə, sonra bas.
      const send = await waitFor(() => {
        const b = document.querySelector('button[aria-label="Send message"], button[aria-label*="Send"]');
        return b && !b.disabled ? b : null;
      }, 5000).catch(() => null);

      if (send) send.click();
      else
        editor.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true })
        );
    } catch (e) {
      console.warn('[claude-ask]', e);
    }
  }

  /** Linkdəki #ask=<sual> — tab sayt tərəfindən yeni açılanda. */
  function fromHash() {
    const m = location.hash.match(/^#ask=(.+)$/);
    if (!m) return;
    // Hash-i təmizlə ki, səhifə yenilənəndə sual təkrar getməsin.
    history.replaceState(null, '', location.pathname + location.search);
    submit(decodeURIComponent(m[1]));
  }

  // Sualları qəbul edən tab kimi qeydiyyat: ilk açılan Claude tabı sahib olur,
  // o bağlananda növbəti tab yerini tutur.
  function heartbeat() {
    const tab = GM_getValue(TAB_KEY, null);
    if (!tab || tab.id === me || Date.now() - tab.t > STALE_MS) {
      GM_setValue(TAB_KEY, { id: me, t: Date.now() });
    }
  }
  heartbeat();
  setInterval(heartbeat, 1000);
  window.addEventListener('pagehide', () => {
    const tab = GM_getValue(TAB_KEY, null);
    if (tab && tab.id === me) GM_setValue(TAB_KEY, null);
  });

  GM_addValueChangeListener(MSG_KEY, (_key, _old, msg) => {
    if (!msg || msg.to !== me) return;
    const target = msg.chat ? new URL(msg.chat).pathname : location.pathname;
    if (target === location.pathname) submit(msg.text);
    else location.href = `${msg.chat}#ask=${encodeURIComponent(msg.text)}`;
  });

  fromHash();
  window.addEventListener('hashchange', fromHash);
})();
