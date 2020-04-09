const express = require('express');
const connectDB = require('./config/db');
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
const upload = require('./api/upload');
   

app.use('/api/auth',auth);
app.use('/api/node-tree',NodeTree);
app.use('/api/upload',upload);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));