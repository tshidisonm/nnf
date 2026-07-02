// ===== MOBILE MENU =====
const mobileBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('nav ul');

if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
        const icon = mobileBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('header') && nav.classList.contains('open')) {
            nav.classList.remove('open');
            const icon = mobileBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            const icon = mobileBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
}, { passive: true });

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (window.pageYOffset >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('load', updateActiveLink);

// ===== GALLERY =====
const imageFiles = [
    "1.jpeg", "11.jpeg", "111.jpeg",
    "2.jpeg", "22.jpeg", "222.jpeg",
    "3.jpeg", "33.jpeg", "333.jpeg", "3333.jpeg", "33333.jpeg",
    "5.jpeg", "55.jpeg", "555.jpeg", "5555.jpeg",
    "6.jpeg", "66.jpeg", "666.jpeg", "6666.jpeg", "66666.jpeg", "666666.jpeg"
];

const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function buildGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    imageFiles.forEach((file, index) => {
        const imgPath = `assets/${file}`;
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.style.animationDelay = `${index * 0.05}s`;
        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = `NNF project photo ${index + 1}`;
        img.loading = 'lazy';
        div.appendChild(img);
        div.addEventListener('click', () => openLightbox(imgPath));
        galleryGrid.appendChild(div);
    });
}

function openLightbox(src) {
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = Math.ceil(target / 30);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = current;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// ===== INTERSECTION OBSERVER FOR COUNTERS =====
const aboutSection = document.getElementById('about');
if (aboutSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(aboutSection);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    buildGallery();
});
