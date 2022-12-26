import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';
import {Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {

  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [pdfstr1, setPdfstr1] = useState(null);
  const [pdfstr2, setPdfstr2] = useState(null);
  const [numPages1, setNumPages1] = useState(null);
  const [numPages2, setNumPages2] = useState(null);
  const [pageNumber1, setPageNumber1] = useState(1);
  const [pageNumber2, setPageNumber2] = useState(1);

  useEffect(() => {
    console.log(`pdfstr1 is ${pdfstr1} and pdfstr2 is ${pdfstr2}`)
    if (pdfstr1) {
      console.log(`pdfstr1 not null`)
    } else {
      console.log(`pdfstr1 is null`)
    }
    console.log("One of the pdfs changed!")
  }, pdfstr1,pdfstr2)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages1(numPages);
    setNumPages2(numPages);
    setPageNumber1(1);
    setPageNumber2(1);
  }

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
      <br></br>
      <button onClick={getRandomPDF}>Get 2 Random PDFs From Database</button>
      <br></br>
      <br></br>
      <div style={{position:"fixed",height:"100%",left:"5%",display:'inline', width:"40%",border:"5px solid gray",fontSize:"1px"}}>
        {(pageNumber1<numPages1)&&<button onClick={(e) => setPageNumber1(pageNumber1+1)}>+</button>}
        {(pageNumber1>1)&&<button onClick={(e) => setPageNumber1(pageNumber1-1)}>-</button>}
        <Document file='http://139.177.207.245:5000/uploads/b42e0deb847222f8638ff429ab2b6b23' onLoadSuccess={onDocumentLoadSuccess}>
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