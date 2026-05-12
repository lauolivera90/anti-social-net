Desafío Técnico: Sticky Aside con Anclaje Inferior (Twitter Style)
Descripción del Comportamiento Deseado
El objetivo es replicar el comportamiento de navegación de la columna lateral derecha (Aside) presente en plataformas como Twitter/X. Actualmente, la aplicación presenta una inconsistencia visual cuando el contenido del AsideSection es más extenso que la altura del monitor (100vh).

Lo que se busca implementar:

Scroll Global Sincronizado: El AsideSection no debe poseer un scroll interno independiente (overflow-y: auto). Debe responder al movimiento de la rueda del ratón en cualquier parte de la pantalla, desplazándose junto con el feed principal.

Anclaje Dinámico (Bottom-Aligned Sticky): * Al hacer scroll hacia abajo, el AsideSection debe subir de forma natural.

En el momento en que la base del último componente del Aside (ej. Recommended Users) coincide con el borde inferior del viewport, el Aside debe quedar fijo (sticky).

Esto permite que, aunque el feed central siga bajando miles de píxeles, la columna derecha siempre permanezca visible y rellena, evitando espacios vacíos negros.

Problemas Técnicos Identificados (Blockers)
Flexbox Stretch: Las columnas de Bootstrap (Col) dentro de un Row aplican por defecto align-items: stretch. Esto iguala la altura del Aside con la del Feed central, anulando la propiedad position: sticky ya que el elemento "cree" que nunca termina su recorrido.

Cálculo de top negativo: Para elementos más altos que la pantalla, top: 0 solo fija la parte superior. Se requiere una implementación que calcule top: calc(100vh - altura_del_aside), lo cual presenta dificultades cuando el contenido del Aside es dinámico (varía la cantidad de tendencias o usuarios recomendados).

Posibles Soluciones a Investigar
CSS Puro: Uso de align-self: flex-start en el contenedor del Aside para romper el estiramiento de Flexbox y aplicar un top negativo fijo o calculado.

JS Hook: Implementación de un useStickyAside que calcule la diferencia entre el alto de la ventana y el alto del componente Aside para ajustar el estilo en tiempo real durante el evento onScroll.

---

# Nuevas Funcionalidades Pendientes

## 1. Mejoras en el Feed Principal (Paginación y Descubrimiento)
**Descripción:** El feed actual asume que todos los posts se cargarán de una vez. A medida que la red social crezca, esto consumirá mucha memoria y hará que la carga inicial sea lenta. Se deben implementar mecanismos de carga progresiva y diversificación de contenido.

* **Feed de Descubrimiento (Posts Aleatorios e Infinito):** Mostrar un feed inicial (estilo "Para ti") con publicaciones seleccionadas de manera aleatoria. Al pedir más posts, el sistema debe evitar devolver publicaciones ya vistas (por ejemplo, enviando al backend un array de IDs para excluir). La experiencia de este feed debe ser de **scroll infinito** y seguir mostrando contenido continuamente.
* **Limitador de posts en pantalla:** Renderizar solo un lote inicial de publicaciones (ej. 10 o 15).
* **Carga extra de posts:** Implementar *Infinite Scroll* (usando `IntersectionObserver`) o un botón de "Cargar más" al final del feed para traer el siguiente lote.

**💡 Sugerencias y requerimientos para el Backend:**
* **Paginación:** El endpoint de obtener posts (ej. `GET /posts`) debe soportar *Query Parameters* para limitar los resultados. 
  * *Opción A (Offset):* `?page=1&limit=10`
  * *Opción B (Cursor - Recomendada para feeds dinámicos):* `?cursor=last_post_id&limit=10`
* **Ruta de Aleatoriedad:** Para el feed de descubrimiento puro, el backend podría utilizar la etapa de agregación `$sample` de MongoDB, lo que permite extraer N documentos de forma aleatoria de la colección sin necesidad de un algoritmo de IA complejo.

## 2. Estructuración de la Pantalla de Búsqueda (Search)
**Descripción:** La vista de `/search` es el núcleo de exploración de la plataforma. Debe permitir a los usuarios encontrar a otras personas, contenido específico y explorar etiquetas.

**Funcionalidades Frontend:**
* **Barra de búsqueda central:** Con un *debounce* (ej. 500ms) para no saturar al servidor de peticiones por cada tecla que el usuario presione.
* **Sistema de Pestañas (Tabs):** Dividir los resultados en categorías usando el `TabScene`: "Publicaciones", "Usuarios", "Etiquetas".
* **Reutilización de Entidades:** Mostrar resultados renderizando los componentes que ya existen (`PostPreview`, `UserInfo`, `TagBadge`).

**💡 Expectativas y requerimientos para el Backend:**
* **Endpoint de Búsqueda Flexible:** Necesitamos un endpoint que acepte parámetros de búsqueda, ej: `GET /search?q=termino&type=users` o endpoints dedicados por entidad (`GET /users/search?q=...`).
* **Búsqueda Insensible a Mayúsculas/Minúsculas:** El backend debe utilizar índices de texto (`$text` en MongoDB) o expresiones regulares (`$regex: "termino", $options: "i"`) para buscar coincidencias parciales en los `nickname` de usuarios o en la `description` de los posts.
* **Paginación en Búsquedas:** Al igual que en el feed, si una búsqueda de la letra "a" arroja 10,000 resultados, el backend debe poder paginarlos (retornar de a 20).

## 3. Optimización en la Vista del Post (Comentarios)
**Descripción:** Cuando un post se vuelva viral, cargar todos los comentarios de golpe afectará drásticamente el rendimiento de la vista `PostView`. Se requiere limitar y ordenar inteligentemente las respuestas.
* **Limitador de comentarios:** Mostrar solo un máximo de respuestas iniciales (ej. 10) y agregar un botón de "Cargar más respuestas" (o *Infinite Scroll*) al final.
* **Ordenamiento Dinámico y Sin Duplicados:** Requerir al backend que los comentarios vengan ordenados por "Más recientes" (fecha descendente) por defecto, o de manera aleatoria. Al igual que en los posts, se debe evitar cargar comentarios ya mostrados en llamadas subsecuentes.
* **Fin del Contenido:** A diferencia del feed de posts, los comentarios son finitos. Una vez que no haya más comentarios por cargar, se debe remover la opción de seguir cargando y mostrar un mensaje: "No hay más contenido disponible".

## 4. Tarjeta de Perfil Rápida (Hover Card / Popover)
**Descripción:** Para evitar que el usuario tenga que navegar constantemente a los perfiles, se debe mostrar un resumen al pasar el cursor sobre cualquier autor de un post o comentario.
* **Comportamiento esperado:** Al hacer *hover* (detectar `onMouseEnter`) sobre un Avatar o Nickname, se despliega una tarjeta flotante. Al quitar el cursor (`onMouseLeave`), la tarjeta desaparece sin interrumpir la navegación.
* **Decisión Técnica (Componente):** La opción más acertada de UX no es un Modal ni un Dropdown clásico, sino un **Popover** (implementable mediante `OverlayTrigger` de React Bootstrap configurado en modo `hover`). Esto permitirá que la información flote libremente de la misma forma que lo hacen los tooltips.
* **Información sugerida:** Avatar, Nickname, una pequeña biografía y conteo de Publicaciones/Comentarios.