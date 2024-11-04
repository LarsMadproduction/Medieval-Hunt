/**
 * The Keyboard class manages the state of keyboard inputs in the game.
 * It tracks whether specific keys are pressed or not, enabling control over character actions.
 */
class Keyboard {

  constructor() {
    this.LEFT = false;
    this.RIGHT = false;
    this.JUMP = false;
    this.SPELL = false;
    this.HIT = false;
  }
}
