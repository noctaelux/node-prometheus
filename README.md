# Node.js - Microservice monitoring

## Requerimientos
- node.js v16+
- express (npm) v4+
- prom-client (npm) v14+
- nodemon (npm) v2+
- Docker v20+
- Prometheus [Docker Container](https://hub.docker.com/r/prom/prometheus)
- Grafana [Docker Container](https://hub.docker.com/r/grafana/grafana)

## Instalación / Ejecución
Para monitorizar esta aplicación de node.js, se deben agregar las siguientes librerías al archivo `package.json`:
```
npm install express
```
```
npm install prom-client
```
```
npm install nodemon --save-dev
```
Con la siguiente configuracion en el archivo `package.json`:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "npx nodemon app"
},
```

Adicionalmente, se proporciona el archivo `prometheus.yml` dentro de la carpeta del proyecto. Se debe
configurar los parámetros `<ip-local> <ip-nodejs-ms>` con la **IP** que registra nuestro equipo y los contenedores correspondientes, esto para que los contenedores puedan observarse entre ellos. Se sugiere modificar el nombre del parámetro `job_name` con algún nombre que mejor identifique el contexto del proyecto.

Para levantar los contenedores de Prometheus y Grafana, se sugiere ejecutar los siguientes comandos de docker:

### Prometheus
```
docker run \
    -d --name=prometheus \
    -p 9090:9090 \
    -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```
Donde reemplazaremos `/path/to/prometheus.yml` con el path absoluto del archivo proporcionado para la aplicación.
Accederemos por medio del navegador en la URL: http://localhost:9090.

### Grafana
Luego, deberemos levantar el contenedor de Grafana:
```
docker run -d --name=grafana -p 3000:3000 grafana/grafana
```
Y accedemos por medio del navegador a http://localhost:3000 (usuario y password: admin, admin).

### node.js
Mientras estamos en la carpeta del proyecto, ejecutamos el comando de instalación para descargar las dependencias:
```
npm install
```
Finalmente, levantaremos el proyecto de node.js:
```
npm run serve
```
Si accedemos a la ruta http://localhost:8081/metrics veremos varias definiciones de todos los comandos que podremos manipular posteriormente en Grafana.

## Descripción
En esta _Prueba de Concepto_ se pretende configurar el proyecto para poder ser monitoreado desde una instancia de Grafana
por medio de Prometheus, el cual realizará la ingesta de datos; ambos proyectos son de código abierto. Grafana permitirá
visualizar por medio de gráficas y tablas la información que Prometheus recopila de la aplicación y permitirá monitorear
todo tipo de actividad dentro del ámbito de la aplicación.

Se sugiere revisar la documentación de ambos proyectos (los cuales se anexan en la sección **Fuentes**) para dominar el
uso de ambas herramientas, también se sugiere ver los tutoriales de YouTube que se anexan al final.

Como extra, se sugiere importar el tablero [NodeJS Application Dashboard](https://grafana.com/grafana/dashboards/11159-nodejs-application-dashboard/)
como punto de partida, ya que éste proporciona gráficas de monitoreo bastante útiles.

Deberemos configurar el origen de los datos desde Grafana proporcionando la instancia de Prometheus cuidando que la URL 
corresponda con la IP que tenemos configurado en nuestro equipo. Posteriormente, podremos agregar paneles a nuestro Dashboard.

Si todo ha funcionado correctamente, si ejecutamos la URL http://localhost:8081/hola-mundo repetidamente, podremos visualizar cambios en el APM de Grafana.

### Fuentes
- https://github.com/siimon/prom-client
- https://grafana.com/docs/grafana/latest/
- https://prometheus.io/docs/prometheus/latest/installation/