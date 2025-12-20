const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navOficial');

const searchTrigger = document.getElementById('search-trigger');
const mobileSearch = document.getElementById('mobile-search-bar');
const closeSearch = document.getElementById('close-search');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');

    if (mobileSearch) mobileSearch.classList.remove('active');
});

document.querySelectorAll('#navOficial ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('open');
    });
});

if (searchTrigger) {
    searchTrigger.addEventListener('click', () => {
        mobileSearch.classList.add('active');
        
        navMenu.classList.remove('active');
        hamburger.classList.remove('open');
    });
}

if (closeSearch) {
    closeSearch.addEventListener('click', () => {
        mobileSearch.classList.remove('active');
    });
}