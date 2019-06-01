# TSP

El presente proyecto afronta el problema del viajero con una complejidad ((n-1)!/2), donde n es el numero de puntos a visitar.
Para ilustrar de forma correcta el proyecto se uso el API de google maps,html y JS para la aplicación de los algoritmos.

# Deploy

Para poder deployar el proyecto sera necesario alojarlo en un servidor de aplicaciones. A continuación muestro la forma de hacerlo mediante http-server:

- Debes tener instalado node (incluye npm).
- Ejecutar el comando "npm install -g http-server".
- Ubicarte en la raiz del proyecto y ejecutar "http-server -c-1 -d".

# Uso

- Cada punto debe ser cargado mediante el dataset.json, de tal forma que debes seguir el formato para que no te produzca errores.
- El calculo se realiza luego de dar doble click sobre alguna marca en el mapa.
