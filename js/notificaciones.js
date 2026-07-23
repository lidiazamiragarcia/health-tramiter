import { enviarPeticion } from "./herramientas.js";

export async function cargarNotificaciones() {

    await enviarPeticion({
        url: "../backend/api/notificaciones/",
        method: "GET",

        fSuccess: (resp) => {

            if (resp.code == 200) {

                const lista = document.getElementById("listaNotificaciones");
                lista.innerHTML = "";

                resp.data.forEach((notificacion) => {

                    lista.innerHTML += `
                        <div class="notificacion">
                            <h4>${notificacion.titulo}</h4>
                            <p>${notificacion.mensaje}</p>
                            <small>${notificacion.fecha}</small>
                        </div>
                    `;

                });

            } else {

                alert(resp.msg || "No fue posible cargar las notificaciones.");

            }

        }

    });

}