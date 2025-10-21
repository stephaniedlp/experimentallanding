// Elementos
const spheres = document.querySelectorAll('.blur-sphere');
const glassContainer = document.querySelector('.glass-container');

// Parallax con el mouse
document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    // Mover esferas con velocidades diferentes
    spheres.forEach((sphere, index) => {
        const speed = (index + 1) * 8;
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        sphere.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Efecto tilt suave en el contenedor glass
    const tiltX = mouseX * 3;
    const tiltY = mouseY * -3;
    glassContainer.style.transform = `perspective(1000px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
});

// Reset al salir del mouse
document.addEventListener('mouseleave', () => {
    spheres.forEach((sphere) => {
        sphere.style.transform = 'translate(0, 0)';
    });
    glassContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
});

// Animación de entrada
window.addEventListener('load', () => {
    glassContainer.style.opacity = '0';
    glassContainer.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        glassContainer.style.transition = 'opacity 1s ease, transform 1s ease';
        glassContainer.style.opacity = '1';
        glassContainer.style.transform = 'translateY(0)';
    }, 100);
});

// Soporte para dispositivos táctiles
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    
    const deltaX = (touchX - touchStartX) / window.innerWidth;
    const deltaY = (touchY - touchStartY) / window.innerHeight;
    
    spheres.forEach((sphere, index) => {
        const speed = (index + 1) * 20;
        const x = deltaX * speed;
        const y = deltaY * speed;
        
        sphere.style.transform = `translate(${x}px, ${y}px)`;
    });
});