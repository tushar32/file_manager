const express = require('express');
const fileUpload = require('./middleware/file-upload');

const app = express();
console.log(' Express Server connected')

// Init Middleware
app.use(express.json({ extended: false }));

const auth = require('api/auth');

app.use('/api/auth',auth);

app.post('/upload',fileUpload.single('file'), function(req,res,next){

 // console.log('upload',upload);
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });

   
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));