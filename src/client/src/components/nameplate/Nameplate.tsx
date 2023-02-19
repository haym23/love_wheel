import React, { useEffect, useRef, useState } from 'react';
import './Nameplate.css';

type NameplateProps = {
  // The images to use for the slots
  spinning: boolean,
};

const items = [
  'Jenny',
  'Caroline',
  'Christina',
  'Samantha',
];

/**
 * Nameplate Function Component
 * 
 * @description Renders the name of the person being spun for
 */
const Nameplate: React.FC<NameplateProps> = (props) => {
  const [duration] = useState(3);
  const door = useRef<HTMLDivElement>(null);

  /**
   * init Function
   * 
   * @description Reset the windows back to the original value
   *  (❓)
   */
  const init = () => {
    // Shallow copy items
    const arr = items;

    if (door.current) {
      const div = door.current.querySelector('.window') as HTMLElement;
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
      reelClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      reelClone.style.transform = `translateY(-${div.clientHeight * (pool.length - 1)}px)`;
      div.replaceChild(reelClone, reel);
    }
  };

  /**
   * spin function
   * 
   * @description Move the image reel from top to bottom
   */
  const spin = () => {
    if (door.current) {
      const div = door.current.querySelector('.window') as HTMLElement;
      const reel = div.querySelector('.reel') as HTMLElement;
      reel.style.transform = 'translateY(0)'
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
    const duration = 3;
    /**
     * init Function
     * 
     * @description Reset the windows back to the original value
     *  (❓)
     */
    const init = () => {
      // Shallow copy items
      const arr = items;

      if (door.current) {
        const div = door.current.querySelector('.window') as HTMLElement;
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
        reelClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        reelClone.style.transform = `translateY(-${div.clientHeight * (pool.length - 1)}px)`;
        div.replaceChild(reelClone, reel);
      }
    };

    if (props.spinning) {
      spin();
    } else {
      init();
    }
  }, [props.spinning]);

  return (
    <div id="app" ref={door}>

      <div className="window">
        <div className="reel">

        </div>
      </div>
    </div>
  )
}

export { Nameplate };