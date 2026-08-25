// Reveal-on-scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Build gallery from assets/gallery-1.jpg ... gallery-39.jpg
// Drop your own photos in /assets with these exact filenames and they appear automatically.
const galleryGrid = document.getElementById('galleryGrid');
const GALLERY_COUNT = 39;
for (let i = 1; i <= GALLERY_COUNT; i++) {
  const src = `assets/gallery-${i}.jpg`;
  const item = document.createElement('div');
  item.className = 'gallery__item media-slot';

  const label = document.createElement('span');
  label.className = 'media-slot__label';
  label.innerHTML = `Drop <code>${src}</code>`;
  item.appendChild(label);

  const img = document.createElement('img');
  img.src = src;
  img.alt = `Intercloud installation photo ${i}`;
  img.loading = 'lazy';
  img.onerror = () => { img.style.display = 'none'; };
  item.appendChild(img);

  galleryGrid.appendChild(item);
}

// Build video grid from assets/video-1.mp4 ... video-9.mp4
// Drop your own clips in /assets with these exact filenames and they appear automatically.
const videoGrid = document.getElementById('videoGrid');
const VIDEO_COUNT = 9;
for (let i = 1; i <= VIDEO_COUNT; i++) {
  const src = `assets/video-${i}.mp4`;
  const item = document.createElement('div');
  item.className = 'videos__item media-slot';

  const label = document.createElement('span');
  label.className = 'media-slot__label';
  label.innerHTML = `Drop <code>${src}</code>`;
  item.appendChild(label);

  const vid = document.createElement('video');
  vid.src = src;
  vid.controls = true;
  vid.playsInline = true;
  vid.muted = true;
  vid.loop = true;
  vid.preload = 'metadata';
  vid.onerror = () => { vid.style.display = 'none'; };
  item.appendChild(vid);

  videoGrid.appendChild(item);
}

// Animate the "power flow" dot across the pillar connector line
const flowPath = document.getElementById('flowpath');
const flowDot = document.querySelector('.flow-dot');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (flowPath && flowDot && !prefersReducedMotion) {
  const pathLength = flowPath.getTotalLength();
  let start = null;
  const duration = 3200;

  function animateDot(ts) {
    if (!start) start = ts;
    const elapsed = (ts - start) % duration;
    const progress = elapsed / duration;
    const point = flowPath.getPointAtLength(progress * pathLength);
    flowDot.setAttribute('cx', point.x);
    flowDot.setAttribute('cy', point.y);
    requestAnimationFrame(animateDot);
  }
  requestAnimationFrame(animateDot);
}
