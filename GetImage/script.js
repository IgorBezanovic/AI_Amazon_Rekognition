import fetch from 'node-fetch';
import fs from 'fs';
import request from 'request';
import Yargs from "yargs";

const { imgNum } = Yargs(process.argv.slice(2)).argv;

// Function to download an image
const downloadImage = async (url, filename) => {
    try {
      const response = await fetch(url);
      const buffer = await response.buffer();
      fs.writeFileSync(filename, buffer);
      console.log(`Image "${filename}" downloaded successfully!`);
    } catch (error) {
      console.error(`Error downloading image: ${error}`);
    }
};

const fetchRandomImages = async () => {
    let counterOfImage = 1;
    for (let counter = 1;  counter <= 100; counter++ ) {

        try {
            const options = {
                url: `https://gratisography.com/page/${counter}`,
                encoding: null // to get the response as a Buffer
            };
            await new Promise(resolve => {
                request.get(options, (error, response, body) => {
                    if (error) {
                        console.error(`Error fetching images: ${error}`);
                        return;
                    }
                    const text = body.toString();
                    const regex = /img src="(.*?)"/g;
                    const matches = [...text.matchAll(regex)];
                    const images = matches.map(match => match[1]);
                    images.forEach((imageUrl, index) => {
                        if (imageUrl.includes('https')) {
                            ++counterOfImage;
                            const filename = `image_${counterOfImage}.jpg`;
                            downloadImage(imageUrl, filename);
                            console.log(imageUrl);
                        }
                    });
                });
                resolve();
            });
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }
};

fetchRandomImages();
