"use strict";

const playBtn = document.getElementById("playBtn");
const storyBtn = document.getElementById("storyBtn");
const screenImg = document.getElementById("screenImg");
const startMenuBtnsContainer = document.getElementById(
  "startMenuBtnsContainer"
);
const story = document.getElementById("story");
const closeIconStory = document.getElementById("closeIconStory");
const audioImg = document.getElementById("audioImg");
const gamepadImg = document.getElementById("gamepadImg");
const closeIconGame = document.getElementById("closeIconGame");
const instructions = document.getElementById("instructions");
const startMenuSettingsContainer = document.getElementById(
  "startMenuSettingsContainer"
);
const controlBtnsContainer = document.getElementById("controlBtnsContainer");
const returnHome = document.getElementById("returnHome");
const returnHomeBtn = document.getElementById("returnHomeBtn");
const mainContainer = document.getElementById("mainContainer");
const mainCanvas = document.getElementById("mainCanvas");
const rotateContainer = document.getElementById("rotateContainer");
const impressumContainer = document.getElementById("impressumContainer");
const closeIconImpressum = document.getElementById("closeIconImpressum");
const impBtn = document.getElementById("impBtn");

const leftArrow = document.getElementById("leftArrowImg");
const rightArrow = document.getElementById("rightArrowImg");
const upArrow = document.getElementById("upArrowImg");
const bottleThrow = document.getElementById("bottleImg");

const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
let world;
let keyboard = new Keyboard();
let allIntervals = [];
let gameRunning = true;
const gamingSound = new Audio("../audio/game_music.mp3");
gamingSound.volume = 0.5;

/**
 * Adds a new interval to the list of active intervals
 * @param {number} interval - The interval ID to add
 */
function pushInterval(interval) {
  allIntervals.push(interval);
}

/**
 * Stops all active intervals and cancels animation frame
 */
function stopAllIntervals() {
  if (requestAnimationFrameId !== 0) {
    cancelAnimationFrame(requestAnimationFrameId);
  }
  requestAnimationFrameId = 0;
  allIntervals.forEach((interval) => {
    clearInterval(interval);
  });
  allIntervals = [];
}
/**
 * Initializes the game by starting a new game and setting up screen rotation
 */
function init() {
  newGame();
  toggleRotateScreen();
}

/**
 * Resets the game state and starts a new game
 */
function newGame() {
  keyboard = new Keyboard();
  allIntervals = [];
  world = null;
  gameRunning = true;
  initLevel();
  playBtn.textContent = "RESTART";
  world = new World(canvas, keyboard, level1);
  world.statusBar.percentage = 100;
  btnsPressEvents();
  if (audioImg.classList.contains("audioOn")) {
    unmuteAllSounds();
  } else {
    muteAllSounds();
  }
}

/**
 * Loads the start menu screen when the window loads
 */
window.onload = (event) => {
  startGameMenu();
};

/**
 * Displays the start menu screen
 */
function startGameMenu() {
  ctx.clearRect(0, 0, 720, 480);
  const img = new Image();
  img.src = "../img/9_intro_outro_screens/start/startscreen_1.png";
  img.onload = function () {
    ctx.drawImage(img, 0, 0, 720, 480);
  };
}

/**
 * Begins the game
 */
playBtn.addEventListener("click", () => {
  init();
  returnHome.style.display = "none";
});

/**
 * Keydown event listener for arrow and space keys
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 37) {
    keyboard.left = true;
  }

  if (e.keyCode === 39) {
    keyboard.right = true;
  }

  if (e.keyCode === 38) {
    keyboard.up = true;
  }

  if (e.keyCode === 40) {
    keyboard.down = true;
  }

  if (e.keyCode === 32) {
    keyboard.space = true;
  }
});

/**
 * Keyup event listener to stop actions when arrow and space keys are released
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode === 37) {
    keyboard.left = false;
  }

  if (e.keyCode === 39) {
    keyboard.right = false;
  }

  if (e.keyCode === 38) {
    keyboard.up = false;
  }

  if (e.keyCode === 40) {
    keyboard.down = false;
  }

  if (e.keyCode === 32) {
    keyboard.space = false;
  }
});

/**
 * Sets up event listeners for button press events on touch controls
 */
function btnsPressEvents() {
  leftArrow.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.left = true;
  });

  leftArrow.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.left = false;
  });

  rightArrow.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.right = true;
  });

  rightArrow.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.right = false;
  });

  upArrow.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.up = true;
  });

  upArrow.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.up = false;
  });

  bottleThrow.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.down = true;
  });

  bottleThrow.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.down = false;
  });
}

/**
 * Displays story screen and hides main menu buttons
 */
storyBtn.addEventListener("click", () => {
  startMenuBtnsContainer.classList.add("hidden");
  story.style.display = "flex";
});

/**
 * Hides story screen and displays main menu buttons
 */
closeIconStory.addEventListener("click", () => {
  story.style.display = "none";
  startMenuBtnsContainer.classList.remove("hidden");
});

/**
 * Displays game instructions and hides main menu buttons
 */
gamepadImg.addEventListener("click", () => {
  startMenuBtnsContainer.classList.add("hidden");
  instructions.style.display = "flex";
});

/**
 * Hides game instructions and displays main menu buttons
 */
closeIconGame.addEventListener("click", () => {
  instructions.style.display = "none";
  startMenuBtnsContainer.classList.remove("hidden");
});

/**
 * Displays Impressum section
 */
impBtn.addEventListener("click", () => {
  impressumContainer.style.display = "flex";
});

/**
 * Hides Impressum section
 */

closeIconImpressum.addEventListener("click", () => {
  impressumContainer.style.display = "none";
});

/**
 * Toggles audio mute and updates icon state
 */
audioImg.addEventListener("click", () => {
  if (audioImg.classList.contains("audioOn")) {
    audioImg.src = "./img/11_icons/audioOff.svg";
    audioImg.classList.remove("audioOn");
    audioImg.classList.add("audioOff");
    muteAllSounds();
  } else {
    audioImg.src = "./img/11_icons/audioOn.svg";
    audioImg.classList.remove("audioOff");
    audioImg.classList.add("audioOn");
    unmuteAllSounds();
  }
});

/**
 * Mutes all audios
 */
function muteAllSounds() {
  if (world) {
    gamingSound.muted = true;
    gamingSound.pause();
    world.character.runningSound.muted = true;
    world.character.jumpSound.muted = true;
    world.character.hurtSound.muted = true;
    world.level.enemies.forEach((chicken) => (chicken.hurtSound.muted = true));
    world.level.endboss.forEach((endboss) => {
      endboss.hurtSound.muted = true;
      endboss.deadSound.muted = true;
    });
    world.coinSound.muted = true;
    world.bottleSound.muted = true;
    world.bottleSmashSound.muted = true;
  }
}

/**
 * Unmutes all audios
 */
function unmuteAllSounds() {
  if (world) {
    gamingSound.muted = false;
    gamingSound.loop = true;
    gamingSound.play();
    world.character.runningSound.muted = false;
    world.character.jumpSound.muted = false;
    world.character.hurtSound.muted = false;
    world.level.enemies.forEach((chicken) => (chicken.hurtSound.muted = false));
    world.level.endboss.forEach((endboss) => {
      endboss.hurtSound.muted = false;
      endboss.deadSound.muted = false;
    });
    world.coinSound.muted = false;
    world.bottleSound.muted = false;
    world.bottleSmashSound.muted = false;
  }
}

/**
 * Displays Game Over Screen or Won Screen
 */

function displayGameOver() {
  gameRunning = false;
  gamingSound.muted = true;
  gamingSound.pause();
  muteAllSounds();
  const img = new Image();

  if (world.isEndbossDead()) {
    img.src = "../img/9_intro_outro_screens/win/won_2.png";
  } else {
    img.src = "../img/9_intro_outro_screens/game_over/oh no you lost!.png";
  }

  img.onload = function () {
    ctx.drawImage(img, 0, 0, 720, 480);
  };
  playBtn.textContent = "RESTART";
  returnHome.style.display = "flex";
}

/**
 * Return to Main Screen
 */

returnHome.addEventListener("click", () => {
  returnHome.style.display = "none";
  playBtn.textContent = "PLAY";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startGameMenu();
});

/**
 * Toggles fullscreen mode for the application.
 * If not in fullscreen, requests fullscreen on the settings container and resizes the canvas.
 * If already in fullscreen, exits fullscreen and resets the canvas size.
 */

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    requestFullscreen(startMenuSettingsContainer);
    setCanvasSize(canvas, "100vw", "100vh");
    canvas.classList.add("canvasFullScreen");
    screenImg.classList.remove("fullscreen");
    screenImg.classList.add("minimize");
    screenImg.src = "./img/11_icons/minimize.svg";
  } else {
    exitFullscreen();
    resetCanvasSize(canvas);
    canvas.classList.remove("canvasFullScreen");
    screenImg.classList.remove("minimize");
    screenImg.classList.add("fullscreen");
    screenImg.src = "./img/11_icons/fullscreen.svg";
  }
}

/**
 * Requests fullscreen mode on a specified element.
 * Supports different fullscreen methods for compatibility with various browsers.
 * @param {HTMLElement} element - The element to request fullscreen on.
 */
function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 * Supports different exit methods for compatibility with various browsers.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Sets the canvas size to specified width and height.
 * @param {HTMLCanvasElement} canvas - The canvas element to resize.
 * @param {string} width - The new width of the canvas.
 * @param {string} height - The new height of the canvas.
 */
function setCanvasSize(canvas, width, height) {
  canvas.style.width = width;
  canvas.style.height = height;
}

/**
 * Resets the canvas size to default dimensions (720px by 480px).
 * @param {HTMLCanvasElement} canvas - The canvas element to reset.
 */
function resetCanvasSize(canvas) {
  setCanvasSize(canvas, "720px", "480px");
}

/**
 * Adjusts the canvas size based on fullscreen state.
 * If in fullscreen, sets the canvas to fill the screen; otherwise, resets to default size.
 */
function adjustCanvasSize() {
  if (document.fullscreenElement) {
    setCanvasSize(canvas, "100vw", "100vh");
  } else {
    resetCanvasSize(canvas);
  }
}

/**
 * Handles changes to fullscreen state.
 * Adjusts the canvas size accordingly when entering or exiting fullscreen.
 */
function onFullscreenChange() {
  if (document.fullscreenElement) {
    setCanvasSize(document.getElementById("canvas"), "100vw", "100vh");
  } else {
    resetCanvasSize(document.getElementById("canvas"));
  }
}

/**
 * Toggles the display for screen rotation instructions based on screen orientation.
 * Displays rotation message if screen width is less than 1368px and height is greater than width.
 */
function toggleRotateScreen() {
  if (window.innerWidth <= 1368 && window.innerHeight > window.innerWidth) {
    rotateContainer.style.display = "flex";
    startMenuSettingsContainer.style.display = "none";
  } else {
    rotateContainer.style.display = "none";
    startMenuSettingsContainer.style.display = "flex";
  }
}

/**
 * Adds event listeners for screen resize and orientation changes to toggle rotation instructions.
 */
window.addEventListener("resize", toggleRotateScreen);
window.addEventListener("orientationchange", toggleRotateScreen);

/**
 * Adds a click event listener to the screen image to toggle fullscreen mode.
 */
screenImg.addEventListener(
  "click",
  () => {
    toggleFullScreen();
  },
  false
);
