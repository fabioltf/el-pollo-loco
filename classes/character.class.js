/**
 * Represents a character in the game, extending the Sprite class.
 * Manages the character's animations, movements, sounds, and state.
 */
class Character extends Sprite {
  axisX = 40;
  axisY = 186;
  width = 110;
  height = 240;
  sleepTimer = 0;
  timeSleeping = 1500;

  imgsAnimationArray = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  imgsIdleArray = [
    "../img/2_character_pepe/1_idle/idle/I-1.png",
    "../img/2_character_pepe/1_idle/idle/I-2.png",
    "../img/2_character_pepe/1_idle/idle/I-3.png",
    "../img/2_character_pepe/1_idle/idle/I-4.png",
    "../img/2_character_pepe/1_idle/idle/I-5.png",
    "../img/2_character_pepe/1_idle/idle/I-6.png",
    "../img/2_character_pepe/1_idle/idle/I-7.png",
    "../img/2_character_pepe/1_idle/idle/I-8.png",
    "../img/2_character_pepe/1_idle/idle/I-9.png",
    "../img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  imgsSleepArray = [
    "../img/2_character_pepe/1_idle/long_idle/I-11.png",
    "../img/2_character_pepe/1_idle/long_idle/I-12.png",
    "../img/2_character_pepe/1_idle/long_idle/I-13.png",
    "../img/2_character_pepe/1_idle/long_idle/I-14.png",
    "../img/2_character_pepe/1_idle/long_idle/I-15.png",
    "../img/2_character_pepe/1_idle/long_idle/I-16.png",
    "../img/2_character_pepe/1_idle/long_idle/I-17.png",
    "../img/2_character_pepe/1_idle/long_idle/I-18.png",
    "../img/2_character_pepe/1_idle/long_idle/I-19.png",
    "../img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  imgsAnimationJumpArray = [
    "../img/2_character_pepe/3_jump/J-31.png",
    "../img/2_character_pepe/3_jump/J-32.png",
    "../img/2_character_pepe/3_jump/J-33.png",
    "../img/2_character_pepe/3_jump/J-34.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/3_jump/J-38.png",
    "../img/2_character_pepe/3_jump/J-39.png",
  ];

  imgsAnimationHurtArray = [
    "../img/2_character_pepe/4_hurt/H-41.png",
    "../img/2_character_pepe/4_hurt/H-42.png",
    "../img/2_character_pepe/4_hurt/H-43.png",
  ];

  imgsAnimationDeadArray = [
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
    "../img/2_character_pepe/5_dead/D-57.png",
  ];

  world;
  speed = 6;
  runningSound = new Audio("../audio/running.mp3");
  jumpSound = new Audio("../audio/jump.mp3");
  hurtSound = new Audio("../audio/hurt.mp3");

  /**
   * Creates an instance of the Character class.
   * Loads the initial character image and all animations for walking, idling, sleeping,
   * jumping, hurting, and dying. Initializes the character's animation and gravity.
   */
  constructor() {
    super().loadImg("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImgs(this.imgsAnimationArray);
    this.loadImgs(this.imgsIdleArray);
    this.loadImgs(this.imgsSleepArray);
    this.loadImgs(this.imgsAnimationJumpArray);
    this.loadImgs(this.imgsAnimationHurtArray);
    this.loadImgs(this.imgsAnimationDeadArray);
    this.animateCharacter();
    this.applyGravity();
  }

  /**
   * Handles the character's movement based on keyboard input.
   * Calls functions to manage movement and updates the camera position.
   */
  characterMoving() {
    this.runningSound.pause();
    this.sleepTimerReseter();
    this.characterMovingRight();
    this.characterMovingLeft();
    this.characterJump();
    this.world.cameraAxisX = -this.axisX + 40;
  }

  /**
   * Moves the character to the right if the right key is pressed and within bounds.
   */
  characterMovingRight() {
    if (
      this.world.keyboard.right &&
      this.axisX < this.world.level.levelEndAxisX
    ) {
      this.moveRight();
      this.runningSound.play();
    }
  }

  /**
   * Moves the character to the left if the left key is pressed and within bounds.
   */
  characterMovingLeft() {
    if (this.world.keyboard.left && this.axisX > 40) {
      this.moveLeft();
      this.runningSound.play();
    }
  }

  /**
   * Makes the character jump if the up key is pressed and the character is on the ground.
   */
  characterJump() {
    if (
      this.world.keyboard.up &&
      !this.isAboveGround() /*&&
    this.axisX >= 40 &&
    this.axisX <= this.world.level.levelEndAxisX*/
    ) {
      this.jump();
      this.jumpSound.play();
    }
  }

  /**
   * Animates the character's images based on the character's state.
   * Calls the appropriate animation based on whether the character is dead,
   * hurt, jumping, sleeping, idling, or moving.
   */
  animateCharacterImgs() {
    if (this.isDead()) {
      this.moveAnimation(this.imgsAnimationDeadArray);
      this.world.endGame();
    } else if (this.isHurt()) {
      this.moveAnimation(this.imgsAnimationHurtArray);
      this.hurtSound.play();
    } else if (this.isAboveGround()) {
      this.moveAnimation(this.imgsAnimationJumpArray);
    } else {
      if (
        (this.world.keyboard.right || this.world.keyboard.left) &&
        this.sleepTimer <= this.timeSleeping
      ) {
        // Moving right or left overrides the sleep animation
        if (this.world.keyboard.right) {
          this.characterMovingRight();
        } else if (this.world.keyboard.left) {
          this.characterMovingLeft();
        }
        this.moveAnimation(this.imgsAnimationArray);
      } else if (this.sleepTimer > this.timeSleeping) {
        // Only apply sleep animation if not moving
        this.moveAnimation(this.imgsSleepArray);
      } else {
        this.moveAnimation(this.imgsIdleArray);
      }
    }
  }

  /**
   * Resets the sleep timer based on the character's movement.
   * Increases the sleep timer when the character is idle.
   */
  sleepTimerReseter() {
    if (!this.world.keyboard.right && !this.world.keyboard.left) {
      this.sleepTimer += 750 / 120;
    } else {
      this.sleepTimer = 0;
    }
  }

  /**
   * Starts the animation loop for the character.
   * This method updates the character's movement and animations continuously.
   * It uses `requestAnimationFrame` to ensure smooth rendering and optimal performance.
   *
   * The animation loop consists of two main functions:
   * 1. `characterMoving`: Handles user input for character movement (left, right, jump).
   * 2. `animateCharacterImgs`: Updates the character's animation frames based on its current state (idle, walking, jumping, sleeping, hurt, dead).
   *
   * The loop will run as long as the game is active, allowing the character to respond
   * to user inputs and change animations dynamically based on its actions and state.
   *
   * @function animateCharacter
   * @returns {void}
   */
  animateCharacter() {
    setInterval(() => {
      this.characterMoving();
    }, 1000 / 60);
    setInterval(() => {
      this.animateCharacterImgs();
    }, 100);
  }
}
