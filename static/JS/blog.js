
let currentSlide = 0;
window.moveSlide = function(step) {
    const slides = document.querySelectorAll('.carrusel-slide');
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(() => moveSlide(1), 5000); 

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal-libro");
    const closeBtn = document.querySelector(".cerrar-modal");

    function guardarEnCarrito(libro) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const index = carrito.findIndex(item => item.titulo === libro.titulo);
        if (index !== -1) {
            carrito[index].cantidad++;
        } else {
            carrito.push({ ...libro, cantidad: 1 });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    function animarVuelo(imgOriginal) {
        const carritoIcono = document.getElementById('cart-icon-nav');
        if (!carritoIcono) return;

        const volador = imgOriginal.cloneNode();
        volador.classList.add('flying-img');
        
        const rectImg = imgOriginal.getBoundingClientRect();
        const rectCarrito = carritoIcono.getBoundingClientRect();

        volador.style.position = 'fixed';
        volador.style.zIndex = '10000';
        volador.style.left = `${rectImg.left}px`;
        volador.style.top = `${rectImg.top}px`;
        volador.style.width = `${rectImg.width}px`;
        volador.style.transition = 'all 0.8s cubic-bezier(0.42, 0, 0.58, 1)';
        
        document.body.appendChild(volador);

        setTimeout(() => {
            volador.style.left = `${rectCarrito.left}px`;
            volador.style.top = `${rectCarrito.top}px`;
            volador.style.width = '20px'; 
            volador.style.opacity = '0';
        }, 50);

        setTimeout(() => { volador.remove(); }, 800);
    }

    document.querySelectorAll('.card-libro').forEach(card => {
        card.addEventListener('click', (e) => {
            
            if (e.target.classList.contains('btn-agregar')) {
                const img = card.querySelector('img');
                const libroData = {
                    titulo: card.dataset.titulo,
                    precio: parseFloat(card.dataset.precio.replace('S/ ', '')),
                    imagen: img.src,
                    autor: card.dataset.autor
                };

                animarVuelo(img); 
                guardarEnCarrito(libroData); 
                return; 
            }

            if (card.dataset.titulo) {
                document.getElementById("modal-img").src = card.querySelector('img').src;
                document.getElementById("modal-titulo").innerText = card.dataset.titulo;
                document.getElementById("modal-autor").innerText = card.dataset.autor;
                document.getElementById("modal-anio").innerText = card.dataset.anio;
                document.getElementById("modal-precio").innerText = card.dataset.precio;
                document.getElementById("modal-resumen").innerText = card.dataset.resumen;
                modal.style.display = "block";
            }
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }
});