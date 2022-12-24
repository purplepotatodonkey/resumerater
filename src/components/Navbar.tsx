import React from 'react';
import Navbar from './components/Navbar';
import Display from './components/Display';
import './App.css';

export class Navbar extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="App">
        <div>
            This is the navbar Component
        </div>
        <div>
            This is the navbar Component
        </div>
      </div>
    );
  }
}

export default Navbar;
