import { ir,enviarPeticion} from "./herramientas.js";

export async function crearTramite() {

    let tipoTramite = document.getElementById('tipoTramite').value;
    let eps = document.getElementById('eps').value;
    let descripcion = document.getElementById('descripcion').value.trim();

    if(tipoTramite === "") {
        alert("seleccione el tipo de tramite.");
        return;
    }
    if (eps === "") {
        alert("Seleccione la eps.");
        return;  
    }
    if (descripcion === "") {
        alert("Ingrese una descripcion del tramite.");
        return;
    }

    const datos = {
        tipoTramite,
        eps,
        descripcion,
    };

    await enviarPeticion({
        url: "../backend/api/tramite/",
        method: "POST",
        param: datos,
        fSuccess: (resp) => {

            if (resp.code == 200) {

                alert("Trámite creado correctamente.");
                ir('consultarTramites.html');

            } else {

                alert(resp.msg || "No fue posible crear el trámite.");

            }

        }

    });

    
}