const fs = require('fs');
const sharp = require('sharp');

// set input and output directories
const inputDir = './input';
const outputDir = './output';

// define image dimensions
const width = 2024;
const height = 2024;

// loop through all files in the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  let count = 1;

  files.forEach((file, index) => {
    // check if file is an image
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      // read input file
      const inputFile = `${inputDir}/${file}`;
      fs.readFile(inputFile, (err, data) => {
        if (err) throw err;

        // Delay processing by 1 second for each image
        setTimeout(() => {
          // resize image and save to output directory with renamed file
          sharp(data)
            .resize(width, height)
            .toFile(`${outputDir}/image_no${count}.jpg`, (err) => {
              if (err) throw err;
              console.log(`Resized and saved ${file} as image_no${count}.jpg successfully.`);
              count++;
            });
        },1000);
      });
    } else {
      console.log(`${file} is not an image.`);
    }
  });
});
