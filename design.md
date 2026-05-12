# Design System: Hover Effects

Para mantener una consistencia visual a través de la aplicación, hemos estandarizado el efecto de `hover` para los elementos interactivos como botones, ítems de menú y enlaces de navegación.

## Estilo Visual

- **Fondo**: Un color de fondo semitransparente que utiliza el color secundario de Bootstrap (`--bs-secondary-rgb`) con una opacidad del 20%.
- **Forma**: Generalmente se aplica dentro de un contenedor con bordes redondeados (`rounded-pill` o `rounded-3`).
- **Transición**: Se utiliza una transición suave (`transition-all`) para la aparición y desaparición del fondo.

## Patrones de Implementación

Existen dos maneras de aplicar este efecto, dependiendo de la complejidad de la interacción.

### 1. Hover Simple (CSS)

Para casos sencillos donde el área clickeable y el área del efecto visual son la misma, se utiliza una clase CSS.

- **Clase**: `.interactive-item`
- **Uso**: Añade esta clase al componente de React o elemento HTML que debe reaccionar al `hover`.

**Ejemplo (`DropDown.jsx`):**
```jsx
<Dropdown.Item 
  className="interactive-item py-2 px-3 rounded-pill ..."
  onClick={...}
>
  ...
</Dropdown.Item>
```

### 2. Hover Complejo (JavaScript + CSS)

Para casos avanzados, como en el `Sidebar`, donde el área de detección del `hover` es más grande que el área del efecto visual, se utiliza una combinación de estado de React y una clase CSS.

- **Clase**: `.interactive-item-active`
- **Uso**:
    1.  En el componente padre, define un estado para rastrear el elemento sobre el cual está el cursor (ej: `const [hoveredItem, setHoveredItem] = useState(null);`).
    2.  En el contenedor ancho que detecta el evento, usa `onMouseEnter` y `onMouseLeave` para actualizar el estado.
    3.  En el elemento hijo que debe mostrar el feedback visual, aplica la clase `.interactive-item-active` condicionalmente basado en el estado.

**Ejemplo (`Sidebar.jsx`):**
```jsx
// Contenedor anfitrion que detecta el hover
<div 
  onMouseEnter={() => setHoveredItem('some-id')}
  onMouseLeave={() => setHoveredItem(null)}
>
  {/* Elemento visual que muestra el efecto */}
  <Row className={`... ${isHovered ? 'interactive-item-active' : ''}`}>
    ...
  </Row>
</div>
```

Este enfoque dual nos da la flexibilidad para crear interacciones complejas mientras mantenemos un estilo visual 100% consistente.

Especialización: ModalInput
1. Concepto
Es un wrapper del componente Input base diseñado para ser usado exclusivamente dentro de ModalCustom. No es un componente nuevo, sino una versión pre-configurada para el entorno de ventanas emergentes.

2. Ubicación
Se encuentra en: @/widget/ui

3. Justificación
Consistencia: Garantiza que todos los modales tengan el mismo estilo (fondo negro, bordes grises) sin repetir clases manualmente.

Mantenimiento: Cambiar el look de todos los formularios de configuración se hace desde un solo archivo.

Código Limpio: Reduce el ruido visual en las features al eliminar props de estilo repetitivas.

4. Cuándo usarlo
ModalInput: En todos los formularios dentro de un modal (Cambio de clave, Editar perfil, etc.).

Input (Base): En el feed principal (MakeComment), barras de búsqueda o páginas donde el diseño no sea el estándar de los modales.

5. Implementación
JavaScript
import { Input } from "./Input";

export const ModalInput = (props) => (
  <Input
    {...props}
    classNameControl={`bg-black text-white border-secondary ${props.classNameControl || ""}`}
    className={`mb-3 ${props.className || ""}`}
  />
);

---

# Reglas de Diseño Generales del Proyecto

Este proyecto emula la interfaz de plataformas modernas (como X/Twitter) utilizando un enfoque "Dark Mode First". 

### 1. Paleta de Colores
- **Fondos:** Se utiliza negro puro (`bg-black` o `#000000`) para el fondo principal (Feed, Modales) y gris oscuro (`bg-dark` o `#212529`) para elementos secundarios o contenedores.
- **Textos:** Texto principal en blanco (`text-white`) y texto secundario (fechas, @usuarios, placeholders) en gris (`text-secondary`).
- **Acentos:** Colores primarios (`text-primary`) para enlaces o botones principales, y rojo (`text-danger`) para acciones destructivas.

### 2. Modales y Popups (Menús Desplegables)
- **Desbordamiento Inteligente:** Todo componente desplegable (como el `EmojiPicker` o los selectores de etiquetas) está diseñado para ser consciente de su entorno. Si no hay espacio hacia abajo, se abren hacia arriba (gracias al hook `useSmartDrop`).
- **Estrategia Fixed:** Para evitar que los menús queden cortados dentro de ventanas modales con `overflow: hidden`, los componentes desplegables utilizan `useFixedStrategy` para renderizarse por encima de toda la pantalla.

### 3. Formularios y Textareas
- Los campos de texto de publicaciones y comentarios no tienen una altura fija inicial. Utilizan lógica en React para expandirse automáticamente (`scrollHeight`) a medida que el usuario escribe, hasta un límite máximo donde habilitan su propio *scroll* interno.

---

# 🧱 Diccionario de Componentes UI

Bajo la arquitectura Feature-Sliced Design (FSD), los componentes visuales se dividen en dos capas dependiendo de su nivel de conocimiento del negocio.

## 1. Shared UI (`@/shared/ui`)
Son componentes de interfaz "tontos" y universales. No saben nada de la lógica de negocio (posts, usuarios o base de datos). 

### `CharCounter`
Contador de caracteres dinámico e inteligente que omite los espacios finales (`.trim()`).
- **Props:**
  - `text` (string): El texto actual del input a evaluar.
  - `max` (number, *default: 240*): El límite máximo de caracteres.
- **Comportamiento:** Si supera el límite, cambia a color rojo (`text-danger`) y muestra la cantidad excedente en negativo (ej. `-5`).

### `Emoji`
Botón interactivo que despliega un `EmojiPicker`.
- **Props:**
  - `setInputText` (function): Función para concatenar el emoji seleccionado al estado del input padre.
- **Comportamiento:** Emplea internamente a `DropDown` y `useSmartDrop` para evitar colisiones con el final de la pantalla o el modal.

### `ImageGrid`
Grilla responsiva para previsualizar múltiples imágenes.
- **Props:**
  - `images` (array): Lista de imágenes (pueden ser strings de URLs puras u objetos `{url}`).
  - `onRemove` (function, *opcional*): Callback que se ejecuta al presionar la 'X' de una imagen para eliminarla.

### `PostSkeleton`
Es el layout estructural fundamental. Define cómo se ve cualquier bloque de contenido principal (Avatar a la izquierda, Nombre/Arroba arriba, contenido al centro). Es utilizado por las entidades `Post` y `Comment`.
- **Props:**
  - `user` (object): Objeto con los datos básicos del usuario (nickname, avatar).
  - `headerExtra` (node): Elemento adicional junto al nombre (generalmente la fecha formateada).
  - `actions` (node): Ranura (*slot*) para inyectar botones de acción (como el menú de tres puntos).
  - `children` (node): El contenido interno (texto, imágenes, tags).
  - `onClick` / `onProfileClick` (functions): Manejadores de navegación (bloquean propagación de clicks internos de modales/dropdowns).

---

## 2. Widget UI (`@/widget/ui`)
Son componentes visuales más complejos, construidos sobre herramientas de terceros (React Bootstrap) pero altamente personalizados para el *Design System* del proyecto.

### `ModalCustom`
Envoltorio estandarizado para ventanas modales. Asegura consistencia visual en toda la app.
- **Props:**
  - `show` / `onHide` (boolean / function): Control básico de React Bootstrap.
  - `title` (string): Título del Header.
  - `children` (node): Contenido del Body.
  - `footerActions` (node): Contenedor flexible inyectado en el Footer (donde solemos colocar los botones de Guardar y utilidades).
  - `isLoading` (boolean): Si es `true`, reemplaza el contenido por un `Spinner` de carga.
  - `variant` (string, *default: "slate"*): Define la paleta de colores del modal ("dark", "slate", "light").
  - `scrollable` (boolean): Activa el *scroll* interno nativo del modal para contenidos largos.
  - `showCloseButton` (boolean, *default: true*): Permite ocultar el botón "Cerrar" del footer.
  - `...props`: Hereda todas las props nativas del `<Modal>` de Bootstrap.

### `DropDown`
Menú desplegable extremadamente potente y consciente de su entorno.
- **Props:**
  - `trigger` (node): El botón o ícono que activa el menú.
  - `options` (array): Lista de objetos para renderizar opciones simples (ej. `{label, icon, onClick, isDanger, divider}`).
  - `children` (node, *opcional*): Si se proporciona, ignora `options` y renderiza contenido 100% personalizado (como el componente `EmojiPicker` o listas de `Tags`).
  - `variant` (string): Tema visual ("dark", "slate", "light").
  - `drop` (string, *default: "down"*): Dirección de apertura. Soporta el hook `useSmartDrop` ("up", "down").
  - `useFixedStrategy` (boolean): Si es `true`, permite que el menú escape de contenedores con `overflow: hidden` (vital para usar dentro de Modales).

### `ActionButton`
Implementación específica del `DropDown`. Renderiza el clásico ícono de "tres puntos" (`bi-three-dots`) y recibe las opciones para modificar, compartir o eliminar publicaciones/comentarios.

### `Button` & `Input`
Wrappers base.
- **Button:** Añade estilos base y variantes personalizadas como `ghost`.
- **Input:** Unifica el `Form.Control` y `Form.Group` de Bootstrap, gestionando clases personalizadas (`classNameControl`) y soporte nativo para *forwardRef* (necesario para las textareas dinámicas).

### `Avatar`
Maneja la visualización estandarizada de imágenes de perfil. Soporta avatares ausentes mostrando un *fallback* seguro o un icono por defecto, manteniendo siempre el aspecto circular (`rounded-circle`) y proporciones fijas (ej. 48x48px).