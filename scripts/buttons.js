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

function moveLeftButton() {
  let moveLeftButton = document.getElementById("left_button");
  moveLeftButton.classList.toggle("d-none");
}

function moveRightButton() {
  let moveLeftButton = document.getElementById("right_button");
  moveLeftButton.classList.toggle("d-none");
}

function spellButton() {
  let moveLeftButton = document.getElementById("spell_button");
  moveLeftButton.classList.toggle("d-none");
}

function swordButton() {
  let moveLeftButton = document.getElementById("sword_button");
  moveLeftButton.classList.toggle("d-none");
}

function jumpButton() {
  let moveLeftButton = document.getElementById("jump_button");
  moveLeftButton.classList.toggle("d-none");
}

function removeButtons(){

}