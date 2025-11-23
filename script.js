// こくらくん用「ぐにょぐにょ×ハンブレ風サイト」JS

// 背景ブロブ & ページ3Dチルト用
const blobs = document.querySelectorAll(".blob");
const page = document.querySelector(".page");
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

// マウス位置 → -1〜1 に正規化
window.addEventListener("mousemove", (e) => {
  const xRate = (e.clientX / window.innerWidth - 0.5) * 2;
  const yRate = (e.clientY / window.innerHeight - 0.5) * 2;
  targetX = xRate;
  targetY = yRate;
});

// 対応しているスマホなら傾きでも動くようにしておく
window.addEventListener("deviceorientation", (e) => {
  if (e.beta == null || e.gamma == null) return;
  const xRate = e.gamma / 45; // 左右
  const yRate = (e.beta - 45) / 45; // 前後
  targetX = Math.max(-1, Math.min(1, xRate));
  targetY = Math.max(-1, Math.min(1, yRate));
});

// なめらかに追従
function animate() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  blobs.forEach((blob, i) => {
    const strength = 14 + i * 5;
    const x = currentX * strength;
    const y = currentY * strength;
    blob.style.translate = `${x}px ${y}px`;
  });

  const maxTilt = 5;
  const tiltX = (-currentY * maxTilt).toFixed(2) + "deg";
  const tiltY = (currentX * maxTilt).toFixed(2) + "deg";
  document.documentElement.style.setProperty("--tilt-x", tiltX);
  document.documentElement.style.setProperty("--tilt-y", tiltY);

  requestAnimationFrame(animate);
}

animate();

// ナビクリックでスムーススクロール
const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
