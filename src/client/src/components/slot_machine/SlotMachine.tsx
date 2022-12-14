import React from 'react';
import { Spinner } from './Spinner'
import './SlotMachine.css';

type SlotProps = {
  // The images to use for the slots
  images: string[];
};

type SlotState = {
  spinner1Pos: boolean
}

class SlotMachine extends React.Component<SlotProps, SlotState> {
  private _spinner1 = new Spinner({
    timer: 1000,
    images: this.props.images,
    onFinish: () => {},
  });



  handleClick() {

  }
  
  finishHandler(value: number) {
  }

  render () {
    return (
      <div>
        <Spinner ref={(child) => {
          this._spinner1 = child;
        }} images={this.props.images} onClick={this.handleClick} timer={1000}/>
        <Spinner images={this.props.images} onFinish={this.handleClick} timer={1400}/>
        <Spinner images={this.props.images} onClick={this.handleClick} timer={2200}/>
        <br />
        <button onClick={this.handleClick}>Spin</button>
      </div>
    );
  }
};

export { SlotMachine };
