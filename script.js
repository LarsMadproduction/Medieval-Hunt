let canvas;
let world;
let keyboard = new Keyboard();
let actionSpellStart = null;
let actionAttackStart = null;
let x = window.matchMedia("(max-width: 1024px)");
let gameStarted = false;
const mediaQueryListener = function () {
  mobileButtons(x);
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

function mobileButtons(x) {
  if (gameStarted) {
    if (x.matches) {
      showMobileButtons();
    } else {
      hideMobileButtons();
    }
  }
}

function showMobileButtons() {
  showMoveLeftButton();
  showMoveRightButton();
  showSpellButton();
  showSwordButton();
  showJumpButton();
}

function hideMobileButtons() {
  hideMoveLeftButton();
  hideMoveRightButton();
  hideSpellButton();
  hideSwordButton();
  hideJumpButton();
}

function showStartScreenContent() {
  document.getElementById("start_screen").classList.remove("start-screen");
  document.getElementById("h1").classList.add("d-none");
  document.getElementById("h2").classList.add("d-none");
  document.getElementById("start_button").classList.add("d-none");
  document.getElementById("restart_button").classList.add("d-none");
  canvas.classList.remove("d-none");
}

function showEndScreenContent() {
  document.getElementById("start_screen").classList.add("start-screen");
  document.getElementById("h1").classList.remove("d-none");
  document.getElementById("h2").classList.remove("d-none");
  document.getElementById("start_button").classList.add("d-none");
  document.getElementById("restart_button").classList.remove("d-none");
  canvas.classList.add("d-none");
}

function restart() {
  clearAllIntervals();
  World.clear();
  initLevel();
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

x.addEventListener("change", mediaQueryListener);

if (gameStarted) {
  mobileButtons(x);
} else {
  mobileButtons(x);
}

document.addEventListener("DOMContentLoaded", () => {
  function checkOrientation() {
    let warning = document.getElementById("landscapeWarning");
  
    if (warning) { // Sicherstellen, dass das Element existiert
      if (window.innerWidth <= 1024 && window.matchMedia("(orientation: portrait)").matches) {
        // Hochformat und max-width 1024px -> Nachricht anzeigen
        warning.style.display = "flex";
      } else {
        // Querformat oder größere Breite -> Nachricht ausblenden
        warning.style.display = "none";
      }
    }
  }

  // Überprüfung der Ausrichtung bei Fensteränderung
  window.addEventListener("resize", checkOrientation);

  // Überprüfung der Ausrichtung bei Seitenaufruf
  checkOrientation();
});

// function startGame() {
//   let canvas = document.getElementById("start_screen");

//   // Prüfen, ob das Gerät im Landscape-Modus ist und die Breite kleiner oder gleich 1024px ist
//   if (isLandscape()) {
//     enterFullscreen(canvas);
//   } 

// }

// // Prüft, ob das Gerät im Landscape-Modus ist und die Breite maximal 1024px beträgt
// function isLandscape() {
//   return window.innerWidth > window.innerHeight && window.innerWidth <= 1024;
// }

// function enterFullscreen(element) {
//   // Nur Vollbildmodus aktivieren, wenn Landscape aktiv und Breite <= 1024px ist
//   if (isLandscape()) {
//     if (element.requestFullscreen) {
//       element.requestFullscreen();
//     } else if (element.mozRequestFullScreen) { // Firefox
//       element.mozRequestFullScreen();
//     } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
//       element.webkitRequestFullscreen();
//     } else if (element.msRequestFullscreen) { // IE/Edge
//       element.msRequestFullscreen();
//     }
//   } else {
//     console.log("Vollbild nicht aktiviert, da die Breite zu groß ist oder das Gerät im Hochformat ist.");
//   }
// }

// // Optional: Vollbildmodus verlassen, wenn nötig
// function exitFullscreen() {
//   const canvas = document.getElementById("start_screen");

//   if (document.fullscreenElement) {
//     document.exitFullscreen();

//   }
// }






