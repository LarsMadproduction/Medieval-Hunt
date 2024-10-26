let canvas;
let world;
let keyboard = new Keyboard();
let actionSpellStart = null;
let actionAttackStart = null;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  document.getElementById('start_screen').classList.remove('start-screen');
  document.getElementById('h1').classList.add('d-none');
  document.getElementById('start_button').classList.add('d-none');
  document.getElementById('restart_button').classList.add('d-none');
  canvas.classList.remove('d-none');
}

function restart() {
  World.clear();
  clearAllIntervals();
  init();
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function toggleRestart() {
  if (keyboard.RESTART) {
    window.location.reload();
  }
}

function executeSpell() {
  keyboard.SPELL = true;
}

function cooldownSpell() {
  let currentTime = new Date().getTime();
  if (actionSpellStart === null) {
    actionSpellStart = currentTime;
    executeSpell();
    return;
  }
  let actionEnd = currentTime - actionSpellStart;
  if (actionEnd > 1000) {
    executeSpell();
    actionSpellStart = currentTime;
  }
}

function executeAttack() {
  keyboard.HIT = true;
}

function cooldownAttack() {
  let currentTime = new Date().getTime();
  if (actionAttackStart === null) {
    actionAttackStart = currentTime;
    executeAttack();
    return;
  }
  let actionEnd = currentTime - actionAttackStart;
  if (actionEnd > 500) {
    executeAttack();
    actionAttackStart = currentTime;
  }
}

window.addEventListener("keydown", (k) => {
  if (k.key === "d") {
    keyboard.RIGHT = true;
    attackTimeout = setTimeout(() => {
      keyboard.HIT = false;
  }, 100);
  }
  if (k.key === "a") {
    keyboard.LEFT = true;
    attackTimeout = setTimeout(() => {
      keyboard.HIT = false;
  }, 100);
  }
  if (k.key === " ") {
    keyboard.JUMP = true;
    attackTimeout = setTimeout(() => {
      keyboard.HIT = false;
  }, 100);
  }

  if (k.key === "w") {
    cooldownSpell();
    attackTimeout = setTimeout(() => {
      keyboard.HIT = false;
  }, 100);
  }

  if (k.key === "s") {
    cooldownAttack();
    attackTimeout = setTimeout(() => {
      keyboard.HIT = false;
  }, 100);
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

window.addEventListener("keydown", function (k) {
  if (k.key === " " && k.target == document.body) {
    k.preventDefault();
  }
});
