const express = require('express');
const app = express();
const port = 5000
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = requre('fs');

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.post('/upload', upload.single('pdf'), (req, res) => {
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