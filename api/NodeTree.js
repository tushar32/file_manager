const express = require('express');
const router  = express.Router();
const auth = require('./../middleware/auth');
const User = require('../models/User');
const nodeTree = require('../utils/index').NTreeUtil;
const fs = require('fs');
const { file_path } = require('./../config/config');
const path = require('path');


// @Route api/node-tree
// @desc Login user

router.get('/',auth,async (req, res) => {

  let user = await User.findById(req.user.id).select('-password');

  const rootDirArr = await nodeTree.getStreams(user,'');
  console.log('final',rootDirArr);

    return res.status(200).json(rootDirArr);
});

router.get('/files',auth,async (req, res) => {

  let user = await User.findById(req.user.id).select('-password');
  console.log('req',req.query);
  
  const path = req.query.path;
  const rootDirArr = await nodeTree.getChildrenStreams(user,path);
//  console.log('final',rootDirArr);

    return res.status(200).json(rootDirArr);
});

router.post('/delete',auth, async(req, res) => {
 
  const appPath =  path.resolve(process.cwd());
  //await fs.unlink(file_path+"/"+req.body.path)
 
  const delete_path = appPath+"/"+file_path+"/"+req.body.path+"/" +req.body.file_name
  console.log(delete_path);
  
  fs.unlink(delete_path, (err) => {
    if (err) {
      console.error(err)
      return
    }

    res.status(200).json({ "msg" : "file deleted successfully" })
  });
    
})

router.post('/create-folder',auth, async(req, res) => {
 
  const appPath =  path.resolve(process.cwd());
  //await fs.unlink(file_path+"/"+req.body.path)
 
  const folder = appPath+"/"+file_path+"/"+req.body.path+"/new_folder"
  console.log(folder);
  
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
  }

    res.status(200).json({ "msg" : "folder created successfully" })
});
    

module.exports = router;