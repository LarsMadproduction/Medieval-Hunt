/**
 * All button elements on the page.
 * @type {NodeListOf<HTMLButtonElement>}
 */
let buttons = document.querySelectorAll("button");

/**
 * Opens the control overlay.
 */
function openControls() {
  let control = document.getElementById("control_overlay");
  control.classList.remove("d-none");
}

/**
 * Closes the control overlay.
 */
function closeControls() {
  let control = document.getElementById("control_overlay");
  control.classList.add("d-none");
}

/**
 * Prevents event bubbling.
 * @param {Event} event - The event object.
 */
function bubblingPrevention(event) {
  event.stopPropagation();
}

/**
 * Toggles sound buttons visibility and mutes/unmutes all sounds.
 */
function toggleSounds() {
  let muteButtonOn = document.getElementById("music_button_on");
  let muteButtonOff = document.getElementById("music_button_off");
  muteButtonOn.classList.toggle("d-none");
  muteButtonOff.classList.toggle("d-none");
  muteAllSound(muteButtonOn);
}

/**
 * Mutes or unmutes all sounds based on the visibility of the mute button.
 * @param {HTMLElement} muteButtonOn - The mute button element.
 */
function muteAllSound(muteButtonOn) {
  if (muteButtonOn.classList.contains("d-none")) {
    muteSound();
  } else {
    playSound();
  }
}

/**
 * Toggles home button visibility.
 */
function toggleHomeButton() {
  let home = document.getElementById("home_button");
  home.classList.toggle("d-none");
}

/**
 * Reloads the current web page.
 */
function homeScreen() {
  window.location.reload();
}

/**
 * Shows or hides mobile buttons based on media query matches.
 * @param {MediaQueryList} x - Media query object for screen width.
 */
function mobileButtons(x) {
  if (gameStarted) {
    if (x.matches) {
      showMobileButtons();
    } else {
      hideMobileButtons();
    }
  }
}

/**
 * Shows all mobile control buttons.
 */
function showMobileButtons() {
  showMoveLeftButton();
  showMoveRightButton();
  showSpellButton();
  showSwordButton();
  showJumpButton();
}

/**
 * Hides all mobile control buttons.
 */
function hideMobileButtons() {
  hideMoveLeftButton();
  hideMoveRightButton();
  hideSpellButton();
  hideSwordButton();
  hideJumpButton();
}

/**
 * Toggles position of control and mute buttons.
 */
function controlButtons() {
  let controlButton = document.getElementById("controls_button");
  let muteButtonOn = document.getElementById("music_button_on");
  let muteButtonOff = document.getElementById("music_button_off");
  controlButton.classList.toggle("pos-abs");
  muteButtonOn.classList.toggle("pos-abs");
  muteButtonOff.classList.toggle("pos-abs");
}

/**
 * Hides the move-left button.
 */
function hideMoveLeftButton() {
  let moveLeftButton = document.getElementById("left_button");
  moveLeftButton.classList.add("d-none");
}

/**
 * Hides the move-right button.
 */
function hideMoveRightButton() {
  let moveRightButton = document.getElementById("right_button");
  moveRightButton.classList.add("d-none");
}

/**
 * Hides the spell button.
 */
function hideSpellButton() {
  let spellButton = document.getElementById("spell_button");
  spellButton.classList.add("d-none");
}

/**
 * Hides the sword button.
 */
function hideSwordButton() {
  let swordButton = document.getElementById("sword_button");
  swordButton.classList.add("d-none");
}

/**
 * Hides the jump button.
 */
function hideJumpButton() {
  let jumpButton = document.getElementById("jump_button");
  jumpButton.classList.add("d-none");
}

/**
 * Shows the move-left button.
 */
function showMoveLeftButton() {
  let moveLeftButton = document.getElementById("left_button");
  moveLeftButton.classList.remove("d-none");
}

/**
 * Shows the move-right button.
 */
function showMoveRightButton() {
  let moveRightButton = document.getElementById("right_button");
  moveRightButton.classList.remove("d-none");
}

/**
 * Shows the spell button.
 */
function showSpellButton() {
  let spellButton = document.getElementById("spell_button");
  spellButton.classList.remove("d-none");
}

/**
 * Shows the sword button.
 */
function showSwordButton() {
  let swordButton = document.getElementById("sword_button");
  swordButton.classList.remove("d-none");
}

/**
 * Shows the jump button.
 */
function showJumpButton() {
  let jumpButton = document.getElementById("jump_button");
  jumpButton.classList.remove("d-none");
}

/**
 * Adds touch event listeners to mobile buttons for controlling character actions.
 */
function tochButtons() {
  document.getElementById("left_button").addEventListener("touchstart", (e) => {
    e.preventDefault();
    world.keyboard.LEFT = true;
  });
  document.getElementById("left_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    world.keyboard.LEFT = false;
  });
  document
    .getElementById("right_button")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      world.keyboard.RIGHT = true;
    });
  document.getElementById("right_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    world.keyboard.RIGHT = false;
  });
  document
    .getElementById("spell_button")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      world.keyboard.SPELL = true;
    });
  document.getElementById("spell_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    world.keyboard.SPELL = false;
  });
  document
    .getElementById("sword_button")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      world.keyboard.HIT = true;
    });
  document.getElementById("sword_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    world.keyboard.HIT = false;
  });
  document.getElementById("jump_button").addEventListener("touchstart", (e) => {
    e.preventDefault();
    world.keyboard.JUMP = true;
  });
  document.getElementById("jump_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    world.keyboard.JUMP = false;
  });
}

/**
 * Adds active class on touchstart and removes it on touchend for visual feedback.
 */
buttons.forEach((button) => {
  button.addEventListener("touchstart", () => {
    button.classList.add("active");
  });

  button.addEventListener("touchend", () => {
    button.classList.remove("active");
  });
});
