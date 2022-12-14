import React, { createRef } from 'react';
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
  private spinner1 = React.useRef<Spinner>();
  private spinner2 = React.useRef<Spinner>();
  private spinner3 = React.useRef<Spinner>();

  handleClick() {
    this.spinner1.current?.forceUpdateHandler();
    // this._spinner2?.current?.forceUpdateHandler();
    // this._spinner3?.current?.forceUpdateHandler();
  }

  finishHandler(value: number) {
  }

  render () {
    return (
      <div>
        <Spinner
          images={this.props.images}
          onFinish={() => {}}
          timer={1000}
          lastPosition={1}
          ref={this.spinner1} 
        />
        <Spinner
          ref={this.spinner2} 
          images={this.props.images}
          onFinish={() => {}}
          timer={1400}
          lastPosition={1}
        />
        <Spinner 
          ref={this._spinner3} 
          images={this.props.images}
          onFinish={() => {}}
          timer={2200}
          lastPosition={1}
        />
        <br />
        <button onClick={this.handleClick}>Spin</button>
      </div>
    );
  }
};

export { SlotMachine };
