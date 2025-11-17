USE DATABASE viverocoyoacan;

CREATE TABLE Trabajadores(
    tabajadorId SERIAL PRIMARY KEY, 
    nameTrabajador VARCHAR (20) NOT NULL,
    apPatTrabajador VARCHAR (30) NOT NULL,
    apMatTrabajador VARCHAR (20) NOT NULL,
    direccionTrabajador VARCHAR (64) NOT NULL,
    telTrabajador VARCHAR (10) NOT NULL,
    emailTrabajador VARCHAR (64) NOT NULL
);

/*carga de usuarios*/
INSERT INTO Trabajadores(nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador)
    VALUES('Efren', 'Banini', 'Salazar', 'Av tepozanes #16 NezaYork', '5566471525', 'bananini@gmail.com');
INSERT INTO Trabajadores(nameTrabajador, apPatTrabajador, apMatTrabajador, direccionTrabajador, telTrabajador, emailTrabajador)
    VALUES('Angelica Rosario', 'García', 'Reyes', 'Av. Río de los remedios, #61, San Juan Ixhuantepec', '5635737424', 'anggie@gmail.com');
/*PPRUEBAS*/
SELECT *FROM Trabajadores;