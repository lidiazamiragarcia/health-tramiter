import { enviarPeticion } from "./herramientas.js";

export async function gestionarRol() {

    const idUsuario = document.getElementById("idUsuario").value;
    const rol = document.getElementById("rol").value;

   
    if (idUsuario === "") {
        alert("Seleccione un usuario.");
        return;
    }

    if (rol === "") {
        alert("Seleccione un rol.");
        return;
    }

   
    const datos = {
        idUsuario,
        rol
    };

    
    await enviarPeticion({
        url: "../backend/api/roles/",
        method: "PUT",
        param: datos,

        fSuccess: (resp) => {

            if (resp.code == 200) {

                alert("Rol actualizado correctamente.");

            } else {

                alert(resp.msg || "No fue posible actualizar el rol.");

            }

        }

    });

}