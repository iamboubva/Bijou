document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('open-btn');
    const audio = document.getElementById('bg-music');
    const typewriterElement = document.getElementById('typewriter-text');
    const gallery = document.getElementById('gallery');
    const cursorGlow = document.querySelector('.cursor-glow');

    const text = "Joyeux anniversaire, Bijou.\n\nTout le bonheur du monde.\n\nQue ta vie soit douce, lumineuse et remplie de paix.";

    // 1. Mouse Move Effects (Parallax & Glow)
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        if(envelope.parentElement) {
            envelope.parentElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // 2. Typewriter Effect Function
    function typeWriter(text, i = 0) {
        if (i < text.length) {
            typewriterElement.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 50);
        } else {
            // Scroll to gallery after text finishes
            setTimeout(() => {
                gallery.classList.add('visible');
                gallery.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        }
    }

    // 3. Open Envelope Interaction
    openBtn.addEventListener('click', () => {
        envelope.classList.add('open');
        openBtn.style.opacity = '0';
        openBtn.style.pointerEvents = 'none';
        
        // Play Audio
        audio.play().catch(e => console.log("Audio play blocked by browser"));

        // Start Typewriter
        setTimeout(() => {
            typeWriter(text);
        }, 1000);

        // Create Petals
        createPetals();
    });

    // 4. Petals Animation
    function createPetals() {
        for (let i = 0; i < 30; i++) {
            const petal = document.createElement('div');
            petal.innerHTML = '🌸';
            petal.style.position = 'fixed';
            petal.style.top = '-20px';
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.fontSize = (Math.random() * 10 + 10) + 'px';
            petal.style.opacity = Math.random();
            petal.style.zIndex = '10';
            petal.style.pointerEvents = 'none';
            document.body.appendChild(petal);

            const duration = Math.random() * 3 + 4;
            petal.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(100vh) rotate(360deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'linear'
            });

            setTimeout(() => petal.remove(), duration * 1000);
        }
    }

    // 5. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const cards = document.querySelectorAll('.photo-card');
    let currentIndex = 0;

    const updateLightbox = (index) => {
        const card = cards[index];
        const img = card.querySelector('img');
        const caption = card.querySelector('.photo-caption');
        lightboxImg.src = img.src;
        lightboxCaption.innerText = caption.innerText;
        currentIndex = index;
    };

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            updateLightbox(index);
        });
    });

    closeLightbox.addEventListener('click', () => lightbox.style.display = 'none');
    
    document.querySelector('.prev').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
        updateLightbox(currentIndex);
    });

    document.querySelector('.next').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        updateLightbox(currentIndex);
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.style.display = 'none';
    });
});