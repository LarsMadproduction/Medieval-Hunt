let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (k) =>{
  if (k.keyCode == 100) {
    keyboard.RIGHT = true;
  }
  if (k.keyCode == 97) {
    keyboard.LEFT = true;
  }
  if (k.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (k.keyCode == 102) {
    keyboard.THROW = true;
  }
  console.log(k);
})

window.addEventListener('keyup', (k) =>{
  if (k.keyCode == 100) {
    keyboard.RIGHT = false;
  }
  if (k.keyCode == 97) {
    keyboard.LEFT = false;
  }
  if (k.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (k.keyCode == 102) {
    keyboard.THROW = false;
  }
  console.log(k);
})