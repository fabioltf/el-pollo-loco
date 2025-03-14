/**
 * Represents the main game world, managing characters, levels, and interactions.
 */
let requestAnimationFrameId = 0;

class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraAxisX = 0;
  statusBar = new StatusBar();
  bottlesBar = new BottlesBar();
  coinsBar = new CoinsBar();
  endbossStatusBar = new EndbossStatusBar();
  displayEndbossStatusBar = false;
  throwableObject = [];
  cloudImgs = [
    "../img/5_background/layers/4_clouds/1.png",
    "../img/5_background/layers/4_clouds/2.png",
  ];
  newClouds = [];
  alternate = 0;
  bottlesAvailable = true;
  gameOver = false;
  coinSound = new Audio("../audio/coin.mp3");
  bottleSound = new Audio("../audio/bottle.mp3");
  bottleSmashSound = new Audio("../audio/bottle_smash.mp3");
  endbossLeftStage = false;

  /**
   * Initializes the game world, including the canvas and keyboard input.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
   * @param {Object} keyboard - Keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.newCloud();
  }

  /**
   * Links the character with the current game world.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs main game checks at regular intervals, such as collisions and object interactions.
   */
  run() {
    setInterval(() => {
      this.checkBottlesCollection();
      this.checkCoinsCollection();
      this.checkThrowObjects();
      this.checkCollisons();
      this.checkCollisionWithEndboss();
      this.collisionAfterThrowingBottleEndboss();
      this.endbossLeft();
    }, 100);
  }

  /**
   * Checks if the character has passed the end boss, triggering end-of-game logic.
   */
  endbossLeft() {
    if (
      this.level.endboss.length > 0 &&
      this.level.endboss[0].axisX + 250 < this.character.axisX
    ) {
      this.endbossLeftStage = true;
      this.endGame();
    }
  }

  /**
   * Handles bottle throwing logic, including sound effects and cooldown between throws.
   */
  checkThrowObjects() {
    if (
      this.keyboard.down &&
      this.bottlesAvailable &&
      this.bottlesBar.bottlesCollected > 0 &&
      !this.character.otherDirection
    ) {
      let bottle = new ThrowableObject(
        this.character.axisX,
        this.character.axisY
      );
      this.throwableObject.push(bottle);
      this.bottlesBar.setBottles(this.bottlesBar.bottlesCollected - 1);
      this.bottlesAvailable = false;

      setTimeout(() => {
        this.bottleSmashSound.play();
      }, 800);

      setTimeout(() => {
        this.bottlesAvailable = true;
      }, 200);
    }
  }

  /**
   * Generates new cloud objects periodically to add to the background.
   */
  newCloud() {
    setInterval(() => {
      let cloud = new Clouds(this.cloudImgs[this.alternate], 4250);
      this.newClouds.push(cloud);
      if (this.alternate === 0) {
        this.alternate = 1;
      } else {
        this.alternate = 0;
      }
    }, 1000 * 28);
  }

  /**
   * Checks collisions between the character and enemies.
   */
  checkCollisons() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && enemy.life > 0) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
          this.collisionAfterJump(enemy);
        } else if (this.character.life > 0) {
          this.character.collide();
          this.statusBar.setPercentage(this.character.life);
        }
      }
    });
    this.collisionAfterThrowingBottle();
  }

  /**
   * Checks for collisions between thrown bottles and enemies.
   */
  collisionAfterThrowingBottle() {
    this.throwableObject.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (
          !bottle.hasCollided &&
          enemy.life > 0 &&
          enemy.isColliding(bottle)
        ) {
          this.collisionBottleOverEnemy(bottle, bottleIndex, enemy);
        }
      });
    });
  }

  /**
   * Checks collisions between the character and the end boss.
   */
  checkCollisionWithEndboss() {
    if (this.level.endboss && this.level.endboss.length > 0) {
      this.level.endboss.forEach((endboss) => {
        if (this.character.isCollidingEndboss(endboss)) {
          this.character.collide();
          this.statusBar.setPercentage(this.character.life);
        }
      });
    }
  }

  /**
   * Checks collisions between thrown bottles and the end boss.
   */
  collisionAfterThrowingBottleEndboss() {
    this.throwableObject.forEach((bottle, index) => {
      if (!bottle.hasCollided && this.level.endboss[0].isColliding(bottle)) {
        bottle.hasCollided = true;
        this.level.endboss[0].endbossIsHit();
        bottle.animateBottleSplash();
        setTimeout(() => {
          this.removeBottle(index);
        }, 1000);
      }
    });
  }

  /**
   * Handles enemy collisions after the character jumps on them.
   * @param {Object} enemy - The enemy object.
   */
  collisionAfterJump(enemy) {
    enemy.life--;
    this.character.jump();
    if (enemy.life === 0) {
      enemy.animateDeath();
      setTimeout(() => {
        this.removeEnemy(enemy);
      }, 500);
    }
  }

  /**
   * Removes a specified enemy from the game.
   * @param {Object} enemy - The enemy to remove.
   */
  removeEnemy(enemy) {
    const index = this.level.enemies.indexOf(enemy);
    if (index > -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  /**
   * Checks if bottles have been collected by the character.
   */
  checkBottlesCollection() {
    if (this.bottlesBar.bottlesCollected === 10) {
      return;
    }
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottleSound.play();
        this.level.bottles.splice(index, 1);
        this.bottlesBar.setBottles(this.bottlesBar.bottlesCollected + 1);
      }
    });
  }

  /**
   * Handles bottle collision with an enemy.
   * @param {Object} bottle - The thrown bottle.
   * @param {number} bottleIndex - The index of the bottle in the throwableObject array.
   * @param {Object} enemy - The enemy object hit by the bottle.
   */
  collisionBottleOverEnemy(bottle, bottleIndex, enemy) {
    bottle.hasCollided = true;
    enemy.life--;
    if (enemy.life === 0) {
      enemy.animateDeath();
    }
    bottle.animateBottleSplash();
    this.removeEnemyAndBottle(bottleIndex, enemy);
  }

  /**
   * Removes both an enemy and a bottle after a collision.
   * @param {number} bottleIndex - Index of the bottle in the throwableObject array.
   * @param {Object} enemy - The enemy object.
   */
  removeEnemyAndBottle(bottleIndex, enemy) {
    if (enemy.life === 0) {
      setTimeout(() => {
        this.removeEnemy(enemy);
      }, 500);
    }
    setTimeout(() => {
      this.removeBottle(bottleIndex);
    }, 1000);
  }

  /**
   * Removes a bottle from the throwable objects array.
   * @param {number} index - The index of the bottle to remove.
   */
  removeBottle(index) {
    this.throwableObject.splice(index, 1);
  }

  /**
   * Checks if coins have been collected by the character.
   */
  checkCoinsCollection() {
    if (this.bottlesBar.bottlesCollected === 20) {
      return;
    }
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.coinSound.play();
        this.level.coins.splice(index, 1);
        this.coinsBar.setCoins(this.coinsBar.coinsCollected + 1);
      }
    });
  }

  /**
   * Renders the entire game scene, including background, character, objects, and status bars.
   * If the game is not running, the function exits early.
   * Uses requestAnimationFrame for smooth animation.
   */
  draw() {
    if (!gameRunning) return;
    this.clearCanvas();
    this.drawBackground();
    this.drawCharacter();
    this.drawObjects();
    this.drawBars();

    requestAnimationFrameId = requestAnimationFrame(() => this.draw());
  }

  /**
   * Clears the canvas to prepare for the next frame of rendering.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the background by translating the canvas context and rendering background sprites.
   */
  drawBackground() {
    this.ctx.translate(this.cameraAxisX, 0);
    this.addSpriteObjectToMap(this.level.backgrounds);
    this.ctx.translate(-this.cameraAxisX, 0);
  }

  /**
   * Draws the character on the canvas by translating the context and adding the character to the map.
   */
  drawCharacter() {
    this.ctx.translate(this.cameraAxisX, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.cameraAxisX, 0);
  }

  /**
   * Draws all game objects (clouds, enemies, etc.) by translating the canvas context and
   * adding each type of object to the map.
   */
  drawObjects() {
    this.ctx.translate(this.cameraAxisX, 0);
    this.addSpriteObjectToMap(this.level.clouds);
    this.addSpriteObjectToMap(this.newClouds);
    this.addSpriteObjectToMap(this.level.enemies);
    this.addSpriteObjectToMap(this.level.endboss);
    this.addSpriteObjectToMap(this.level.bottles);
    this.addSpriteObjectToMap(this.level.coins);
    this.addSpriteObjectToMap(this.throwableObject);
    this.ctx.translate(-this.cameraAxisX, 0);
  }

  /**
   * Draws the status bars (health, coins, bottles) on the canvas and manages the visibility of the endboss status bar.
   */
  drawBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.bottlesBar);
    this.endbossStatusBarVisibility();
    if (this.displayEndbossStatusBar) {
      this.addToMap(this.endbossStatusBar);
    }
  }

  /**
   * Checks the visibility of the endboss status bar based on the character's position.
   * The status bar is displayed if the character's x-axis position is greater than 3300.
   */
  endbossStatusBarVisibility() {
    if (this.character.axisX > 3300) {
      this.displayEndbossStatusBar = true;
    }
  }

  /**
   * Adds multiple sprite objects to the map by iterating through each object and using addToMap.
   * @param {Array} multSpriteObjects - An array of sprite objects to be added to the map.
   */
  addSpriteObjectToMap(multSpriteObjects) {
    multSpriteObjects.forEach((currSpriteObject) => {
      this.addToMap(currSpriteObject);
    });
  }

  /**
   * Draws a single sprite object on the canvas. Flips the image if the object is facing the other direction.
   * @param {Object} spriteObject - The sprite object to be drawn.
   */
  addToMap(spriteObject) {
    if (spriteObject.otherDirection) {
      this.flipImage(spriteObject);
    }

    spriteObject.drawCtx(this.ctx);
    spriteObject.drawRectangle(this.ctx);

    if (spriteObject.otherDirection) {
      this.flipImageBack(spriteObject);
    }
  }

  /**
   * Flips the sprite image horizontally for rendering in the opposite direction.
   * @param {Object} spriteObject - The sprite object to be flipped.
   */
  flipImage(spriteObject) {
    this.ctx.save();
    this.ctx.translate(spriteObject.width, 0);
    this.ctx.scale(-1, 1);
    spriteObject.axisX = spriteObject.axisX * -1;
  }

  /**
   * Flips the sprite image back to its original orientation after rendering.
   * @param {Object} spriteObject - The sprite object to restore.
   */
  flipImageBack(spriteObject) {
    spriteObject.axisX = spriteObject.axisX * -1;
    this.ctx.restore();
  }

  /**
   * Ends the game by stopping all actions and displaying the game over screen.
   * Sets the bottles collected to zero and clears the throwable objects.
   */
  endGame() {
    if (!this.gameOver) {
      this.gameOver = true;
      this.bottlesBar.setBottles(0);
      this.throwableObject = [];
      displayGameOver();
    }
  }

  /**
   * Checks if the character is dead by evaluating their life status.
   * @returns {boolean} True if the character is dead, false otherwise.
   */
  isCharacterDead() {
    return this.character && this.character.life <= 0;
  }

  /**
   * Checks if the endboss is dead by evaluating its life status.
   * @returns {boolean} True if the endboss is dead, false otherwise.
   */
  isEndbossDead() {
    return (
      this.level.endboss[0] && this.level.endboss[0].isDead //a lot to be done: endbossStatusBar(health), enboss images arrays
    );
  }
}
