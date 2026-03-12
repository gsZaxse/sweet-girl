// ========== FLOATING HEARTS ==========
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💖', '💕', '💗', '💓', '💝', '🌸', '🩷', '✨', '💐', '🦋'];

    function spawnHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 18000);
    }

    // Initial batch
    for (let i = 0; i < 15; i++) {
        setTimeout(spawnHeart, i * 400);
    }

    // Continuous spawning
    setInterval(spawnHeart, 1200);
}

// ========== SPARKLE CURSOR TRAIL ==========
function initSparkleTrail() {
    const container = document.getElementById('sparkleContainer');
    const sparkles = ['✨', '💖', '⭐', '💫', '🌟'];
    let lastTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 80) return;
        lastTime = now;

        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 60 + 'px');
        sparkle.style.setProperty('--ty', (Math.random() - 0.5) * 60 - 20 + 'px');
        container.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 800);
    });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const cards = document.querySelectorAll('.quote-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
}

// ========== WAITING TIMER ==========
function initWaitingTimer() {
    // ✅ Tanggal mulai sesuai yang tertulis di halaman: 10 Oktober 2023
    const startDate = new Date('2023-10-10T00:00:00');

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('timerDays').textContent = days;
        document.getElementById('timerHours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('timerMinutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('timerSeconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ========== PHOTO BOOK ==========
function initPhotoBook() {
    const pages = document.querySelectorAll('.book-page');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const indicator = document.getElementById('pageIndicator');
    let currentPage = 0;
    const totalPages = pages.length;

    function showPage(index) {
        pages.forEach(page => page.classList.remove('active'));
        pages[index].classList.add('active');

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalPages - 1;

        if (index === 0) {
            indicator.textContent = '📕 Cover';
        } else if (index === totalPages - 1) {
            indicator.textContent = '💕 Halaman Terakhir';
        } else {
            indicator.textContent = `📖 Halaman ${index} dari ${totalPages - 2}`;
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const book = document.getElementById('photoBook');

    book.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    book.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentPage < totalPages - 1) {
                currentPage++;
                showPage(currentPage);
            } else if (diff < 0 && currentPage > 0) {
                currentPage--;
                showPage(currentPage);
            }
        }
    }, { passive: true });
}

// ========== LOVE LETTER ENVELOPE ==========
function initLoveLetter() {
    const envelope = document.getElementById('envelope');
    const letterPaper = document.getElementById('letterPaper');

    envelope.addEventListener('click', () => {
        envelope.classList.add('opened');
        setTimeout(() => {
            letterPaper.classList.add('show');
        }, 400);
    });
}

// ========== KONAMI-LIKE SURPRISE ==========
function initSurprise() {
    let clickCount = 0;
    const footer = document.querySelector('.footer');

    footer.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 5) {
            clickCount = 0;
            launchHeartExplosion();
        }
    });
}

function launchHeartExplosion() {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '🌸', '👑', '✨', '🦋'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = (Math.random() * 30 + 15) + 'px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            const angle = (Math.PI * 2 * i) / 50;
            const velocity = Math.random() * 300 + 150;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            heart.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            document.body.appendChild(heart);

            requestAnimationFrame(() => {
                heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                heart.style.opacity = '0';
            });

            setTimeout(() => heart.remove(), 1500);
        }, i * 30);
    }
}

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ========== PARALLAX EFFECT ON HERO ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ========== INIT EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    initSparkleTrail();
    initScrollAnimations();
    initWaitingTimer();
    initPhotoBook();
    initLoveLetter();
    initSurprise();
    initMusicToggle();
});