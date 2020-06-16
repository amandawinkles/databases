
USE chat;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
 id INTEGER NOT NULL AUTO_INCREMENT,
  message VARCHAR(30) NOT NULL,
  user INTEGER NOT NULL,
  room INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'rooms'
--
-- ---

DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms (
  id INTEGER NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE messages ADD FOREIGN KEY (user) REFERENCES users (id);
ALTER TABLE messages ADD FOREIGN KEY (room) REFERENCES rooms (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`id`,`message`,`user`,`room`) VALUES
-- ('','','','');
-- INSERT INTO `users` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `rooms` (`id`,`roomname`) VALUES
-- ('','');

/* Create other tables and define schemas for them here! */



-- -- ---
-- -- Globals
-- -- ---

-- -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- -- SET FOREIGN_KEY_CHECKS=0;

-- -- ---
-- -- Table 'messages'
-- --
-- -- ---

-- -- DROP TABLE IF EXISTS `messages`;

-- -- CREATE TABLE `messages` (
-- --   `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
-- --   `message` VARCHAR(30) NULL DEFAULT NULL,
-- --   `user` INTEGER NULL DEFAULT NULL,
-- --   `room` INTEGER NULL DEFAULT NULL,
-- --   PRIMARY KEY (`id`)
-- -- );

-- -- ---
-- -- Table 'users'
-- --
-- -- ---

-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users (
--   id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   name VARCHAR(30) NULL DEFAULT NULL,
--   PRIMARY KEY (id)
-- );

-- -- ---
-- -- Table 'rooms'
-- --
-- -- ---

-- DROP TABLE IF EXISTS rooms;

-- CREATE TABLE rooms (
--   id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   roomname VARCHAR(30) NULL DEFAULT NULL,
--   PRIMARY KEY (id)
-- );

-- -- ---
-- -- Foreign Keys
-- -- ---

-- ALTER TABLE messages ADD FOREIGN KEY (user) REFERENCES users (id);
-- ALTER TABLE messages ADD FOREIGN KEY (room) REFERENCES rooms (id);

-- INSERT INTO `messages` (`id`,`message`,`user`,`room`) VALUES
-- ('','','','');
-- INSERT INTO `users` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `rooms` (`id`,`roomname`) VALUES
-- ('','');

/* Create other tables and define schemas for them here! */



-- -- ---
-- -- Globals
-- -- ---

-- -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- -- SET FOREIGN_KEY_CHECKS=0;

-- -- ---
-- -- Table 'messages'
-- --
-- -- ---

-- -- DROP TABLE IF EXISTS `messages`;

-- -- CREATE TABLE `messages` (
-- --   `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
-- --   `message` VARCHAR(30) NULL DEFAULT NULL,
-- --   `user` INTEGER NULL DEFAULT NULL,
-- --   `room` INTEGER NULL DEFAULT NULL,
-- --   PRIMARY KEY (`id`)
-- -- );

-- -- ---
-- -- Table 'users'
-- --
-- -- ---

-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users (
--   id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   name VARCHAR(30) NULL DEFAULT NULL,
--   PRIMARY KEY (id)
-- );

-- -- ---
-- -- Table 'rooms'
-- --
-- -- ---

-- DROP TABLE IF EXISTS rooms;

-- CREATE TABLE rooms (
--   id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   roomname VARCHAR(30) NULL DEFAULT NULL,
--   PRIMARY KEY (id)
-- );

-- -- ---
-- -- Foreign Keys
-- -- ---

-- ALTER TABLE messages ADD FOREIGN KEY (user) REFERENCES users (id);
-- ALTER TABLE messages ADD FOREIGN KEY (room) REFERENCES rooms (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`id`,`message`,`user`,`room`) VALUES
-- ('','','','');
-- INSERT INTO `users` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `rooms` (`id`,`roomname`) VALUES
-- ('','');


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

