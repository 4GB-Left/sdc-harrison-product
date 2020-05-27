CREATE KEYSPACE adidas
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 1
  };

CREATE TABLE IF NOT EXISTS products {
  product_id number,
  product_name text,
  collection_name text,
  product_review_count number,
  product_review_avg number,
  PRIMARY KEY (product_id)
}

CREATE TABLE IF NOT EXISTS colors {
  product_id number,
  color_id number,
  color_name text,
  color_url text,
  color_list_price number,
  color_sale_price number,
  PRIMARY KEY (product_id)
}

CREATE TABLE IF NOT EXISTS inventory {
  product_id number,
  color_id number,
  size text,
  quantity number,
  PRIMARY KEY (product_id)
}

CREATE TABLE IF NOT EXISTS photos {
  product_id number,
  color_id number,
  photos set,
  PRIMARY KEY (product_id)
};