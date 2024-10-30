function openControls() {
  let control = document.getElementById("control_overlay");
  control.classList.remove("d-none");
}

function closeControls() {
  let control = document.getElementById("control_overlay");
  control.classList.add("d-none");
}

function bubblingPrevention(event) {
  event.stopPropagation();
}

function toggleSounds() {
  let muteButtonOn = document.getElementById("music_button_on");
  let muteButtonOff = document.getElementById("music_button_off");
  muteButtonOn.classList.toggle("d-none");
  muteButtonOff.classList.toggle("d-none");
}

function controlButtons() {
  let controlButton = document.getElementById("controls_button");
  let muteButtonOn = document.getElementById("music_button_on");
  let muteButtonOff = document.getElementById("music_button_off");
  controlButton.classList.toggle("pos-abs");
  muteButtonOn.classList.toggle("pos-abs");
  muteButtonOff.classList.toggle("pos-abs");

}

function hideMoveLeftButton() {
  let moveLeftButton = document.getElementById("left_button");
  moveLeftButton.classList.add("d-none");
}

function hideMoveRightButton() {
  let moveLeftButton = document.getElementById("right_button");
  moveLeftButton.classList.add("d-none");
}

function hideSpellButton() {
  let moveLeftButton = document.getElementById("spell_button");
  moveLeftButton.classList.add("d-none");
}

function hideSwordButton() {
  let moveLeftButton = document.getElementById("sword_button");
  moveLeftButton.classList.add("d-none");
}

function hideJumpButton() {
  let moveLeftButton = document.getElementById("jump_button");
  moveLeftButton.classList.add("d-none");
}

function showMoveLeftButton() {
  let moveLeftButton = document.getElementById("left_button");
  moveLeftButton.classList.remove("d-none");
}

function showMoveRightButton() {
  let moveLeftButton = document.getElementById("right_button");
  moveLeftButton.classList.remove("d-none");
}

function showSpellButton() {
  let moveLeftButton = document.getElementById("spell_button");
  moveLeftButton.classList.remove("d-none");
}

function showSwordButton() {
  let moveLeftButton = document.getElementById("sword_button");
  moveLeftButton.classList.remove("d-none");
}

function showJumpButton() {
  let moveLeftButton = document.getElementById("jump_button");
  moveLeftButton.classList.remove("d-none");
}

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
