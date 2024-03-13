
# Sistema de Inventario 

Sistema de Inventario desarrollado en Next.js con Supabase.
Para los mapas se utilizó [Apexcharts](https://apexcharts.com/).

## Demo - Solo Vista

[Demo](https://louder-inventory-system.vercel.app/)

Usuario: admin@gmail.com

Contraseña: 123456

![Home](https://github.com/BrathKennet/inventory-system/blob/master/doc/captures/home-1.png)

## Características

- Administración de categories, productos y lotes.
- Administración de lotes por fechas de vencimiento.
- Administración de Proveedores.
- Administración de Clientes y Ventas.
- Administración de Transacciones.
- Mapas interactivos.

## Modo de utilizar

1. Crear un proyecto en Supabase.

2. Colocar las variables de entorno en un archivo env.local en la raiz del proyecto de Next.js:
```env
NEXT_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUBSTITUTE_SUPABASE_ANON_KEY>
```

3. En "Authentication" del proyecto en Supabase agregar los usuarios que pueden acceder al sistema.

4. Para la creación de tablas, restricciones de acceso y creación de funciones y su uso en Supabase, lo puede encontrar en la carpeta [doc/data](https://github.com/BrathKennet/inventory-system/blob/master/doc/data)

To run this project, you will need to add the following environment variables to your .env file



## Capturas de Pantallas

![Login](https://github.com/BrathKennet/inventory-system/blob/master/doc/captures/login.png)

![Home](https://github.com/BrathKennet/inventory-system/blob/master/doc/captures/home-1.png)

![Home-2](https://github.com/BrathKennet/inventory-system/blob/master/doc/captures/home-2.png)

![Lots](https://github.com/BrathKennet/inventory-system/blob/master/doc/captures/lots-1.png)

![Lots-2](https://github.com/BrathKennet/inventory-system/blob/master/doc/captures/lots-2.png)
