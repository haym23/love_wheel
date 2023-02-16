import React, { useEffect, useRef, useState } from 'react';
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

/**
 * SlotMachine Function Component
 * 
 * @description Renders a 3 window slot machine 
 *  using the above items
 */
const SlotMachine: React.FC = () => {
  const [durations] = useState([1, 2, 3]);
  const doors = useRef<HTMLDivElement>(null);
  const nameplate = useRef<HTMLDivElement>(null);

  /**
   * init Function
   * 
   * @description Reset the windows back to the original value
   *  (❓)
   */
  function init() {
    initNames();

    // Shallow copy items
    const arr = items;

    if (doors.current) {
      const divs = doors.current.querySelectorAll('.door') as NodeListOf<HTMLElement>;
      divs.forEach((div, index) => {
        const reel = div.querySelector('.reel') as HTMLElement;
        const reelClone = reel.cloneNode(false) as HTMLElement;
        const pool = ['❓'];

        pool.push(...shuffle(arr));

        for (let i = pool.length - 1; i >=0; --i) {
          const imgDiv = document.createElement('div');
          imgDiv.classList.add('image');
          imgDiv.style.width = div.clientWidth + 'px';
          imgDiv.style.height = div.clientHeight + 'px';
          imgDiv.textContent = pool[i];
          reelClone.appendChild(imgDiv);
        }

        reelClone.style.transitionDuration = `${durations[index] > 0 ? durations[index] : 1}s`;
        reelClone.style.transform = `translateY(-${div.clientHeight * (pool.length - 1)}px)`;
        div.replaceChild(reelClone, reel);
      });
    }
  }

  /**
   * init names Function
   * 
   * @description Reset the nameplate for later
   *  (❓)
   */
  function initNames() {
    if (nameplate.current) {
      console.log(nameplate.current);
      const name = nameplate.current.querySelector('.reel') as HTMLElement;
      const nameClone = name.cloneNode(false) as HTMLElement;

      const pool = ['Name'];

      pool.push(...shuffle(['Mitchell', 'Sam', 'Todd']));

      for (let i = pool.length - 1; i >=0; --i) {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('image');
        imgDiv.style.width = nameplate.current.clientWidth + 'px';
        imgDiv.style.height = nameplate.current.clientHeight + 'px';
        imgDiv.textContent = pool[i];
        nameClone.appendChild(imgDiv);
      }

      nameClone.style.transitionDuration = `3s`;
      nameClone.style.transform = `translateY(-${nameplate.current.clientHeight * (pool.length - 1)}px)`;
      nameplate.current.replaceChild(nameClone, name);
    }
  }

  function spin() {
    if (doors.current) {
      const divs = doors.current.querySelectorAll('.door') as NodeListOf<HTMLElement>;
      divs.forEach((div) => {
        const reel = div.querySelector('.reel') as HTMLElement;
        reel.style.transform = 'translateY(0)'
      });
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
    <div id="app">

      <div className="nameplate" ref={nameplate}>
        <div className="reel">
        </div>
      </div>

      <div className="doors" ref={doors}>
        <div className="door">
          <div className="reel">
          </div>
        </div>

        <div className="door">
          <div className="reel">
          </div>
        </div>

        <div className="door">
          <div className="reel">
          </div>
        </div>
      </div>

      <div className="buttons">
        <button id="spinner" onClick={spin}>Play</button>
        <button id="reseter" onClick={init}>Reset</button>
      </div>
    </div>
  )
}

export { SlotMachine };