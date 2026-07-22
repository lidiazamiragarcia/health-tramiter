import { ir, enviarPeticion } from './herramientas.js';

export async function registrarUsuario() {

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let nombre = document.getElementById("nombre").value.trim();
    let apellido = document.getElementById("apellido").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let contraseña = document.getElementById("password").value;
    let confirmar = document.getElementById("confirmarPassword").value;

    if (nombre === "") {
        alert("Ingrese el nombre.");
        return;
    }

    if (apellido === "") {
        alert("Ingrese el apellido.");
        return;
    }

    if (!regexEmail.test(correo)) {
        alert("Ingrese un correo válido.");
        return;
    }

    if (contraseña.length < 4) {
        alert("La contraseña debe tener al menos 4 caracteres.");
        return;
    }

    if (contraseña !== confirmar) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const datos = {
        nombre,
        apellido,
        correo,
        telefono,
        contrasena: md5(contraseña)
    };

    await enviarPeticion({
        url: "../backend/api/usuarios/",
        method: "POST",
        param: datos,
        fSuccess: (resp) => {

            if (resp.code == 200) {
                alert("Usuario registrado correctamente.");
                ir("login.html");
            } else {
                alert(resp.msg || "No fue posible registrar el usuario.");
            }

        }
    });

}