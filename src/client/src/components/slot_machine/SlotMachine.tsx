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
  const [duration, setDuration] = useState(5);
  const doors = useRef<HTMLDivElement>(null);

  /**
   * init Function
   * 
   * @description Reset the windows back to the original value
   *  (❓)
   */
  function init() {
    // Shallow copy items
    const arr = items;

    if (doors.current) {
      const divs = doors.current.querySelectorAll('.door') as NodeListOf<HTMLElement>;
      divs.forEach((div) => {
        const reel = div.querySelector('.reel') as HTMLElement;
        const reelClone = reel.cloneNode(false) as HTMLElement;
        const pool = ['❓'];

        pool.push(...shuffle(arr));

        reelClone.addEventListener(
          'transitionstart',
          () => {
            const imgDivs = div.querySelectorAll('.image') as NodeListOf<HTMLElement>;
            imgDivs.forEach((img) => {
              img.style.filter = 'blur(3px)';
              const blur_transition = `filter ${duration * 0.1}s ease-in`;
              const spin_transition = `transform ${duration * 0.5}s ease-in-out`;
              img.style.transition = `${ blur_transition }, ${ spin_transition }`;
            });
          },
          { once: true },
        );

        setDuration(parseInt(reel.style.transitionDuration));

        for (let i = pool.length - 1; i >=0; --i) {
          const box = document.createElement('div');
          box.classList.add('image');
          box.style.width = div.clientWidth + 'px';
          box.style.height = div.clientHeight + 'px';
          box.textContent = pool[i];
          reelClone.appendChild(box);
        }
        reelClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        reelClone.style.transform = `translateY(-${div.clientHeight * (pool.length - 1)}px)`;
        div.replaceChild(reelClone, reel);
      });
    }
  }

  function blur() {
    console.log('Got to blur');
    if (doors.current) {
      const divs = doors.current.querySelectorAll('.door') as NodeListOf<HTMLElement>;
      divs.forEach((div) => {
        const imageDivs = div.querySelectorAll('.image') as NodeListOf<HTMLElement>;
        imageDivs.forEach((img, index) => {
          img.style.filter = 'blur(0)';
          img.style.transition = `filter ${duration * 0.5}s ease-in`;
        });
      });
    }
  }

  async function spin() {
    if (doors.current) {
      const divs = doors.current.querySelectorAll('.door') as NodeListOf<HTMLElement>;
      divs.forEach((div) => {
        const reel = div.querySelector('.reel') as HTMLElement;
        reel.style.transform = 'translateY(0)'
        return new Promise((resolve) => setTimeout(resolve, duration * 500));
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
      <div className="doors" ref={doors}>
        <div className="door" onTransitionEnd={blur}>
          <div className="reel">
          </div>
        </div>

        <div className="door" onTransitionEnd={blur}>
          <div className="reel">
          </div>
        </div>

        <div className="door" onTransitionEnd={blur}>
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