const images = [
    'image/bg1.png',
    'image/bg2.png',
    'image/bg3.png',
    'image/bg4.png'
]

let currentIndex = 0;

function changeBackground() {
    currentIndex = (currentIndex + 1) % images.length;
    document.body.style.backgroundImage = `url('${images[currentIndex]}')`;
}