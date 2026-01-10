document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.header__hamburger');
    const menu = document.querySelector('.header__menu');
    const header = document.querySelector('.header');
    
    if (!hamburger || !menu || !header) return;
    
    function isMobileView() {
        const headerWidth = header.offsetWidth || header.clientWidth;
        const windowWidth = window.innerWidth;
        return headerWidth <= 320 || windowWidth <= 768;
    }
    
    function toggleMenu() {
        if (!isMobileView()) return;
        
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', 
            hamburger.classList.contains('active')
        );
    }
    
    hamburger.addEventListener('click', toggleMenu);
    
    window.addEventListener('resize', function() {
        console.log('Ширина .header:', header.offsetWidth);
        console.log('Ширина окна:', window.innerWidth);
        console.log('Мобильная?', isMobileView());
        
        if (!isMobileView()) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.slider__container');
    const divider = document.getElementById('slider-divider');
    const handle = document.querySelector('.slider__handle');
    const leftImage = document.querySelector('.slider__image-left'); // Полный кот
    const rightImage = document.querySelector('.slider__image-right'); // Худой кот
    
    let isDragging = false;
    let startX = 0;
    let startPosition = 50; 

    function updateSlider(position) {
        position = Math.max(0, Math.min(100, position));
        
        leftImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
        
        rightImage.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
        
        divider.style.left = `${position}%`;
    }

    handle.addEventListener('mousedown', function(e) {
        isDragging = true;
        handle.style.cursor = 'grabbing';
        
        const rect = container.getBoundingClientRect();
        startX = e.clientX;
        startPosition = parseFloat(divider.style.left) || 50;
        
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const rect = container.getBoundingClientRect();
        const deltaX = e.clientX - startX;
        const deltaPercent = (deltaX / rect.width) * 100;
        let newPosition = startPosition + deltaPercent;
        
        updateSlider(newPosition);
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            handle.style.cursor = 'grab';
        }
    });

    handle.addEventListener('touchstart', function(e) {
        isDragging = true;
        handle.style.cursor = 'grabbing';
        
        const rect = container.getBoundingClientRect();
        startX = e.touches[0].clientX;
        startPosition = parseFloat(divider.style.left) || 50;
        
        e.preventDefault();
    });

    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const rect = container.getBoundingClientRect();
        const deltaX = e.touches[0].clientX - startX;
        const deltaPercent = (deltaX / rect.width) * 100;
        let newPosition = startPosition + deltaPercent;
        
        updateSlider(newPosition);
        
        e.preventDefault();
    });

    document.addEventListener('touchend', function() {
        isDragging = false;
        handle.style.cursor = 'grab';
    });

    container.addEventListener('click', function(e) {
        if (e.target === handle || e.target.closest('.slider__handle')) {
            return;
        }
        
        const rect = container.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const position = (clickX / rect.width) * 100;
        
        leftImage.style.transition = 'clip-path 0.3s ease';
        rightImage.style.transition = 'clip-path 0.3s ease';
        divider.style.transition = 'left 0.3s ease';
        
        updateSlider(position);
        
        setTimeout(() => {
            leftImage.style.transition = '';
            rightImage.style.transition = '';
            divider.style.transition = '';
        }, 300);
    });
    updateSlider(50);
});