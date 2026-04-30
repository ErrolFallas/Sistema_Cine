Estructura de las tablas

- Cine
- id_cine PK
- nombre
- direccion
- ciudad
- pais
- telefono
- Sala
- id_sala PK
- id_cine FK
- nombre
- capacidad
- id_tipo_sala FK

- Tipo Sala
- id_tipo_sala PK
- nombre
- descripcion

- Película
- id_pelicula PK
- título
- duración
- genero
- clasificacion_edad
- descripcion
- fecha_estreno

- Cartelera
- id_cartelera PK
- id_cine FK
- fecha_inicio
- fecha_fin

- Función
- id_funcion PK
- id_película FK
- id_sala FK
- id_cartelera FK
- fecha
- hora_inicio
- hora_fin
- precio
- Asiento
- id_asiento PK
- id_sala FK
- fila
- numero
- tipo
- Entrada
- id_entrada PK
- id_funcion FK
- id_asiento FK
- estado
- precio final