let currentIndex = 0;
let paletteIndex = 0;
const slides = document.getElementById("slides");
const totalSlides = slides.children.length;
const dotsContainer = document.getElementById("dots");

// ---------- SLIDE UPDATE ----------
function updateSlide() {
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;

    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

// ---------- MOVE SLIDE ----------
function moveSlide(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    updateSlide();
}

// ---------- MANUAL MOVE ----------
function manualMove(direction) {
    clearInterval(autoSlide);
    moveSlide(direction);
    autoSlide = setInterval(() => moveSlide(1), 4000);
}

// ---------- AUTO SLIDE ----------
let autoSlide = setInterval(() => moveSlide(1), 4000);

// ---------- DOTS ----------
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            clearInterval(autoSlide);
            currentIndex = i;
            updateSlide();
            autoSlide = setInterval(() => moveSlide(1), 4000);
        });
        dotsContainer.appendChild(dot);
    }
}

// ---------- COLOR PALETTES ----------
const palettes = {
    party: ["#ff6b6b", "#ffd93d", "#6bcbff", "#6bff91", "#c77dff", "#ff8fab"],
    neon: ["#ff005d", "#00f5d4", "#fee440", "#8338ec", "#fb5607", "#3a86ff"],
    pastel: ["#fbb1bd", "#ffd6a5", "#cdb4db", "#bde0fe", "#caffbf", "#fff1c1"],
    vibrant: ["#ff4d6d", "#ffb400", "#00b8a9", "#f0f3bd", "#9bc53d", "#5bc0eb"],
    gold: ["#d4af37", "#ffd700", "#ffecb3", "#fff8e1", "#f5f5dc", "#faf0be"],
};

const paletteNames = Object.keys(palettes);

const isMobile = window.innerWidth < 768;
const CONFETTI_COUNT = isMobile ? 30 : 80;

// ---------- CONFETTI ----------
const wrapper = document.getElementById("confetti-wrapper");
function createConfetti() {
    // Pick palette in sequence
    const selectedPalette = palettes[paletteNames[paletteIndex]];
    paletteIndex = (paletteIndex + 1) % paletteNames.length;

    for (let i = 0; i < CONFETTI_COUNT; i++) { 
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor =
            selectedPalette[Math.floor(Math.random() * selectedPalette.length)];
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        confetti.style.opacity = Math.random() * 0.2 + 0.8;;
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        const size = Math.random() * 6 + 6;
        confetti.style.width = confetti.style.height = size + "px";

        wrapper.appendChild(confetti);
        confetti.addEventListener("animationend", () => confetti.remove());
    }
}

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;
let fadeInterval = null;

musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
        // ▶ PLAY with FADE-IN
        music.volume = 0;
        music.muted = false;
        music.play();

        let v = 0;
        fadeInterval = setInterval(() => {
            v += 0.05;
            music.volume = Math.min(v, 0.5);
            if (v >= 0.5) clearInterval(fadeInterval);
        }, 100);

        musicBtn.textContent = "⏸ Pause Music";
        isPlaying = true;

    } else {
        // ⏸ PAUSE (stop fade if running)
        if (fadeInterval) clearInterval(fadeInterval);
        music.pause();
        musicBtn.textContent = "▶ Play Music";
        isPlaying = false;
    }
});


// Create confetti periodically
setInterval(createConfetti, 2500);
updateSlide();
createDots();