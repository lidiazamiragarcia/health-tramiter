import { enviarPeticion, ir } from "./herramientas.js";

export async function subirDocumento() {

    let tipoDocumento = document.getElementById("tipoDocumento").value;
    let archivo = document.getElementById("archivo").files[0];

    if (tipoDocumento === "") {
        alert("Seleccione un tipo de documento.");
        return;
    }

    if (!archivo) {
        alert("Seleccione un archivo.");
        return;
    }

    const datos = new FormData();

    datos.append("tipoDocumento", tipoDocumento);
    datos.append("archivo", archivo);

    await enviarPeticion({
        url: "../backend/api/documentos/",
        method: "POST",
        param: datos,

        fSuccess: (resp) => {

            if (resp.code == 200) {

                alert("Documento cargado correctamente.");
                ir("documentos.html");

            } else {

                alert(resp.msg || "No fue posible subir el documento.");

            }

        }

    });

}