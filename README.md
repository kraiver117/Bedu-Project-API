# Plataforma de e-commerce para venta de productos electrónicos

Proyecto final del curso Backend Fundamentals impartido por Bedu. El proyecto consiste en una API para un e-commerce dedicado a la venta de productos electrónicos como periféricos, laptops y componentes para PC de escritorio. Con el objetivo primordial de que los usuarios puedan realizar compras online a través de los servicios que ofrece nuestra API, además de que el administrador pueda llevar un control de los pedidos y productos del sistema. 

# Uso
Renombra el archivo ubicado en la carpeta config/example-config.env a config.env y actualiza a tus propias variables de entorno para correr con éxito el proyecto.

Ejemplo:
```
MONGO_URI = cadena para conexión
NODE_ENV = development
JWT_SECRET = secret
JWT_EXPIRE = 30d
JWT_COOKIE_EXPIRE = 30
```


## Instala las dependencias

```
npm install
```

## Inicia el proyecto

```
# Con el comando
npm run dev
```

## Seeder para base de datos

Para poblar la base de datos con usuarios, productos y ordenes con la información en la carpeta "\_data", ejecutar los siguientes comandos:

```
# Eliminar todos los datos
node seeder -d

# Importar todos los datos
node seeder -i
```


## Usuarios prueba para login
```
admin@gmail.com (Admin)
123456

erd-1992@gmail.com (Customer)
eramirez344

```

# Servicios

- CRUD completo de las entidades usuario, producto y orden.
- Inicio de sesión y registro de usuario guarda en una cookie el token para su posterior uso.
- Protección de rutas solo para acceso a usuarios logueados o con rol de administrador.
- Manejo de roles dinámico (código adaptable para agregar más roles al sistema).
- Listar productos, usuarios y ordenes con paginación.
- Filtro de búsqueda avanzado con ordenamiento, paginación, select, búsqueda por atributo y métodos de mongo gt|gte|lt|lte|in para las entidades de usuario, producto y orden.
- Gestión de ordenes, productos y usuarios para el administrador.
- Actualizar orden como entregada.
- Script Seeder para poblar base de datos (products, users & oders).

# Historias de usuario
1. Como Administrador quiero CREAR productos para poder ofertarlos a los clientes.
2. Como Cliente y Administrador quiero poder VISUALIZAR todos los productos para poder búscar algún producto en el catálogo.
3. Como Cliente y Administrador quiero poder VISUALIZAR un solo producto para acceder a su información.
4. Como Administrador quiero ACTUALIZAR un producto para cambiar o corregir sus atributos.
5. Como Administrador quiero BORRAR productos que ya no sean necesarios.
6. Como Administrador quiero CREAR nuevos usuarios para que accedan al sistema.
7. Como Administrador quiero poder VISUALIZAR a todos los usuarios en el sistema para poder tener acceso a su información.
8. Como Administrador quiero VISUALIZAR a un solo usuario para acceder a su información.
9. Como Administrador quiero ACTUALIZAR la información de un usuario para poder hacerlo administrador o cambiar sus datos.
10.  Como Administrador quiero ELIMINAR usuarios para poder llevar un control de los usuarios en el sistema.
11. Como Usuario registrado quiero CREAR una orden.
12. Como Usuario registrado quiero VISUALIZAR detalles de mi orden u ordenes para visualizar el estado en el que se encuentran.
13. Como Administrador quiero VISUALIZAR todas las ordenes de los usuarios para poder llevar un control.
14. Como Administrador quiero VISUALIZAR los detalles de una orden en particular para poder ver su estado.
15. Como Administrador quiero ACTUALIZAR las ordenes que paquetería me haya notificado que fueron entregadas para llevar un mejor control.
16. Como Usuario nuevo quiero REGISTRARME al sistema para tener cuenta y realizar ordenes.
17. Como Usuario con cuenta quiero LOGUEARME para acceder a mi información personal y poder realizar ordenes.
18. Como Usuario logueado quiero ACTUALIZAR mi información personal.
19. Como Usuario logueado quiero ACTUALIZAR mi password.
20. Como Usuario logueado o sin loguear quiero realizar CONSULTAS AVANZADAS en productos que cuente con paginación, ordenamiento por atributo, selección de campos a mostrar y búsqueda por atributo para poder filtrar la información de mejor manera.
21. Como Administrador quiero realizar CONSULTAS AVANZADAS en todas las entidades para que la información solicitada cuente con paginación, ordenamiento por atributo, selección de campos a mostrar y búsqueda por atributo para poder filtrar la información de mejor manera.

# Documentación en Swagger
https://app.swaggerhub.com/apis-docs/kraiver117/BeduEcommerce/0.1

## ENDPOINT DE API
La API se encuentra disponible para su uso en https://bedu-e-commerce.herokuapp.com/v1