
CREATE DATABASE  amigo_fiel;
USE amigo_fiel;


CREATE TABLE dono (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    endereco VARCHAR(200) NOT NULL
);


CREATE TABLE pet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_dono INT NOT NULL,
    nome_pet VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    observacoes TEXT,
    FOREIGN KEY (id_dono) REFERENCES donos(id) ON DELETE CASCADE
);
