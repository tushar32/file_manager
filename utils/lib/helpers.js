const { rootNodes }= require('./../../config/config');
var uuid = require('uuid');

exports.addToStructure = function(structure, object, parent) {
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

exports.getRootNodes = function() {
    let rootDirs = [];
    rootNodes.map(rootNode => {
       rootDirs.push( {
        name: rootNode,
        id: uuid.v4(),
        path: rootNode,
        children: []
      })
    });
  
    return rootDirs;
  }