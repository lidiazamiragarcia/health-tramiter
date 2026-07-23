import { enviarPeticion } from "./herramientas.js";

export async function gestionarTramite() {

    let idTramite = document.getElementById("idTramite").value;
    let estado = document.getElementById("estado").value;

    if (idTramite === "") {
        alert("Seleccione un trámite.");
        return;
    }

    if (estado === "") {
        alert("Seleccione un estado.");
        return;
    }

    const datos = {
        idTramite,
        estado
    };

    await enviarPeticion({
        url: "../backend/api/tramites/",
        method: "PUT",
        param: datos,

        fSuccess: (resp) => {

            if (resp.code == 200) {

                alert("El trámite fue actualizado correctamente.");

            } else {

                alert(resp.msg || "No fue posible actualizar el trámite.");

            }

        }

    });

}