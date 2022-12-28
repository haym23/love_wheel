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

  useEffect(() => {
    document.querySelector('#spinner').addEventListener('click', spin);
    document.querySelector('#reseter').addEventListener('click', init);
  
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
  });

  return (
    <div id="app">
      <div class="doors">
        <div class="door">
          <div class="boxes">

          </div>
        </div>

        <div class="door">
          <div class="boxes">

          </div>
        </div>

        <div class="door">
          <div class="boxes">
            
          </div>
        </div>
      </div>

      <div class="buttons">
        <button id="spinner">Play</button>
        <button id="resetter">Reset</button>
      </div>
    </div>
  )
}

export { SlotMachine };