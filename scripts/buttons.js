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
  controlButton.classList.toggle("pos-abs");
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

function removeButtons() {}
