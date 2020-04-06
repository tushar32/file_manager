const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('./middleware/file-upload');
const path = require('path');

const app = express();
console.log(' Express Server connected')

//connect database
connectDB();


global.__basedir = path.resolve(__dirname);

// Init Middleware
app.use(express.json({ extended: false }));

const auth = require('./api/auth');
const NodeTree = require('./api/NodeTree');
   

app.use('/api/auth',auth);
app.use('/api/node-tree',NodeTree);

app.post('/upload',fileUpload.single('file'), function(req,res,next){

 // console.log('upload',upload);
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });

   
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));