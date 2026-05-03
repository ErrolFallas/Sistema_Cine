create database sistemacine;
use sistemacine;

-- Evita funciones con hora_fin menor a hora_inicio
DELIMITER $$
CREATE TRIGGER trg_funcion_validar_horas
BEFORE INSERT ON funcion
FOR EACH ROW
BEGIN
    IF NEW.hora_fin <= NEW.hora_inicio THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La hora de fin debe ser mayor que la hora de inicio';
    END IF;
END$$

DELIMITER $$
CREATE TRIGGER trg_funcion_validar_horas_update
BEFORE UPDATE ON funcion
FOR EACH ROW
BEGIN
    IF NEW.hora_fin <= NEW.hora_inicio THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'La hora de fin debe ser mayor que la hora de inicio';
    END IF;
END$$
DELIMITER ;

-- evitar fecha inicio superior a fecha final en cartelera
DELIMITER $$
CREATE TRIGGER trg_cartelera_validar_fechas
BEFORE INSERT ON cartelera
FOR EACH ROW
BEGIN
    IF NEW.fecha_fin < NEW.fecha_inicio THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La fecha_fin no puede ser menor que fecha_inicio';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_cartelera_validar_fechas_update
BEFORE UPDATE ON cartelera
FOR EACH ROW
BEGIN
    IF NEW.fecha_fin < NEW.fecha_inicio THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La fecha_fin no puede ser menor que fecha_inicio';
    END IF;
END$$
DELIMITER ;

-- evitar seguir vendiendo entradas de funciones canceladas 
DELIMITER $$
CREATE TRIGGER trg_entrada_validar_estado
BEFORE UPDATE ON entrada
FOR EACH ROW
BEGIN
    IF OLD.estado = 'cancelado' AND NEW.estado <> 'cancelado' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No se puede modificar una entrada cancelada';
    END IF;
END$$
DELIMITER ;

-- evitar modificar entradas de funciones pasadas
DELIMITER $$
CREATE TRIGGER trg_entrada_funcion_no_pasada_update
BEFORE UPDATE ON entrada
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM funcion f
        WHERE f.id_funcion = NEW.id_funcion
        AND (
            f.fecha < CURDATE()
            OR (f.fecha = CURDATE() AND f.hora_inicio < CURTIME())
        )
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No se pueden modificar entradas de funciones pasadas';
    END IF;
END$$
DELIMITER ;

-- en entrada evita vender dos veces el mismo asiento para la misma funcion
DELIMITER $$
CREATE TRIGGER trg_entrada_evitar_duplicados
BEFORE INSERT ON entrada
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM entrada
        WHERE id_funcion = NEW.id_funcion
        AND id_asiento = NEW.id_asiento
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Este asiento ya está ocupado en la función';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_entrada_evitar_duplicados_update
BEFORE UPDATE ON entrada
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM entrada
        WHERE id_funcion = NEW.id_funcion
        AND id_asiento = NEW.id_asiento
        AND id_entrada <> OLD.id_entrada
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Este asiento ya está ocupado en la función';
    END IF;
END$$
DELIMITER ;

-- evitar que las funciones tengan precios negativas
DELIMITER $$
CREATE TRIGGER trg_funcion_precio_no_negativo
BEFORE INSERT ON funcion
FOR EACH ROW
BEGIN
    IF NEW.precio < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio de la función no puede ser negativo';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_funcion_precio_no_negativo_update
BEFORE UPDATE ON funcion
FOR EACH ROW
BEGIN
    IF NEW.precio < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio de la función no puede ser negativo';
    END IF;
END$$
DELIMITER ;

-- la duracion de la pelicula debe ser al menos de 1
DELIMITER $$
CREATE TRIGGER trg_pelicula_duracion_valida
BEFORE INSERT ON pelicula
FOR EACH ROW
BEGIN
    IF NEW.duracion <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La duración de la película debe ser mayor a 0';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_pelicula_duracion_valida_update
BEFORE UPDATE ON pelicula
FOR EACH ROW
BEGIN
    IF NEW.duracion <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La duración debe ser mayor a 0';
    END IF;
END$$
DELIMITER ;

-- evitar que las salas no tengan capacidad o que tengan negativos
DELIMITER $$
CREATE TRIGGER trg_sala_capacidad_valida
BEFORE INSERT ON sala
FOR EACH ROW
BEGIN
    IF NEW.capacidad <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La capacidad de la sala debe ser mayor a 0';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_sala_capacidad_valida_update
BEFORE UPDATE ON sala
FOR EACH ROW
BEGIN
    IF NEW.capacidad <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La capacidad de la sala debe ser mayor a 0';
    END IF;
END$$
DELIMITER ;

-- en entrada el precio no puede ser negativo
DELIMITER $$
CREATE TRIGGER trg_entrada_precio_no_negativo
BEFORE INSERT ON entrada
FOR EACH ROW
BEGIN
    IF NEW.precio_final < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio de la entrada no puede ser negativo';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_entrada_precio_no_negativo_update
BEFORE UPDATE ON entrada
FOR EACH ROW
BEGIN
    IF NEW.precio_final < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio de la entrada no puede ser negativo';
    END IF;
END$$
DELIMITER ;

-- evitar funciones fuera de la fecha final de la cartelera
DELIMITER $$
CREATE TRIGGER trg_funcion_fecha_en_cartelera
BEFORE INSERT ON funcion
FOR EACH ROW
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM cartelera c
        WHERE c.id_cartelera = NEW.id_cartelera
        AND NEW.fecha BETWEEN c.fecha_inicio AND c.fecha_fin
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La fecha de la función está fuera del rango de la cartelera';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_funcion_fecha_en_cartelera_update
BEFORE UPDATE ON funcion
FOR EACH ROW
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM cartelera c
        WHERE c.id_cartelera = NEW.id_cartelera
        AND NEW.fecha BETWEEN c.fecha_inicio AND c.fecha_fin
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La fecha de la función está fuera del rango de la cartelera';
    END IF;
END$$
DELIMITER ;

-- las entradas cambien de forma automatica a cancelado, si el horario de la funcion cambia 
DELIMITER $$
CREATE TRIGGER trg_funcion_cambio_cancelar_entradas
AFTER UPDATE ON funcion
FOR EACH ROW
BEGIN
    IF OLD.fecha <> NEW.fecha 
       OR OLD.hora_inicio <> NEW.hora_inicio 
       OR OLD.hora_fin <> NEW.hora_fin THEN
        
        UPDATE entrada
        SET estado = 'cancelado'
        WHERE id_funcion = NEW.id_funcion;
        
    END IF;
END$$
DELIMITER ;

-- evitar vender entradas, si la fecha es inferior a la actual
DELIMITER $$
CREATE TRIGGER trg_entrada_funcion_no_pasada
BEFORE INSERT ON entrada
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM funcion f
        WHERE f.id_funcion = NEW.id_funcion
        AND (
            f.fecha < CURDATE()
            OR (f.fecha = CURDATE() AND f.hora_inicio < CURTIME())
        )
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No se pueden vender entradas para funciones pasadas';
    END IF;
END$$
DELIMITER ;

-- diseñar entradas automaticas como disponibles al momento de crear una funcion
DELIMITER $$
CREATE TRIGGER trg_funcion_generar_entradas
AFTER INSERT ON funcion
FOR EACH ROW
BEGIN
    INSERT INTO entrada (id_funcion, id_asiento, estado, precio_final)
    SELECT 
        NEW.id_funcion,
        a.id_asiento,
        'disponible',
        NEW.precio
    FROM asiento a
    WHERE a.id_sala = NEW.id_sala;
END$$
DELIMITER ;

-- evitar cambiar estado a vendido en entrada, si es que se intento colocar un asiento de una sala y la funcion en otra sala
DELIMITER $$
CREATE TRIGGER trg_entrada_asiento_sala_valido
BEFORE INSERT ON entrada
FOR EACH ROW
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM funcion f
        JOIN asiento a ON a.id_asiento = NEW.id_asiento
        WHERE f.id_funcion = NEW.id_funcion
        AND f.id_sala = a.id_sala
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El asiento no pertenece a la sala de la función';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_entrada_asiento_sala_valido_update
BEFORE UPDATE ON entrada
FOR EACH ROW
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM funcion f
        JOIN asiento a ON a.id_asiento = NEW.id_asiento
        WHERE f.id_funcion = NEW.id_funcion
        AND f.id_sala = a.id_sala
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El asiento no pertenece a la sala de la función';
    END IF;
END$$
DELIMITER ;