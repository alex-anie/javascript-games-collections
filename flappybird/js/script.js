const root = document.querySelector(".root");

let windowsInnerWidth = window.innerWidth;
let windowsInnerHeight = window.innerHeight;
let isSpacePressed = false;
let upInterval, downInterval, collisionId;
let score = 0;
let polesPassed = new Set();

function gameScence() {
  // create and set game background
  const gameBackground = document.createElement("section");
  gameBackground.setAttribute("class", "game-background");
  gameBackground.style.width = windowsInnerWidth + "px";
  gameBackground.style.height = windowsInnerHeight - 100 + "px";
  root.appendChild(gameBackground);

  //create the ground for the game
  const ground = document.createElement("section");
  ground.setAttribute("class", "ground");
  root.appendChild(ground);

  //create the bird
  const bird = document.createElement("div");
  bird.setAttribute("class", "bird animate-bounce-bird");
  root.appendChild(bird);

  //Game text flappybird
  const flappybirdText = document.createElement("div");
  flappybirdText.setAttribute("class", "flappy-bird-text");
  root.appendChild(flappybirdText);

  //Poles[First]
  const firstPoleA = document.createElement("div");
  firstPoleA.setAttribute("class", "first-pole-a poles-a animate-first-poles");
  root.appendChild(firstPoleA);

  const firstPoleB = document.createElement("div");
  firstPoleB.setAttribute("class", "first-pole-b poles-b animate-first-poles");
  root.appendChild(firstPoleB);

  //Poles[Second]
  const secondPoleA = document.createElement("div");
  secondPoleA.setAttribute(
    "class",
    "second-pole-a poles-a animate-first-poles"
  );

  root.appendChild(secondPoleA);

  const secondPoleB = document.createElement("div");
  secondPoleB.setAttribute(
    "class",
    "second-pole-b poles-b animate-first-poles"
  );
  root.appendChild(secondPoleB);

  //Poles[]
  const thirdPoleA = document.createElement("div");
  thirdPoleA.setAttribute("class", "third-pole-a poles-a animate-first-poles");

  root.appendChild(thirdPoleA);

  const thirdPoleB = document.createElement("div");
  thirdPoleB.setAttribute("class", "third-pole-b poles-b animate-first-poles");
  root.appendChild(thirdPoleB);

  window.addEventListener("keydown", jumpUp);

  function jumpUp(e) {
    if (e.key === " ") {
      if (!isSpacePressed) {
        isSpacePressed = true;
        bird.classList.add("animate-flapping-wings");
        flappybirdText.style.top = -150 + "px";

        clearInterval(downInterval);
        upInterval = setInterval(() => {
          let computedValue = getComputedStyle(bird).getPropertyValue("top");
          let currentTop = parseFloat(computedValue);
          if (currentTop > 50) {
            bird.style.top = `${currentTop - 5}px`;
            bird.style.transform = "rotate(0deg)";
          } else {
            clearInterval(upInterval);
          }
        }, 20);
      }
    }
  }

  window.addEventListener("keyup", fall);

  function fall(e) {
    if (e.key === " ") {
      isSpacePressed = false;
      clearInterval(upInterval);

      downInterval = setInterval(() => {
        let computedValue = getComputedStyle(bird).getPropertyValue("top");
        let currentTop = parseFloat(computedValue);
        if (currentTop < 430) {
          bird.style.top = `${currentTop + 5}px`;
          bird.style.transform = "rotate(75deg)";
        } else {
          clearInterval(downInterval);
        }
      }, 20);
    }
  }

  // Get all poles at the top
  const polesA = document.querySelectorAll(".poles-a");
  polesA.forEach((pole) => {
    pole.addEventListener("animationiteration", () => {
      pole.style.height = randomHeights() + "px";
      pole.style.opacity = 1;
    });
  });

  //Get all the poles at the bottom
  const polesB = document.querySelectorAll(".poles-b");
  polesB.forEach((pole) => {
    pole.addEventListener("animationiteration", () => {
      pole.style.height = randomHeights() + "px";
      pole.style.opacity = 1;
    });
  });

  function intersect() {
    const birdRect = bird.getBoundingClientRect();
    let collisionDetected = false;

    polesA.forEach((element) => {
      const polesPosition = element.getBoundingClientRect();

      if (
        birdRect.left < polesPosition.right &&
        birdRect.right > polesPosition.left &&
        birdRect.top < polesPosition.bottom &&
        birdRect.bottom > polesPosition.top
      ) {
        collisionDetected = true;
      }
    });

    polesB.forEach((element) => {
      const polesPosition = element.getBoundingClientRect();

      if (
        birdRect.left < polesPosition.right &&
        birdRect.right > polesPosition.left &&
        birdRect.top < polesPosition.bottom &&
        birdRect.bottom > polesPosition.top
      ) {
        collisionDetected = true;
      }
    });

    return collisionDetected;
  }

  function collision() {
    if (intersect()) {
      gameBackground.style.animationPlayState = "paused";
      ground.style.animationPlayState = "paused";
      bird.classList.remove("animate-flapping-wings");
      bird.classList.remove("animate-bounce-bird");
      window.removeEventListener("keydown", jumpUp);
      gameOverPopUp();

      clearInterval(collisionId);

      //puased all poles
      polesA.forEach(
        (element) => (element.style.animationPlayState = "paused")
      );
      polesB.forEach(
        (element) => (element.style.animationPlayState = "paused")
      );
    } else {
      console.log(false);
    }
  }

  collisionId = setInterval(() => {
    collision();
  }, 100);

  function gameOverPopUp() {
    const gameOver = document.createElement("div");
    gameOver.setAttribute("class", "game-over-container");
    gameOver.style.top = 50 + "%";
    root.appendChild(gameOver);

    const scoreBoard = document.createElement("div");
    scoreBoard.setAttribute("class", "score-board");
    scoreBoard.textContent = "Score: " + score;
    gameOver.appendChild(scoreBoard);

    const restartBtn = document.createElement("div");
    restartBtn.setAttribute("class", "g-btn restart-btn");
    gameOver.appendChild(restartBtn);

    const shareBtn = document.createElement("div");
    shareBtn.setAttribute("class", "g-btn share-btn");
    gameOver.appendChild(shareBtn);

    const leaderBoard = document.createElement("div");
    leaderBoard.setAttribute("class", "g-btn laderboard");
    gameOver.appendChild(leaderBoard);

    // add flappy textback
    flappybirdText.style.top = 150 + "px";

    restartBtn.addEventListener("click", resetGame);
  }

  //Update Score when it pass through a pole

  function updateScore() {
    const birdRect = bird.getBoundingClientRect();
    const poles = document.querySelectorAll(".poles-a, .poles-b");
    poles.forEach((pole) => {
      const poleRect = pole.getBoundingClientRect();
      if (!polesPassed.has(pole) && birdRect.left > poleRect.right) {
        polesPassed.add(pole);
        score++;
      }
    });
  }

  function gameLoop() {
    if (!intersect()) {
      updateScore();
    }
  }

  setInterval(gameLoop, 100);
}
gameScence();

// Restart Game
function resetGame() {
  const gameElements = document.querySelectorAll(
    ".game-background, .ground, .bird, .poles-a, poles-b, .flappy-bird-text, .game-over-container"
  );

  gameElements.forEach((element) => element.remove());

  score = 0;
  polesPassed.clear();
  isSpacePressed = false;
  clearInterval(upInterval);
  clearInterval(downInterval);
  clearInterval(collisionId);

  //Reset the game scene
  gameScence();
}

function randomHeights() {
  const random = Math.floor(Math.random() * 120 + 50);
  return random;
}
