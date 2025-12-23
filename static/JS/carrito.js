document.addEventListener('DOMContentLoaded', () => {
    const listaCarrito = document.getElementById('lista-carrito');
    const subtotalElt = document.getElementById('subtotal');
    const totalFinalElt = document.getElementById('total-final');
    const carritoVacioMsg = document.getElementById('carrito-vacio');

    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        listaCarrito.innerHTML = ''; 

        if (carrito.length === 0) {
            if (carritoVacioMsg) carritoVacioMsg.style.display = 'block';
            subtotalElt.innerText = 'S/ 0.00';
            totalFinalElt.innerText = 'S/ 0.00';
            return;
        }

        if (carritoVacioMsg) carritoVacioMsg.style.display = 'none';
        let total = 0;

        carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            
            const article = document.createElement('article');
            article.className = 'item-carrito';
            article.innerHTML = `
                <img src="${item.imagen}" alt="${item.titulo}" onerror="this.src='/static/Imagenes/logo-libreria.png'">
                <div class="detalles-item">
                    <h3>${item.titulo}</h3>
                    <p>Autor: ${item.autor || 'Desconocido'}</p>
                    <p class="precio-unitario">S/ ${parseFloat(item.precio).toFixed(2)}</p>
                </div>
                <div class="cantidad-controles">
                    <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span class="cantidad">${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
                <button class="btn-eliminar" onclick="eliminarItem(${index})" style="background:none; border:none; cursor:pointer; color:red; font-weight:bold; font-size:1.5rem;">
                    &times;
                </button>
            `;
            listaCarrito.appendChild(article);
        });

        subtotalElt.innerText = `S/ ${total.toFixed(2)}`;
        totalFinalElt.innerText = `S/ ${total.toFixed(2)}`;
    }


    window.cambiarCantidad = (index, delta) => {
        let carrito = JSON.parse(localStorage.getItem('carrito'));
        carrito[index].cantidad += delta;
        if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    };

    window.eliminarItem = (index) => {
        let carrito = JSON.parse(localStorage.getItem('carrito'));
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    };

    renderizarCarrito();

const btnPagar = document.querySelector('.btn-pagar');

    if (btnPagar) {
        btnPagar.addEventListener('click', () => {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            
            if (carrito.length === 0) {
                alert("Tu carrito está vacío, ¡agrega algunos libros primero!");
                return;
            }
            alert("¡Muchas gracias por tu compra en Entre Hojas! Tu pedido está siendo procesado.");

            localStorage.removeItem('carrito');

            window.location.href = "/";
        });
    }
});