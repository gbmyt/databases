DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  room_name TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  msg TEXT,
  user TEXT,
  id_Users INT,
  id_Rooms INT,
  PRIMARY KEY(id),
  FOREIGN KEY(id_Users) REFERENCES users(id),
  FOREIGN KEY(id_Rooms) REFERENCES rooms(id)

  -- FOREIGN KEY (SomeEntityID) REFERENCES SomeEntityTable(ID) ON DELETE CASCADE;

);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

