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