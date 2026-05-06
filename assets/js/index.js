/* =========================
   assets/js/index.js
   ========================= */

// Configuración
const CONFIG = {
    toName: "رهف",
    toNamePhoto: "رهف",
    signature: "Diego",
    letterText:
        `رهف،

أنا اللي بحبك. أنا. مش أي حد تاني. أنا اللي بفكر فيكي كل دقيقة، أنا اللي بستناكِ حتى لو طال الغياب، أنا اللي قلبه دايماً عندك.

بحبك يا رهف. بحبك بجد، بكل اللي فيا، بكل اللي أنا فيه. حبك جوايا أكبر من أي كلام، أكبر من أي مسافة، أكبر من أي حاجة تاني في الدنيا دي.

ووحشتيني. آه والله وحشتيني. كل يوم بيمر من غير ما أشوفك فيه، بحس إنه ناقص، بحس إني مش كامل. عايزك معايا، عايز أسمع صوتك، عايز أمسك إيديكِ، عايز أضحك معاكِ.

أنا هنا علشانك. دايمًا. في الحلو وفي الصعب، في القريب وفي البعيد. أنا اللي هيفضل جنبك مهما حصل.

بحبك يا رهف. أنا. Diego`,
    poemText:
        `يا رهف.. اسمك على قلبي نقشٌ من نور
        يا رهف.. وجهك في عينيَّ أجمل من القمر
        يا رهف.. صوتك لحنٌ أسكنه أضلعي
        أنتِ الحياة، وأنتِ العمر، وأنتِ القدر

        أحبكِ.. أحبكِ.. أحبكِ
        ثلاثٌ لو نطقت بها الليالي ما اكتفت
        أحبكِ حبًا لو وزّع على الكون
        لصار الكون كله حبًا ودفئًا وسكينة

        عيناكِ وطنٌ ألوذ به إذا ضاقت بي الدنيا
        وضحكتكِ شمسٌ تشرق في ليلي المظلم
        ويداكِ ملاذي حين أتعب
        وقربكِ جنّةٌ أمشي إليها كل يوم

        أنا يا رهف.. لا شيء دونكِ
        أنا يا رهف.. بكِ أكون
        فاقبلي قلبي هديةً من محبٍّ
        ما عرف الحب إلا حين عرفكِ`,
    maxPetalsMobile: 50,
    petalIntervalMobile: 400,
    youtubeId: "sElE_BfQ67s"
};

function init() {
    // =========================
    // INTRO ANIMATION
    // =========================
    const intro = document.getElementById('intro-container');
    if (intro) {
        const mobile = window.innerWidth <= 768;
        const introDelay = mobile ? 2000 : 6000;
        setTimeout(() => {
            intro.classList.add('fade-out');
            setTimeout(() => {
                intro.style.display = 'none';
            }, mobile ? 800 : 1500);
        }, introDelay);
    }

    const toNameEl = document.getElementById("toName");
    const toNamePhotoEl = document.getElementById("toNamePhoto");
    const signatureEl = document.getElementById("signature");
    const profilePhoto = document.getElementById("profilePhoto");
    const photoPlaceholder = document.getElementById("photoPlaceholder");

    const poemEl = document.getElementById("poemText");

    if (toNameEl) toNameEl.textContent = CONFIG.toName;
    if (toNamePhotoEl) toNamePhotoEl.textContent = CONFIG.toNamePhoto;
    if (signatureEl) signatureEl.textContent = "— " + CONFIG.signature;
    if (poemEl) poemEl.textContent = CONFIG.poemText;

    function showUserPhoto() {
        if (photoPlaceholder) photoPlaceholder.style.display = 'none';
        if (profilePhoto) profilePhoto.style.display = 'block';
    }

    function showFallback() {
        if (photoPlaceholder) photoPlaceholder.style.display = 'flex';
        if (profilePhoto) profilePhoto.style.display = 'none';
    }

    if (profilePhoto) {
        if (profilePhoto.complete) {
            if (profilePhoto.naturalHeight !== 0) {
                showUserPhoto();
            } else {
                showFallback();
            }
        } else {
            profilePhoto.onload = showUserPhoto;
            profilePhoto.onerror = showFallback;
        }
    }

    const letterEl = document.getElementById("letter");
    const typingTarget = document.getElementById("typingTarget");
    const openBtn = document.getElementById("openLetter");
    const closeBtn = document.getElementById("closeLetter");
    const skipBtn = document.getElementById("skipTyping");
    const scrollArea = document.querySelector('.letter-scroll-area');

    let typedOnce = false;
    let typingInterval = null;
    let isTyping = false;
    let isUserScrolling = false;

    if (scrollArea) {
        scrollArea.addEventListener('touchstart', () => { isUserScrolling = true; }, { passive: true });
        scrollArea.addEventListener('wheel', () => { isUserScrolling = true; }, { passive: true });
    }

    function typeText(text, speed = 75) {
        if (!typingTarget) return;

        isTyping = true;
        isUserScrolling = false;
        skipBtn.style.display = 'inline-flex';
        typingTarget.textContent = "";
        let i = 0;

        if (typingInterval) clearInterval(typingInterval);

        typingInterval = setInterval(() => {
            if (i < text.length) {
                typingTarget.textContent += text[i] || "";
                i++;

                if (!isUserScrolling && scrollArea) {
                    scrollArea.scrollTo({
                        top: scrollArea.scrollHeight,
                        behavior: 'smooth'
                    });
                }

            } else {
                clearInterval(typingInterval);
                skipBtn.style.display = 'none';
                isTyping = false;
            }
        }, speed);
    }

    function skipTyping() {
        if (typingInterval) {
            clearInterval(typingInterval);
            if (typingTarget && CONFIG.letterText) {
                typingTarget.textContent = CONFIG.letterText;
            }
            skipBtn.style.display = 'none';
            isTyping = false;
        }
    }

    function isInAppBrowser() {
        const ua = (navigator.userAgent || "").toLowerCase();
        return /instagram|fbav|fban|messenger|line|twitter|snapchat/.test(ua);
    }

    function getLinks(videoId) {
        const origin = (location.origin && location.origin !== "null")
            ? `&origin=${encodeURIComponent(location.origin)}`
            : "";

        const embedUrl =
            `https://www.youtube.com/embed/${encodeURIComponent(videoId)}` +
            `?autoplay=1&controls=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1&iv_load_policy=3` +
            origin;

        const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
        return { embedUrl, watchUrl };
    }

    function mountYouTubePlayer() {
        const playSection = document.querySelector('.play-section.compact');
        if (!playSection) return;

        const { embedUrl, watchUrl } = getLinks(CONFIG.youtubeId);

        // Siempre intentar iframe primero (incluso en TikTok/Instagram)
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.title = "أغنيتنا";
        iframe.allow = "autoplay; encrypted-media; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.style.width = "100%";
        iframe.style.height = "180px";
        iframe.style.border = "none";
        iframe.style.borderRadius = "8px";
        iframe.setAttribute('referrerpolicy', 'origin-when-cross-origin');
        iframe.setAttribute('loading', 'lazy');

        playSection.innerHTML = '';

        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.width = '100%';
        container.style.overflow = 'hidden';
        container.style.borderRadius = '8px';

        container.appendChild(iframe);

        // Fallback siempre visible para apps embebidas (TikTok, Instagram, etc.)
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'yt-fallback-container';
        fallbackDiv.innerHTML = `
            <a href="${watchUrl}" target="_blank" rel="noopener" class="yt-fallback-link">
                <span class="yt-icon">📺</span> افتح الأغنية في يوتيوب
            </a>
        `;
        container.appendChild(fallbackDiv);

        playSection.appendChild(container);
        playSection.style.padding = "0";
        playSection.style.background = "#000";
        playSection.style.display = "block";
        playSection.style.height = "auto";
    }

    function resetMusicPlayer() {
        const playSection = document.querySelector('.play-section.compact');
        if (!playSection) return;

        playSection.innerHTML = `
            <div class="play-title">♪ استمعي إلى أغنيتنا ♪</div>
            <button class="play-button small" id="playButton" aria-label="تشغيل الأغنية">
                <span>▶</span>
            </button>
            <div class="play-hint">"Someone You Loved"</div>
        `;
        playSection.style.padding = "";
        playSection.style.background = "";
        playSection.style.height = "";

        const btn = document.getElementById('playButton');
        if (btn) {
            btn.addEventListener('click', () => {
                mountYouTubePlayer();
                burstPetals(10);
            });
        }
    }

    function toggleLetter() {
        if (letterEl.classList.contains("open")) {
            letterEl.classList.remove("open");
            openBtn.innerHTML = 'افتح رسالتي';
            openBtn.setAttribute('aria-expanded', 'false');

            resetMusicPlayer();

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            letterEl.classList.add("open");
            openBtn.innerHTML = 'إغلاق الرسالة';
            openBtn.setAttribute('aria-expanded', 'true');

            if (!typedOnce) {
                typedOnce = true;
                typeText(CONFIG.letterText, 75);
            }

            burstPetals(8);

            setTimeout(() => {
                mountYouTubePlayer();
            }, 600);

            setTimeout(() => {
                const cardRect = document.querySelector('.card').getBoundingClientRect();
                const letterRect = letterEl.getBoundingClientRect();
                const scrollTop = window.pageYOffset + letterRect.top - cardRect.top - 20;

                window.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }

    if (openBtn) {
        openBtn.addEventListener("click", toggleLetter);
        openBtn.setAttribute('aria-expanded', 'false');
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (letterEl.classList.contains("open")) {
                letterEl.classList.remove("open");
                openBtn.innerHTML = 'افتح رسالتي';
                openBtn.setAttribute('aria-expanded', 'false');

                resetMusicPlayer();

                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (skipBtn) {
        skipBtn.addEventListener("click", skipTyping);
    }

    const playButton = document.getElementById('playButton');
    if (playButton) {
        playButton.addEventListener('click', () => {
            mountYouTubePlayer();
            burstPetals(10);
        });
    }

    const petalsLayer = document.getElementById("petals");
    const isMobile = window.innerWidth <= 768;
    const maxPetals = isMobile ? CONFIG.maxPetalsMobile : 40;

    function spawnPetal(x) {
        if (!petalsLayer) return;

        if (petalsLayer.children.length >= maxPetals) {
            petalsLayer.removeChild(petalsLayer.firstChild);
        }

        const p = document.createElement("div");
        const isHeart = Math.random() < 0.35;

        if (isHeart) {
            p.className = "heart-particle";
            p.innerHTML = Math.random() < 0.7 ? "❤" : "✨";
            if (Math.random() < 0.3) p.classList.add("shiny");
            p.style.fontSize = (Math.random() * 10 + 10) + "px";
        } else {
            p.className = "petal";
            const sizeVariation = 0.8 + Math.random() * 0.6;
            p.style.transform = `scale(${sizeVariation}) rotate(25deg)`;
        }
        const startX = (x ?? Math.random() * window.innerWidth);

        const dx = (Math.random() * 160 - 80) + "px";
        const rot = (Math.random() * 360 - 180) + "deg";
        const duration = (Math.random() * 5 + 5).toFixed(2) + "s";
        const delay = (Math.random() * 2).toFixed(2) + "s";

        const sizeVariation = 0.8 + Math.random() * 0.6;
        p.style.transform = `scale(${sizeVariation}) rotate(25deg)`;
        p.style.zIndex = "1";

        p.style.left = startX + "px";
        p.style.top = (-30 - Math.random() * 70) + "px";
        p.style.setProperty("--dx", dx);
        p.style.setProperty("--rot", rot);
        p.style.animationDuration = duration;
        p.style.animationDelay = delay;

        petalsLayer.appendChild(p);

        const animationDuration = parseFloat(duration) + parseFloat(delay);
        setTimeout(() => {
            if (p.parentNode === petalsLayer) {
                petalsLayer.removeChild(p);
            }
        }, animationDuration * 1000 + 100);
    }

    function gentleRain() {
        spawnPetal();
        if (Math.random() < 0.4) spawnPetal();
    }

    function burstPetals(n = 12) {
        const count = isMobile ? Math.min(n, 15) : n;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                spawnPetal(window.innerWidth * (0.3 + Math.random() * 0.4));
            }, i * (isMobile ? 80 : 50));
        }
    }

    const petalInterval = setInterval(gentleRain, isMobile ? CONFIG.petalIntervalMobile : 650);

    setTimeout(() => {
        const initialPetals = isMobile ? 6 : 12;
        for (let i = 0; i < initialPetals; i++) {
            setTimeout(() => { spawnPetal(); }, i * 500);
        }
    }, 300);

    window.addEventListener('pagehide', () => {
        clearInterval(petalInterval);
        if (typingInterval) clearInterval(typingInterval);
    });

    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) event.preventDefault();
    }, { passive: false });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}