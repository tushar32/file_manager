
const readdirp = require("readdirp");
const path = require('path');
const { rootNodes, file_path, fileExtensions }= require('./../../config/config');
var uuid = require('uuid');
const { addToStructure, getRootNodes } = require('./helpers');

exports.getStreams = async function( user, node = ''){ // default node = ''  is a root

    const appPath =  path.resolve(process.cwd());
    const folderPath = appPath+"/"+file_path+"/"+user.name.replace(" ","_")+'_'+user.id+'/'+node;

   // console.log(folderPath);
    
    const settings = {
        // Filter files with js and json extension
        type: 'directories',
        //depth at which to stop recursing even if more subdirectories are found
        depth : 5
    };

    const rootDirArr  = getRootNodes();
   // console.log('rootDirArr',rootDirArr);
    
    // Iterate recursively through a folder
   const streams = await readdirp.promise(folderPath,settings);
    // console.log('streams',streams);
     
     streams.map(file => {

        if(!rootNodes.includes(file.path)){

          const children = file.path.split('/');
          const root = children[0];
          const parentLeafChild = children[children.length - 2];
          const leafChild = children[children.length - 1];

          const pos =  rootDirArr.findIndex(i => i.name === root); 
        //  console.log('children',children);
          //console.log('parentLeafChild',parentLeafChild);
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

exports.getChildrenStreams = async function (user , nodePath){
  const appPath =  path.resolve(process.cwd());
  const folderPath = appPath+"/"+file_path+"/"+user.name.replace(" ","_")+'_'+user.id+'/'+nodePath;
console.log('folderPath',folderPath);

  let root = nodePath.split('/').shift();
  
  if(!root)  root = nodePath.slice('1');
  
  const settings = {
      // Filter files with js and json extension
      type: 'files_directories',
      //depth at which to stop recursing even if more subdirectories are found
      depth : 0
  };

  const filesFolders  = {root:root , current_path: nodePath, path: user.name.replace(" ","_")+'_'+user.id+'/'+nodePath ,files : [] , folders : [] };  
  // Iterate recursively through a folder
 const streams = await readdirp.promise(folderPath,settings);
   
   streams.map(file => {
     const fileExt = file.basename.split('.').pop();
   
    if(fileExtensions.includes(fileExt)){
      filesFolders.files.push({
        name: file.basename,
        id: uuid.v4(),
        folderPath : folderPath,
        filePath : file_path+'/'+user.name.replace(" ","_")+'_'+user.id+'/'+nodePath+"/"+file.basename,
        type : 'file'
      })
    } else {
      filesFolders.folders.push({
        name: file.basename,
        id: uuid.v4(),
        path : file.path,
        type : 'folders'
      })
    }
  });

  
  return filesFolders
}