const express = require('express');
const cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const path = require('path'); // Import the path module

const upload = multer({ dest: 'uploads/' });
const app = express();

app.use(cors());
app.use(express.static('public')); // Serve static files like CSS

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({error: 'No file uploaded'});
  }

  res.json({ 
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
