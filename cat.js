const hamburger = document.querySelector('.header__hamburger');
const menu = document.querySelector('.header__menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');    
    menu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', 
        hamburger.classList.contains('active')
    );
});
