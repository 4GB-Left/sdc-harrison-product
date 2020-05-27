const {Client} = require('pg');
const config = require('./db.config.js.js');

const client = new Client(config);
client.connect();

module.exports = {
  //returns a list of items -- all of which belong to a single look
  getItemsByLookId: (lookId, callback) => {
    let sqlQuery = `SELECT * FROM carouselJunc LEFT JOIN products ON (productid1=products.id) OR (productid2=products.id) OR (productid3=products.id) WHERE carouselJunc.lookId=${lookId}`;
    client.query(sqlQuery, (err, result) => {
      if (err) {
        console.log('error in query');
        callback(err);
      } else {
        console.log('successful query');
        callback(null, result);
      }
    });
  },

  /**
   *
   * `SELECT * FROM carouselJunc LEFT JOIN products ON (carouselJunc.productid1=${productId} OR carouselJunc.productid2=${productId} OR carouselJunc.productid3=${productId}) WHERE (carouselJunc.productid1=products.id OR carouselJunc.productid2=products.id OR carouselJunc.productid3=products.id)`
   *
   *
   * `select * from carouselJunc INNER JOIN products ON (carouselJunc.productId1 = products.id OR carouselJunc.productId2 = products.id OR carouselJunc.productId3 = products.id) WHERE products.id=${productId} OR products.id IN (SELECT productId FROM looksJunc)`
   */

  //returns all items listed on ANY look where at least one of the carousels contains a given productID
  getLooksByProductId: (productId, callback) => {
    console.log('called');
    let sqlQuery = 'select * from carouselJunc INNER JOIN products ON (carouselJunc.productId1 = products.id OR carouselJunc.productId2 = products.id OR carouselJunc.productId3 = products.id) WHERE products.id IN (SELECT productId FROM looksJunc) OR carouselJunc.lookId IN (SELECT lookId from looksJunc)';
    client.query(sqlQuery, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },

  getLookDetails: (LookIdString, callback) => {
    console.log('names', LookIdString);
    let query = `SELECT * FROM looks WHERE id IN (${LookIdString})`;
    client.query(query, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },

  getAllItems: (callback) => {
    client.query('select * from products', (err, result) => {
      if (err) {
        callback(err);
      } else {
        console.log(result.rows);
        callback(null, result);
      }
    });
  },

  insertIntoProducts: (product) => {
    const {name, imgUrl, type, rating, brand, price, description, size, color, productUrl} = product;
    client.query(`INSERT INTO products ( name, imgUrl, type, rating, brand, price, description, size, color, productUrl) VALUES ('${product.name}', '${product.imgUrl}', '${product.type}', ${product.rating}, '${product.brand}', ${product.price}, '${product.description}', '${product.size}', '${product.color}', '${product.productUrl}')`, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('new product inserted');
      }
    });
  },

  insertIntoLooks: (look) => {
    const {name, creator, creatorImgUrl} = look;
    client.query(`INSERT INTO looks (name, creator, creatorImgUrl) VALUES ('${look.name}', '${look.creator}', '${look.creatorImgUrl}')`, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('new look inserted');
      }
    });
  },

  insertIntoCarouselJunction: (carousel) => {
    const {type, lookId, productId1, productId2, productId3} = carousel;
    client.query(`INSERT INTO carouselJunc (type, lookId, productId1, productId2, productId3) VALUES ('${carousel.type}','${carousel.lookId}', '${carousel.productId1}','${carousel.productId2}','${carousel.productId3}')`, (err, result)=> {
      if (err) {
        throw err;
      } else {
        console.log('new carousel junc inserted');
      }
    });
  },

  insertIntoLooksJunction: (junc) => {
    const {lookId, productId} = junc;
    client.query(`INSERT INTO looksJunc (lookId, productId) VALUES ('${junc.lookId}','${junc.productId}')`, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('new junction inserted');
      }
    });
  },

  updateLookCarousels: (lookId, update) => {
    client.query(`UPDATE looks SET tops=${update.tops}, bottoms=${update.bottoms}, footwear=${update.footwear} WHERE id=${lookId}`, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('successfullly updated Look table');
      }
    });
  }


};