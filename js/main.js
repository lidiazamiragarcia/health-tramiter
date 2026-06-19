import { validarLogin } from './login.js';

document.addEventListener('DOMContentLoaded', () => {
    //console.log("Inicio del DOMContentLoaded");
});

//Evento Submit
document.addEventListener('submit', (e) => {
    //console.log("Evento submit detectado");
    if (e.target && e.target.id === 'formlogin') {
        e.preventDefault()
        validarLogin()
    }
})
