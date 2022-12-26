import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import {Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {

  const [samplePDF, setSamplePDF] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSamplePDF(e.target.files[0]);
    }
  }

  return (
    <div className="App">
      {/* <ReactPDF file={{data:renderPDF}}></ReactPDF> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div>Test</div>
      <input type="file" onChange={handleFileChange} />
      {/* <Document file={samplePDF}>
        <Page pageNumber={1} />
      </Document> */}
      <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button onClick={(e) => setPageNumber(pageNumber+1)}>+</button>
      <button onClick={(e) => setPageNumber(pageNumber-1)}>-</button>
    </div>
  );
}

export default App;