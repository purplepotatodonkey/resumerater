const express = require('express');
const app = express();
const port = 5000
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const exec = require('child_process').exec;
const fs = require('fs');
var cors = require('cors');

const PERSISTENT = false;

//  We will need:
// CREATE TABLE RESUME_TABLE (id INTEGER PRIMARY KEY, rating INTEGER, description TEXT);
// DROP TABLE RESUME_TABLE;
// INSERT INTO RESUME_TABLE (id, rating, description) VALUES (?,?,?)
// SELECT * FROM RESUME_TABLE WHERE ID = ? RATING > ?
// UPDATE RESUME_TABLE SET RATING = ? WHERE ID = ?
// REMOVE FROM RESUME_TABLE WHERE ID = ?


  // const stmt = db.prepare('SELECT name, age FROM cats');
  // const insert = db.prepare('INSERT INTO cats (name, age) VALUES (@name, @age)');
  // const insertMany = db.transaction((cats) => {
  //   for (const cat of cats) insert.run(cat);
  // });
  // insertMany([
  //   { name: 'Joey', age: 2 },
  //   { name: 'Sally', age: 4 },
  //   { name: 'Junior', age: 1 },
  // ]);
  // const newExpense = db.prepare('INSERT INTO expenses (note, dollars) VALUES (?, ?)');
  // const adopt = db.transaction((cats) => {
  //   newExpense.run('adoption fees', 20);
  //   insertMany(cats); // nested transaction
  // });
  // const stmt = db.prepare('INSERT INTO cats (name, age) VALUES (?, ?)');
  // const info = stmt.run('Joey', 2);
  // console.log(info.changes); // => 1

app.use(cors());
app.use('/uploads/',express.static('/root/resumerater/resumerater/uploads/'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Range, Content-Type, Accept");
  // res.setHeader('Content-Type', 'application/pdf');
  // res.header('Access-Control-Allow-Credentials', 'true');
  // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  // res.header('Access-Control-Expose-Headers', 'Content-Length');
  next();
});

  const Database = require('better-sqlite3');
  const db = new Database('resumes.db', { verbose: console.log });
  if(!PERSISTENT) {
    console.log("not persistent so we drop table if exists and create table")
    db.prepare('DROP TABLE IF EXISTS RESUME_TABLE').run();
    db.prepare('CREATE TABLE RESUME_TABLE (id VARCHAR PRIMARY KEY, rating INTEGER, description TEXT)').run();
    console.log("done")
        // }
        // db.prepare('CREATE TABLE IF NOT EXISTS RESUME_TABLE (id VARCHAR PRIMARY KEY, rating INTEGER, description TEXT)').run();
        // if(!PERSISTENT) {
    let cmd = "ls /root/resumerater/resumerater/uploads/ | wc -l"
    console.log("counting files:")
    exec(cmd, (err, stdout, stderr) => {
      if (err !== null) {
        console.log('exec error: ' + err);
      }
      console.log(stdout)
      output = parseInt(stdout);
      console.log(output)
      for(i=0;i<output;i++) {
        console.log('inserting entry ' + i + ' from files dir');
        let incmd = "files=(/root/resumerater/resumerater/uploads/*);echo ${files[" + i + "]} | cut -d'/' -f 6)"
        exec(incmd, (err, stdout, stderr) => {
          if (err !== null) {
            console.log('exec error: ' + err);
          }
          console.log("stdout is ... : " + stdout)
          db.prepare('INSERT INTO RESUME_TABLE (id, rating, description) VALUES (?,?,?)').run(stdout, -1, "No description yet.");
        });
      }
    });
  } else {
    console.log("persistent so we just create table if not exists")
    db.prepare('CREATE TABLE IF NOT EXISTS RESUME_TABLE (id VARCHAR PRIMARY KEY, rating INTEGER, description TEXT)').run();
  }
  const stmt = db.prepare('SELECT * FROM RESUME_TABLE');

  app.get('/db_get_all_resumes', (req,res) => {
    console.log("Fetching all resumes from db...");
    const stmt = db.prepare('SELECT * FROM RESUME_TABLE');
    stmt.all().forEach(({ id, rating, description }) => {
      console.log(id, rating, description);
    });
    res.send(stmt.all());
  });
  app.get('/db_reset', (req,res) => {
    console.log("Resetting entire database");
    db.prepare('DROP TABLE IF EXISTS RESUME_TABLE').run();
    db.prepare('CREATE TABLE IF NOT EXISTS RESUME_TABLE (id INTEGER PRIMARY KEY, rating INTEGER, description TEXT)').run();
    res.send("success reseting database");
  });
  app.get('/db_add_entry', (req,res) => {
    num = Math.floor(Math.random() * 10000);
    console.log(`Inserting an entry to database (${num}, 5, test description v2)`);
    db.prepare('INSERT INTO RESUME_TABLE (id, rating, description) VALUES (?,?,?)').run(num, 5, "This is a test description v2");
    res.send("success adding entry to database");
  });

app.get('/random', (req,res) => {
  console.log("Fetching Random PDF");
  let cmd = "find /root/resumerater/resumerater/uploads/* -name '*' | shuf -n 1"
    let output = "";
    exec(cmd, (err, stdout, stderr) => {
      if (err !== null) {
        console.log('exec error: ' + err);
      }
      console.log(stdout)
      output = stdout.substring(38,stdout.length);
      console.log(output)
      console.log("FINISHED:")
      console.log("final res send output is: " + output)
      res.send(output);
    });
});

app.post('/upload', upload.single('pdf'), (req, res) => {
    console.log('someone hitting upload route')
    // fs.writeFile(req.file.path, req.file.buffer, err => {
    //   if (err) {
    //     // Handle the error
    //   } else {
        res.redirect('http://139.177.207.245:3000/');
    //   }
    // });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});