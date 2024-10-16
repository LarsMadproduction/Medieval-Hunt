let canvas;
let world;
let keyboard = new Keyboard();
let lastSpellTime = 0;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function toggleRestart() {
  if (keyboard.RESTART) {
    window.location.reload();
  }
}

window.addEventListener("keydown", (k) => {
  // let currentSpellTime = Date.now();
  if (k.key === "d") {
    keyboard.RIGHT = true;
  }
  if (k.key === "a") {
    keyboard.LEFT = true;
  }
  if (k.key === " ") {
    keyboard.JUMP = true;
  }

  if (k.key === "w") {
    // if (currentSpellTime - lastSpellTime > 450) {
      keyboard.SPELL = true;
    //   lastSpellTime = currentSpellTime;
    //   setTimeout(() => {
    //     keyboard.SPELL = false;
    //   }, 450);
    // }
  }

  if (k.key === "p") {
    keyboard.PAUSE = true;
  }
  if (k.key === "r") {
    keyboard.RESTART = true;
    toggleRestart();
  }
});

window.addEventListener("keyup", (k) => {
  if (k.key === "d") {
    keyboard.RIGHT = false;
  }
  if (k.key === "a") {
    keyboard.LEFT = false;
  }
  if (k.key === " ") {
    keyboard.JUMP = false;
  }
  // if (k.key === "w") {
  //   keyboard.SPELL = false;
  if (k.key === "p") {
    keyboard.PAUSE = false;
  }
  if (k.key === "r") {
    keyboard.RESTART = false;
  }
});
