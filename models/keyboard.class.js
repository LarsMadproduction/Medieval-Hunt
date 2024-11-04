/**
 * The Keyboard class manages the state of keyboard inputs in the game.
 * It tracks whether specific keys are pressed or not, enabling control over character actions.
 */
class Keyboard {
  /**
   * Creates an instance of the Keyboard class.
   * Initializes the state of key inputs for movement and actions.
   * @type {boolean} LEFT - Indicates if the left arrow key is pressed.
   * @type {boolean} RIGHT - Indicates if the right arrow key is pressed.
   * @type {boolean} JUMP - Indicates if the jump key is pressed.
   * @type {boolean} SPELL - Indicates if the spell key is pressed.
   * @type {boolean} HIT - Indicates if the hit key is pressed.
   */
  constructor() {
    this.LEFT = false;
    this.RIGHT = false;
    this.JUMP = false;
    this.SPELL = false;
    this.HIT = false;
  }
}
