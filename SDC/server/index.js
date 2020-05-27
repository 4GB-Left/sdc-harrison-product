const express = require('express');
const app = express();
const port = 4500;
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const postgres = require('../PostgreSQL/db');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log('k');
  res.send('k');
})


app.get('/api/products/', (req, res) => {
  //use postgres to get product
  console.log("YAYY");
  postgres.joinMadness(req.query.product_id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      let rows = result;
      let colors = {};
      let inventories = {};
      let seenColors = [];
      let product = {
        id: rows[0].id,
        adidas_id: rows[0].adidas_id,
        name: rows[0].name,
        collection_name: rows[0].collection_name,
        review_count: rows[0].review_count,
        review_average: rows[0].review_average,
        colors: []
      }
      colorInd = 0;
      for (var x = 0; x <= rows.length -1 ; x++) {
        let color = {
          id: rows[x].color_id,
          url: rows[x].color_url,
          name: rows[x].color_name,
          inventory: [],
          photos: []
        }
        if (!colors[color.id]) {
          colors[color.id] = color;
          colors[color.id].colorInd = colorInd;
          product.colors.push(color);
          console.log(color);
          seenColors.push(color.id);
        }
        let colorIndex = Number(rows[x].photo_url.split('_')[1].slice(5));
        if (!product.colors[colorIndex].photos.includes(rows[x].photo_url)) {
            product.colors[colorIndex].photos.push(rows[x].photo_url);
        }
        if (!inventories[rows[x].inventory_id]) {
          inventories[rows[x].inventory_id] = {
            size: rows[x].size,
            quantity: rows[x].quantity
          }
          colors[color.id].inventory.push(inventories[rows[x].inventory_id]);
        }
      }
      res.status(200).send(product);
    }
    res.end();
  })



  // postgres.getSingleProduct(req.query.product_id, (err_prod, productList) => {
  //   if (err_prod) {
  //     res.status(400).send(err_prod);
  //   } else {
  //     let product = productList[0];
  //     let shoe = {
  //       id: product.id,
  //       adidas_id: product.adidas_id,
  //       name: product.product_name,
  //       collection_name: product.collection_name,
  //       review_count: product.review_count,
  //       review_average: product.review_average,
  //       colors: []
  //     };
  //     postgres.getColorsByProduct(shoe.id, (err_col, colorList) => {
  //       if (err_col) {
  //         res.status(400).send(err_col);
  //       } else {
  //         for (var x = 0 ; x <= colorList.length - 1; x++) {
  //           let aColor = colorList[x];
  //           let color = {
  //             id: aColor.id,
  //             url: aColor.color_url,
  //             name: aColor.color_name,
  //             list_price: aColor.list_price,
  //             sale_price: aColor.sale_price,
  //             inventory: [],
  //             photos: [],
  //           }
  //           postgres.getInventoryByProduct(colorList[x].product_id, (err_inv, inventoryList) => {
  //             if (err_inv) {
  //               res.status(400).send(err_inv);
  //             } else {
  //               for (var j = 0; j <= inventoryList.length - 1; j++) {
  //                 let anInventory = inventoryList[j];
  //                 let inventory = {
  //                   size: anInventory.size,
  //                   quantity: anInventory.quantity
  //                 }
  //                 aColor.inventory.push(inventory);
  //               }
  //             }
  //           })
  //           postgres.getPhotosByProduct(colorList[x].product_id, (err_photo, photoList) => {
  //             if (err_photo) {
  //               res.status(400).send(err_photo);
  //             }
  //             for (var y = 0; y = photoList.length - 1; y++) {
  //               let aPhoto = photoList[y];
  //               color.photos.push(aPhoto.photo_url)
  //             }
  //           })
  //           shoe.colors.push(color);
  //         }
  //       }
  //     })
  //     res.status(200).send(shoe);
  //   }
  //   res.end();
  // })


})
app.use(express.static(__dirname + '/'));
app.listen(port,() => {
  console.log('listening on port: ', port);
})