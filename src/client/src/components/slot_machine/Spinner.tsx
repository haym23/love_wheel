import React from 'react';

type SpinnerProps = {
    images: string[],
    timer: number,
    lastPosition: number,
    onFinish: () => void,
}

type SpinnerState = {
  timer: number,
	position: number,
	timeRemaining: number,
	lastPosition: any,
}

class Spinner extends React.Component<SpinnerProps, SpinnerState> {
	timer: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);

  constructor(props: SpinnerProps){
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
		this.state = {
      timer: 0,
			position: 0,
      timeRemaining: 0,
			lastPosition: this.props.lastPosition,
		};
  };

	forceUpdateHandler(){
    this.reset();
  }; 

  reset() {
		if (this.timer) {
    	clearInterval(this.timer);
    }

    this.setState({
      timeRemaining: this.state.timer,
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);
  }

  tick() {      
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);
      return this.state.position;
    } else {
      return this.spin();
    }
  }

  spin() {
    // Generate three new random numbers to use as the index for the images
    this.setState({
      position: Math.floor(Math.random() * this.props.images.length),
    });
  }


  componentDidMount() {
    clearInterval(this.timer);

    this.setState({
      timeRemaining: this.state.timer
    });

    this.timer = setInterval(() => {
      this.spin()
    }, 100);
  }

  render () {
    return (
      <img src={this.props.images[0]} alt="Slot 2" />
    )
  }
}

export { Spinner };