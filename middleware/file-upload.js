const multer = require('multer') ; 
// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path

const storage = multer.diskStorage({
    destination:  function (req, file, cb) {
      console.log('store',file);
      cb(null,'client/public/uploads/'+ req.path)
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    },
});

fileUploads = multer({ storage : storage })

module.exports = fileUploads;