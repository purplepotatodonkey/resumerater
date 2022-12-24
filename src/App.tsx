import React from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar';
import { Display } from './components/Display';
import './App.css';

export class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="App">
        <Navbar />
        <Navbar />
        <Display />
      </div>
    );
  }
}

export default App;
