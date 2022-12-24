import React from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar';
import './App.css';

export class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="App">
        <Navbar />
        <Navbar />
      </div>
    );
  }
}

export default App;
