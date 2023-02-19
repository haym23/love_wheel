import { useState } from 'react';
import './Holder.css';
import { SlotMachine } from '../../components';
import { Nameplate } from '../nameplate/Nameplate';

function Holder() {
  const [spinning, setSpinning] = useState(false);

  const onSpin = () => {
    setSpinning(true);
  }

  const onReset = () => {
    setSpinning(false);
  }

  return (
    <div className="App">
      <Nameplate spinning={spinning}/>
      <SlotMachine spinning={spinning}/>
      <div className="buttons">
        <button id="spinner" onClick={onSpin}>Play</button>
        <button id="reseter" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export { Holder };
