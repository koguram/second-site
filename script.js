// こくらくん用「ぐにょぐにょ×ハンブレ風サイト」JS
// マウス追従・傾き追従は OFF にして、下のセクションのスムーススクロールだけ残す版

// 背景ブロブ & ページ3Dチルト用
const blobs = document.querySelectorAll(".blob");
const page = document.querySelector(".page");

// マウス・傾きイベントは一切登録しない
// → CSS の keyframes だけでブロブが動く（マウスには反応しない）

function animate() {
  // 位置＆チルトは常に0に固定
  blobs.forEach((blob) => {
    blob.style.translate = "0px 0px";
  });

  document.documentElement.style.setProperty("--tilt-x", "0deg");
  document.documentElement.style.setProperty("--tilt-y", "0deg");

  requestAnimationFrame(animate);
}

animate();

// ナビクリックでスムーススクロール（ここはそのまま残す）
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
