import { enviarPeticion, ir } from "./herramientas.js";

export async function cerrarTramite() {

    let idTramite = document.getElementById("idTramite").value;
    let observacion = document.getElementById("observacion").value.trim();

    
    if (idTramite === "") {
        alert("Seleccione un trámite.");
        return;
    }

    if (observacion === "") {
        alert("Ingrese una observación.");
        return;
    }

    const datos = {
        idTramite,
        estado: "Cerrado",
        observacion
    };

    await enviarPeticion({
        url: "../backend/api/tramites/cerrar/",
        method: "PUT",
        param: datos,

        fSuccess: (resp) => {

            if (resp.code == 200) {

                alert("El trámite fue cerrado correctamente.");
                ir("gestionTramites.html");

            } else {

                alert(resp.msg || "No fue posible cerrar el trámite.");

            }

        }

    });

}