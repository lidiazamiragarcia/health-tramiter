import {ir, enviarPeticion} from './herramientas.js';

export async function validarLogin() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let usuario =document.getElementById('user').value;
    let contraseña = document.getElementById('password').value;
    if (!regexEmail.test(usuario)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    if (contraseña.length < 4) {
        alert('La contraseña debe tener al menos 4 caracteres.');
        return;
    }
    
    const datos={usuario, contrasena: md5(contraseña)};
    await enviarPeticion({
        url: "../backend/api/login/",
        method: "POST",
        param: datos,
        fSuccess: (resp)=>{
            if(resp.code == 200){
                alert("El usuario ha iniciado sesión correctamente.");
                ir("dashboard.html")
            }
            else {alert(resp.msg || "Error en la petición");}
        }
    });
}