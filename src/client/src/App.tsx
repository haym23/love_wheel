import React from 'react';
import './App.css';
import { SlotMachine } from './components';
import icon from './images/favicon.ico';
import cherry from './images/cherry.gif';

function App() {
  const images = [
    icon,
    cherry
  ];

  return (
    <div className="App">
      <SlotMachine images={images}/>
    </div>
  );
}

export default App;
