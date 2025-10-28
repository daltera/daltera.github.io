(() => {
  // Basic section switching
  const sections = {
    listening: document.getElementById('listening'),
    reading:   document.getElementById('reading'),
    writing:   document.getElementById('writing'),
    finalMsg:  document.getElementById('finalMsg')
  };
  let current = 'listening';

  function showSection(name){
    for (const [key, el] of Object.entries(sections)){
      if (key === name) el.classList.add('active');
      else el.classList.remove('active');
    }
    current = name;
  }

  /* ========== LISTENING ========== */
  const audio = document.getElementById('audio');
  const btnPlay = document.getElementById('btnPlay');
  const audioFill = document.getElementById('audioFill');
  const aState = document.getElementById('aState');
  let rafId = null;

  // ---- Skip buttons ----
const btnSkipListen = document.getElementById('btnSkipListen');
const btnReadSkip   = document.getElementById('btnReadSkip');
const btnWriteSkip  = document.getElementById('btnWriteSkip');

// Listening → Reading
btnSkipListen?.addEventListener('click', () => {
  try { audio.pause(); } catch {}
  cancelAnimationFrame(rafId);
  // visually complete progress
  audioFill.style.width = '100%';
  aState.textContent = 'Skipped';
  // clean + go to Reading
  resetReadingVisuals();
  showSection('reading');
});

// Reading → Writing
btnReadSkip?.addEventListener('click', () => {
  readRunning = false;
  if (readTickId) cancelAnimationFrame(readTickId);
  resetReadingVisuals();
  resetWritingVisuals();
  showSection('writing');
});

// Writing → Final
btnWriteSkip?.addEventListener('click', () => {
  writeRunning = false;
  if (writeTickId) cancelAnimationFrame(writeTickId);
  resetWritingVisuals();
  showSection('finalMsg');
});


  function fmtPct(p){ return Math.max(0, Math.min(100, p)); }

  function stepAudio(){
    if (!audio.duration || isNaN(audio.duration)) {
      audioFill.style.width = '0%';
    } else {
      const pct = (audio.currentTime / audio.duration) * 100;
      audioFill.style.width = fmtPct(pct) + '%';
    }
    if (!audio.paused && !audio.ended) {
      rafId = requestAnimationFrame(stepAudio);
    }
  }

  btnPlay.addEventListener('click', async () => {
    if (audio.paused || audio.ended) {
      try {
        await audio.play();
        btnPlay.textContent = '⏸ Pause';
        aState.textContent = 'Playing…';
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(stepAudio);
      } catch (e) {
        aState.textContent = 'Playback failed (user gesture needed)';
      }
    } else {
      audio.pause();
      btnPlay.textContent = '▶ Play';
      aState.textContent = 'Paused';
      cancelAnimationFrame(rafId);
    }
  });

  audio.addEventListener('ended', () => {
    btnPlay.textContent = '▶ Play';
    aState.textContent = 'Finished';
    audioFill.style.width = '100%';
    // Transition to Reading after a short, smooth moment
    setTimeout(() => {
      resetReadingVisuals();
      showSection('reading');
    }, 400);
  });

  // Ensure progress resets if user seeks or reloads
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      audioFill.style.width = fmtPct(pct) + '%';
    }
  });

  /* ========== SHARED CIRCLE TIMER LOGIC ========== */
  const FULL_SECONDS = 60 * 60; // 60 minutes
  const R = 54;
  const CIRC = 2 * Math.PI * R; // ≈ 339.292

  // Reading
  const readArc = document.getElementById('readArc');
  const readTimeEl = document.getElementById('readTime');
  const btnReadStart = document.getElementById('btnReadStart');
  let readStart = null, readRunning = false, readT = FULL_SECONDS, readTickId = null;

  // Writing
  const writeArc = document.getElementById('writeArc');
  const writeTimeEl = document.getElementById('writeTime');
  const btnWriteStart = document.getElementById('btnWriteStart');
  let writeStart = null, writeRunning = false, writeT = FULL_SECONDS, writeTickId = null;

  function setDash(el, fractionRemaining){
    // fractionRemaining: 1 → full, 0 → empty
    const offset = CIRC * (1 - fractionRemaining);
    el.style.strokeDasharray = String(CIRC);
    el.style.strokeDashoffset = String(offset);
  }

  function fmtMMSS(totalSeconds){
    const s = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  }

  // Reading helpers
  function resetReadingVisuals(){
    readT = FULL_SECONDS;
    readTimeEl.textContent = fmtMMSS(readT);
    setDash(readArc, 1);
    readRunning = false;
    readStart = null;
    if (readTickId) { cancelAnimationFrame(readTickId); readTickId = null; }
  }
  function tickReading(ts){
    if (!readRunning) return;
    if (!readStart) readStart = ts;
    const elapsed = (ts - readStart) / 1000;
    const remain = Math.max(0, FULL_SECONDS - elapsed);
    readT = remain;
    readTimeEl.textContent = fmtMMSS(remain);
    setDash(readArc, remain / FULL_SECONDS);
    if (remain <= 0){
      // Reset and go to WRITING
      resetReadingVisuals();
      setTimeout(() => {
        resetWritingVisuals();
        showSection('writing');
      }, 250);
      return;
    }
    readTickId = requestAnimationFrame(tickReading);
  }

  btnReadStart.addEventListener('click', () => {
    if (readRunning) return;
    resetReadingVisuals(); // ensure clean start
    readRunning = true;
    readTickId = requestAnimationFrame(tickReading);
  });

  // Writing helpers
  function resetWritingVisuals(){
    writeT = FULL_SECONDS;
    writeTimeEl.textContent = fmtMMSS(writeT);
    setDash(writeArc, 1);
    writeRunning = false;
    writeStart = null;
    if (writeTickId) { cancelAnimationFrame(writeTickId); writeTickId = null; }
  }
  function tickWriting(ts){
    if (!writeRunning) return;
    if (!writeStart) writeStart = ts;
    const elapsed = (ts - writeStart) / 1000;
    const remain = Math.max(0, FULL_SECONDS - elapsed);
    writeT = remain;
    writeTimeEl.textContent = fmtMMSS(remain);
    setDash(writeArc, remain / FULL_SECONDS);
    if (remain <= 0){
      // End of flow → show final message
      resetWritingVisuals();
      setTimeout(() => {
        showSection('finalMsg');
      }, 250);
      return;
    }
    writeTickId = requestAnimationFrame(tickWriting);
  }

  btnWriteStart.addEventListener('click', () => {
    if (writeRunning) return;
    resetWritingVisuals();
    writeRunning = true;
    writeTickId = requestAnimationFrame(tickWriting);
  });

  // Initialize arcs
  setDash(readArc, 1);
  setDash(writeArc, 1);
})();