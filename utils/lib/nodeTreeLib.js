
const readdirp = require("readdirp");
const path = require('path');
const { rootNodes }= require('./../../config/config');
var uuid = require('uuid');
const { addToStructure, getRootNodes } = require('./helpers');


exports.getStreams = async function( user, node = ''){ // node = ''  is a root

    const appPath =  path.resolve(process.cwd());
    const folderPath = appPath+"/client/public/uploads/"+user.name.replace(" ","_")+'_'+user.id+'/'+node;
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
         const childArray = {
          "name":leafChild,
          "isLeaf": true,
           "id" : uuid.v4(),
          "children" : [],
          "path":file.path,
          "root": root
        }
          if(rootNodes.includes(parentLeafChild)){
            rootDirArr[pos].children.push(childArray)
          } else {
            // add to the children of a array  
            addToStructure(rootDirArr,childArray,parentLeafChild)
          }
        }
    });

    
    return rootDirArr


}