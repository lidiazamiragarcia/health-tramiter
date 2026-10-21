# AGENTS.md

# Health Tramiter - Frontend

Versión: 1.0

---

# PROPÓSITO

Este documento define las reglas, estándares y comportamiento esperado de cualquier agente de Inteligencia Artificial que participe en el desarrollo del Frontend del proyecto Health Tramiter.

Su objetivo es garantizar una arquitectura consistente, una experiencia de usuario uniforme y un código mantenible, independientemente del modelo de IA utilizado.

Estas reglas son obligatorias.

---

# TECNOLOGÍAS

El Frontend deberá desarrollarse utilizando:

- Next.js
- React
- TypeScript (cuando el proyecto lo adopte)
- App Router
- CSS Modules o la solución de estilos definida por el proyecto

No introducir nuevas tecnologías sin una justificación técnica y aprobación previa.

---

# IDIOMA

Código:

Inglés.

Documentación:

Español.

Respuestas del agente:

Español.

Nunca mezclar idiomas.

---

# OBJETIVO DEL FRONTEND

El Frontend será responsable únicamente de:

- Interfaz de usuario.
- Experiencia de usuario.
- Navegación.
- Validaciones básicas del lado del cliente.
- Consumo de la API REST.
- Manejo del estado de la interfaz.

Nunca deberá implementar lógica del negocio.

Toda la lógica del negocio pertenece exclusivamente al Backend.

---

# ALCANCE DEL MVP (implementado y en evolución)

Pantallas y flujos implementados:

- Inicio de sesión, registro, recuperación y reset de contraseña
- Dashboard y perfil
- Administración de usuarios y roles (ADMIN)
- Trámites: mis trámites (USER), disponibles y gestión (TRAMITADOR), gestión global (ADMIN)
- Cierre de sesión (sidebar y menú avatar)
- Navegación y guards por rol

Pendiente:

- Documentos, notificaciones, dashboard con métricas reales, tests e2e

No implementar funcionalidades no acordadas sin actualizar documentación.

---

# PROTOTIPOS EXISTENTES

El proyecto cuenta con prototipos desarrollados en HTML, CSS y JavaScript.

Estos prototipos representan la referencia visual oficial del proyecto.

Durante la migración:

- Mantener la identidad visual.
- Respetar el flujo de navegación.
- Mejorar la organización del código.
- Adaptar la estructura a Next.js.
- Crear componentes reutilizables.

No copiar el HTML directamente.

Analizar primero cada pantalla y transformarla en componentes reutilizables.

---

# APP ROUTER

Toda nueva funcionalidad deberá desarrollarse utilizando App Router.

No utilizar Pages Router.

No utilizar:

- getServerSideProps
- getStaticProps
- getInitialProps

salvo que exista una necesidad técnica claramente justificada.

---

# SERVER COMPONENTS

Utilizar Server Components por defecto.

Solo utilizar "use client" cuando sea estrictamente necesario.

Ejemplos:

- Eventos.
- Formularios interactivos.
- Hooks del navegador.
- Local Storage.
- Session Storage.

Mantener los Client Components lo más pequeños posible.

---

# COMPONENTES

Todo componente deberá:

- Tener una única responsabilidad.
- Ser reutilizable.
- Ser desacoplado.
- Ser fácil de probar.
- Ser fácil de mantener.

No crear componentes gigantes.

Si un componente crece demasiado deberá dividirse.

---

# RESPONSIVE DESIGN

Todo el proyecto deberá ser completamente responsive.

Diseñar siguiendo la metodología Mobile First.

Validar funcionamiento en:

- 320px
- 375px
- 425px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

No deberán existir:

- Scroll horizontal.
- Elementos fuera de pantalla.
- Formularios rotos.
- Botones inaccesibles.
- Textos cortados.
- Imágenes deformadas.

---

# CONSISTENCIA VISUAL

Todas las pantallas deberán compartir exactamente:

- Tipografía.
- Paleta de colores.
- Espaciados.
- Bordes.
- Sombras.
- Iconografía.
- Botones.
- Inputs.
- Cards.
- Tablas.
- Modales.
- Navbar.
- Sidebar.
- Footer.

El usuario deberá percibir toda la plataforma como un único producto.

---

# DESIGN SYSTEM

Antes de crear nuevos componentes deberás reutilizar el Design System existente.

Todos los estilos deberán centralizarse.

El Design System deberá contener:

- Colores.
- Tipografía.
- Espaciados.
- Border Radius.
- Sombras.
- Elevaciones.
- Botones.
- Inputs.
- Select.
- Checkbox.
- Radio.
- Badge.
- Alert.
- Toast.
- Modal.
- Card.
- Tabla.
- Loader.
- Skeleton.

No duplicar estilos.

---

# TIPOGRAFÍA

Toda la aplicación utilizará una única familia tipográfica.

No mezclar fuentes.

Mantener una escala tipográfica consistente.

No utilizar tamaños arbitrarios.

---

# ESTILOS

No utilizar:

- CSS duplicado.
- Estilos inline.
- !important.
- Colores repetidos.
- Valores arbitrarios.

Centralizar variables globales.

---

# ICONOGRAFÍA

Toda la iconografía deberá provenir de una única librería.

Mantener consistencia visual en todas las pantallas.

---

# NAVEGACIÓN

Toda navegación interna deberá utilizar el componente Link de Next.js.

No utilizar etiquetas `<a>` para navegación interna.

Mantener una navegación rápida y consistente.

---

# CONSUMO DE API

El Frontend consumirá exclusivamente la API REST desarrollada en:

Health Tramiter API.

Nunca consumir la API directamente desde componentes visuales.

Toda comunicación deberá realizarse mediante una capa de Services.

---

# ESTADO

Priorizar:

- Estado local.
- Context API.

Solo introducir nuevas librerías de estado si el crecimiento del proyecto lo justifica.

---

# ACCESIBILIDAD

Toda pantalla deberá cumplir buenas prácticas de accesibilidad.

Implementar:

- HTML semántico.
- Labels.
- Navegación por teclado.
- Estados de foco visibles.
- Textos alternativos.
- Contraste adecuado.
- Mensajes de error claros.

La accesibilidad es un requisito obligatorio.

---

# RENDIMIENTO

Optimizar:

- Renderizados.
- Componentes.
- Imágenes.
- Carga diferida.
- Importaciones.
- Fuentes.

Evitar dependencias innecesarias.

No optimizar prematuramente.

---

# CALIDAD

Todo el código deberá respetar:

- SOLID
- DRY
- KISS
- YAGNI
- Clean Code
- Clean Architecture

---

# REUTILIZACIÓN

Antes de crear:

- Componentes.
- Hooks.
- Servicios.
- Utilidades.
- Tipos.
- Constantes.

Comprobar si ya existe uno similar.

Duplicar código será considerado un error.

---

# DOCUMENTACIÓN

Toda modificación relevante deberá mantener actualizados:

- README.md
- ARCHITECTURE.md
- CHANGELOG.md

Cuando corresponda.

---

# ANTES DE MODIFICAR CÓDIGO

Siempre deberás:

- Analizar el proyecto.
- Comprender la arquitectura.
- Buscar reutilización.
- Evaluar impacto.
- Proponer la solución.
- Implementar.
- Validar.
- Documentar.

Nunca modificar archivos impulsivamente.

---

# SI EXISTE INFORMACIÓN INSUFICIENTE

No inventar.

No asumir.

No generar estructuras ficticias.

Preguntar antes de continuar.

---

# CUANDO FINALICES UNA TAREA

Antes de responder deberás comprobar:

✔ El proyecto compila correctamente.

✔ No rompiste funcionalidades existentes.

✔ No duplicaste componentes.

✔ No duplicaste estilos.

✔ La arquitectura continúa siendo consistente.

✔ La interfaz sigue siendo responsive.

✔ Se mantiene la identidad visual.

✔ El código es reutilizable.

✔ La documentación fue actualizada cuando correspondía.

---

# CONTEXTO DEL DOMINIO

Health Tramiter es una plataforma web para la gestión y seguimiento de procesos del sector salud.

Durante el MVP el Frontend permite:

- Auth completa y JWT con refresh
- Dashboard y perfil por rol
- Administración (usuarios, roles) para ADMIN
- Trámites para USER, TRAMITADOR y ADMIN
- Cierre de sesión desde layout autenticado

Toda futura funcionalidad deberá construirse sobre esta base sin romper la arquitectura existente.

---

# EXPERIENCIA DE USUARIO

La experiencia de usuario deberá ser uno de los principales objetivos del proyecto.

Cada pantalla deberá:

- Ser intuitiva.
- Mantener coherencia visual.
- Reducir la cantidad de pasos necesarios para completar una acción.
- Mostrar mensajes claros.
- Validar formularios de manera amigable.
- Proporcionar retroalimentación visual durante las acciones del usuario.

---

# REGLA FUNDAMENTAL

El objetivo del agente no consiste únicamente en convertir prototipos HTML a Next.js.

El objetivo consiste en construir un Frontend moderno, escalable, completamente responsive, accesible, reutilizable y preparado para crecer durante varios años, manteniendo la identidad visual del proyecto y ofreciendo una experiencia de usuario consistente en cualquier dispositivo.

## No asumir decisiones arquitectónicas

Si una decisión de arquitectura no está explícitamente documentada, el agente no deberá asumirla.

Deberá:

1. Identificar la incertidumbre.
2. Documentar las posibles alternativas.
3. Solicitar aprobación antes de implementar una decisión que afecte la arquitectura del proyecto.

La ausencia de información nunca deberá interpretarse como autorización para inventar una solución.