Manual de Usuario 

Sistema de información para el  Departamento de las Tecnologías y Sistemas de Información y de las Comunicaciones ,desarrollado con microservicios con Docker y Docker Compose.

1. Requisitos Previos
Antes de comenzar, asegúrate de tener instalados en tu equipo los siguientes programas:

-Docker Desktop
-Docker Compose (suele venir integrado en Docker Desktop, excepto para sistemas operativos linux  )

Para verificar que estén instalados, abre una terminal y ejecuta:

docker --version
docker-compose --version

2. Clonar o Descargar el Proyecto

Descarga o clona el repositorio donde se encuentra el código y los archivos Docker de la aplicación.
Dirección del repositorio en GitHub: https://github.com/Andres101215/Taller_DockerMicroservicios/tree/main

Ejemplo:
git clone https://github.com/Andres101215/Taller_DockerMicroservicios/tree/main

3. Iniciar Sesión en Docker Hub

Para descargar las imágenes desde Docker Hub, es recomendable iniciar sesión con tu cuenta Docker:
docker login
Ingresa tu usuario y contraseña cuando te lo solicite.


4. Descripción de la Arquitectura

La aplicación consta de los siguientes servicios o imagenes:
•	mongoo: Base de datos MongoDB.
•	mongo-express: Herramienta web para administrar la base de datos.
•	estudiantes, salas, prestamos: Microservicios que gestionan las funcionalidades del sistema, están conectados mediante una red.
•	frontend: Interfaz de usuario web desarrollada con React y desplegada en un servidor de Nginx .

5. Configurar y Desplegar la Aplicación

El archivo docker-compose.yml ya está configurado para levantar todos los servicios necesarios.
Para iniciar la aplicación, en la terminal dentro del directorio del proyecto, ejecuta:
•	docker-compose up -d
Esto descargará las imágenes necesarias y levantará todos los contenedores en segundo plano.

6. Verificar que los Servicios Estén Corriendo
Para verificar el estado de los contenedores, usa el comando:
•	docker-compose ps
Deberías ver todos los servicios con estado "Up".

7. Acceder a la Aplicación
El frontend estará disponible en tu navegador en la dirección:
•	http://localhost:3000
En esta ubicación encontraras la aplicación con los diferentes apartados:
•	Estudiantes 
En el apartado estudiantes el programa permite crear un nuevo estudiante, editar un estudiante, eliminar un estudiante y listar todos los estudiantes registrados.

•	Salas
En el apartado salas el programa permite crear una nueva sala, editar una sala, eliminar una sala y listar todas las salas registradas.

•	Prestamos
En el apartado prestamos el programa permite crear un nuevo préstamo, editar un préstamo, eliminar un préstamo y listar todas los prestamos registradas.

•	Reportes:
El apartado reporte permite obtener un informe con la siguiente información:
-Sala con mayor frecuencia de préstamo 
- Reportes semanales y mensuales de los prestamos realizados. 
- Reporte con datos de estudiantes que registran el mayor uso de las salas ordenados de mayor a menor 

La interfaz de mongo-express para administrar la base de datos MongoDB estará en:
•	http://localhost:8081
8. Detener la Aplicación
Para detener todos los servicios, ejecuta:
•	docker-compose down
9. Notas Adicionales
Si modificas código y quieres reconstruir las imágenes locales, usa:
•	docker-compose build
•	docker-compose up -d
La base de datos MongoDB mantiene los datos en un volumen persistente llamado mongo-data esto hace que la información no se pierda, aunque se borren los contenedores.

10. Posibles Problemas y Soluciones
•	Error: Puerto ocupado.
Verifica que los puertos 3000, 3001, 3002, 3003, 27017, y 8081 estén libres o modifica el archivo docker-compose.yml para cambiar los puertos mapeados.

•	No se pueden descargar imágenes.
Verifica tu conexión a Internet y que hayas iniciado sesión con docker login.
