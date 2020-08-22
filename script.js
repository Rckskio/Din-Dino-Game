addEventListener('load', () => {
  console.log('Page Loaded');
  start();
});

const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.code === 'Space' && !isJumping) {
    jump();
  }
}

function handleEnter(event) {
  if (event.code === 'Enter') {
    location.reload();
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          // going down
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 35);
    } else {
      // going up
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1500;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game Over
      clearInterval(leftInterval);
      document.body.innerHTML = `<h1 class="game-over">Game Over</h1>
      <p id="centerP">Type enter to restart game</p>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

// Implemented before...
// function moveCactus() {
//   const cactus = document.querySelector('.cactus');
//   let position = 95;

//   let interval = setInterval(() => {
//     if (position < 0) {
//       position = 95;
//     } else {
//       position -= 0.8;
//       cactus.style.left = position + '%';
//     }
//   }, 20);
// }

function start() {
  createCactus();
  //moveCactus();
  addEventListener('keyup', handleKeyUp);
  addEventListener('keyup', handleEnter);
}
