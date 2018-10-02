DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon_db;

use bamazon_db;


create table sale_items (
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	product_name varchar(255) NOT NULL,
	department_name varchar(255) NOT NULL,
	price float NOT Null,
	quantity MEDIUMINT,
	PRIMARY KEY (ID)
)AUTO_INCREMENT=1;

create table managers (
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	user_name varchar(255) NOT NULL,
	pass_word varchar(35) NOT NULL,
	PRIMARY KEY (ID)
)AUTO_INCREMENT=1;