/* ================================================
   HERO SLIDER — Fixed
   Fixes:
   1. Image shows immediately on page load (no text-only flash)
   2. All images preloaded so transitions are instant
   3. Arrow directions corrected (arr1 = back, arr2 = forward)
================================================ */

const hero    = document.querySelector('.hero');
const clslist = document.querySelectorAll('.hero-content');
const arr1    = document.querySelector('.arr1');
const arr2    = document.querySelector('.arr2');

const images = [
    'src/main-banner-1-compressed.webp',
    'src/main-banner-2-compressed.webp'
];

let index    = 0;
let autoplay = null;

/* ================================================
   ✅ FIX 2 — Preload all images before displaying
   This prevents the "text shows first" delay
================================================ */

function preloadImages(imgs) {
    imgs.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

/* ================================================
   Go to a specific slide
================================================ */

function goToSlide(i) {
    index = (i + images.length) % images.length;

    /* ✅ FIX 1 — Always set the background so image[0]
       is applied immediately on load, not after 3s     */
    hero.style.backgroundImage = `url(${images[index]})`;

    clslist.forEach(item => item.classList.remove('active'));
    clslist[index].classList.add('active');
}

/* ================================================
   Start autoplay
================================================ */

function startAutoplay() {
    stopAutoplay();
    autoplay = setInterval(() => goToSlide(index + 1), 3000);
}

function stopAutoplay() {
    if (autoplay) clearInterval(autoplay);
}

/* ================================================
   ARROWS
================================================ */

if (arr1) {
    arr1.addEventListener('click', () => {
        goToSlide(index - 1);  // ← back
        startAutoplay();       // reset timer on manual click
    });
}

if (arr2) {
    arr2.addEventListener('click', () => {
        goToSlide(index + 1);  // → forward
        startAutoplay();
    });
}

/* ================================================
   INIT — preload then show first image immediately
================================================ */

preloadImages(images);   // preload all images first
goToSlide(0);            // ✅ set image[0] right away on load
startAutoplay();         // start 3s cycle