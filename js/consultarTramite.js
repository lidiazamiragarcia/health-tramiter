import { enviarPeticion } from "./herramientas.js";

export async function consultarTramites() {

    await enviarPeticion({
        url: "../backend/api/tramites/",
        method: "GET",

        fSuccess: (resp) => {

            if (resp.code == 200) {

                const tabla = document.getElementById("tablaTramites");
                tabla.innerHTML = "";

                resp.data.forEach((tramite) => {

                    tabla.innerHTML += `
                        <tr>
                            <td>${tramite.id}</td>
                            <td>${tramite.tipoTramite}</td>
                            <td>${tramite.eps}</td>
                            <td>${tramite.estado}</td>
                            <td>${tramite.fecha}</td>
                        </tr>
                    `;

                });

            } else {

                alert(resp.msg || "No fue posible consultar los trámites.");

            }

        }

    });

}