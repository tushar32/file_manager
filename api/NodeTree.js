const express = require('express');
const router  = express.Router();
const auth = require('./../middleware/auth');
const User = require('../models/User');
const nodeTree = require('../utils/index').NTreeUtil

// @Route api/node-tree
// @desc Login user

router.get('/',auth,async (req, res) => {

  let user = await User.findById(req.user.id).select('-password');

  const rootDirArr = await nodeTree.getStreams(user,'');
  console.log('final',rootDirArr);

    return res.status(200).json(rootDirArr);
});

router.get('/images',auth,async (req, res) => {

  let user = await User.findById(req.user.id).select('-password');

  const rootDirArr = await nodeTree.getStreams(user,'');
  console.log('final',rootDirArr);

    return res.status(200).json(rootDirArr);
});



module.exports = router;