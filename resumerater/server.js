const express = require('express');
const app = express();
const port = 5000
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

app.use('/uploads/',express.static('/root/resumerater/uploads/'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Range, Content-Type, Accept");
  // res.header('Access-Control-Allow-Credentials', 'true');
  // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  // res.header('Access-Control-Expose-Headers', 'Content-Length');
  next();
});

app.get('/random', (req,res) => {
  console.log("Fetching Random PDF");
  console.log("sending b42...");
  const rets = "b42e0deb847222f8638ff429ab2b6b23";
  console.log(rets)
  res.send(rets);
});

app.post('/upload', upload.single('pdf'), (req, res) => {
    console.log('someone hitting upload route')
    fs.writeFile(req.file.path, req.file.buffer, err => {
      if (err) {
        // Handle the error
      } else {
        res.redirect('http://139.177.207.245:3000/');
      }
    });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});