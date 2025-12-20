const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navOficial');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
     hamburger.classList.toggle('open');
});

document.querySelectorAll('#navOficial ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('open');
    });
});