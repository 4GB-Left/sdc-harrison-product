const {Client} = require('pg');
const config = require('./db.config.js');

const client = new Client(config);
client.connect();

module.exports = {
  //returns all info about a product, formatted as JSON

  getSingleProduct: (product_id, callback) => {
    let sqlQuery = `SELECT * FROM products WHERE product_id = ${product_id}`;
    client.query(sqlQuery, (err, product) => {
      if (err) {
        callback(err);
      } else {
        callback(null, product.rows);
      }
    })
  },

  getColorsByProduct: (product_id, callback) => {
    let sqlQuery = `SELECT * FROM colors WHERE product_id = ${product_id}`
      client.query(sqlQuery, (err, colors) => {
        if (err) {
          callback(err);
        } else {
          callback(null, colors.rows)
        }
      })

  },

  getPhotosByProduct: (product_id, callback) => {
    let sqlQuery = `SELECT * FROM photos WHERE product_id = ${product_id}`
      client.query(sqlQuery, (err,photos) => {
        if (err) {
          callback(err);
        } else {
          callback(null, photos.rows)
        }
      })

  },

  getInventoryByProduct: (product_id, callback) => {
    let sqlQuery = `SELECT * FROM  WHERE product_id = ${product_id}`
      client.query(sqlQuery, (err, inventory) => {
        if (err) {
          callback(err);
        } else {
          callback(null, inventory.rows)
        }
      })

  },



  getProductById: (product_id, callback) => {
    let sqlQuery = `SELECT * FROM products WHERE product_id=${product_id}`;
    client.query(sqlQuery, (prodErr, shoe) => {
      if (prodErr) {
        console.log('error in query');
        callback(prodErr);
      } else {
        console.log('successful product query');
        let product = {
          id: shoe.product_id,
          adidas_id: shoe.adidas_id,
          product_name: shoe.product_name,
          collection_name: shoe.collection_name,
          review_count: shoe.review_count,
          review_average: shoe.review_average,
          colors: []
        };

        client.query(`SELECT * FROM colors WHERE colors.product_id = ${product_id}`, (colorErr, colors) => {
          if (colorErr) {
            callback(colorErr);
          } else {
            console.log('successful color query');
            let colorArray = [];
            for (var x = 0; x <= colors.length - 1; x++) {
              let aColor = {
                color_id: colors[x].color_id,
                product_id: colors[x].product_id,
                color_name: colors[x].color_name,
                color_url: colors[x].url,
                list_price: colors[x].list_price,
                sale_price: colors[x].sale_price,
                inventory: [],
                photos: [],
              };
              client.query(`SELECT * FROM photos WHERE photos.product_id = ${product_id}`, (photoErr, photos) => {
                if (photoErr) {
                  callback(photoErr);
                } else {
                  console.log('successful photo query')
                  for (var j = 0; j <= photos.length - 1; j++) {
                    let aPhoto = {
                      photo_id: photos[j].photo_id,
                      product_id: photos[j].product_id,
                      color_id: photos[j].color_id,
                      photo_url: photos[j].photo_url
                    }
                    aColor.photos.push(aPhoto);
                  }
                }
              })
              client.query(`SELECT * FROM inventory WHERE inventory.product_id = ${product_id}`, (invErr, inventory) => {
                if (invErr) {
                  callback(invErr);
                } else {
                  console.log('successful inventory query');
                  for (var z = 0; z <= inventory.length - 1; z++) {
                    let anInventory = {
                      inventory_id: inventory[z].inventory_id,
                      product_id: inventory[z].product_id,
                      color_id: inventory[z].color_id,
                      size: inventory[z].size,
                      quantity: inventory[z].quantity
                    }
                    aColor.inventory.push(anInventory);
                  }
                }
              })
              colorArray.push(aColor);
            }
            product.colors.concat(colorArray);
          }
        })
        callback(null, product);
      }
    });
  },
  joinMadness: (product_id, callback) => {
    let sqlQuery = `SELECT * FROM products INNER JOIN colors ON colors.product_id = ${product_id} INNER JOIN photos ON photos.product_id = ${product_id} INNER JOIN inventory ON inventory.product_id = ${product_id} WHERE products.product_id = ${product_id}`;
    client.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result.rows);
      }
    })
  }
};