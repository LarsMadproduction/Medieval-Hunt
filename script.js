let canvas;
let world;
let keyboard = new Keyboard();
let actionStart = null;
let actionEnd = 0;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, actionStart, actionEnd);
}

function toggleRestart() {
  if (keyboard.RESTART) {
    window.location.reload();
  }
}

function executeSpell() {
  keyboard.SPELL = true;
}

function cooldown() {
  let currentTime = new Date().getTime();
  if (actionStart === null) {
    actionStart = currentTime;
    executeSpell();
    return;
  }
  let actionEnd = currentTime - actionStart;
  if (actionEnd > 1000) {
    executeSpell();
    actionStart = currentTime;
  }
}

window.addEventListener("keydown", (k) => {
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
    cooldown();
  }

  if (k.key === "s") {
    keyboard.HIT = true;
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
  if (k.key === "w") {
    keyboard.SPELL = false;
  }
  if (k.key === "s") {
    keyboard.HIT = false;
  }
  if (k.key === "p") {
    keyboard.PAUSE = false;
  }
  if (k.key === "r") {
    keyboard.RESTART = false;
  }
});
