const fs = require('fs');
const argv = process.argv.slice(2);

const fetcher = (url, path, writeContent) => {
  const request = require('request');
  request(`${url}/${path}`, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    writeContent(body);
  });
};

const writeContent = (websiteContent) => {
  const filePath = '/home/labber/lighthouse/page-fetcher/index.html';

  fs.access(filePath, fs.F_OK, (err) => {
    //if file doesnot exist
    if (err) {
      fs.writeFile(filePath, websiteContent, (err) => {
        if (err) {
          console.error('err');
          return;
        }
        console.log(`Downloaded and saved ${websiteContent.length} bytes to ./index.html`);
      });
    }
  });
};

fetcher(argv[0], argv[1], writeContent);
