/**
 * Represents an end boss character in the game, extending the Sprite class.
 */
class Endboss extends Sprite {
  axisX = 3850;
  axisY = 100;
  width = 300;
  height = 360;
  speed = 10;
  life = 100;
  notice = false;
  alertAnimation = false;
  isDead = false;

  imgsAnimationArray = [
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  imgsAnimationWalkArray = [
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  imgsAnimationAttackArray = [
    "../img/4_enemie_boss_chicken/3_attack/G13.png",
    "../img/4_enemie_boss_chicken/3_attack/G14.png",
    "../img/4_enemie_boss_chicken/3_attack/G15.png",
    "../img/4_enemie_boss_chicken/3_attack/G16.png",
    "../img/4_enemie_boss_chicken/3_attack/G17.png",
    "../img/4_enemie_boss_chicken/3_attack/G18.png",
    "../img/4_enemie_boss_chicken/3_attack/G19.png",
    "../img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  imgsAnimationHurtArray = [
    "../img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  imgsAnimationDeadArray = [
    "../img/4_enemie_boss_chicken/5_dead/G24.png",
    "../img/4_enemie_boss_chicken/5_dead/G25.png",
    "../img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  hurtSound = new Audio("../audio/chicken_hurt.mp3");
  deadSound = new Audio("../audio/chicken_dead.mp3");

  /**
   * Initializes a new instance of the Endboss class, loading images and starting animations.
   */
  constructor() {
    super().loadImg("../img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImgs(this.imgsAnimationArray);
    this.loadImgs(this.imgsAnimationWalkArray);
    this.loadImgs(this.imgsAnimationAttackArray);
    this.loadImgs(this.imgsAnimationHurtArray);
    this.loadImgs(this.imgsAnimationDeadArray);
    this.animationIntervalArray = [];
    this.animateCharacter();
  }

  /**
   * Starts the character's animation based on its state.
   */
  animateCharacter() {
    const animationInterval = setInterval(() => {
      if (this.startAlert()) {
        this.startAlertAnimation(animationInterval);
      }
    }, 240);

    this.animationIntervalArray.push(animationInterval);
  }

  /**
   * Checks if the end boss should enter alert state.
   * @returns {boolean} - True if the character should enter alert state, false otherwise.
   */
  startAlert() {
    return world && world.character.axisX > 3300 && !this.notice;
  }

  /**
   * Starts the alert animation.
   * @param {number} interval - The interval ID of the animation loop.
   */
  startAlertAnimation(interval) {
    if (!this.alertAnimation) {
      this.alertAnimationInterval = this.startAnimationInterval(
        this.imgsAnimationArray,
        275,
        () => {
          clearInterval(this.alertAnimationInterval);
          this.alertAnimation = true;
          setTimeout(() => {
            this.notice = true;
            this.walk();
          }, 1000);
        }
      );
      clearInterval(interval);
    }
  }

  /**
   * Starts an animation interval for the given images.
   * @param {Array<string>} images - The array of image paths for the animation.
   * @param {number} intervalTime - The time interval in milliseconds for the animation.
   * @param {Function} [onComplete] - A callback function to execute when the animation completes.
   * @returns {number} - The interval ID for the animation.
   */
  startAnimationInterval(images, intervalTime, onComplete = null) {
    let animationCounter = 0;
    const animationLength = images.length;
    return setInterval(() => {
      this.moveAnimation(images);
      animationCounter++;
      if (animationCounter / animationLength >= 1) {
        clearInterval(this.deathAnimationInterval);
        if (onComplete) onComplete();
      }
    }, intervalTime);
  }

  /**
   * Initiates the walking animation for the end boss.
   */
  walk() {
    const walkingInterval = setInterval(() => {
      if (this.life > 0 && !this.isDead) {
        this.moveAnimation(this.imgsAnimationWalkArray);
        this.animateLeft();
      } else if (this.endbossIsDead()) {
        clearInterval(walkingInterval);
        this.world.endGame();
      }
    }, 200);
  }

  /**
   * Reduces the end boss's life and handles hurt animation.
   */
  endbossIsHit() {
    this.life -= 10;
    if (this.life < 0) {
      this.life = 0;
    }
    this.hurtAnimation();
    this.setStatusBar();
  }

  /**
   * Updates the status bar with the current life percentage of the end boss.
   */
  setStatusBar() {
    world.endbossStatusBar.setPercentage(this.life);
  }

  /**
   * Checks if the end boss is dead and initiates the death sequence if so.
   */
  endbossIsDead() {
    if (this.life <= 0 && !this.isDead) {
      this.isDead = true;
      clearInterval(this.hurtAnimationInterval);
      this.speed = 0;
      this.deathAnimation();
      this.deadSound.play();
      setTimeout(() => {
        displayGameOver();
      }, 1000);
      this.clearIntervals();
    }
  }

  /**
   * Triggers the hurt animation for the end boss.
   */
  hurtAnimation() {
    if (!this.hurtAnimationInterval) {
      this.speed = 0;
      if (this.life >= 10) {
        this.hurtSound.play();
      }

      this.hurtAnimationInterval = this.startAnimationInterval(
        this.imgsAnimationHurtArray,
        300,
        () => {
          this.walkingState();
        }
      );
    }
  }

  /**
   * Returns the end boss to the walking state after being hurt.
   */
  walkingState() {
    clearInterval(this.hurtAnimationInterval);
    this.hurtAnimationInterval = null;
    this.moveAnimation(this.imgsAnimationWalkArray);
    this.continueAfterDelay(0.05);
  }

  continueAfterDelay(delay) {
    setTimeout(() => {
      this.speed = 9 + Math.random() * 1.2;
    }, delay * 1000);
  }

  deathAnimation() {
    this.deathAnimationInterval = this.startAnimationInterval(
      this.imgsAnimationDeadArray,
      250,
      () => {
        this.finalDeathAnimation();
      }
    );
  }

  finalDeathAnimation() {
    clearInterval(this.deathAnimationInterval);
    this.deathAnimationInterval = null;
    this.loadImg(
      this.imgsAnimationDeadArray[this.imgsAnimationDeadArray.length - 1]
    );
  }

  clearIntervals() {
    this.animationIntervalArray.forEach((interval) => clearInterval(interval));
    this.animationIntervalArray = [];
    this.animationIntervalArray.forEach((interval) => {
      const index = intervals.indexOf(interval);
      if (index !== -1) {
        intervals.splice(index, 1);
      }
    });
  }

  stopAllAnimations() {
    clearInterval(this.hurtAnimationInterval);
  }
}
