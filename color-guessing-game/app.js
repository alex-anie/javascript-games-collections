import colors from "./colors.js";

const allColorBoxes = document.querySelectorAll(".color-box");
const colorContainer = document.querySelector(".color-container");
const pointsElement = document.querySelector(".points");
const countDownElement = document.querySelector(".count-down");
const preview = document.querySelector(".preview");

let setIntervalID = {};
let countDown = 10;
let setWin = false;
let point = 0;

//generate random color
function randomColor(num) {
  const random = Math.floor(Math.random() * num);
  return random;
}

function renderBgColor() {
  const newColors = [];
  let winningIndex = randomColor(allColorBoxes.length);

  allColorBoxes.forEach((element, index, array) => {
    let color1 = colors[randomColor(colors.length)];
    let color2 = colors[randomColor(colors.length)];
    let color3 = colors[randomColor(colors.length)];
    let color4 = colors[randomColor(colors.length)];

    array[0].style.backgroundColor = color1;
    array[1].style.backgroundColor = color2;
    array[2].style.backgroundColor = color3;
    array[3].style.backgroundColor = color4;

    newColors.push(array[index].style.backgroundColor);

    element.classList.remove("color-box-win");
    element.textContent = "";
  });

  //   console.log(newColors);
  let colorAsTest = newColors[randomColor(newColors.length - 1)];
  preview.textContent = colorAsTest;

  return colorAsTest;
}

renderBgColor();

//Check if color contains
function matchColor() {
  const bgColor = renderBgColor();
  console.log(bgColor);

  allColorBoxes.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (e.target.style.backgroundColor === bgColor) {
        console.log("Yes it match");
        console.log(e.target);
        e.target.classList.add("color-box-win");
        e.target.textContent = "You Win!";
        setWin = true;
        if (setWin) {
          point++;
          pointsElement.textContent = "Points: " + point;
          setWin = false;
        }
      } else {
        console.log("No match");
        console.log(e.target);
      }
    });
  });
}
matchColor();

setIntervalID.resfresh = setInterval(() => {
  renderBgColor();
  matchColor();
}, 10000);

function countDownPoints() {
  if (countDown > 0) {
    countDown--;
    countDownElement.textContent = countDown;
  } else if (countDown <= 0) {
    countDown = 10;
    countDown--;
    countDownElement.textContent = countDown;
  }
}

// countDownPoints();

setIntervalID.resfresh = setInterval(countDownPoints, 1000);
