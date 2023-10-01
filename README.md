# hyperlinks-from-file

The source code is an extension for the 'any-text' package. Unfortunately, the 'any-text' package does not parse hyperlinks available in the files. However, I have added another function inside the same source code of the 'any-text' package, which helps to extract hyperlinks from (PDF, DOCX) files

 ## Installation 

 1. npm i get-hyperlinks-from-file
 2. const get_hyperlinks = require('get-hyperlinks-from-file')
 3. await get_hyperlinks.extract("/tmp/" + req.file.originalname)


https://www.npmjs.com/package/get-hyperlinks-from-file
