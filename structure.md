# 🏗️ Arquitectura del Proyecto (Feature-Sliced Design)

Este proyecto utiliza la metodología **Feature-Sliced Design (FSD)** para organizar el código. FSD es un enfoque arquitectónico para el frontend que divide la aplicación de acuerdo con su nivel de responsabilidad y su lógica de negocio.

La regla de oro de FSD es: **Un módulo solo puede importar módulos de capas inferiores, nunca de capas superiores.**

## 📚 Capas de la Aplicación (De mayor a menor nivel)

### 1. `app/` (Capa de Inicialización)
Contiene la configuración global, proveedores de contexto y estilos globales que inicializan la aplicación.
- **Ejemplos en el proyecto:** 
  - `providers/AuthContext.jsx` (Estado global de autenticación)
  - `providers/ProtectedRoute.jsx` (Rutas privadas)
  - `styles/index.css` (Estilos y variables CSS globales)

### 2. `pages/` (Capa de Rutas)
Son los componentes principales que se montan en cada ruta de React Router. Las páginas componen (ensamblan) las funcionalidades y los widgets.
- **Páginas existentes:**
  - `Home`, `Public`, `Login`, `Register`
  - `Post` (Detalle de publicación), `CommentPage` (Detalle de comentario)
  - `Profile` (Perfil de usuario), `Configuration` (Ajustes de cuenta)
  - `Search` (Búsqueda)
  - `Contacto`, `Disclaimer` (Páginas públicas de información)
  - `Health` (Easter egg y status)

### 3. `widget/` (Capa de Bloques Complejos)
Agrupa componentes estructurales e independientes que están compuestos por múltiples entidades y funcionalidades. En este proyecto, esta capa se divide estratégicamente en dos áreas:

- **`widget/layout/`**: Define la estructura principal de las pantallas.
  - `MainLayout`, `PublicLayout`
  - `Sidebar` (Menú lateral de escritorio), `MobileNav` (Barra inferior móvil)
  - `AsideSection` (Columna derecha)
  - `SectionNav` (Barra superior tipo encabezado)
  - `TabScene` (Sistema de pestañas)

- **`widget/ui/`**: Componentes visuales genéricos pero complejos, que manejan lógica interna o estilos avanzados.
  - `ModalCustom` (Base estandarizada para modales)
  - `DropDown` (Menú desplegable con posicionamiento inteligente)
  - `Button`, `Input`, `Avatar`, `Card`, `ActionButton`

### 4. `features/` (Capa de Funcionalidades)
Contiene las interacciones del usuario y la lógica de negocio concreta (acciones que aportan valor al usuario).
- **Ejemplos en el proyecto:**
  - `CreatePost/` (Formulario de creación de publicación, `PostForm.jsx`)
  - `Post-Management/` (Edición y borrado, `EditPostModal.jsx`, `useUpdatePost.js`)
  - `Comment-Management/` (Edición y borrado de comentarios, `EditCommentModal.jsx`)
  - `Profile/` (Lógica de las pestañas del perfil, `UserPosts.jsx`, `UserComments.jsx`)
  - `AsideSection/` (Tendencias y recomendados)

### 5. `entities/` (Capa de Entidades de Negocio)
Representan los conceptos del dominio de la aplicación. Contienen los llamados a la API (`api`), tipos/modelos y representaciones visuales puras (`ui`) de esa entidad, sin lógica de interacción externa.
- **Entidades existentes:**
  - **`post`**: (Ej. `PostPreview.jsx`, `PostDetails.jsx`, `postApi.js`)
  - **`comment`**: (Ej. `Comment.jsx`, `commentApi.js`)
  - **`user`**: (Ej. `UserInformation.jsx`, `userApi.js`)
  - **`tag`**: (Ej. `TagBadge.jsx`, `tagApi.js`)

### 6. `shared/` (Capa Compartida)
Es la capa más baja. Contiene código completamente agnóstico de la lógica de negocio. Puede ser reutilizado en cualquier parte de la aplicación o incluso en otro proyecto. Se divide en:

- **`shared/ui/`**: Componentes de interfaz "tontos" sin estado de negocio.
  - `CharCounter` (Contador de caracteres)
  - `Emoji` (Selector de emojis)
  - `ImageGrid` (Grilla para mostrar imágenes)
  - `PostSkeleton` (Esqueleto base para posts y comentarios)
  - `UserInfo` (Bloque de avatar y nombre)

- **`shared/hook/`**: Custom hooks genéricos.
  - `useLocate` (Navegación con reseteo de scroll)
  - `useSmartDrop` (Detección de colisiones y bordes de pantalla)
  - `useConfirmClose` (Advertencia al cerrar modales con datos sin guardar)

---

## 📍 ¿Dónde colocar código nuevo? (Guía de decisión)

Si necesitas crear un nuevo archivo o componente y no sabes dónde va, hazte estas preguntas en orden:

1. **¿Es una vista completa a la que se accede por una URL de React Router?** 
   👉 Va en `pages/`.
2. **¿Es un bloque estructural complejo que agrupa varias funcionalidades o entidades (ej. un Sidebar, un MainLayout, una barra de navegación)?** 
   👉 Va en `widget/layout/` o `widget/ui/`.
3. **¿Es una acción o interacción específica del usuario que involucra lógica de negocio (ej. "Crear Post", "Dar Like", "Editar Comentario")?** 
   👉 Va en `features/`.
4. **¿Es la representación visual pura de un modelo de la base de datos o su llamada a la API (ej. la tarjeta visual de un Usuario, la API de Comentarios)?** 
   👉 Va en `entities/`.
5. **¿Es un componente genérico (Botón, Input), un Hook de utilidad general, o un helper que podrías copiar y pegar en otro proyecto distinto sin que se rompa?** 
   👉 Va en `shared/`.

---

## 🚫 Regla de Dependencias y Prevención de Relaciones Circulares

Para mantener la arquitectura limpia, predecible y **evitar errores de relaciones circulares** (donde el archivo A importa al B, y el B importa al A, rompiendo la compilación), se debe respetar estrictamente el flujo unidireccional de las importaciones:

✅ **PERMITIDO (Hacia abajo):** Las capas superiores pueden importar libremente de cualquier capa inferior.
*(Ej: `pages` puede importar de `widget`, `features`, `entities` y `shared`)*.

❌ **PROHIBIDO (Hacia arriba):** Un módulo **NUNCA** debe importar nada de una capa que esté por encima de la suya.
*(Ej: Un componente en `entities` **NO** puede importar un botón de `features` ni una vista de `pages`)*.

⚠️ **CUIDADO (Misma capa - Dependencias Horizontales):** Por regla general estricta, un módulo dentro de una capa no debería importar de otro módulo de la misma capa (ej. la entidad `post` no debería importar la entidad `comment`). Si necesitas juntar la visualización de un Post con la de un Comment, debes hacerlo ensamblándolos en una capa superior (como en `features` o `pages`).

---

## � Ejemplo práctico del flujo FSD

Si un usuario quiere editar una publicación, el árbol de dependencias FSD fluye de la siguiente manera:

1. El usuario está en la página **`Home`** (`pages/`).
2. La página renderiza el listado usando la entidad **`PostPreview`** (`entities/post`).
3. Dentro de cada post, se inyecta la funcionalidad **`PostActions`** (`features/Post-Management`).
4. El usuario hace clic en "Editar" y se abre el **`EditPostModal`** (`features/Post-Management`).
5. Este modal de funcionalidad está construido utilizando:
   - **`ModalCustom`** y **`Input`** (`widget/ui`).
   - **`CharCounter`** y **`ImageGrid`** (`shared/ui`).
6. Al interactuar con el formulario, el modal hace uso de utilidades como el hook **`useConfirmClose`** (`shared/hook`).
7. Al guardar, se ejecuta el hook de negocio **`useUpdatePost`** (`features/Post-Management`).
8. Este hook finalmente llama a la API a través de `updatePost` (`entities/post/api`).

*(Como se puede observar, las importaciones siempre viajan hacia abajo en las capas).*