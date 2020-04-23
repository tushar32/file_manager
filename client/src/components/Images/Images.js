import React, { Fragment, useState } from 'react';
import Upload from '../Upload/Upload';
import cx from './Images.module.css';
import cs from './../../containers/FolderContainer/FolderContainer.module.css';
import { Row } from 'react-bootstrap';
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'
import ReactAudioPlayer from 'react-audio-player';

const Images = (props) => {

   const { nodeTreeFiles }  = props;
   
   const [ renameDir , setRenameDir ] = useState({ id:0, display: 'none' });
   const [ renameFile , setRenameFile ] = useState({ id:0, display: 'none' });
   const [ folderText, setFolderText ] = useState({ id: 0, value: '' });
   let cardLength = 2;

   const handleToggleDir = (e,type,folder_id, folder_name) => {
       if(type=='folder')
            setRenameDir({ id: folder_id, display:'block' })
        else
            setRenameFile({ id: folder_id, display:'block' })

     setFolderText({ id: folder_id, value: folder_name })
   }
   
   const handleChange = (e) => {
        setFolderText({ id: e.target.id, value: e.target.value })
   }

   
   return (
    <Fragment>
  
    { props.dropzone ?  ( <Upload type={nodeTreeFiles.root} path={nodeTreeFiles.path}  /> ) : '' }

    <Row className="mt-3">
        {
            nodeTreeFiles.folders.map(folder => {
                return (
                   
                   <div className="col-lg-2 col-md-3 col-sm-12  mt-3" key={folder.id }>
                         <div className={ cs.folder_icon }>
                             <div className={ cx.hover }>
                                 <button className={`${cs.trash} link-button` } onClick={e => props.deleteDir(e,folder.name) }>
                                     <i className="fas fa-trash" style={{ color: '#a31be2' }}></i>
                                 </button>
                             </div>
                             <button className={ `${cs.folder} link-button` } onDoubleClick={ e => props.goToFolder(e, folder.name)}>
                                 <i className="fa fa-folder fa-7x"  style={{ color: '#890606' }}></i>
                             </button>
                             <div className={ cs.folder_name }>
                                 <div className="m-b-5 text-center" onBlur={ () => setRenameDir(!renameDir)}>
                                     
                                     { renameDir.id === folder.id ? 
                                        <input type="text"   onChange={e => handleChange(e)} value={ folderText.value } 
                                        id={folder.id} style={{ display: renameDir }} onKeyDown={ e => props.rename(e,folder.name) } />
                                        : 
                                    
                                        <button className="link-button" data_id={folder.id}  
                                        onClick={ (e) => handleToggleDir(e, 'folder',folder.id, folder.name)} >
                                            { folder.name }
                                        </button> 
                                    }
                                    
                                  </div>
                             </div>
                         </div>
                     </div>
                
                    )
               })
        }
      {
          
       nodeTreeFiles.files.map(file => {
        let fileContent;

        if(nodeTreeFiles.root === 'images'){
            fileContent=<Fragment>
            <div className={ cx.image }  >
        
                <ReactFancyBox
                thumbnail={file.filePath}
                image={file.filePath}/>
            </div>
            <div className={ cx.file_name }>
                <span className="m-b-5 text-muted">{ file.name }</span>
            </div>

            
        </Fragment>
        } else if(nodeTreeFiles.root === 'documents') {
            fileContent=<Fragment>
            <div className={ cx.image } onDoubleClick={(e) => props.showFile(e,file.name,file.filePath)}>
                <i className="fas fa-file-alt fa-10x"></i> 
            </div>
            <div className={ cx.file_name } onBlur={ () => setRenameFile(!renameFile)}>
            { 
              renameFile.id === file.id ?
                <input type="text"   onChange={e => handleChange(e)} value={ folderText.value } 
                    id={file.id} style={{ display: renameFile }} onKeyDown={ e => props.renameFile(e,file.name) } />
                    :
                    <button className="link-button" data_id={file.id}  
                        onClick={ (e) => handleToggleDir(e,'file', file.id, file.name)} >
                    
                        { file.name }
                    </button>  
            }
            </div>
        </Fragment>

        }  else if(nodeTreeFiles.root === 'audios') {
            fileContent=<Fragment>
            <div className={ cx.audio }  >
                <div className="m-b-5 m-t-5 text-muted text-center">{ file.name }</div>
                <audio
                    src={file.filePath}
                    controls
                    />
             </div>
                
            </Fragment>
         cardLength=4
        }

         return (
            
            <div className={ `col-lg-${cardLength} col-md-3 col-sm-12 mt-3` } key={file.id}>
              <div className="card">
                  <div className="file">
                      <div className="hover">
                            <button className={`${cs.trash} link-button` } onClick={e => props.delete(e,file.name) }>
                                <i className="fas fa-trash"></i>
                            </button>
                      </div>
                     { fileContent }
                  </div>
              </div>
          </div>
         
         )
        })
        
      }
      </Row>
      </Fragment>
       )  
    
};
 
export default Images