/**
 * Sound effect for character death.
 * @type {HTMLAudioElement}
 */
const SOUND_CHARACTER_DEAD = new Audio("assets/sounds/characterKilled.mp3");
SOUND_CHARACTER_DEAD.playbackRate = 0.5;
SOUND_CHARACTER_DEAD.volume = 0.3;

/**
 * Sound effect for character steps.
 * @type {HTMLAudioElement}
 */
const SOUND_CHARACTER_STEPS = new Audio("assets/sounds/characterSteps.mp3");
SOUND_CHARACTER_STEPS.playbackRate = 2.5;
SOUND_CHARACTER_STEPS.volume = 1;

/**
 * Sound effect for character sword swing.
 * @type {HTMLAudioElement}
 */
const SOUND_CHARACTER_SWORD_SWING = new Audio("assets/sounds/swordSwing.mp3");
SOUND_CHARACTER_SWORD_SWING.playbackRate = 0.8;
SOUND_CHARACTER_SWORD_SWING.volume = 0.5;

/**
 * Sound effect for character fire spell.
 * @type {HTMLAudioElement}
 */
const SOUND_CHARACTER_FIRE_SPELL = new Audio("assets/sounds/fireSpell.mp3");
SOUND_CHARACTER_FIRE_SPELL.playbackRate = 2.5;
SOUND_CHARACTER_FIRE_SPELL.volume = 0.3;

/**
 * Sound effect for character hit.
 * @type {HTMLAudioElement}
 */
const SOUND_CHARACTER_HIT = new Audio("assets/sounds/characterHit.mp3");
SOUND_CHARACTER_HIT.playbackRate = 2.5;
SOUND_CHARACTER_HIT.volume = 0.3;

/**
 * Sound effect for collecting a coin.
 * @type {HTMLAudioElement}
 */
const SOUND_COIN_COLLECTED = new Audio("assets/sounds/collectCoin.mp3");
SOUND_COIN_COLLECTED.playbackRate = 3.5;
SOUND_COIN_COLLECTED.volume = 0.3;

/**
 * Sound effect for mana spill.
 * @type {HTMLAudioElement}
 */
const SOUND_MANA_SPILL = new Audio("assets/sounds/manaSpill.mp3");
SOUND_MANA_SPILL.playbackRate = 2;
SOUND_MANA_SPILL.volume = 1;

/**
 * Background music theme for the game.
 * @type {HTMLAudioElement}
 */
const SOUND_MUSIC_THEME = new Audio("assets/sounds/backgroundMusic.mp3");
SOUND_MUSIC_THEME.volume = 0.05;
SOUND_MUSIC_THEME.loop = true;

/**
 * Sound effect for enemy death.
 * @type {HTMLAudioElement}
 */
const SOUND_ENEMY_DEAD = new Audio("assets/sounds/enemyScream.mp3");
SOUND_ENEMY_DEAD.playbackRate = 3;
SOUND_ENEMY_DEAD.volume = 1;

/**
 * Sound effect for minion death.
 * @type {HTMLAudioElement}
 */
const SOUND_MINION_DEAD = new Audio("assets/sounds/minionDead.mp3");
SOUND_MINION_DEAD.playbackRate = 1.5;
SOUND_MINION_DEAD.volume = 1;

/**
 * Sound effect for boss getting hurt.
 * @type {HTMLAudioElement}
 */
const SOUND_BOSS_HURT = new Audio("assets/sounds/bossHit.mp3");
SOUND_BOSS_HURT.playbackRate = 1.2;
SOUND_BOSS_HURT.volume = 0.3;

/**
 * Sound effect for boss death.
 * @type {HTMLAudioElement}
 */
const SOUND_BOSS_DEAD = new Audio("assets/sounds/bossDead.mp3");
SOUND_BOSS_DEAD.playbackRate = 1.2;
SOUND_BOSS_DEAD.volume = 0.5;

/**
 * Sound effect for boss steps.
 * @type {HTMLAudioElement}
 */
const SOUND_BOSS_STEP = new Audio("assets/sounds/bossStep.mp3");
SOUND_BOSS_STEP.playbackRate = 0.2;
SOUND_BOSS_STEP.volume = 0.1;

/**
 * Mutes all sound effects and background music.
 */
function muteSound() {
  SOUND_MUSIC_THEME.muted = true;
  SOUND_CHARACTER_DEAD.muted = true;
  SOUND_CHARACTER_STEPS.muted = true;
  SOUND_CHARACTER_SWORD_SWING.muted = true;
  SOUND_CHARACTER_FIRE_SPELL.muted = true;
  SOUND_CHARACTER_HIT.muted = true;
  SOUND_COIN_COLLECTED.muted = true;
  SOUND_MANA_SPILL.muted = true;
  SOUND_ENEMY_DEAD.muted = true;
  SOUND_MINION_DEAD.muted = true;
  SOUND_BOSS_HURT.muted = true;
  SOUND_BOSS_DEAD.muted = true;
  SOUND_BOSS_STEP.muted = true;
  localStorage.setItem('soundMuted', 'true');
}

/**
 * Unmutes all sound effects and background music.
 */
function playSound() {
  SOUND_MUSIC_THEME.muted = false;
  SOUND_CHARACTER_DEAD.muted = false;
  SOUND_CHARACTER_STEPS.muted = false;
  SOUND_CHARACTER_SWORD_SWING.muted = false;
  SOUND_CHARACTER_FIRE_SPELL.muted = false;
  SOUND_CHARACTER_HIT.muted = false;
  SOUND_COIN_COLLECTED.muted = false;
  SOUND_MANA_SPILL.muted = false;
  SOUND_ENEMY_DEAD.muted = false;
  SOUND_MINION_DEAD.muted = false;
  SOUND_BOSS_HURT.muted = false;
  SOUND_BOSS_DEAD.muted = false;
  SOUND_BOSS_STEP.muted = false;
  localStorage.setItem('soundMuted', 'false');
}

/**
 * Loads the sound status from localStorage and sets the initial state.
 */
function loadSoundStatus() {
  const isMuted = localStorage.getItem('soundMuted');
  let muteButtonOn = document.getElementById("music_button_on");
  let muteButtonOff = document.getElementById("music_button_off");

  if (isMuted === 'true') {
    muteSound();
    muteButtonOn.classList.add("d-none");
    muteButtonOff.classList.remove("d-none");
  } else {
    playSound();
    muteButtonOn.classList.remove("d-none");
    muteButtonOff.classList.add("d-none");
  }
}

window.onload = loadSoundStatus;

