import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';
import {Document, Page, pdfjs } from 'react-pdf';
import {Link} from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {

  const [file, setFile] = useState(null);
  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [pdfstr1, setPdfstr1] = useState(null);
  const [pdfstr2, setPdfstr2] = useState(null);
  const [numPages1, setNumPages1] = useState(null);
  const [numPages2, setNumPages2] = useState(null);
  const [pageNumber1, setPageNumber1] = useState(1);
  const [pageNumber2, setPageNumber2] = useState(1);
  const [resAPI, setResAPI] = useState('');

  useEffect(() => {
    console.log(`pdfstr1 is ${pdfstr1} and pdfstr2 is ${pdfstr2}`)
  }, pdfstr1,pdfstr2)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages1(numPages);
    setNumPages2(numPages);
    setPageNumber1(1);
    setPageNumber2(1);
  }

  // const runServerQueryTest = async() => {
  //   console.log("Fetching random request from server...")
  //   const response = await fetch('http://localhost:5000/test', {
  //     method: 'GET'
  //   })
  //   const data = await response.text();
  //   console.log(data)
  // }
  const getAllResumesFromDB = async() => {
    console.log("Getting all resumes from DB...")
    const response = await fetch('http://139.177.207.245:5000/db_get_all_resumes', {
      method: 'GET'
    })
    const data = await response.text();
    console.log(data)
    setResAPI(data)
  }
  const resetEntireDB = async() => {
    console.log(`Resetting the entire DB...`)
    const response = await fetch('http://139.177.207.245:5000/db_reset', {
      method: 'GET'
    })
    const data = await response.text();
    console.log(data)
    setResAPI(data)
  }
  const addEntryToDB = async() => {
    console.log(`Adding Ranom Entry to DB (Server chooses this)...`)
    const response = await fetch('http://139.177.207.245:5000/db_add_entry', {
      method: 'GET'
    })
    const data = await response.text();
    console.log(data)
    setResAPI(data)

    setTimeout(async() => {
      const response2 = await fetch('http://139.177.207.245:5000/db_load_from_dir', {
        method: 'GET'
      })
      const data2 = await response2.text();
      console.log(data2)
    }, 1000)

  }
  const loadFromDirDB = async() => {
    console.log(`Adding Ranom Entry to DB (Server chooses this)...`)
    const response = await fetch('http://139.177.207.245:5000/db_load_from_dir', {
      method: 'GET'
    })
    const data = await response.text();
    console.log(data)
    setResAPI(data)
  }

  // const onChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   // send the file to the server
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   fetch('http://139.177.207.245:5000/upload', {
  //     method: 'POST',
  //     body: formData
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   });
  // };

  const getRandomPDF = async(e) => {
      console.log("Fetching 2 random pdfs from server...")
      const response = await fetch('http://139.177.207.245:5000/random', {
        method: 'GET'
      })
      const data = await response.text();
      console.log(data)
      const response2 = await fetch('http://139.177.207.245:5000/random', {
        method: 'GET'
      })
      const data2 = await response2.text();
      console.log(data2)
      setPdfstr1("http://139.177.207.245:5000/uploads/" + data);
      setPdfstr2("http://139.177.207.245:5000/uploads/" + data2);
      setResAPI("Successfully retrieved Random PDF")
  }

  const handleFileChangeData = (data) => {
    if (data) {
      console.log("Handling new data")
      setPdf1(data);
      setPdf2(data);
    } else {
      console.log("No data")
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setPdf1(e.target.files[0]);
      setPdf2(e.target.files[0]);
    }
  }

  return (
    <div className="App">
      <div>Test</div>
      {/* <input type="file" /> */}

      <form action="http://139.177.207.245:5000/upload" method="post" encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} name="pdf" accept="application/pdf"></input>
        <button type="submit">Upload PDF</button>
      </form>
      <Link to={'/AdminApp'}><button>Go To Admin Page</button></Link>

    {/* <form onSubmit={onSubmit}> */}
      {/* <label htmlFor="file">Choose a file:</label> */}
      {/* <input type="file" id="file" onChange={onChange} /> */}
      {/* <button type="submit">Upload</button> */}
    {/* </form> */}

      <br></br>
      <button onClick={getRandomPDF}>Get 2 Random PDFs From Database</button>
      <br></br>
      <button onClick={getAllResumesFromDB}>Console Log All Resumes from DB</button>
      <br></br>
      <button onClick={resetEntireDB}>Reset Entire DB</button>
      <br></br>
      <button onClick={addEntryToDB}>Add Random Entry to DB</button>
      <br></br>
      <button onClick={loadFromDirDB}>Load DB With Files from Dir</button>
      <br></br>
      <div>{resAPI}</div>
      <br></br>
      <div style={{position:"fixed",height:"100%",left:"5%",display:'inline', width:"40%",border:"5px solid gray",fontSize:"1px"}}>
        {(pageNumber1<numPages1)&&<button onClick={(e) => setPageNumber1(pageNumber1+1)}>+</button>}
        {(pageNumber1>1)&&<button onClick={(e) => setPageNumber1(pageNumber1-1)}>-</button>}
        <Document file={pdfstr1} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber1}/>
        </Document>
        <p>
          Page {pageNumber1} of {numPages1}
        </p>
      </div>
      <div style={{position:"fixed",height:"100%",right:"5%", display:'inline', width:"40%",border:"5px solid gray",fontSize:"1px"}}>
        {(pageNumber2<numPages2)&&<button onClick={(e) => setPageNumber2(pageNumber2+1)}>+</button>}
        {(pageNumber2>1)&&<button onClick={(e) => setPageNumber2(pageNumber2-1)}>-</button>}
        <Document file={pdfstr2} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber2}/>
        </Document>
        <p>
          Page {pageNumber2} of {numPages2}
        </p>
      </div>
    </div>
  );
}

export default App;