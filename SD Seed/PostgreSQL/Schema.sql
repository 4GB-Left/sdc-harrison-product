DROP DATABASE IF EXISTS adidas;
CREATE DATABASE adidas;
\c adidas;

CREATE TABLE products(
  product_id           SERIAL               NOT NULL,
  product_name         VARCHAR(32)          NOT NULL,
  collection_name      VARCHAR(255)         NOT NULL,
  review_count         INT(16)              NOT NULL,
  review_average       DECIMAL(18,2)        NOT NULL,
  PRIMARY KEY(product_id)
);


CREATE TABLE colors(
  color_id     SERIAL                      NOT NULL,
  color_name   VARCHAR(1000)               NOT NULL,
  product_id   INT REFERENCES products(product_id) NOT NULL,
  color_url    VARCHAR(100)                NOT NULL,
  list_price   DECIMAL(18,2)               NOT NULL,
  sale_price   DECIMAL(18,2)               NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE inventory(
  inventory_id      SERIAL                    NOT NULL,
  color_id          INT REFERENCES colors(color_id) NOT NULL,
  size              VARCHAR(20)               NOT NULL,
  quantity          INT                       NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE photos(
  photo_id          SERIAL                    NOT NULL,
  color_id          INT REFERENCES colors(color_id) NOT NULL,
  photo_url         VARCHAR(255)              NOT NULL,
  PRIMARY KEY(id)
);

