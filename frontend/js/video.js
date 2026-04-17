// ── 배경 영상 업로드 패널 열기/닫기 ─────────────────────
function togglePanel() {
  document.getElementById('vup-box').classList.toggle('open');
}

// ── 히어로 배경에 영상 적용 ──────────────────────────────
// canplay 이벤트 발생 시 페이드인 + 기본 배경 그라디언트 숨김
function setVideo(src) {
  const v = document.getElementById('hero-video');
  const b = document.getElementById('hero-base');
  v.src = src;
  v.play().catch(() => {});
  v.addEventListener('canplay', () => {
    v.classList.add('loaded');
    b.classList.add('hidden');
  }, { once: true });
  document.getElementById('up-st').textContent = '✓ 영상 적용됨';
  document.getElementById('clear-btn').classList.add('vis');
}

// ── URL 입력으로 영상 적용 ───────────────────────────────
function applyUrl() {
  const u = document.getElementById('url-input').value.trim();
  if (u) setVideo(u);
}

// ── 배경 영상 제거 및 초기 상태 복원 ────────────────────
function clearVideo() {
  const v = document.getElementById('hero-video');
  v.pause();
  v.src = '';
  v.classList.remove('loaded');
  document.getElementById('hero-base').classList.remove('hidden');
  document.getElementById('up-st').textContent = '';
  document.getElementById('clear-btn').classList.remove('vis');
  document.getElementById('url-input').value = '';
}

// ── 파일 선택 시 영상 적용 ───────────────────────────────
document.getElementById('file-input').addEventListener('change', function () {
  if (this.files[0]) setVideo(URL.createObjectURL(this.files[0]));
});

// ── 드래그 앤 드롭으로 영상 파일 적용 ───────────────────
const dz = document.getElementById('drop-zone');
dz.addEventListener('dragover',  e => { e.preventDefault(); dz.classList.add('dg'); });
dz.addEventListener('dragleave', ()  => dz.classList.remove('dg'));
dz.addEventListener('drop', e => {
  e.preventDefault();
  dz.classList.remove('dg');
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('video/')) setVideo(URL.createObjectURL(f));
});

// ── URL 입력창 엔터키로 적용 ─────────────────────────────
document.getElementById('url-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') applyUrl();
});
