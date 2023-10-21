CREATE DATABASE nodeCRUD DEFAULT CHARACTER SET utf8 collate utf8_general_ci;
CREATE USER 'crud2023'@'%' IDENTIFIED BY 'crud2023!';
GRANT ALL PRIVILEGES ON nodeCRUD.* to 'crud2023'@'%';

use nodeCRUD;

CREATE TABLE members (
	id VARCHAR(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE posts (
	num INT NOT NULL AUTO_INCREMENT,
    id VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    PRIMARY KEY(num),
	FOREIGN KEY(id) REFERENCES members(id)
);

SELECT  *
  FROM  members;
SELECT  *
  FROM  posts; 
SELECT  *
  FROM  sessions;
  
drop table members;
drop table posts;

truncate members;
truncate posts;
truncate sessions;