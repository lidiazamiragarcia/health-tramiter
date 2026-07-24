import { validarLogin } from './login.js';
import { registrarUsuario } from './registroUsuario.js';
import { validarrecuperar } from './recuperar.js';
import { editarPerfil } from './editarPerfil.js';
import { crearTramite } from './crearTramite.js';
import { subirDocumento } from './subirDocumentos.js';
import { cerrarTramite } from './cierreTramite.js';
import { gestionarTramite } from './gestionTramites.js';
import { gestionarRol } from './gestionRoles.js';

const formHandlers = {
    formlogin: validarLogin,
    formRegistro: registrarUsuario,
    formRecuperar: validarrecuperar,
    formPerfil: editarPerfil,
    formTramite: crearTramite,
    formDocumentos: subirDocumento,
    formCierre: cerrarTramite,
    formGestion: gestionarTramite,
    formRoles: gestionarRol,
};

document.addEventListener('submit', (e) => {
    const handler = formHandlers[e.target?.id];
    if (handler) {
        e.preventDefault();
        handler();
    }
});
