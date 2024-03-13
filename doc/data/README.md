# Generación de Datos

Para la generación de datos, se debe crear un proyecto en proyecto en Supabase.

Los scripts para la creación de tablas, restricciones de acceso y creación de funciones se encuentra en el archivo [scripts](https://github.com/BrathKennet/inventory-system/blob/master/doc/data/scripts)

Para habilitar las restricciones de acceso a las tablas, puede utilizar uno de las siguientes archivos:

- Si requiere que cualquier usuario autenticado pueda realizar cualquier acción utilice el archivo [scripts-rsa-all](https://github.com/BrathKennet/inventory-system/blob/master/doc/data/scripts-rsa-all)
- Si requiere que solo un usuario autenticado pueda realizar cualquier acción utilice el archivo [scripts-rsa-one](https://github.com/BrathKennet/inventory-system/blob/master/doc/data/scripts-rsa-one). Puede cambiar al usuario que desee.

Después de ejecutar los pasos anteriores, puede iniciar normalmente el proyecto.

En caso requiera datos iniciales, los puede encontrar en la carpeta [csv](https://github.com/BrathKennet/inventory-system/blob/master/doc/data/csv), el cual contiene todos los datos de las tablas en formato csv, solo necesita importarlo directamente en Supabase.
