import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import {Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {

  const [pdf1, setPdf1] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [numPages1, setNumPages1] = useState(null);
  const [numPages2, setNumPages2] = useState(null);
  const [pageNumber1, setPageNumber1] = useState(1);
  const [pageNumber2, setPageNumber2] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages1(numPages);
    setNumPages2(numPages);
    setPageNumber1(1);
    setPageNumber2(1);
  }

  const getRandomPDF = async(e) => {
      console.log("Fetching a random pdf from server...")
      let response = await fetch('http://139.177.207.245:5000/random', {
        method: 'GET',
        mode: 'no-cors',
        // contentType: 'application/pdf',
        responseType: 'arraybuffer',
      });
      console.log("request made")
      let data = await response.arrayBuffer();
      console.log(data)
      console.log("setting response")
      handleFileChange(data);
      // setPdf1(data);
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setPdf1(e.target.files[0]);
      setPdf2(e.target.files[0]);
    } else {
      setPdf1(e);
      setPdf2(e);
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
        <Document file={pdf1} onLoadSuccess={onDocumentLoadSuccess}>
          <Page  style={{}} pageNumber={pageNumber1}/>
        </Document>
        <p>
          Page {pageNumber1} of {numPages1}
        </p>
      </div>
      <div style={{position:"fixed",height:"100%",right:"5%", display:'inline', width:"40%",border:"5px solid gray",fontSize:"1px"}}>
        {(pageNumber2<numPages2)&&<button onClick={(e) => setPageNumber2(pageNumber2+1)}>+</button>}
        {(pageNumber2>1)&&<button onClick={(e) => setPageNumber2(pageNumber2-1)}>-</button>}
        <Document file={pdf2} onLoadSuccess={onDocumentLoadSuccess}>
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