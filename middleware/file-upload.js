const multer = require('multer') ; 
// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path

const storage = multer.diskStorage({

    destination:  (req, file, cb) => {      
      cb(null,'client/public/uploads/'+ req.body.path);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    },
});

const fileUploads = multer({ storage : storage }).array('file')

module.exports = fileUploads;