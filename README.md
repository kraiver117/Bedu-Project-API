# Post Work 6

Se agregaron un total de **53 registros** en la base de datos.

Se agrego una carpeta llamada **_data** en donde se encuentra toda la información de los registros de nuestras entidades orders, products y users.

Se **agregaron variables de entorno** en **config/config.env** (ver archivo example-config.env para más información de las variables de entorno necesarias) para manejar información sensible como lo es el MONGO URI.

Se agrego un archivo javascript llamado **seeder** para poblar la base de datos mediante una conexión a la DB y leyendo los archivos JSON de la carpeta _data, el comando para poblar la base de datos es **"node seeder i"** y para borrar la data el comando será **"node seeder -d"**, esto con el fin de agilizar el proceso de llenado en la base de datos. **Se necesitan las variables de entorno MONGO_URI y DB_NAME para que estos comandos funcionen y apunten a una base de datos.**

# Post Work 5
**Diagrama Entidad - Relación**

![](https://i.ibb.co/GtFSCds/e-commerce-diagrama-E-R.png)

**Modelo Relacional**

![](https://i.ibb.co/m8WGC1w/Modelo-Relacional.jpg)

**Comandos SQL para la creación de la base de datos y tablas**

![](https://i.ibb.co/6HjJxvH/Descripci-n-Tablas.png)


# Post Work 4
Servidor configurado con node.js - express.
Estructura del proyecto añadida junto con sus modelos, controladores y rutas.