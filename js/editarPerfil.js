import { enviarPeticion } from "./herramientas.js";

export async function editarPerfil() {

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let nombre = document.getElementById("nombre").value.trim();
    let apellido = document.getElementById("apellido").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let telefono = document.getElementById("telefono").value.trim();

    
    if (nombre === "") {
        alert("Ingrese su nombre.");
        return;
    }

    if (apellido === "") {
        alert("Ingrese su apellido.");
        return;
    }

    if (!regexEmail.test(correo)) {
        alert("Ingrese un correo electrónico válido.");
        return;
    }

    if (telefono === "") {
        alert("Ingrese su número de teléfono.");
        return;
    }

   
    const datos = {
        nombre,
        apellido,
        correo,
        telefono
    };

    
    await enviarPeticion({
        url: "../backend/api/perfil/",
        method: "PUT",
        param: datos,

        fSuccess: (resp) => {

            if (resp.code == 200) {

                alert("Perfil actualizado correctamente.");

            } else {

                alert(resp.msg || "No fue posible actualizar el perfil.");

            }

        }

    });

}