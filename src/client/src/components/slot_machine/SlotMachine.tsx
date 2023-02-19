import React, { useEffect, useRef } from 'react';
import './SlotMachine.css';

type SlotProps = {
  // The images to use for the slots
  // images: string[],
  spinning: boolean,
};

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
const SlotMachine: React.FC<SlotProps> = (props) => {
  const doors = useRef<HTMLDivElement>(null);

  /**
   * spin function
   * 
   * @description Move the image reel from top to bottom
   */
  const spin = () => {
    if (doors.current) {
      const divs = doors.current.querySelectorAll('.door') as NodeListOf<HTMLElement>;
      divs.forEach((div) => {
        const reel = div.querySelector('.reel') as HTMLElement;
        reel.style.transform = 'translateY(0)'
      });
    }
  };

  /**
   * shuffle
   * 
   * @description Create a random array of images to reel through
   * 
   * @todo Change this to accept a parameter, for what the last item should be
   * 
   * @param arr[] Array of items to shuffle
   */
  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };

  /**
   * Built in function useEffect
   * 
   * @description Hook function that is called whever the state is changed
   */
  useEffect(() => {
    const durations = [1, 2, 3];
    /**
     * init Function
     * 
     * @description Reset the windows back to the original value
     *  (❓)
     */
    const init = () => {
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
            // TODO change this to style.backgroundImage
            imgDiv.textContent = pool[i];
            reelClone.appendChild(imgDiv);
          }

          // Add effects, slide reel down
          reelClone.style.transitionDuration = `${durations[index] > 0 ? durations[index] : 1}s`;
          reelClone.style.transform = `translateY(-${div.clientHeight * (pool.length - 1)}px)`;
          div.replaceChild(reelClone, reel);
        });
      }
    };

    if (props.spinning) {
      spin();
    } else {
      init();
    }
  }, [props.spinning]);

  return (
    <div id="app">

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

    </div>
  )
}

export { SlotMachine };