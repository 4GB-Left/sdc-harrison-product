const fs = require('fs');
const data = require('./data.js');

// console.log(data);
let results = Array.from(data);
let copy = data;
for (var x = 1; x < 50000; x++) {
  results.push(...copy);
}
console.log(results.length);

let photoStream = fs.createWriteStream('./SerialData/bigPhotos.csv');
photoStream.write('product_id,color_id,photo_url\n');

const writeAllphotos = (writer, encoding, callback) => {
      let i = 0;
      let colorKey = -1;
      let photoKey = -1;
      const write = () => {
        let ok = true;
        do {
          let colors = results[i].colors;
          for (var j = 0; j<= colors.length - 1; j++) {
            let color = colors[j];
            colorKey++;
            for (var u = 0; u <= color.images.length - 1; u++) {
              photoKey++;
              let row = `${i},${colorKey},${color.images[u]}\n`;
              if (i === results.length -1) {
                writer.write(row, encoding, callback);
              } else {
                // see if we should continue, or wait
                // don't pass the callback, because we're not done yet.
                ok = writer.write(row, encoding);
              }
            }
          }
          i++;
        } while (i <results.length -1 && ok);
        if (i < results.length -1) {
          // had to stop early!
          // write some more once it drains
          writer.once('drain', write);
        }
      }
    write()
    }

    writeAllphotos(photoStream, 'utf-8', () => {
      photoStream.end();
    });