// ── 모바일 햄버거 메뉴 열기/닫기 ────────────────────────
// 열릴 때 스크롤 잠금, 닫힐 때 해제
function toggleMenu() {
  const menu   = document.getElementById('mobile-menu');
  const burger = document.getElementById('hamburger');
  const isOpen = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// ── 드로어 외부 클릭 시 자동으로 닫기 ───────────────────
document.addEventListener('click', e => {
  const menu   = document.getElementById('mobile-menu');
  const burger = document.getElementById('hamburger');
  const nav    = document.getElementById('main-nav');
  if (menu.classList.contains('open') && !nav.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── 스크롤 시 네비게이션 바 배경 불투명도 강화 ──────────
// 최상단에서는 약간 투명, 스크롤 내리면 완전 불투명
window.addEventListener('scroll', () => {
  document.getElementById('main-nav').style.background =
    window.scrollY > 8 ? 'rgba(2,3,3,1)' : 'rgba(2,3,3,.97)';
}, { passive: true });

// ── 커뮤니티 메뉴 클릭 시 준비 중 안내 ─────────────────
function alertCommunity(e) {
  e.preventDefault();
  alert('커뮤니티 페이지는 현재 준비 중입니다.');
}
