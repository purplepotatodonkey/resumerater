import '../App.css';
import React,{useEffect, useState} from 'react';
import {Document, Page, pdfjs } from 'react-pdf';
import {Link} from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Leaderboard() {

  const [resAPI1, setResAPI1] = useState('');
  const [resAPI2, setResAPI2] = useState('');
  const [resAPI3, setResAPI3] = useState('');

  useEffect(async() => {
    console.log("loaded page")
    console.log("Getting top resumes from DB...")
    const response = await fetch('http://139.177.207.245:5000/get_top_three', {
      method: 'GET'
    })
    const data = await response.text();
    console.log(data)
    setResAPI1(data)
    setResAPI2(data)
    setResAPI3(data)
  }, [])

  return (
    <div className="App">
      <div>Test</div>
      <Link to={'/'}><button>Go Back</button></Link>
      <div>{resAPI1}</div>
      <div>{resAPI2}</div>
      <div>{resAPI3}</div>

    </div>
  );
}

export default Leaderboard;