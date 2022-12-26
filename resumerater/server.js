const express = require('express');
const app = express();
const port = 5000
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

app.use(express.static('uploads'));

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.get('/random', (req,res) => {
  console.log("Fetching Random PDF");
  res.sendFile('uploads/1.pdf');
});

app.post('/upload', upload.single('pdf'), (req, res) => {
    console.log('someone hitting upload route')
    fs.writeFile(req.file.path, req.file.buffer, err => {
      if (err) {
        // Handle the error
      } else {
        res.send('PDF uploaded successfully');
      }
    });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});