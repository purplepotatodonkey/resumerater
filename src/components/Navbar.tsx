import React from 'react';
import '../App.css';

export class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="App">
        <div>NAVBAR COMPONENT 😄</div>
        <form action="http://139.177.207.245:5000/upload" method="post" encType="multipart/form-data">
          <input type="file" name="pdf" accept="application/pdf"></input>
          <button type="submit">Upload PDF</button>
        </form>
      </div>
    );
  }
}

export default App;
