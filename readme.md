# [Proyecto Pre-Filtro "ArteReparaciones"](https://github.com/Megasorfer20/Pre-Filtro--ArteReparaciones-/files/12796084/readme.md)

El proyecto consiste en una páginade gestion de inventarios y transacciones de una compañia de reparaciones de electrodomesticos, y tambíen de venta de estos mismos

## Planeacion

Estructura Inicial de la base de datos (Puede tener ligeros cambios durante el proceso)

![Diagrama](https://github.com/Megasorfer20/Pre-Filtro--ArteReparaciones-/assets/123566003/7c5e021e-de5c-4aa1-9b0c-60cd60b868ef)

Maquetación del frontend básico de la página en modo SPA

**Diapositivas Completas**

https://www.figma.com/file/2xDPMoCoqIEbaIpzshljYS/Untitled?type=design&node-id=1%3A6&mode=design&t=K8O4rIS3d3AxlzES-1

![image](https://github.com/Megasorfer20/Pre-Filtro--ArteReparaciones-/assets/123566003/a8f32fc8-8f0d-44f1-b518-8b3b00270d72)
![image](https://github.com/Megasorfer20/Pre-Filtro--ArteReparaciones-/assets/123566003/cfd3419f-1a60-4768-a99b-ca035fa88adc)

## Organizacion de las carpetas
### consumo-api

Es la carpeta de CRA sin buidear donde se van a consumir todos los APIs y contiene tamvien la UI/UX

En la Dirección ```src/conponents``` se van a encontrar las carpetas con cada ´seccion del header (Faltó hacer los componentes de PATCH, y algunos formularios POST)

Para ejecutar el proyecto de react primero ejecuta el comando ```npm install``` o ```npm i```en de terminal estando dentro de la carpeta, luego de ello ejecuta ```npm start``` y espera, depués de unos minuto se abrirá el proyecto

### ElementosBaseDatos

Es el modelo principal e inicial de la base de datos, los datos pueden variar a la hora de ejecutar ya que la base 

Se intenta mantener la base de datos lo más actualizada posible, pero sus datos pueden ir variando, es recomendable mirar directamente sus elementos en ``Mongodb Atlas``

### NodeJs

Es todo el Backend relacionado a la creacion de las APIs (Proximamente documentado con Swagger los endpoints)

Para ejecutar el servidor de localhost primero ejecuta el comando ```npm install``` o ```npm i```en de terminal estando dentro de la carpeta, luego de ello ejecuta ```npm start``` y espera hasta que en la terminal se mencione que se conectó a un puerto.

