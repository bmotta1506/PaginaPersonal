document.addEventListener('DOMContentLoaded', () => {
    const formReg = document.getElementById('form-registro');

    if (formReg) {
        formReg.addEventListener('submit', (e) => {
            // 1. Validaciones (DNI, Celular, Pass)
            const nombre = document.getElementById('reg-nombre').value;
            const dni = document.getElementById('reg-dni').value;
            const celular = document.getElementById('reg-celular').value;
            const pass = document.getElementById('reg-pass').value;

            const dniRegExp = /^[0-9]{8}$/;
            if (!dniRegExp.test(dni)) {
                e.preventDefault(); // Detiene el envío solo si hay error
                alert("El DNI debe tener exactamente 8 números.");
                return;
            }

            const celRegExp = /^9[0-9]{8}$/;
            if (!celRegExp.test(celular)) {
                e.preventDefault(); // Detiene el envío solo si hay error
                alert("El celular debe tener 9 dígitos y empezar con 9.");
                return;
            }

            if (pass.length < 6) {
                e.preventDefault(); // Detiene el envío solo si hay error
                alert("La contraseña debe tener al menos 6 caracteres.");
                return;
            }

            // 2. Si llegamos aquí, todo está bien.
            // NO usamos window.location.href. 
            // NO ponemos preventDefault() aquí abajo.
            alert(`¡Gracias por registrarte, ${nombre}! Guardando tus datos...`);
            
            // El formulario se enviará automáticamente a /guardar_usuario
        });
    }
});