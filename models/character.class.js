/**
 * The Character class represents the player character in the game.
 * It extends MovableObject, enabling movement, animations, and interaction with the game world.
 */
class Character extends MovableObject {
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
      this.characterMoveStatements();
    }, 700 / 4);
    setInterval(() => {
      this.isAfk();
    }, 100);
  }

  /**
   * Handles character movement based on keyboard input.
   * Moves the character right or left, allows jumping, and updates the camera position.
   */
  characterMovement() {
    if (this.handleLevelLenght()) {
      this.moveRight();
      this.backInAction();
    } if (this.handleStartMovability()) {
      this.moveLeft();
      this.backInAction();
    } if (this.handleJumpAbility()) {
      this.jump();
      this.backInAction();
    } this.handleCameraPosition();
  }

  /**
   * Checks if the character can move right based on keyboard input and level boundaries.
   * @returns {boolean} True if the character can move right, otherwise false.
   */
  handleLevelLenght() {
    return world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
  }

  /**
   * Checks if the character can move left based on keyboard input and position on the screen.
   * @returns {boolean} True if the character can move left, otherwise false.
   */
  handleStartMovability() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Checks if the character can jump based on keyboard input and whether they are currently above ground.
   * @returns {boolean} True if the character can jump, otherwise false.
   */
  handleJumpAbility() {
    return this.world.keyboard.JUMP && !this.isAboveGround();
  }

  /**
   * Updates the camera position based on the character's current horizontal position.
   * The camera will follow the character from the left side of the screen.
   */
  handleCameraPosition() {
    this.world.cameraX = -this.x + 0;
  }

  /**
   * Manages character animation states based on current conditions.
   */
  characterMoveStatements() {
    if (this.characterAfk) {
      this.handleAfk();
    } else if (this.gotHit()) {
      this.handleHit();
    } else if (this.isDead()) {
      this.handleDeath();
    } else if (this.isMoving()) {
      this.handleMovement();
    } else if (this.isGrounded()) {
      this.handleDefaultAnimation();
    } else if (this.isAboveGround()) {
      this.handleJump();
    }
  }

  /**
   * Handles the character's animation when they are AFK (away from keyboard).
   * Plays the AFK animation.
   */
  handleAfk() {
    this.playAnimation(this.CHARACTER_AFK);
  }

  /**
   * Handles the character's animation after being hit.
   * Plays the hurt animation and resets the character's state to back in action.
   */
  handleHit() {
    this.backInAction();
    this.playAnimationOnce(this.CHARACTER_HURT);
  }

  /**
   * Handles the character's death animation.
   * Plays the dead animation, stops character actions, and triggers the game over state.
   */
  handleDeath() {
    this.backInAction();
    SOUND_CHARACTER_DEAD.play();
    this.playAnimationOnce(this.CHARACTER_DEAD);
    this.world.gameOver();
  }

  /**
   * Checks if the character is currently moving.
   * @returns {boolean} True if the character is moving, otherwise false.
   */
  isMoving() {
    return (
      (this.world.keyboard.RIGHT &&
        !this.isAboveGround() &&
        !this.world.keyboard.SPELL &&
        !this.world.keyboard.HIT) ||
      (this.world.keyboard.LEFT &&
        !this.isAboveGround() &&
        !this.world.keyboard.SPELL &&
        !this.world.keyboard.HIT)
    );
  }

  /**
   * Handles the character's movement animation.
   * Plays the walking animation and sound effect for steps.
   */
  handleMovement() {
    this.playAnimation(this.CHARACTER_WALKING);
    SOUND_CHARACTER_STEPS.play();
  }

  /**
   * Checks if the character is currently grounded.
   * @returns {boolean} True if the character is on the ground, otherwise false.
   */
  isGrounded() {
    return (
      !this.isAboveGround() &&
      !this.world.keyboard.SPELL &&
      !this.world.keyboard.HIT
    );
  }

  /**
   * Handles the default animation for the character when not moving or performing any action.
   * Stops the walking sound and plays the default animation.
   */
  handleDefaultAnimation() {
    SOUND_CHARACTER_STEPS.pause();
    this.playAnimation(this.CHARACTER_DEFAULT);
  }

  /**
   * Handles the character's jump animation.
   * Plays the jump animation once.
   */
  handleJump() {
    this.playAnimationOnce(this.CHARACTER_JUMP);
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
