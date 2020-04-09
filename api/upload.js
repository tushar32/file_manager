
const express = require('express');
const router  = express.Router();
const fileUpload = require('./../middleware/file-upload');

//@route POST  api/upload
//@desc Upload file of user

router.post('/',fileUpload.single('file'), function(req,res){
   try {
     res.status(200).json({ msg : 'File uploaded successfully'});
   } catch (error) {
    res.status(500).json({msg:error});
   }
 
    // console.log('upload',upload);
    
});

module.exports = router;