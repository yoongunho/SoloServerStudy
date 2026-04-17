// ── 사전등록 섹션으로 부드럽게 스크롤 ──────────────────
// 스크롤 완료 후 이메일 입력창에 자동 포커스
function scrollToPrereg() {
  document.getElementById('prereg-section').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => document.getElementById('pr-email').focus(), 600);
}

// ── 사전등록 폼 제출 ─────────────────────────────────────
// 이메일 형식 검증 → 서버 POST → 성공/실패 메시지 표시
function submitPrereg() {
  const input = document.getElementById('pr-email');
  const note  = document.getElementById('pr-note');
  const email = input.value.trim();

  // 이메일 형식이 아닐 경우 입력창 빨간 테두리로 경고
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    input.style.borderColor = '#8C2A2A';
    setTimeout(() => input.style.borderColor = '', 1500);
    return;
  }

  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        // 중복 등록 등 서버에서 반환한 오류 메시지 표시
        note.textContent = '⚠ ' + data.error;
        note.style.color = '#CC4444';
      } else {
        // 등록 성공 시 입력창 초기화 + 완료 메시지 표시
        input.value = '';
        note.textContent = '✓ 사전등록이 완료되었습니다. 감사합니다!';
        note.style.color = 'var(--glow)';
      }
    })
    .catch(() => {
      // 네트워크 오류 등 서버 연결 실패 시
      note.textContent = '⚠ 서버에 연결할 수 없습니다.';
      note.style.color = '#CC4444';
    });
}

// ── 이메일 입력창 엔터키로 제출 ─────────────────────────
document.getElementById('pr-email').addEventListener('keydown', e => {
  if (e.key === 'Enter') submitPrereg();
});
