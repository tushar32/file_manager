const express = require('express');
const router  = express.Router();
const auth = require('./../middleware/auth');
const User = require('../models/User');
const nodeTree = require('../utils/index').NTreeUtil;
const fs = require('fs');
const { file_path, rootNodes } = require('./../config/config');
const path = require('path');


// @Route api/node-tree
// @desc Login user

router.get('/',auth,async (req, res) => {

  let user = await User.findById(req.user.id).select('-password');

  const rootDirArr = await nodeTree.getStreams(user,'');

    return res.status(200).json(rootDirArr);
});

router.get('/files',auth,async (req, res) => {

  let user = await User.findById(req.user.id).select('-password');
  console.log('req',req.query);
  
  const path = req.query.path;
  const rootDirArr = await nodeTree.getChildrenStreams(user,path);

    return res.status(200).json(rootDirArr);
});

router.post('/delete',auth, async(req, res) => {
 
  const appPath =  path.resolve(process.cwd());
  //await fs.unlink(file_path+"/"+req.body.path)
 
  const delete_path = appPath+"/"+file_path+"/"+req.body.path+"/" +req.body.file_name
  
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
  
  try {
    if (!fs.existsSync(folder)){
      fs.mkdirSync(folder);
    }
  } catch (error) {
    
  } 

    res.status(200).json({ "msg" : "folder created successfully" })
});

router.post('/rename-folder',auth, async(req, res) => {
 
  const appPath =  path.resolve(process.cwd());
  //await fs.unlink(file_path+"/"+req.body.path)
 
  const newFolder = appPath+"/"+file_path+"/"+req.body.path+"/"+ req.body.new_name;
  const oldFolder = appPath+"/"+file_path+"/"+req.body.path+"/"+ req.body.old_name;
  console.log('newFolder',newFolder);
  
  if(fs.existsSync(newFolder)){
    res.status(400).json({ "msg" : "Directory already exists" })
  }

  fs.rename(oldFolder, newFolder, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successfully renamed the directory.")
    }
  })

    res.status(200).json({ "msg" : "Successfully renamed the directory." })
});
    
router.post('/delete-folder',auth, async(req, res) => {
 
  const appPath =  path.resolve(process.cwd());
  //await fs.unlink(file_path+"/"+req.body.path)
 console.log('body.path',req.body.path);
 
  if(rootNodes.includes(req.body.folder_name))
    res.status(400).json({ "msg" : "Root folder cannot be deleted" })


  const delete_path = appPath+"/"+file_path+"/"+req.body.path+"/" +req.body.folder_name
  console.log(delete_path);
  
  fs.rmdir(delete_path, (err) => {
    if (err) {
      console.error(err)
      return
    }

    res.status(200).json({ "msg" : "folder deleted successfully" })
  });
    
})

router.post('/new-document',auth, async(req, res) => {
 
  const appPath =  path.resolve(process.cwd());
  //await fs.unlink(file_path+"/"+req.body.path)
 
  const filePath = appPath+"/"+file_path+"/"+req.body.path+"/new_document.txt"
 
  
  fs.closeSync(fs.openSync(filePath, 'w'))


    res.status(200).json({ "msg" : "document created successfully" })
});

router.post('/read-file',auth, async(req, res) => {
 
  const appPath =  path.resolve(process.cwd());
  //await fs.unlink(file_path+"/"+req.body.path)
 
  const filePath = appPath+"/"+req.body.filePath;
  console.log('filePath',filePath);
  
  try {
    fs.readFile(filePath, function(err, data) {
      res.status(200).json({ "msg" : "file read successfully",data : data.toString() })
    });

  } catch (error) {
       console.error(err);
        res.status(500).send(err);
  }
  
});

router.post('/save-file',auth, async(req, res) => {
 
  const appPath =  path.resolve(process.cwd());
  //await fs.unlink(file_path+"/"+req.body.path)
 
  const filePath = appPath+"/"+req.body.filePath;
  console.log('filePath',req.body.fileContent);
  
  try {
    fs.writeFile(filePath,req.body.fileContent ,(err) => {
      if (err) console.log(err);
      res.status(200).json({ "msg" : "file saved successfully" })
    } );

  } catch (error) {
       console.error(err);
        res.status(500).send(err);
  }
});

module.exports = router;