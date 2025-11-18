// こくらくん用「激しめぐにょぐにょモーション」のJSパート

// 背景ブロブをマウスに合わせて少しだけ追従させる
const blobs = document.querySelectorAll(".blob");
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

// マウス位置から -1〜1 の範囲に正規化
window.addEventListener("mousemove", (e) => {
  const xRate = (e.clientX / window.innerWidth - 0.5) * 2;
  const yRate = (e.clientY / window.innerHeight - 0.5) * 2;
  targetX = xRate;
  targetY = yRate;
});

// PCでもスマホでも動かしたいので、傾きにも反応させられるようにしておく（対応端末のみ）
window.addEventListener("deviceorientation", (e) => {
  if (e.beta == null || e.gamma == null) return;
  const xRate = (e.gamma / 45); // 左右の傾き
  const yRate = (e.beta - 45) / 45; // 前後の傾き（ざっくり）
  targetX = Math.max(-1, Math.min(1, xRate));
  targetY = Math.max(-1, Math.min(1, yRate));
});

// なめらかに追従させるループ
function animate() {
  // target に向かってだんだん近づく（イージング）
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  blobs.forEach((blob, i) => {
    const strength = 14 + i * 5; // ブロブごとに揺れ幅を変える
    const x = currentX * strength;
    const y = currentY * strength;
    // CSSの transform アニメーションに合成される individual transform プロパティ
    blob.style.translate = `${x}px ${y}px`;
  });

  // コンテンツ全体をちょっと3D回転させて“酔いそう一歩手前”くらいのノリに
  const maxTilt = 6; // 度
  const tiltX = (-currentY * maxTilt).toFixed(2) + "deg";
  const tiltY = (currentX * maxTilt).toFixed(2) + "deg";
  document.documentElement.style.setProperty("--tilt-x", tiltX);
  document.documentElement.style.setProperty("--tilt-y", tiltY);

  requestAnimationFrame(animate);
}

animate();
