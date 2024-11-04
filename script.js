/**
 * Canvas element used for rendering the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main game world instance.
 * @type {World}
 */
let world;

/**
 * Keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Media query for checking max width of 1024px.
 * @type {MediaQueryList}
 */
let x = window.matchMedia("(max-width: 1024px)");

/**
 * Indicates whether the game has started.
 * @type {boolean}
 */
let gameStarted = false;

/**
 * Media query listener function for handling mobile button visibility.
 */
let mediaQueryListener = function () {
  mobileButtons(x);
};

/**
 * Action cooldowns for various player actions.
 * @type {Object<string, {cooldown: number, lastAction: number | null}>}
 */
let actions = {
  SPELL: { cooldown: 1000, lastAction: null },
  HIT: { cooldown: 500, lastAction: null },
};

/**
 * Initializes the game, setting up the canvas, world, and control buttons.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  showStartScreenContent();
  controlButtons();
  gameStarted = true;
  mobileButtons(x);
  tochButtons();
}

/**
 * Restarts the game by clearing intervals, resetting the level, and reinitializing the game.
 */
function restart() {
  toggleHomeButton();
  clearAllIntervals();
  World.clear();
  initLevel();
  init();
}

/**
 * Displays the start screen content by modifying CSS classes.
 */
function showStartScreenContent() {
  document.getElementById("start_screen").classList.remove("start-screen");
  document.getElementById("h1").classList.add("d-none");
  document.getElementById("h2").classList.add("d-none");
  document.getElementById("start_button").classList.add("d-none");
  document.getElementById("restart_button").classList.add("d-none");
  canvas.classList.remove("d-none");
  document.getElementById("legal_notice").classList.add("d-none");
}

/**
 * Displays the end screen content by modifying CSS classes.
 */
function showEndScreenContent() {
  document.getElementById("start_screen").classList.add("start-screen");
  document.getElementById("h1").classList.remove("d-none");
  document.getElementById("h2").classList.remove("d-none");
  document.getElementById("start_button").classList.add("d-none");
  document.getElementById("restart_button").classList.remove("d-none");
  canvas.classList.add("d-none");
  document.getElementById("legal_notice").classList.remove("d-none");
}

/**
 * Clears all currently active intervals.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Executes a specified action if its cooldown period has elapsed.
 * @param {string} action - The action to execute, such as "SPELL" or "HIT".
 */
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

/**
 * Executes the "SPELL" action if its cooldown has elapsed.
 */
function cooldownSpell() {
  executeAction("SPELL");
}

/**
 * Executes the "HIT" action if its cooldown has elapsed.
 */
function cooldownAttack() {
  executeAction("HIT");
}

// Event listeners for keyboard input
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

/**
 * Prevents the space bar from scrolling the page if pressed outside an input field.
 */
window.addEventListener("keydown", function (k) {
  if (k.key === " " && k.target == document.body) {
    k.preventDefault();
  }
});

/**
 * Shows or hides the landscape orientation warning based on device orientation.
 */
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

/**
 * Checks if the device is in portrait mode.
 * @returns {boolean} True if the device is in portrait orientation, otherwise false.
 */
function landscapeRequirement() {
  return window.matchMedia("(orientation: portrait)").matches;
}

// Add event listeners
x.addEventListener("change", mediaQueryListener);

document.addEventListener("DOMContentLoaded", () => {
  function checkOrientation() {
    handleLandscapeWarning();
  }
  window.addEventListener("resize", checkOrientation);
  checkOrientation();
});
