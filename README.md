# NotesApp-WordPress
Aplicación que consume datos de una API de WordPress y los muestra usando una interfaz creada con React.

## Instrucciones para Ejecutar el Proyecto

 **API de WordPress:**
   - Este proyecto utiliza la API de WordPress del sitio [fernandafamiliar.soy](https://fernandafamiliar.soy) para obtener las últimas 10 notas publicadas.

1. **Clonar Repositorio:**
   - Abre la terminal (o línea de comandos) en tu sistema.
   - Clona este repositorio a tu máquina local usando Git:
     ```
     git clone https://github.com/AsbelTorales/NotesApp-WordPress.git
     ```
   
2. **Instalar Dependencias:**
    - Navega al directorio del proyecto usando la consola:
     ```
     cd my-app
     
     ```
    - Instala las dependencias necesarias usando npm:
     ```
     npm install
     npm install axios
     npm install @mui/material @emotion/react @emotion/styled
     npm i date-fns
     
     ```

3. **Ejecutar la Aplicación:**
    - Inicia la aplicación React usando la consola:
     ```
     npm start
     ```

4. **Ver la Aplicación:**
   - Abre tu navegador web y navega a `http://localhost:3000` para ver la aplicación.

### Estado y Efectos
1. **Persistencia de Datos:**
   - Las notas obtenidas se almacenan en el almacenamiento local del navegador, asegurando que persistan entre sesiones.

2. **Marcado de Notas como leídas o completadas**
   - Se pueden marcar las notas como leídas una por una o marcar todas como leídas dandole click al botón de la parte superior que dice 'Marcar todas como leídas'.

### Notas Adicionales
- Asegurarse de tener una conexión a Internet activa para acceder a la API de WordPress.
- La interfaz de usuario está diseñada para ser responsive y puede adaptarse a diferentes tamaños de pantalla.



