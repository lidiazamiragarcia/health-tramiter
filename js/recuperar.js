import { ir, enviarPeticion } from './herramientas.js';

export async function validarrecuperar() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let correo = document.getElementById('correo').value.trim();

    if (correo === '') {
        alert('Ingrese su correo electrónico.');
        return;
    }

    if (!regexEmail.test(correo)) {
        alert('Ingrese un correo electrónico válido.');
        return;
    }

    const datos = { correo };

    await enviarPeticion({
        url: '../backend/api/recuperar-contrasena/',
        method: 'POST',
        param: datos,
        fSuccess: (resp) => {
            if (resp.code == 200) {
                alert('Se ha enviado un enlace de recuperación a su correo.');
                ir('login.html');
            } else {
                alert(resp.msg || 'No fue posible procesar la solicitud.');
            }
        }
    });
}
