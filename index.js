const express = require('express');
const cors = require('cors');
require('dotenv').config()
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const app = express();

app.post('/upload', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({error: 'No file uploaded'});
  }

  res.json({ 
    fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
