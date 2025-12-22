let currentSlide = 0;
function moveSlide(step) {
    const slides = document.querySelectorAll('.carrusel-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(() => moveSlide(1), 5000); 

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal-libro");
    const closeBtn = document.querySelector(".cerrar-modal");

 
    document.querySelectorAll('.card-libro').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-agregar')) {
                animarVuelo(card.querySelector('img'));
                return;
            }
            document.getElementById("modal-img").src = card.querySelector('img').src;
            document.getElementById("modal-titulo").innerText = card.dataset.titulo;
            document.getElementById("modal-autor").innerText = card.dataset.autor;
            document.getElementById("modal-anio").innerText = card.dataset.anio;
            document.getElementById("modal-precio").innerText = card.dataset.precio;
            document.getElementById("modal-resumen").innerText = card.dataset.resumen;
            modal.style.display = "block";
        });
    });

    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

  
    function animarVuelo(imgOriginal) {
        const carritoIcono = document.getElementById('cart-icon-nav');
        const volador = imgOriginal.cloneNode();
        volador.classList.add('flying-img');
        
        const rectImg = imgOriginal.getBoundingClientRect();
        const rectCarrito = carritoIcono.getBoundingClientRect();

        volador.style.left = `${rectImg.left}px`;
        volador.style.top = `${rectImg.top}px`;
        volador.style.width = `${rectImg.width}px`;
        document.body.appendChild(volador);

        setTimeout(() => {
            volador.style.left = `${rectCarrito.left}px`;
            volador.style.top = `${rectCarrito.top}px`;
            volador.style.width = '20px'; volador.style.opacity = '0';
        }, 50);

        setTimeout(() => { volador.remove(); }, 800);
    }
});