const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

fs.readFile('../db/data.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  } else {
    let results = JSON.parse(data);
    let copy = JSON.parse(data);
    for (var i = 0; i < 10000; i++) {
      results = results.concat(copy);
    }
    let shoes = results;
    let shoeCollection = [];
    let colorCollection = [];
    let imgCollection = [];
    let inventoryCollection = [];
    shoes.forEach((shoe, shoeInd) => {
      shoe.product_id = shoeInd;
      shoe.product_name = shoe.name
      shoe.adidas_id = shoe.id;
      shoe.colors.forEach((color, colorInd)=>{
        color.product_id = shoeInd;
        color.inventory.forEach((row) => {
          row.color_id = colorInd;
          row.product_id = shoeInd;
          inventoryCollection.push(row);
        })
        color.images.forEach((pic) => {
          let img = {
            color_id: colorInd,
            product_id: shoeInd,
            photo_url: pic
          }
          imgCollection.push(img);
        })
        colorCollection.push(color);
      })
      shoeCollection.push(shoe);
    });
    shoeCollection.map((row) => {
      delete row.id;
      delete row.name;
      delete row.colors;
    })
    colorCollection.map((row) => {
      delete row.id;
      delete row.inventory;
      delete row.images;
    });
    // console.log(shoeCollection);
    // console.log(colorCollection);
    // console.log(imgCollection);
    // console.log(inventoryCollection);
    writer.pipe(fs.createWriteStream('shoes.csv'));
    let counter = 0;
    for (var i = 0; i <= shoeCollection.length- 1; i++) {
      writer.write(shoeCollection[i])
      counter++;
    }
    console.log('inserted', counter, 'items')
    writer.end;
    // fs.writeFile('shoes.csv', JSON.stringify(shoeCollection), (err) => {
    //   console.log(err);
    // })
    // fs.writeFile('colors.csv', JSON.stringify(colorCollection), (err) => {
    //   console.log(err);
    // })
    // fs.writeFile('images.csv', JSON.stringify(imgCollection), (err) => {
    //   console.log(err);
    // })
    // fs.writeFile('inventory.csv', JSON.stringify(inventoryCollection), (err) => {
    //   console.log(err);
    // })
  }
});


/* POSTGRESQL */
// create shoe record
// create color records with shoe_id
// create inventory records with color and product id
// create photo records with color and product id

/* CASSANDRA */
// create