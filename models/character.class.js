/**
 * The Character class represents the player character in the game.
 * It extends MovableObject, enabling movement, animations, and interaction with the game world.
 */
class Character extends MovableObject {
  /**
   * @type {number} speed - The movement speed of the character.
   * @type {boolean} characterAfk - Indicates if the character is away from keyboard (AFK).
   * @type {number} lastActiveTime - Timestamp of the last time the character was active.
   * @type {boolean} immortal - Indicates if the character is currently immortal.
   * @type {boolean} swordSwingAnimation - Indicates if a sword swing animation is currently playing.
   * @type {Array<string>} CHARACTER_DEFAULT - Array of image paths for the character's default animation.
   * @type {Array<string>} CHARACTER_AFK - Array of image paths for the character's AFK animation.
   * @type {Array<string>} CHARACTER_WALKING - Array of image paths for the character's walking animation.
   * @type {Array<string>} CHARACTER_CHARGE_SPELL - Array of image paths for the character's spell charge animation.
   * @type {Array<string>} CHARACTER_JUMP - Array of image paths for the character's jumping animation.
   * @type {Array<string>} CHARACTER_HURT - Array of image paths for the character's hurt animation.
   * @type {Array<string>} CHARACTER_DEAD - Array of image paths for the character's dead animation.
   * @type {Array<string>} CHARACTER_BASE_ATTACK - Array of image paths for the character's base attack animation.
   * @type {Object} world - Reference to the game world object.
   */
  speed = 3.8;
  characterAfk = false;
  lastActiveTime = Date.now();
  immortal = false;
  swordSwingAnimation = false;
  CHARACTER_DEFAULT = [
    "assets/png/character/characterDefault/characterDefault1.png",
    "assets/png/character/characterDefault/characterDefault2.png",
    "assets/png/character/characterDefault/characterDefault3.png",
    "assets/png/character/characterDefault/characterDefault4.png",
    "assets/png/character/characterDefault/characterDefault5.png",
    "assets/png/character/characterDefault/characterDefault6.png",
    "assets/png/character/characterDefault/characterDefault7.png",
  ];
  CHARACTER_AFK = [
    "assets/png/character/characterJump/characterJump1.png",
    "assets/png/character/characterJump/characterJump2.png",
    "assets/png/character/characterJump/characterJump3.png",
    "assets/png/character/characterJump/characterJump3.png",
    "assets/png/character/characterJump/characterJump2.png",
    "assets/png/character/characterJump/characterJump1.png",
  ];
  CHARACTER_WALKING = [
    "assets/png/character/characterWalk/characterWalk01.png",
    "assets/png/character/characterWalk/characterWalk02.png",
    "assets/png/character/characterWalk/characterWalk03.png",
    "assets/png/character/characterWalk/characterWalk04.png",
    "assets/png/character/characterWalk/characterWalk05.png",
    "assets/png/character/characterWalk/characterWalk06.png",
  ];
  CHARACTER_CHARGE_SPELL = [
    "assets/png/character/characterSkillLaunche/characterSkillLaunche5.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche6.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche7.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche8.png",
  ];
  CHARACTER_JUMP = [
    "assets/png/character/characterJump/characterJump5.png",
    "assets/png/character/characterJump/characterJump6.png",
    "assets/png/character/characterJump/characterJump7.png",
  ];
  CHARACTER_HURT = [
    "assets/png/character/characterHurt/characterHurt1.png",
    "assets/png/character/characterHurt/characterHurt2.png",
    "assets/png/character/characterHurt/characterHurt3.png",
  ];
  CHARACTER_DEAD = [
    "assets/png/character/characterDead/characterDead1.png",
    "assets/png/character/characterDead/characterDead2.png",
    "assets/png/character/characterDead/characterDead3.png",
    "assets/png/character/characterDead/characterDead4.png",
    "assets/png/character/characterDead/characterDead5.png",
    "assets/png/character/characterDead/characterDead6.png",
  ];
  CHARACTER_BASE_ATTACK = [
    "assets/png/character/characterBaseAttack/characterBaseAttack1.png",
    "assets/png/character/characterBaseAttack/characterBaseAttack2.png",
    "assets/png/character/characterBaseAttack/characterBaseAttack3.png",
    "assets/png/character/characterBaseAttack/characterBaseAttack4.png",
  ];

  /**
   * Creates an instance of the Character class.
   * @param {string} imagePath - The path to the initial image for the character.
   * @param {number} x - The horizontal position of the character.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.applyGravity();
    this.x = x;
    this.loadImages(this.CHARACTER_DEFAULT);
    this.loadImages(this.CHARACTER_AFK);
    this.loadImages(this.CHARACTER_WALKING);
    this.loadImages(this.CHARACTER_JUMP);
    this.loadImages(this.CHARACTER_CHARGE_SPELL);
    this.loadImages(this.CHARACTER_HURT);
    this.loadImages(this.CHARACTER_DEAD);
    this.loadImages(this.CHARACTER_BASE_ATTACK);
    this.animate();
  }

  /**
   * Initiates character animations and actions at regular intervals.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.characterMovement();
        this.characterSpellAnimation();
        this.characterKnockBackAnimation();
        this.characterBaseAttackAnimation();
        this.characterBaseAttack();
      }
    }, 1000 / 60);
    setInterval(() => {
      this.characterMoveStatemants();
    }, 700 / 4);
    setInterval(() => {
      this.isAfk();
    }, 100);
  }

  /**
   * Handles character movement based on keyboard input.
   */
  characterMovement() {
    if (world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
      this.moveRight();
      this.backInAction();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.backInAction();
    }
    if (this.world.keyboard.JUMP && !this.isAboveGround()) {
      this.jump();
      this.backInAction();
    }
    this.world.cameraX = -this.x + 0;
  }

  /**
   * Manages character animation states based on current conditions.
   */
  characterMoveStatemants() {
    if (this.characterAfk) {
      this.playAnimation(this.CHARACTER_AFK);
    } else if (this.gotHit()) {
      this.backInAction();
      this.playAnimationOnce(this.CHARACTER_HURT);
    } else if (this.isDead()) {
      this.backInAction();
      SOUND_CHARACTER_DEAD.play();
      this.playAnimationOnce(this.CHARACTER_DEAD);
      this.world.gameOver();
    } else if (
      (this.world.keyboard.RIGHT &&
        !this.isAboveGround() &&
        !this.world.keyboard.SPELL &&
        !this.world.keyboard.HIT) ||
      (this.world.keyboard.LEFT &&
        !this.isAboveGround() &&
        !this.world.keyboard.SPELL &&
        !this.world.keyboard.HIT)
    ) {
      this.playAnimation(this.CHARACTER_WALKING);
      SOUND_CHARACTER_STEPS.play();
    } else if (
      !this.isAboveGround() &&
      !this.world.keyboard.SPELL &&
      !this.world.keyboard.HIT
    ) {
      SOUND_CHARACTER_STEPS.pause();
      this.playAnimation(this.CHARACTER_DEFAULT);
    } else if (this.isAboveGround()) {
      this.playAnimationOnce(this.CHARACTER_JUMP);
    }
  }

  /**
   * Handles character knockback animation when hit.
   */
  characterKnockBackAnimation() {
    if (this.gotHit()) {
      if (this.x > 0.1) {
        this.x -= this.speed + 3;
        SOUND_CHARACTER_HIT.play();
      } else {
        this.backInAction();
        this.playAnimationOnce(this.CHARACTER_HURT);
        SOUND_CHARACTER_HIT.play();
      }
    }
  }

  /**
   * Triggers the character's spell animation if conditions are met.
   */
  characterSpellAnimation() {
    if (this.world.keyboard.SPELL && !this.isAboveGround()) {
      this.backInAction();
      SOUND_CHARACTER_FIRE_SPELL.play();
      this.playAnimationOnce(this.CHARACTER_CHARGE_SPELL);
    }
  }

  /**
   * Initiates the character's base attack if conditions are met.
   */
  characterBaseAttack() {
    if (
      this.world.keyboard.HIT &&
      !this.swordSwingAnimation &&
      !this.isAboveGround()
    ) {
      this.swordSwingAnimation = true;
      this.speed = 0;
      this.backInAction();
    }
  }

  /**
   * Plays the base attack animation and performs the attack.
   */
  characterBaseAttackAnimation() {
    if (this.world.keyboard.HIT && !this.isAboveGround()) {
      this.backInAction();
      SOUND_CHARACTER_SWORD_SWING.play();
      this.performAttack();
      this.playAnimationOnce(this.CHARACTER_BASE_ATTACK);
    }
  }

  /**
   * Checks if the character is away from keyboard (AFK).
   */
  isAfk() {
    let currentAfkTime = Date.now();
    this.characterAfk = currentAfkTime - this.lastActiveTime >= 8000;
  }

  /**
   * Updates the last active time and marks the character as active.
   */
  backInAction() {
    this.lastActiveTime = Date.now();
    this.characterAfk = false;
  }

  /**
   * Performs an attack and sets the character to immortal state.
   */
  performAttack() {
    this.swordHit(this.otherDirection ? "left" : "right");
    this.immortal = true;
  }

  /**
   * Handles the sword hitting logic based on direction.
   * @param {string} direction - The direction of the sword attack ("left" or "right").
   */
  swordHit(direction) {
    if (this.world.keyboard.HIT && !this.isDead()) {
      let offsetX = direction === "left" ? -180 : 0;
      let swordHitting = new Attack(this.x + offsetX, this.y);
      this.clearExistingAttacks();
      this.world.attack.push(swordHitting);
    }
  }

  /**
   * Clears existing attacks and resets the attack state.
   */
  clearExistingAttacks() {
    world.attack = [];
    setTimeout(() => {
      if (this.swordSwingAnimation) this.immortal = false;
      this.swordSwingAnimation = false;
      this.world.keyboard.HIT = false;
      this.speed = 3.8;
    }, 500);
  }
}
