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
// Validación del formulario de suscripción
const formSuscripcion = document.getElementById('form-suscripcion');

if (formSuscripcion) {
    formSuscripcion.addEventListener('submit', (e) => {
       
        e.preventDefault();

        const email = document.getElementById('email').value;
        const acepto = document.getElementById('acepto').checked;

        if (email && acepto) {
            alert(`¡Gracias por suscribirte con ${email}! Pronto recibirás nuestras ofertas.`);
            formSuscripcion.reset(); 
        }
    });
}
//Pagina ingresar cuenta
const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        alert(`¡Bienvenido de nuevo! Iniciando sesión con: ${email}`);
        
        window.location.href = "index.html"; 
    });
}

