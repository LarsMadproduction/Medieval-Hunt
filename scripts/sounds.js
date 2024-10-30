const SOUND_CHARACTER_DEAD = new Audio("assets/sounds/characterKilled.mp3");
SOUND_CHARACTER_DEAD.playbackRate = 0.5;
SOUND_CHARACTER_DEAD.volume = 0.3;
SOUND_CHARACTER_DEAD.muted = false;

const SOUND_CHARACTER_STEPS = new Audio("assets/sounds/characterSteps.mp3");
SOUND_CHARACTER_STEPS.playbackRate = 2.5;
SOUND_CHARACTER_STEPS.volume = 1;
SOUND_CHARACTER_STEPS.muted = false;

const SOUND_CHARACTER_SWORD_SWING = new Audio("assets/sounds/swordSwing.mp3");
SOUND_CHARACTER_SWORD_SWING.playbackRate = 2.5;
SOUND_CHARACTER_SWORD_SWING.volume = 0.5;
SOUND_CHARACTER_SWORD_SWING.muted = false;

const SOUND_CHARACTER_FIRE_SPELL = new Audio("assets/sounds/fireSpell.mp3");
SOUND_CHARACTER_FIRE_SPELL.playbackRate = 2.5;
SOUND_CHARACTER_FIRE_SPELL.volume = 0.3;
SOUND_CHARACTER_FIRE_SPELL.muted = false;

const SOUND_CHARACTER_HIT = new Audio("assets/sounds/characterHit.mp3");
SOUND_CHARACTER_HIT.playbackRate = 2.5;
SOUND_CHARACTER_HIT.volume = 0.3;
SOUND_CHARACTER_HIT.muted = false;

const SOUND_COIN_COLLECTED = new Audio("assets/sounds/collectCoin.mp3");
SOUND_COIN_COLLECTED.playbackRate = 3.5;
SOUND_COIN_COLLECTED.volume = 0.3;
SOUND_COIN_COLLECTED.muted = false;

const SOUND_MANA_SPILL = new Audio("assets/sounds/manaSpill.mp3");
SOUND_MANA_SPILL.playbackRate = 2;
SOUND_MANA_SPILL.volume = 1;
SOUND_MANA_SPILL.muted = false;

const MUSIC_THEME = new Audio("assets/sounds/backgroundMusic.mp3");
MUSIC_THEME.volume = 0.05;
MUSIC_THEME.loop = true;
MUSIC_THEME.muted = false;

const ENEMY_DEAD = new Audio("assets/sounds/enemyScream.mp3");
ENEMY_DEAD.playbackRate = 3;
ENEMY_DEAD.volume = 1;
ENEMY_DEAD.muted = false;

const MINION_DEAD = new Audio("assets/sounds/minionDead.mp3");
MINION_DEAD.playbackRate = 1.5;
MINION_DEAD.volume = 1;
MINION_DEAD.muted = false;

const BOSS_HIT = new Audio("assets/sounds/bossHit.mp3");
BOSS_HIT.playbackRate = 1.2;
BOSS_HIT.volume = 0.3;
BOSS_HIT.muted = false;

const BOSS_DEAD = new Audio("assets/sounds/bossDead.mp3");
BOSS_DEAD.playbackRate = 1.2;
BOSS_DEAD.volume = 0.5;
BOSS_DEAD.muted = false;

function muteSound() {
  MUSIC_THEME.muted = true;
  SOUND_CHARACTER_DEAD.muted = true;
  SOUND_CHARACTER_STEPS.muted = true;
  SOUND_CHARACTER_SWORD_SWING.muted = true;
  SOUND_CHARACTER_FIRE_SPELL.muted = true;
  SOUND_CHARACTER_HIT.muted = true;
  SOUND_COIN_COLLECTED.muted = true;
  SOUND_MANA_SPILL.muted = true;
  ENEMY_DEAD.muted = true;
  MINION_DEAD.muted = true;
  BOSS_HIT.muted = true;
  BOSS_DEAD.muted = true;
}

function playSound() {
    MUSIC_THEME.muted = false;
    SOUND_CHARACTER_DEAD.muted = false;
    SOUND_CHARACTER_STEPS.muted = false;
    SOUND_CHARACTER_SWORD_SWING.muted = false;
    SOUND_CHARACTER_FIRE_SPELL.muted = false;
    SOUND_CHARACTER_HIT.muted = false;
    SOUND_COIN_COLLECTED.muted = false;
    SOUND_MANA_SPILL.muted = false;
    ENEMY_DEAD.muted = false;
    MINION_DEAD.muted = false;
    BOSS_HIT.muted = false;
    BOSS_DEAD.muted = false;
  }
