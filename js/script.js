// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('nav');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
}

// ----- GALLERY -----
// IMPORTANT: List your image filenames from the "assets" folder here.
// Example: const imageFiles = ["back-to-school.jpg", "excellence-awards.jpg", "youth-day.jpg"];
// You MUST add the actual names of your image files.
const imageFiles = [
    "480200923_1029959752261520_7622419727906773896_n.jpg",
    "480242973_1030656468858515_1380702156633676753_n.jpg",
    "480682801_1032363988687763_6714998035434141386_n.jpg",
    "485645983_1055779299679565_8984640909114285986_n.jpg",
    "486101699_1055779289679566_1934954933719631880_n.jpg",
    "486121396_1055779349679560_4658415990682855563_n.jpg",
    "491956960_1080178190573009_6881933740156952311_n.jpg",
    "493028079_1092735422650619_8545537173877770309_n.jpg",
    "494204544_1084327556824739_5131614423772623976_n.jpg"
];

const galleryGrid = document.getElementById('galleryGrid');

function buildGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    imageFiles.forEach(file => {
        const imgPath = `assets/${file}`;
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = `NNF project: ${file.replace(/\.(jpg|jpeg|png|webp)$/i, '')}`;
        img.loading = 'lazy';
        div.appendChild(img);
        div.addEventListener('click', () => openLightbox(imgPath));
        galleryGrid.appendChild(div);
    });
}

// Lightbox functionality
function openLightbox(src) {
    let lb = document.querySelector('.lightbox');
    if (!lb) {
        lb = document.createElement('div');
        lb.className = 'lightbox';
        const img = document.createElement('img');
        lb.appendChild(img);
        document.body.appendChild(lb);
        lb.addEventListener('click', () => {
            lb.classList.remove('active');
        });
    }
    const lbImg = lb.querySelector('img');
    lbImg.src = src;
    lb.classList.add('active');
}

// Call gallery builder when page loads
document.addEventListener('DOMContentLoaded', () => {
    buildGallery();
});