CREATE SCHEMA IF NOT EXISTS DataWarehouse;

use DataWarehouse;

CREATE TABLE IF NOT EXISTS roles (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles (description) VALUES ("admin"), ("user");

CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  roleId int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY roleId (roleId),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users 
(username, name, last_name, email, password, roleId)
VALUES ("admin","Alejandro","Roldan","aroldan@admin.com", "Admin1", 1),
("usuario1","Ignacio","Perez","iperez@usuario.com", "Usuario1", 2),
("usuario2","Sergio","Martinez","smartinez@usuario.com", "Usuario2", 2);

CREATE TABLE IF NOT EXISTS regions (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO regions
(description) 
VALUES ("Sudamerica"), ("Centroamerica"), ("Norteamerica");

CREATE TABLE IF NOT EXISTS countries (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    regionId int DEFAULT NULL,
    PRIMARY KEY (id),
    KEY regionId (regionId),
    CONSTRAINT countries_ibfk_1 FOREIGN KEY (regionId) REFERENCES regions (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO countries
(description, regionId) 
VALUES ("Colombia", 1), ("Argentina", 1), ("Brasil", 1), ("Mexico", 2), ("EEUU", 3);

CREATE TABLE IF NOT EXISTS cities (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    countryId int DEFAULT NULL,
    PRIMARY KEY (id),
    KEY countryId (countryId),
    CONSTRAINT cities_ibfk_1 FOREIGN KEY (countryId) REFERENCES countries (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO cities
(description, countryId) 
VALUES ("Medellin", 1), ("Cali", 1),
("Buenos Aires", 2), ("Córdoba", 2),
("Río de Janeiro", 3), ("Sao Pablo", 3),
("CDMX", 4), ("Monterrey", 4),
("Miami", 5), ("NYC", 5);

CREATE TABLE IF NOT EXISTS companies (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phone varchar(255) NOT NULL,
  cityId int DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT companies_ibfk_1 FOREIGN KEY (cityId) REFERENCES cities (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO companies (name, address, email, phone, cityId)
VALUES ("Ruta N", "Calle siempre viva", "Rutan@outlook.com", "3829392", 1),
("Argos", "Calle 32", "Argos@argos.com", "5455454", 2),
("Tigo", "Carrera 41", "Tigo@tigo.com", "2432464", 3),
("Claro", "Avenida 1", "Claro@claro.com", "8676575", 4);

CREATE TABLE IF NOT EXISTS contacts (
  id int NOT NULL AUTO_INCREMENT,
  full_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  cityId int DEFAULT NULL,
  companyId int DEFAULT NULL,
  position varchar(255) NOT NULL,
  fav_channel varchar(255) NOT NULL,
  interest varchar(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT contacts_ibfk_1 FOREIGN KEY (cityId) REFERENCES cities (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO contacts (full_name, email, cityId, companyId, position, fav_channel, interest)
VALUES ("Carlos Lopez", "clopez@outlook.com", 1, 2, "Web Developer", "Email", "50"),
("Rafael Orozco", "rorozco@outlook.com", 3, 2, "Web Developer", "Email", "25"),
("Sergio Serna", "sserna@outlook.com", 1, 3, "Database Administrator", "Whatsapp", "50"),
("Oscar Osorio", "oosorio@outlook.com", 2, 3, "Web Developer", "Email", "50"),
("Armando calle", "acalle@outlook.com", 5, 4, "Data Analyst", "Email", "25"),
("Laura Tobon", "ltobon@outlook.com", 2, 4, "Web Developer", "Call", "75"),
("Claudia Serna", "cserna@outlook.com", 2, 2, "Architect of Solutions", "Email", "50"),
("Sara Ocampo", "socampo@outlook.com", 1, 1, "Database Administrator", "Email", "0")
