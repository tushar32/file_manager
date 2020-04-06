const express = require('express');
const router  = express.Router();
const auth = require('./../middleware/auth');
const readdirp = require("readdirp");
const User = require('../models/User');
const path = require('path');
const { rootNodes }= require('./../config/config');
// @Route api/auth
// @desc Login user

router.get('/',auth,async (req, res) => {
    console.log('user',req.user);
    let user = await User.findById(req.user.id).select('-password');
    const appPath =  path.resolve(process.cwd());
    const folderPath = appPath+"/client/public/uploads/"+user.name.replace(" ","_")+'_'+user.id;
   console.log('folderPath',folderPath);
   

    const settings = {
        // Filter files with js and json extension
        type: 'directories',
        //depth at which to stop recursing even if more subdirectories are found
        depth : 5
    };

    const rootDirArr  = getRootNodes();
    console.log('rootDirArr',rootDirArr);
    
    // Iterate recursively through a folder
   const streams = await readdirp.promise(folderPath,settings);
    
    // // This callback is executed once 
    //     function (err, res) {
    //         if(err){
    //             throw err;
    //         }
    //     }
    // ).on('data', (entry) => {
        
    //     const { path } = entry;
    //     console.log(`${JSON.stringify({path})}`);
    //   });
     const folders = [];
     
     streams.map(file => {

        if(!rootNodes.includes(file.path)){

          const children = file.path.split('/');
          const root = children[0];
          const parentLeafChild = children[children.length - 2];
          const leafChild = children[children.length - 1];

          const pos =  rootDirArr.findIndex(i => i.name === root); 
        //  console.log('children',children);
          console.log('parentLeafChild',parentLeafChild);
          
          
          /*
            This condition checks that if parentLeafChild is root only then 
            directly push child nodes to its children array
            id: 100,
            text: 'Images',
            isLeaf: false,
            children: [
              {
                  id: 101,
                  text: 'Satsang',
                  isLeaf: false,
                  parent_node:100,
              }
            ] 
          }
          */
          if(rootNodes.includes(parentLeafChild)){
            rootDirArr[pos].children.push({
              "name":leafChild,
              "isLeaf": true,
              "children" : [],
              "path":file.path
            })
          } else {

            addToStructure(rootDirArr,{
              "name":leafChild,
              "isLeaf": true,
              "children" : [],
              "path":file.path
            },parentLeafChild)
          }
        //  const pos =  rootDirArr[pos].findIndex(i => i.name === parentLeafChild); 

         // console.log('children',children);
          folders.push({
            name: file.basename
          })
        } else {
          folders.push({
             
          })
        }
        
    });

    return res.json(rootDirArr);
  
});

function addToStructure(structure, object, parent) {
    structure.some(function iter(a) {
        if (a.name === parent) {
            a.children = a.children || [];
            a.children.push(object);
            a.isLeaf = false;
            return true;
        }
        return Array.isArray(a.children) && a.children.some(iter);
    });
}

function getRootNodes() {
  let rootDirs = [];
  rootNodes.map(rootNode => {
     rootDirs.push( {
      name: rootNode,
      path: '/'+rootNode,
      children: []
    })
  });

  return rootDirs;
}

module.exports = router;