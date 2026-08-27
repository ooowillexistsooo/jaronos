window.addEventListener('mousemove', (e) => {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 15 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;

    petal.style.left = `${e.clientX}px`;
    petal.style.top = `${e.clientY}px`;

    const hue = Math.random() * 360;
    petal.style.backgroundColor = `hsl(${hue}, 100%, 65%)`;
    
    document.body.appendChild(petal);

    void petal.offsetWidth;

    const fallDistance = Math.random() * 200 + 100;
    const driftDistance = (Math.random() - 0.5) * 100;
    const spinAngle = (Math.random() - 0.5) * 720;
    
    petal.style.transform = `translate(${driftDistance}px, ${fallDistance}px) rotate(${spinAngle}deg)`;
    petal.style.opacity = '0';

    setTimeout(() => {
        petal.remove();
    }, 2000);
});