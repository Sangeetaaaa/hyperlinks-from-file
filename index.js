const StreamZip = require('node-stream-zip');
const PDFExtract = require('pdf.js-extract').PDFExtract
const pdfExtract = new PDFExtract();

// extract text from office books as doc and docx
exports.extract = async (filePath) => {
    return new Promise(async (resolve, reject) => {
      let links = [];

      const fileExtension = FileGetExtension(filePath);
      if (fileExtension === ".pdf") {
        let data = await pdfExtract.extract(filePath, {});
        for (let eachPage of data.pages) {
          if (eachPage?.links) {
            links.push(...eachPage?.links)
          }
        }
        resolve(links);
      } 

      if (fileExtension === ".docx" && fileExtension !== ".doc") {
        fileopen(filePath).then((res, err) => {
          if (err) {
            resolve([])
          }
          
          const regex = /https?:\/\/\S+?(?="|\s|$)/gi;
          let match;
  
          while ((match = regex.exec(res?.toString())) !== null) {
            if (match) {
              if (!match[0].includes("schemas.openxmlformats")) {
                links.push(match[0]);
              }
            }
          }

          resolve(links);
        });
      } else {
        resolve([])
      }
    });
};

// stream
fileopen = (filePath) => {
  return new Promise((resolve, reject) => {
    const zip = new StreamZip({
      file: filePath,
      storeEntries: true,
    });
    zip.on('ready', () => {
      let chunks = [];
      let content = '';
      zip.stream('word/_rels/document.xml.rels', (err, stream) => {
        if (err) {
        }
        stream.on('data', (chunk) => {
          chunks.push(chunk);
        });
        stream.on('end', () => {
          content = Buffer.concat(chunks);
          zip.close();
          resolve(content.toString());
        });
      });
    });
  });
};

// get the file extension based on the file path
FileGetExtension = (filename) => {
  if (filename.length == 0) return '';
  let dot = filename.lastIndexOf('.');
  if (dot == -1) return '';
  const extension = filename.substr(dot, filename.length);
  return extension;
};
