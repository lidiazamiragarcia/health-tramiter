document.addEventListener('DOMContentLoaded', () => {
  const rutas = {
    'Crear trámite': 'crearTramite.html', 'Ver mis trámites': 'consultarTramites.html',
    'Cancelar': 'dashboard.html', 'Volver': 'dashboard.html', 'Cerrar sesión': 'login.html'
  };
  document.querySelectorAll('button').forEach(btn => {
    const texto = btn.textContent.trim();
    if (rutas[texto] && !btn.closest('form')) btn.addEventListener('click', () => location.href = rutas[texto]);
  });
  const show = document.querySelector('#show-password');
  if(show) show.addEventListener('change', () => { const p=document.querySelector('#password'); if(p) p.type=show.checked?'text':'password'; });
});
