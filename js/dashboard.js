import { ir,enviarPeticion } from "./herramientas.js";

export async function cargardashboard() {
await enviarPeticion({
    url:"../bakend/api/dashboard/",
    method: ("GET"),
    fSuccess: (resp) =>{
        if (resp.cod ==200) {
            document.getElementById("nombreUsuario").textContent = resp.data.nombre;
            document.getElementById("totalTramites").textContent = resp.data.totalTramites;
            document.getElementById("tramitesPendientes").textContent = resp.data.pendientes;
            document.getElementById("tramitesAprobados").textContent = resp.data.aprobados;
        
        } else {
            alert(resp.msg || "No fue posible cargar la información.");

        }
    }
});
}