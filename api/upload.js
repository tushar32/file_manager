
const express = require('express');
const router  = express.Router();
const fileUploads = require('./../middleware/file-upload');


//@route POST  api/upload
//@desc Upload file of user

router.post('/',async function  (req, res) {

  
  fileUploads(req, res, function(err) {
    console.log('req',req.files);

    res.status(200).json({msg: 'File uploaded successfully'});
    /*Now do where ever you want to do*/
  
  }); 

});

module.exports = router;