let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (k) => {
  if (k.key === 'd') {
    keyboard.RIGHT = true;
  }
  if (k.key === 'a') {
    keyboard.LEFT = true;
  }
  if (k.key === ' ') {
    keyboard.JUMP = true;
  }
  if (k.key === 'f') {
    keyboard.SPELL = true;
  }
});

window.addEventListener('keyup', (k) =>{
  if (k.key === 'd') {
    keyboard.RIGHT = false;
  }
  if (k.key === 'a') {
    keyboard.LEFT = false;
  }
  if (k.key === ' ') {
    keyboard.JUMP = false;
  }
  if (k.key === 'f') {
    keyboard.SPELL = false;
  }
})
