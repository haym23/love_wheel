import React, { useEffect, useRef } from 'react';
import './SlotMachine.css';

// type SlotProps = {
//   // The images to use for the slots
//   images: string[],
// };

const items = [
  '🍭',
  '❌',
  '⛄️',
  '🦄',
  '🍌',
  '💩',
  '👻',
  '😻',
  '💵',
  '🤡',    
  '🦖',
  '🍎',
  '😂',
  '🖕',
];

function SlotMachine() {
  const doors = useRef(null);

  function init(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors.current) {
      if (firstInit) {
        door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
        return;
      }

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      const pool = ['❓'];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); ++n) {
          arr.push(...items);
        }
        pool.push(...shuffle(arr));

        boxesClone.addEventListener(
          'transitionstart',
          function () {
            door.dataset.spinned = '1';
            this.querySelectorAll('.box').forEach((box) => {
              box.style.filter = 'blur(1px)';
            });
          },
          { once: true },
        );

        boxesClone.addEventListener(
          'transitioned',
          function () {
            this.querySelectorAll('.box').forEach((box, index) => {
              box.style.filter = 'blur(0)';
              if (index > 0 ) {
                this.removeChild(box);
              }
            })
          },
          { once: true },
        );
      }

      for (let i = pool.length - 1; i >= 0; --i) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }

      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
    }
  }

  async function spin() {
    init(false, 1, 2);

    for (const door of doors.current) {
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  useEffect(() => {
    init();
  });

  return (
    <div>
      {/* Render the spin button and pass the spin function as a prop */
        <SlotMachine onClick={spin} />
      }
    </div>
  )
}

// class SlotMachine extends React.Component<SlotProps, SlotState> {
//   constructor(props: SlotProps) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//     this.spinner1 = new Spinner({
//       timer: 0,
//       lastPosition: 0,
//       images: this.props.images,
//     });
//     this.spinner2 = new Spinner({
//       timer: 0,
//       lastPosition: 0,
//       images: this.props.images,
//     });
//     this.spinner3 = new Spinner({
//       timer: 0,
//       lastPosition: 0,
//       images: this.props.images,
//     });

//     this.state = {
//       firstInit: true,
//       groups: 1,
//       duration: 1,
//     };
//   }

//   componentDidMount() {
//   }

//   handleClick = () => {
//     this.reset();
//   }

//   tick() {
//     this.spinner1.tick();
//     this.spinner2.tick();
//     this.spinner3.tick();

//     console.log('Calling tick');

//     this.setState({
//       spinner1Pos: this.spinner1.getPositon(),
//       spinner2Pos: this.spinner2.getPositon(),
//       spinner3Pos: this.spinner3.getPositon(),
//     })

//     if (this.spinner3.getTimeRemaining() <= 0) {
//       clearInterval(this.timer);
//     }
//   }

//   reset() {
// 		if (this.timer) {
//     	clearInterval(this.timer);
//     }

//     this.spinner1.reset();
//     this.spinner2.reset();
//     this.spinner3.reset();

//     this.timer = setInterval(() => {
//       this.tick();
//     }, 100);
//   }

//   finishHandler(value: number) {
//   }

//   render () {
//     return (
//       <div>
//         <img src={this.props.images[this.spinner1.getPositon()]} alt="Spinner 1" />
//         <img src={this.props.images[this.spinner2.getPositon()]} alt="Spinner 2" />
//         <img src={this.props.images[this.spinner3.getPositon()]} alt="Spinner 3" />
//         <br />
//         <button onClick={this.handleClick}>Spin</button>
//       </div>
//     );
//   }
// };

export { SlotMachine };
