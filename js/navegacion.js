document.addEventListener('DOMContentLoaded', () => {
    const rutas = {
        'Crear trámite': 'crearTramite.html',
        'Ver mis trámites': 'consultarTramites.html',
        'Empezar solicitud': 'crearTramite.html',
        'Ver historial': 'consultarTramites.html',
        'Crear nuevo trámite': 'crearTramite.html',
        'Cancelar': 'dashboard.html',
        'Volver': 'dashboard.html',
        'Cerrar sesión': 'login.html',
        'Sí': 'login.html',
        'Sí, cerrar sesión': 'login.html',
        'No': 'dashboard.html',
        'No, cancelar': 'dashboard.html',
    };

    document.querySelectorAll('button').forEach(btn => {
        const texto = btn.textContent.trim();
        if (rutas[texto] && !btn.closest('form')) {
            btn.addEventListener('click', () => { location.href = rutas[texto]; });
        }
    });

    const show = document.querySelector('#show-password');
    if (show) {
        show.addEventListener('change', () => {
            const p = document.querySelector('#password');
            if (p) p.type = show.checked ? 'text' : 'password';
        });
    }

    const pagina = location.pathname.split('/').pop();
    document.querySelectorAll('.menu a').forEach(link => {
        if (link.getAttribute('href') === pagina) link.classList.add('active');
    });

    const archivo = document.querySelector('#archivo');
    const fileName = document.querySelector('.file-name');
    if (archivo && fileName) {
        archivo.addEventListener('change', () => {
            fileName.textContent = archivo.files[0]?.name || '';
        });
    }
});
