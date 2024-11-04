let canvas;
let world;
let keyboard = new Keyboard();
let x = window.matchMedia("(max-width: 1024px)");
let gameStarted = false;
let mediaQueryListener = function () {
  mobileButtons(x);
};
let actions = {
  SPELL: { cooldown: 1000, lastAction: null },
  HIT: { cooldown: 500, lastAction: null },
};

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  showStartScreenContent();
  controlButtons();
  gameStarted = true;
  mobileButtons(x);
  tochButtons();
}

function restart() {
  clearAllIntervals();
  World.clear();
  initLevel();
  init();
}

function showStartScreenContent() {
  document.getElementById("start_screen").classList.remove("start-screen");
  document.getElementById("h1").classList.add("d-none");
  document.getElementById("h2").classList.add("d-none");
  document.getElementById("start_button").classList.add("d-none");
  document.getElementById("restart_button").classList.add("d-none");
  canvas.classList.remove("d-none");
  document.getElementById("legal_notice").classList.add("d-none");
}

function showEndScreenContent() {
  document.getElementById("start_screen").classList.add("start-screen");
  document.getElementById("h1").classList.remove("d-none");
  document.getElementById("h2").classList.remove("d-none");
  document.getElementById("start_button").classList.add("d-none");
  document.getElementById("restart_button").classList.remove("d-none");
  canvas.classList.add("d-none");
  document.getElementById("legal_notice").classList.remove("d-none");
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function executeAction(action) {
  let currentTime = Date.now();
  if (
    !actions[action].lastAction ||
    currentTime - actions[action].lastAction >= actions[action].cooldown
  ) {
    keyboard[action] = true;
    actions[action].lastAction = currentTime;
  }
}

function cooldownSpell() {
  executeAction("SPELL");
}

function cooldownAttack() {
  executeAction("HIT");
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
    cooldownSpell();
  }

  if (k.key === "s") {
    cooldownAttack();
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
});

window.addEventListener("keydown", function (k) {
  if (k.key === " " && k.target == document.body) {
    k.preventDefault();
  }
});

function handleLandscapeWarning() {
  let warning = document.getElementById("landscape_warning");
  if (warning) {
    if (landscapeRequirement()) {
      warning.style.display = "flex";
    } else {
      warning.style.display = "none";
    }
  }
}

function landscapeRequirement() {
  return window.matchMedia("(orientation: portrait)").matches;
}

x.addEventListener("change", mediaQueryListener);

document.addEventListener("DOMContentLoaded", () => {
  function checkOrientation() {
    handleLandscapeWarning();
  }
  window.addEventListener("resize", checkOrientation);
  checkOrientation();
});
