CREATE SCHEMA `business_directory_db` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `business_directory_db`.`tbl_admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `fullname` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `role` TINYINT(1) NULL,
  `status` TINYINT(1) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `business_directory_db`.`tbl_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `fullname` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(15) NULL,
  `status` TINYINT(1) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tbl_bus_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(45) DEFAULT NULL,
  `type_desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `tbl_business` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `bus_name` varchar(45) DEFAULT NULL,
  `bus_des` text,
  `bus_type` int DEFAULT NULL,
  `bus_category` varchar(45) DEFAULT NULL,
  `bus_phone` varchar(15) DEFAULT NULL,
  `bus_work_phone` varchar(15) DEFAULT NULL,
  `bus_email` varchar(30) DEFAULT NULL,
  `bus_fb_page` varchar(45) DEFAULT NULL,
  `bus_address` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `tbl_bus_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) DEFAULT NULL,
  `category_desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
