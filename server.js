const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const https = require('https');

const app = express();
app.use(cors());

console.log(' Express Server connected')

//connect database
connectDB();


app.use('/uploads/user_files', express.static(path.join('uploads', 'user_files')));

// Init Middleware
app.use(express.json({ extended: false }));

const auth = require('./api/auth');
const NodeTree = require('./api/NodeTree');
const upload = require('./api/upload');
   

app.use('/api/auth',auth);
app.use('/api/node-tree',NodeTree);
app.use('/api/upload',upload);


  const PORT = process.env.PORT || 5000;
  console.log(PORT);

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
