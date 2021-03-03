CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE usuario(
    id int NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(50) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY(id));

CREATE TABLE producto(
    id int NOT NULL AUTO_INCREMENT,
    fullNAme VARCHAR(50) NOT NULL,
    brand VARCHAR(40) NOT NULL,
    description VARCHAR(100),
    category VARCHAR(50) NOT NULL DEFAULT 'General',
    price float NOT NULL DEFAULT 0.0,
    inStock int NOT NULL DEFAULT 0,
    image VARCHAR(40),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY(id));

CREATE TABLE orden(
    id int NOT NULL AUTO_INCREMENT,
    userId int NOT NULL,
    orderItems VARCHAR(400) NOT NULL,
    shippingAddress VARCHAR(100),
    paymentMethod VARCHAR(20),
    shippingPrice float NOT NULL DEFAULT 0.0,
    totalPrice float NOT NULL DEFAULT 0,
    isPaid BOOLEAN NOT NULL DEFAULT 0,
    paidAt DATETIME,
    isDelivered BOOLEAN NOT NULL DEFAULT 0,
    deliveredAt DATETIME,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(userId) REFERENCES usuario(id));

