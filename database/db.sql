USE DATABASE viverocoyoacan;

--modificaciones--
CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    name_proveedor VARCHAR(30) NOT NULL,
    rfc_proveedor VARCHAR(13)NOT NULL,
    dir_proveedor VARCHAR(100) NOT NULL,
    cont_proveedor VARCHAR(10) NOT NULL
);

INSER INTO Proveedores(NAME)

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    name_cliente VARCHAR(25) NOT NULL,
    ap_pat_cliente VARCHAR(20) NOT NULL,
    ap_mat_cliente VARCHAR(15) NOT NULL,
    dir_cliente VARCHAR(100) NOT NULL,
    tel_cliente VARCHAR(15) NOT NULL,
    mail_cliente VARCHAR(100) NOT NULL
);

CREATE TABLE eventos (
    id_evento SERIAL PRIMARY KEY,
    nombre_evento VARCHAR(32) NOT NULL,
    des_evento VARCHAR(150) NOT NULL,
    date_evento DATE NOT NULL,
    cost_evento NUMERIC(10,2) DEFAULT 0,
    cupo_maximo INT CHECK (cupo_maximo > 0)
);
INSERT INTO eventos (nombre_evento, des_evento, date_evento, cost_evento, cupo_maximo) 
VALUES 
('Taller de Jardinería Básica', 'Aprende a cuidar tus plantas de interior y exterior.', '2024-05-20', 150.00, 25);

--tabla intermedia conexión de eventos-clientes
CREATE TABLE inscripciones (
    id_inscripcion SERIAL PRIMARY KEY,
    id_evento INTEGER REFERENCES eventos(id_evento) ON DELETE CASCADE,
    id_cliente INTEGER REFERENCES clientes(id_cliente) ON DELETE CASCADE,
    fecha_registro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE trabajadores(
    id_trabajador SERIAL PRIMARY KEY, 
    name_trabajador VARCHAR (20) NOT NULL,
    ap_pat_trabajador VARCHAR (30) NOT NULL,
    ap_mat_trabajador VARCHAR (20) NOT NULL,
    direccion_trabajador VARCHAR (64) NOT NULL,
    tel_trabajador VARCHAR (10) NOT NULL,
    email_trabajador VARCHAR (64) NOT NULL
);

CREATE TABLE mantenimientos (
    id_mantenimiento SERIAL PRIMARY KEY,
    id_planta INTEGER REFERENCES plantas(id_planta) ON DELETE CASCADE,
    id_personal INTEGER REFERENCES trabajadores(tabajadorId) ON DELETE SET NULL,
    freq_riego VARCHAR(20) NOT NULL,
    type_fertilizacion VARCHAR(20) NOT NULL,
    obs_ejemplar VARCHAR(255)
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    name_producto VARCHAR(40) NOT NULL,
    info_producto VARCHAR(144),
    stock INTEGER NOT NULL,
    precio_producto NUMERIC(10, 2) NOT NULL,
    id_proveedor INTEGER REFERENCES proveedores(id_proveedor)
);
CREATE TABLE otros_servicios (
    id_servicio SERIAL PRIMARY KEY,
    name_servicio VARCHAR(50) NOT NULL,
    fecha_servicio DATE NOT NULL,
    desc_servicio VARCHAR(150),
    costo_servicio NUMERIC(10, 2) NOT NULL,
    id_producto INTEGER REFERENCES productos(id_producto) ON DELETE SET NULL
);

CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES clientes(id_cliente), -- RELACIÓN CON CLIENTE
    fecha_pedido DATE DEFAULT CURRENT_DATE,
    fecha_entrega DATE, -- Tu 'Timeout'
    estado VARCHAR(20) DEFAULT 'Pendiente', -- 'Pendiente', 'Listo', 'Entregado'
    total_estimado NUMERIC(10, 2) DEFAULT 0
);
--tabla de detalles
CREATE TABLE detalle_pedidos (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INTEGER REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    
    -- El item que quiere el cliente
    id_planta INTEGER REFERENCES plantas(id_planta),
    id_producto INTEGER REFERENCES productos(id_producto),
    
    -- A qué proveedor se lo vamos a pedir nosotros
    id_proveedor INTEGER REFERENCES proveedores(id_proveedor),
    
    cantidad INTEGER NOT NULL,
    precio_cotizado NUMERIC(10, 2) NOT NULL, -- Precio al que se lo venderás al cliente
    subtotal NUMERIC(10, 2) NOT NULL
);
/*carga de usuarios*/
INSERT INTO Trabajadores(nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador)
    VALUES('Efren', 'Banini', 'Salazar', 'Av tepozanes #16 NezaYork', '5566471525', 'bananini@gmail.com');
INSERT INTO Trabajadores(nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador)
    VALUES('Angelica Rosario', 'García', 'Reyes', 'Av. Río de los remedios, #61, San Juan Ixhuantepec', '5635737424', 'anggie@gmail.com');
/*PPRUEBAS*/
SELECT *FROM Trabajadores;


INSERT INTO plantas(namePlanta, nameCient, typePlanta, tamPlanta, typeLuz, frecuenciaRiego, precioPlanta)
    VALUES('Tulipan', 'Tulipa spp', 'Bulbosa', '40.2', 'indi', 'A diario', 100);

CREATE TABLE proveedores (
    id_proveedor NUMERIC(5) NOT NULL,
    name_proveedor VARCHAR(30) NOT NULL,
    rfc_proveedor VARCHAR(13) NOT NULL,
    dir_proveedor VARCHAR(100) NOT NULL,
    cont_proveedor NUMERIC(10) NOT NULL
    CONSTRAINT pk_proveedores PRIMARY KEY (IdProveedor),
    CONSTRAINT chk_idprov_positivo CHECK (IdProveedor > 0),
    CONSTRAINT uq_cont_proveedor UNIQUE (contProveedor),
    CONSTRAINT chk_cont_positivo CHECK (contProveedor > 0)
);

CREATE TABLE Plantas (
    IDPlanta NUMERIC(5) NOT NULL,
    namePlanta VARCHAR(20) NOT NULL,
    Stockpla NUMERIC(3) NOT NULL,
    nameCient VARCHAR(30) NOT NULL,
    tipoPlanta VARCHAR(15) NOT NULL,
    tamPlanta VARCHAR(15) NOT NULL,
    tipoLuz VARCHAR(7) NOT NULL,
    frecuenciaRiego VARCHAR(20) NOT NULL,
    IdProveedor NUMERIC(5) NOT NULL,
    precioPlanta NUMERIC(4) NOT NULL,
    
    CONSTRAINT pk_plantas PRIMARY KEY (IDPlanta),
    CONSTRAINT fk_plantas_proveedores FOREIGN KEY (IdProveedor) 
        REFERENCES Proveedores(IdProveedor),
    CONSTRAINT chk_id_positivo CHECK (IDPlanta > 0),
    CONSTRAINT chk_precio_positivo CHECK (precioPlanta >= 0)
);

CREATE TABLE Clientes (
    IdCliente NUMERIC(13) NOT NULL, 
    nameCliente VARCHAR(25) NOT NULL,
    apPatCliente VARCHAR(20) NOT NULL,
    apMatCliente VARCHAR(15) NOT NULL,
    dirCliente VARCHAR(100) NOT NULL,
    telCliente NUMERIC(10) NOT NULL,
    mailCliente VARCHAR(20) NOT NULL,
    CONSTRAINT pk_clientes PRIMARY KEY (IdCliente),
    CONSTRAINT chk_id_cliente_pos CHECK (IdCliente > 0),
    CONSTRAINT uq_tel_cliente UNIQUE (telCliente),
    CONSTRAINT chk_tel_cliente_pos CHECK (telCliente > 0),
    CONSTRAINT chk_formato_mail CHECK (mailCliente LIKE '%@%')
);

CREATE TABLE Trabajadores (
    IdPersonal NUMERIC(5) NOT NULL,
    nameEmpleado VARCHAR(25) NOT NULL,
    apPatEmpleado VARCHAR(20) NOT NULL,
    apMatEmpleado VARCHAR(15) NOT NULL,
    DateNacimiento DATE NOT NULL,
    dirEmpelado VARCHAR(100) NOT NULL,
    puestoEmp VARCHAR(20) NOT NULL,
    turnoEmp VARCHAR(10) NOT NULL,
    sueldoEmp NUMERIC(5) NOT NULL,
    altaEmp DATE NOT NULL,
    bajaEmp DATE NOT NULL,
    CONSTRAINT pk_trabajadores PRIMARY KEY (IdPersonal),
    CONSTRAINT chk_id_personal_pos CHECK (IdPersonal > 0),
    CONSTRAINT chk_sueldo_pos CHECK (sueldoEmp > 0)
);




CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    forma_pago VARCHAR(20) NOT NULL, -- Efectivo, Tarjeta, Transferencia
    total_venta NUMERIC(10, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'Pagado' -- Pagado, Pendiente
);

--tabla resultante
CREATE TABLE detalle_ventas (
    id_detalle SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id_venta) ON DELETE CASCADE,
    
    -- Aquí está el truco: 3 columnas opcionales
    id_planta INTEGER REFERENCES plantas(id_planta),
    id_producto INTEGER REFERENCES productos(id_producto),
    id_servicio INTEGER REFERENCES otros_servicios(id_servicio),
    
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL
);



CREATE TABLE Pedidos (
    idVenta NUMERIC(8) NOT NULL,
    IdCliente NUMERIC(13) NOT NULL, 
    IdProducto NUMERIC(5) NOT NULL,
    Unidades NUMERIC(4) NOT NULL,
    IdProveedor NUMERIC(5) NOT NULL,
    Timeout DATE NOT NULL,
    CONSTRAINT pk_pedidos PRIMARY KEY (idVenta),
    CONSTRAINT fk_pedidos_clientes FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    CONSTRAINT fk_pedidos_productos FOREIGN KEY (IdProducto) REFERENCES Productos(IdProducto),
    CONSTRAINT fk_pedidos_proveedores FOREIGN KEY (IdProveedor) REFERENCES Proveedores(IdProveedor),
    CONSTRAINT chk_idventa_pedidos_pos CHECK (idVenta > 0)
);

CREATE TABLE Mantenimiento (
    idMantenimiento NUMERIC(5) NOT NULL,
    IDPlanta NUMERIC(5) NOT NULL,
    freqRiego VARCHAR(20) NOT NULL,
    typeFertilizacion VARCHAR(20) NOT NULL,
    IdPersonal NUMERIC(5) NOT NULL,
    obsEjemplar VARCHAR(64) NOT NULL,
    CONSTRAINT pk_mantenimiento PRIMARY KEY (idMantenimiento),
    CONSTRAINT fk_mantenimiento_plantas FOREIGN KEY (IDPlanta) REFERENCES Plantas(IDPlanta),
    CONSTRAINT fk_mantenimiento_trabajadores FOREIGN KEY (IdPersonal) REFERENCES Trabajadores(IdPersonal),
    CONSTRAINT chk_id_mantenimiento_pos CHECK (idMantenimiento > 0)
);

CREATE TABLE Evento (
    IdEvento NUMERIC(4) NOT NULL,
    NomCurse VARCHAR(20) NOT NULL,
    DesEvento VARCHAR(150) NOT NULL,
    DateEvento DATE NOT NULL,
    CostEvento NUMERIC(4) NOT NULL,
    MaxPersonas NUMERIC(2) NOT NULL,
    IdCliente NUMERIC(13) NOT NULL, 
    CONSTRAINT pk_evento PRIMARY KEY (IdEvento),
    CONSTRAINT fk_evento_clientes FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    CONSTRAINT chk_idevento_pos CHECK (IdEvento > 0),
    CONSTRAINT chk_cupo_maximo CHECK (MaxPersonas >= 0 AND MaxPersonas <= 50),
    CONSTRAINT chk_costo_pos CHECK (CostEvento >= 0)
);

CREATE TABLE Credenciales (
    idCredencial NUMERIC(4) NOT NULL,
    user VARCHAR(10) NOT NULL,
    pass VARCHAR(8) NOT NULL,
    CONSTRAINT pk_credenciales PRIMARY KEY (idCredencial),
    CONSTRAINT fk_credenciales_trabajadores FOREIGN KEY (IdPersonal) REFERENCES Trabajadores(IdPersonal),
    CONSTRAINT chk_id_credencial_pos CHECK (idCredencial > 0),
    CONSTRAINT chk_pass_complejidad CHECK (pass ~ '[0-9]' AND pass ~ '[a-zA-Z]' AND pass ~ '[^a-zA-Z0-9]')
);


-- Datos para Proveedores
INSERT INTO Proveedores (IdProveedor, nameProveedor, RFCProveedor, dirProveedor, contProveedor) VALUES
(101, 'Viveros del Norte', 'VIN900101XYZ', 'Calle Robles 123, Norte', 5511223344),
(102, 'Fertilizantes Pro', 'FPR850505ABC', 'Av. Industrial 45', 5599887766),
(103, 'Semillas y Raices', 'SYR101010LMN', 'Blvd. Las Flores 789', 3344556677),
(104, 'Macetas de Barro', 'MDB200220PQR', 'Callejon del Alfarero 12', 8182838485),
(105, 'Jardines Globales', 'JGL150315TST', 'Carretera Nacional Km 50', 4422331100);

-- Datos para Clientes (IDs de 13 dígitos)
INSERT INTO Clientes (IdCliente, nameCliente, apPatCliente, apMatCliente, dirCliente, telCliente, mailCliente) VALUES
(1000000000001, 'Ana', 'Lopez', 'Garcia', 'Calle Luna 10', 5512340001, 'ana.l@gmail.com'),
(1000000000002, 'Carlos', 'Ruiz', 'Perez', 'Av Sol 20', 5512340002, 'cruiz@hotmail.com'),
(1000000000003, 'Maria', 'Soto', 'Diaz', 'Calle Estrella 30', 5512340003, 'm.soto@yahoo.com'),
(1000000000004, 'Luis', 'Vega', 'Cruz', 'Blvd Mar 40', 5512340004, 'lvega@outlook.com'),
(1000000000005, 'Sofia', 'Mora', 'Rios', 'Calle Rio 50', 5512340005, 'sofia.m@live.com');

-- Datos para Trabajadores
INSERT INTO Trabajadores (IdPersonal, nameEmpleado, apPatEmpleado, apMatEmpleado, DateNacimiento, dirEmpelado, puestoEmp, turnoEmp, sueldoEmp, altaEmp, bajaEmp) VALUES
(10, 'Jorge', 'Mendez', 'Solis', '1990-05-15', 'Calle 1', 'Gerente', 'Matutino', 15000, '2020-01-10', '2030-01-01'),
(20, 'Lucia', 'Gomez', 'Leon', '1995-08-20', 'Calle 2', 'Vendedor', 'Vespert', 8000, '2021-03-15', '2030-01-01'),
(30, 'Pedro', 'Hdez', 'Ruiz', '1988-12-01', 'Calle 3', 'Jardinero', 'Matutino', 9000, '2019-06-20', '2030-01-01'),
(40, 'Marta', 'Diaz', 'Paz', '2000-02-14', 'Calle 4', 'Cajero', 'Mixto', 7500, '2022-11-05', '2030-01-01'),
(50, 'Raul', 'Ortiz', 'Sanz', '1992-09-30', 'Calle 5', 'Almacen', 'Nocturno', 8500, '2020-08-01', '2030-01-01');

-- Datos para Plantas (Referencian a Proveedores 101-105)
/*INSERT INTO Plantas (IDPlanta, namePlanta, Stockpla, nameCient, tipoPlanta, tamPlanta, tipoLuz, frecuenciaRiego, IdProveedor, precioPlanta) VALUES
(1, 'Rosa Roja', 50, 'Rosa gallica', 'Floral', 'Mediano', 'Sol', 'Diario', 101, 150),
(2, 'Helecho', 30, 'Tracheophyta', 'Follaje', 'Grande', 'Sombra', 'Semanal', 102, 200),
(3, 'Cactus', 100, 'Cactaceae', 'Desertica', 'Pequeño', 'Sol', 'Mensual', 101, 80),
(4, 'Orquidea', 20, 'Orchidaceae', 'Floral', 'Pequeño', 'Sombra', 'Semanal', 103, 350),
(5, 'Ficus', 40, 'Ficus benjamina', 'Arbol', 'Grande', 'Media', '3 dias', 105, 500);*/

-- Datos para Productos (Referencian a Proveedores 101-105)
INSERT INTO Productos (IdProducto, nameProducto, infoProducto, stock, precioProducto, IdProveedor) VALUES
(501, 'Fertilizante Univ', 'Para todo tipo', 100, 120, 102),
(502, 'Pala Jardinera', 'Metal y madera', 50, 250, 104),
(503, 'Maceta Barro 5L', 'Artesanal', 200, 90, 104),
(504, 'Semillas Pasto', '1kg rendimiento', 80, 150, 103),
(505, 'Regadera Plast', 'Capacidad 3L', 60, 50, 105);

-- Datos para Credenciales (Referencian a Trabajadores 10-50)
-- NOTA: Las contraseñas cumplen la regla: 1 numero, 1 letra, 1 caracter especial
INSERT INTO Credenciales (idCredencial, IdPersonal, "user", pass) VALUES
(1001, 10, 'jorgeM', 'Jor123$'),
(1002, 20, 'luciaG', 'Lu!5678'),
(1003, 30, 'pedroH', 'Pe#9012'),
(1004, 40, 'martaD', 'Ma%3456'),
(1005, 50, 'raulO', 'Ra&7890');

-- Datos para Ventas (Referencian a Clientes y Productos)
INSERT INTO Ventas (idVenta, idCliente, idProducto, dateCompra, formaPago, totalPagado, saldoPendiente) VALUES
(1001, 1000000000001, 501, '2023-10-01', 'efectivo', 120, 0),
(1002, 1000000000002, 502, '2023-10-02', 'tarjeta', 250, 0),
(1003, 1000000000001, 503, '2023-10-03', 'transferencia', 180, 0),
(1004, 1000000000003, 501, '2023-10-04', 'efectivo', 60, 60),
(1005, 1000000000004, 505, '2023-10-05', 'tarjeta', 50, 0);

-- Datos para OtrosServicios (Referencian a Productos)
INSERT INTO OtrosServicios (IdServicio, NomServicio, DateServ, DescServicio, CostServicio, IdProducto) VALUES
(1, 'Envio Domicilio', '2023-10-01', 'Envio local', 50, 503),
(2, 'Envoltura Regalo', '2023-10-02', 'Papel especial', 20, 504),
(3, 'Asesoria', '2023-10-03', 'Uso fertilizante', 100, 501),
(4, 'Instalacion', '2023-10-04', 'Armado vivero', 500, 502),
(5, 'Transplante', '2023-10-05', 'Cambio maceta', 80, 503);

-- Datos para Pedidos (Referencian Cliente, Producto, Proveedor)
INSERT INTO Pedidos (idVenta, IdCliente, IdProducto, Unidades, IdProveedor, Timeout) VALUES
(2001, 1000000000001, 501, 2, 102, '2023-11-01'),
(2002, 1000000000002, 502, 1, 104, '2023-11-02'),
(2003, 1000000000003, 503, 5, 104, '2023-11-03'),
(2004, 1000000000004, 504, 10, 103, '2023-11-04'),
(2005, 1000000000005, 505, 3, 105, '2023-11-05');

-- Datos para Mantenimiento (Referencian Planta y Personal)
INSERT INTO Mantenimiento (idMantenimiento, IDPlanta, freqRiego, typeFertilizacion, IdPersonal, obsEjemplar) VALUES
(301, 1, 'Diario', 'Quimico', 30, 'Hojas sanas'),
(302, 2, 'Semanal', 'Organico', 30, 'Crecimiento lento'),
(303, 3, 'Mensual', 'Mineral', 20, 'Espinas fuertes'),
(304, 4, 'Semanal', 'Liquido', 30, 'Floracion activa'),
(305, 5, '3 dias', 'Solido', 20, 'Podar pronto');

-- Datos para Evento (Referencian Cliente, Cupo max 50)
INSERT INTO Evento (IdEvento, NomCurse, DesEvento, DateEvento, CostEvento, MaxPersonas, IdCliente) VALUES
(501, 'Curso Huertos', 'Aprende a cultivar', '2023-12-01', 500, 20, 1000000000001),
(502, 'Taller Bonsai', 'Tecnicas corte', '2023-12-05', 800, 15, 1000000000002),
(503, 'Charla Abonos', 'Tipos de tierra', '2023-12-10', 0, 50, 1000000000003),
(504, 'Expo Flores', 'Exhibicion anual', '2023-12-15', 100, 40, 1000000000001),
(505, 'Curso Riego', 'Sistemas auto', '2023-12-20', 300, 10, 1000000000004);CREATE TABLE Proveedores (
    IdProveedor NUMERIC(5) NOT NULL,
    nameProveedor VARCHAR(30) NOT NULL,
    RFCProveedor VARCHAR(13) NOT NULL,
    dirProveedor VARCHAR(100) NOT NULL,
    contProveedor NUMERIC(10) NOT NULL,
    CONSTRAINT pk_proveedores PRIMARY KEY (IdProveedor),
    CONSTRAINT chk_idprov_positivo CHECK (IdProveedor > 0),
    CONSTRAINT uq_cont_proveedor UNIQUE (contProveedor),
    CONSTRAINT chk_cont_positivo CHECK (contProveedor > 0)
);

CREATE TABLE Plantas (
    IDPlanta NUMERIC(5) NOT NULL,
    namePlanta VARCHAR(20) NOT NULL,
    Stockpla NUMERIC(3) NOT NULL,
    nameCient VARCHAR(30) NOT NULL,
    tipoPlanta VARCHAR(15) NOT NULL,
    tamPlanta VARCHAR(15) NOT NULL,
    tipoLuz VARCHAR(7) NOT NULL,
    frecuenciaRiego VARCHAR(20) NOT NULL,
    IdProveedor NUMERIC(5) NOT NULL,
    precioPlanta NUMERIC(4) NOT NULL,
    
    CONSTRAINT pk_plantas PRIMARY KEY (IDPlanta),
    CONSTRAINT fk_plantas_proveedores FOREIGN KEY (IdProveedor) 
        REFERENCES Proveedores(IdProveedor),
    CONSTRAINT chk_id_positivo CHECK (IDPlanta > 0),
    CONSTRAINT chk_precio_positivo CHECK (precioPlanta >= 0)
);

CREATE TABLE Clientes (
    IdCliente NUMERIC(13) NOT NULL, 
    nameCliente VARCHAR(25) NOT NULL,
    apPatCliente VARCHAR(20) NOT NULL,
    apMatCliente VARCHAR(15) NOT NULL,
    dirCliente VARCHAR(100) NOT NULL,
    telCliente NUMERIC(10) NOT NULL,
    mailCliente VARCHAR(20) NOT NULL,
    CONSTRAINT pk_clientes PRIMARY KEY (IdCliente),
    CONSTRAINT chk_id_cliente_pos CHECK (IdCliente > 0),
    CONSTRAINT uq_tel_cliente UNIQUE (telCliente),
    CONSTRAINT chk_tel_cliente_pos CHECK (telCliente > 0),
    CONSTRAINT chk_formato_mail CHECK (mailCliente LIKE '%@%')
);

CREATE TABLE Trabajadores (
    IdPersonal NUMERIC(5) NOT NULL,
    nameEmpleado VARCHAR(25) NOT NULL,
    apPatEmpleado VARCHAR(20) NOT NULL,
    apMatEmpleado VARCHAR(15) NOT NULL,
    DateNacimiento DATE NOT NULL,
    dirEmpelado VARCHAR(100) NOT NULL,
    puestoEmp VARCHAR(20) NOT NULL,
    turnoEmp VARCHAR(10) NOT NULL,
    sueldoEmp NUMERIC(5) NOT NULL,
    altaEmp DATE NOT NULL,
    bajaEmp DATE NOT NULL,
    CONSTRAINT pk_trabajadores PRIMARY KEY (IdPersonal),
    CONSTRAINT chk_id_personal_pos CHECK (IdPersonal > 0),
    CONSTRAINT chk_sueldo_pos CHECK (sueldoEmp > 0)
);

CREATE TABLE Productos (
    IdProducto NUMERIC(5) NOT NULL,
    nameProducto VARCHAR(40) NOT NULL,
    infoProducto VARCHAR(144) NOT NULL,
    stock NUMERIC(4) NOT NULL,
    precioProducto NUMERIC(4) NOT NULL,
    IdProveedor NUMERIC(5) NOT NULL,
    CONSTRAINT pk_productos PRIMARY KEY (IdProducto),
    CONSTRAINT fk_productos_proveedores FOREIGN KEY (IdProveedor) REFERENCES Proveedores(IdProveedor),
    CONSTRAINT chk_id_producto_pos CHECK (IdProducto > 0),
    CONSTRAINT chk_precio_producto_pos CHECK (precioProducto >= 0)
);

CREATE TABLE Ventas (
    idVenta NUMERIC(5) NOT NULL,
    idCliente NUMERIC(13) NOT NULL, -- CORREGIDO: Cambiado de 5 a 13 para coincidir con Clientes
    idProducto NUMERIC(5) NOT NULL,
    dateCompra DATE NOT NULL,
    formaPago VARCHAR(13) NOT NULL,
    totalPagado NUMERIC(6) NOT NULL,
    saldoPendiente NUMERIC(6) NOT NULL,
    CONSTRAINT pk_ventas PRIMARY KEY (idVenta),
    CONSTRAINT fk_ventas_clientes FOREIGN KEY (idCliente) REFERENCES Clientes(IdCliente),
    CONSTRAINT fk_ventas_productos FOREIGN KEY (idProducto) REFERENCES Productos(IdProducto),
    CONSTRAINT chk_idventa_pos CHECK (idVenta > 0),
    CONSTRAINT chk_total_pos CHECK (totalPagado >= 0),
    CONSTRAINT chk_saldo_pos CHECK (saldoPendiente >= 0),
    CONSTRAINT chk_forma_pago CHECK (formaPago IN ('efectivo', 'transferencia', 'tarjeta'))
);

CREATE TABLE OtrosServicios (
    IdServicio NUMERIC(8) NOT NULL,
    NomServicio VARCHAR(20) NOT NULL,
    DateServ DATE NOT NULL,
    DescServicio VARCHAR(150) NOT NULL,
    CostServicio NUMERIC(5) NOT NULL,
    IdProducto NUMERIC(5) NOT NULL,
    CONSTRAINT pk_otros_servicios PRIMARY KEY (IdServicio),
    CONSTRAINT fk_servicios_productos FOREIGN KEY (IdProducto) REFERENCES Productos(IdProducto),
    CONSTRAINT chk_id_servicio_pos CHECK (IdServicio > 0),
    CONSTRAINT chk_costo_servicio_pos CHECK (CostServicio >= 0)
);

CREATE TABLE Pedidos (
    idVenta NUMERIC(8) NOT NULL,
    IdCliente NUMERIC(13) NOT NULL, 
    IdProducto NUMERIC(5) NOT NULL,
    Unidades NUMERIC(4) NOT NULL,
    IdProveedor NUMERIC(5) NOT NULL,
    Timeout DATE NOT NULL,
    CONSTRAINT pk_pedidos PRIMARY KEY (idVenta),
    CONSTRAINT fk_pedidos_clientes FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    CONSTRAINT fk_pedidos_productos FOREIGN KEY (IdProducto) REFERENCES Productos(IdProducto),
    CONSTRAINT fk_pedidos_proveedores FOREIGN KEY (IdProveedor) REFERENCES Proveedores(IdProveedor),
    CONSTRAINT chk_idventa_pedidos_pos CHECK (idVenta > 0)
);

CREATE TABLE Mantenimiento (
    idMantenimiento NUMERIC(5) NOT NULL,
    IDPlanta NUMERIC(5) NOT NULL,
    freqRiego VARCHAR(20) NOT NULL,
    typeFertilizacion VARCHAR(20) NOT NULL,
    IdPersonal NUMERIC(5) NOT NULL,
    obsEjemplar VARCHAR(64) NOT NULL,
    CONSTRAINT pk_mantenimiento PRIMARY KEY (idMantenimiento),
    CONSTRAINT fk_mantenimiento_plantas FOREIGN KEY (IDPlanta) REFERENCES Plantas(IDPlanta),
    CONSTRAINT fk_mantenimiento_trabajadores FOREIGN KEY (IdPersonal) REFERENCES Trabajadores(IdPersonal),
    CONSTRAINT chk_id_mantenimiento_pos CHECK (idMantenimiento > 0)
);

CREATE TABLE Evento (
    IdEvento NUMERIC(4) NOT NULL,
    NomCurse VARCHAR(20) NOT NULL,
    DesEvento VARCHAR(150) NOT NULL,
    DateEvento DATE NOT NULL,
    CostEvento NUMERIC(4) NOT NULL,
    MaxPersonas NUMERIC(2) NOT NULL,
    IdCliente NUMERIC(13) NOT NULL, 
    CONSTRAINT pk_evento PRIMARY KEY (IdEvento),
    CONSTRAINT fk_evento_clientes FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    CONSTRAINT chk_idevento_pos CHECK (IdEvento > 0),
    CONSTRAINT chk_cupo_maximo CHECK (MaxPersonas >= 0 AND MaxPersonas <= 50),
    CONSTRAINT chk_costo_pos CHECK (CostEvento >= 0)
);

CREATE TABLE Credenciales (
    idCredencial NUMERIC(4) NOT NULL,
    IdPersonal NUMERIC(5) NOT NULL,
    "user" VARCHAR(10) NOT NULL,
    pass VARCHAR(8) NOT NULL,
    CONSTRAINT pk_credenciales PRIMARY KEY (idCredencial),
    CONSTRAINT fk_credenciales_trabajadores FOREIGN KEY (IdPersonal) REFERENCES Trabajadores(IdPersonal),
    CONSTRAINT chk_id_credencial_pos CHECK (idCredencial > 0),
    CONSTRAINT chk_pass_complejidad CHECK (pass ~ '[0-9]' AND pass ~ '[a-zA-Z]' AND pass ~ '[^a-zA-Z0-9]')
);


-- Datos para Proveedores
INSERT INTO Proveedores (IdProveedor, nameProveedor, RFCProveedor, dirProveedor, contProveedor) VALUES
(101, 'Viveros del Norte', 'VIN900101XYZ', 'Calle Robles 123, Norte', 5511223344),
(102, 'Fertilizantes Pro', 'FPR850505ABC', 'Av. Industrial 45', 5599887766),
(103, 'Semillas y Raices', 'SYR101010LMN', 'Blvd. Las Flores 789', 3344556677),
(104, 'Macetas de Barro', 'MDB200220PQR', 'Callejon del Alfarero 12', 8182838485),
(105, 'Jardines Globales', 'JGL150315TST', 'Carretera Nacional Km 50', 4422331100);

-- Datos para Clientes (IDs de 13 dígitos)
INSERT INTO Clientes (IdCliente, nameCliente, apPatCliente, apMatCliente, dirCliente, telCliente, mailCliente) VALUES
(1000000000001, 'Ana', 'Lopez', 'Garcia', 'Calle Luna 10', 5512340001, 'ana.l@gmail.com'),
(1000000000002, 'Carlos', 'Ruiz', 'Perez', 'Av Sol 20', 5512340002, 'cruiz@hotmail.com'),
(1000000000003, 'Maria', 'Soto', 'Diaz', 'Calle Estrella 30', 5512340003, 'm.soto@yahoo.com'),
(1000000000004, 'Luis', 'Vega', 'Cruz', 'Blvd Mar 40', 5512340004, 'lvega@outlook.com'),
(1000000000005, 'Sofia', 'Mora', 'Rios', 'Calle Rio 50', 5512340005, 'sofia.m@live.com');

-- Datos para Trabajadores
INSERT INTO Trabajadores (IdPersonal, nameEmpleado, apPatEmpleado, apMatEmpleado, DateNacimiento, dirEmpelado, puestoEmp, turnoEmp, sueldoEmp, altaEmp, bajaEmp) VALUES
(10, 'Jorge', 'Mendez', 'Solis', '1990-05-15', 'Calle 1', 'Gerente', 'Matutino', 15000, '2020-01-10', '2030-01-01'),
(20, 'Lucia', 'Gomez', 'Leon', '1995-08-20', 'Calle 2', 'Vendedor', 'Vespert', 8000, '2021-03-15', '2030-01-01'),
(30, 'Pedro', 'Hdez', 'Ruiz', '1988-12-01', 'Calle 3', 'Jardinero', 'Matutino', 9000, '2019-06-20', '2030-01-01'),
(40, 'Marta', 'Diaz', 'Paz', '2000-02-14', 'Calle 4', 'Cajero', 'Mixto', 7500, '2022-11-05', '2030-01-01'),
(50, 'Raul', 'Ortiz', 'Sanz', '1992-09-30', 'Calle 5', 'Almacen', 'Nocturno', 8500, '2020-08-01', '2030-01-01');

-- Datos para Plantas (Referencian a Proveedores 101-105)
INSERT INTO Plantas (IDPlanta, namePlanta, Stockpla, nameCient, tipoPlanta, tamPlanta, tipoLuz, frecuenciaRiego, IdProveedor, precioPlanta) VALUES
(1, 'Rosa Roja', 50, 'Rosa gallica', 'Floral', 'Mediano', 'Sol', 'Diario', 101, 150),
(2, 'Helecho', 30, 'Tracheophyta', 'Follaje', 'Grande', 'Sombra', 'Semanal', 102, 200),
(3, 'Cactus', 100, 'Cactaceae', 'Desertica', 'Pequeño', 'Sol', 'Mensual', 101, 80),
(4, 'Orquidea', 20, 'Orchidaceae', 'Floral', 'Pequeño', 'Sombra', 'Semanal', 103, 350),
(5, 'Ficus', 40, 'Ficus benjamina', 'Arbol', 'Grande', 'Media', '3 dias', 105, 500);

-- Datos para Productos (Referencian a Proveedores 101-105)
INSERT INTO Productos (IdProducto, nameProducto, infoProducto, stock, precioProducto, IdProveedor) VALUES
(501, 'Fertilizante Univ', 'Para todo tipo', 100, 120, 102),
(502, 'Pala Jardinera', 'Metal y madera', 50, 250, 104),
(503, 'Maceta Barro 5L', 'Artesanal', 200, 90, 104),
(504, 'Semillas Pasto', '1kg rendimiento', 80, 150, 103),
(505, 'Regadera Plast', 'Capacidad 3L', 60, 50, 105);

-- Datos para Credenciales (Referencian a Trabajadores 10-50)
-- NOTA: Las contraseñas cumplen la regla: 1 numero, 1 letra, 1 caracter especial
INSERT INTO Credenciales (idCredencial, IdPersonal, "user", pass) VALUES
(1001, 10, 'jorgeM', 'Jor123$'),
(1002, 20, 'luciaG', 'Lu!5678'),
(1003, 30, 'pedroH', 'Pe#9012'),
(1004, 40, 'martaD', 'Ma%3456'),
(1005, 50, 'raulO', 'Ra&7890');

-- Datos para Ventas (Referencian a Clientes y Productos)
INSERT INTO Ventas (idVenta, idCliente, idProducto, dateCompra, formaPago, totalPagado, saldoPendiente) VALUES
(1001, 1000000000001, 501, '2023-10-01', 'efectivo', 120, 0),
(1002, 1000000000002, 502, '2023-10-02', 'tarjeta', 250, 0),
(1003, 1000000000001, 503, '2023-10-03', 'transferencia', 180, 0),
(1004, 1000000000003, 501, '2023-10-04', 'efectivo', 60, 60),
(1005, 1000000000004, 505, '2023-10-05', 'tarjeta', 50, 0);

-- Datos para OtrosServicios (Referencian a Productos)
INSERT INTO OtrosServicios (IdServicio, NomServicio, DateServ, DescServicio, CostServicio, IdProducto) VALUES
(1, 'Envio Domicilio', '2023-10-01', 'Envio local', 50, 503),
(2, 'Envoltura Regalo', '2023-10-02', 'Papel especial', 20, 504),
(3, 'Asesoria', '2023-10-03', 'Uso fertilizante', 100, 501),
(4, 'Instalacion', '2023-10-04', 'Armado vivero', 500, 502),
(5, 'Transplante', '2023-10-05', 'Cambio maceta', 80, 503);

-- Datos para Pedidos (Referencian Cliente, Producto, Proveedor)
INSERT INTO Pedidos (idVenta, IdCliente, IdProducto, Unidades, IdProveedor, Timeout) VALUES
(2001, 1000000000001, 501, 2, 102, '2023-11-01'),
(2002, 1000000000002, 502, 1, 104, '2023-11-02'),
(2003, 1000000000003, 503, 5, 104, '2023-11-03'),
(2004, 1000000000004, 504, 10, 103, '2023-11-04'),
(2005, 1000000000005, 505, 3, 105, '2023-11-05');

-- Datos para Mantenimiento (Referencian Planta y Personal)
INSERT INTO Mantenimiento (idMantenimiento, IDPlanta, freqRiego, typeFertilizacion, IdPersonal, obsEjemplar) VALUES
(301, 1, 'Diario', 'Quimico', 30, 'Hojas sanas'),
(302, 2, 'Semanal', 'Organico', 30, 'Crecimiento lento'),
(303, 3, 'Mensual', 'Mineral', 20, 'Espinas fuertes'),
(304, 4, 'Semanal', 'Liquido', 30, 'Floracion activa'),
(305, 5, '3 dias', 'Solido', 20, 'Podar pronto');

-- Datos para Evento (Referencian Cliente, Cupo max 50)
INSERT INTO Evento (IdEvento, NomCurse, DesEvento, DateEvento, CostEvento, MaxPersonas, IdCliente) VALUES
(501, 'Curso Huertos', 'Aprende a cultivar', '2023-12-01', 500, 20, 1000000000001),
(502, 'Taller Bonsai', 'Tecnicas corte', '2023-12-05', 800, 15, 1000000000002),
(503, 'Charla Abonos', 'Tipos de tierra', '2023-12-10', 0, 50, 1000000000003),
(504, 'Expo Flores', 'Exhibicion anual', '2023-12-15', 100, 40, 1000000000001),
(505, 'Curso Riego', 'Sistemas auto', '2023-12-20', 300, 10, 1000000000004);