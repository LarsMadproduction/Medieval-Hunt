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

function controlsButton() {
  let controlButton = document.getElementById("controls_button");
  controlButton.classList.add("pos-abs");
}

function moveLeftButton() {
  let moveLeftButton = document.getElementById("left_button");
  moveLeftButton.classList.add("pos-abs");
  moveLeftButton.classList.remove("d-none");
}

function moveRightButton() {
  let moveLeftButton = document.getElementById("right_button");
  moveLeftButton.classList.add("pos-abs");
  moveLeftButton.classList.remove("d-none");
}

function spellButton() {
  let moveLeftButton = document.getElementById("spell_button");
  moveLeftButton.classList.add("pos-abs");
  moveLeftButton.classList.remove("d-none");
}

function swordButton() {
  let moveLeftButton = document.getElementById("sword_button");
  moveLeftButton.classList.add("pos-abs");
  moveLeftButton.classList.remove("d-none");
}

function jumpButton() {
  let moveLeftButton = document.getElementById("jump_button");
  moveLeftButton.classList.add("pos-abs");
  moveLeftButton.classList.remove("d-none");
}
