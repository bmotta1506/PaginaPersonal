document.addEventListener('DOMContentLoaded', () => {
    const formReg = document.getElementById('form-registro');

    if (formReg) {
        formReg.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const nombre = document.getElementById('reg-nombre').value;
            const dni = document.getElementById('reg-dni').value;
            const celular = document.getElementById('reg-celular').value;
            const pass = document.getElementById('reg-pass').value;
            const confirmPass = document.getElementById('reg-pass-confirm').value;
            const dniRegExp = /^[0-9]{8}$/;
            if (!dniRegExp.test(dni)) {
                alert("El DNI debe tener exactamente 8 números.");
                return;
            }
            const celRegExp = /^9[0-9]{8}$/;
            if (!celRegExp.test(celular)) {
                alert("El celular debe tener 9 dígitos y empezar con 9.");
                return;
            }

            if (pass.length < 6) {
                alert("La contraseña debe tener al menos 6 caracteres.");
                return;
            }

            if (pass !== confirmPass) {
                alert("Las contraseñas no coinciden.");
                return;
            }
            alert(`¡Gracias por registrarte, ${nombre}! Bienvenido a Entre Hojas.`);
            window.location.href = "index.html"; 
        });
    }
});