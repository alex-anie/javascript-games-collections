import colors from "./colors.js";

let colorListsEls = document.querySelector(".names-of-colors ul");
let colorContainer = document.querySelector(".color-container");

const preview = document.querySelector(".preview");
const control = document.querySelector("#control");
const pointsEle = document.querySelector(".points");
const countsEle = document.querySelector(".count-down");

let setIntervalID = {};
let points = 0;
let count = 60;

// create list of color as radio color list
function colorLists() {
  colorListsEls.innerHTML = "";
  const sortArr = colors.slice().sort((a, b) => {
    return b.localeCompare(a);
  });

  for (let i = 0; i < sortArr.length; i++) {
    //create elements
    const li = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");

    //add attributes
    li.setAttribute("class", "list-colors");
    li.setAttribute("id", i);

    input.setAttribute("class", "color-input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "colors");
    input.setAttribute("value", sortArr[i]);
    input.setAttribute("id", sortArr[i]);

    label.setAttribute("for", sortArr[i]);
    label.textContent = sortArr[i];

    //appendChild to parent
    li.appendChild(input);
    li.appendChild(label);
    colorListsEls.appendChild(li);

    input.addEventListener("click", (e) => {
      console.log(e.target); // Logs the element that was clicked
      if (input.checked) {
        preview.textContent = input.value;
      }
    });
  }
}

//create div element and parse the color as a
// data attribute
function generateElementColors() {
  colorContainer.innerHTML = "";
  for (let i = 0; i < colors.length; i++) {
    const ele = document.createElement("div");
    ele.setAttribute("class", "box");
    ele.setAttribute("data-color", colors[i]);
    ele.style.backgroundColor = colors[i];
    colorContainer.appendChild(ele);

    ele.addEventListener("click", (e) => {
      let dataset = e.target.dataset.color;
      let previewContent = preview.textContent;
      if (dataset === previewContent) {
        const ele = document.querySelector("input:checked");
        const li = ele.closest("li");
        e.target.remove();
        li.remove();
        points++;
        pointsEle.textContent = "points: " + points;
        displayWins();
      }
    });

    control.addEventListener("click", (e) => {
      if (control.checked) {
        ele.textContent = colors[i];
      } else {
        ele.textContent = "";
      }
    });
  }
}

function displayWins() {
  if (
    colorContainer.children.length === 0 &&
    colorListsEls.children.length === 0
  ) {
    colorContainer.innerHTML = `<p class="you-win">You Win</p>`;
    preview.textContent = "";
    clearInterval(setIntervalID.count);
    countsEle.textContent = "";
  }
}

colorLists();
generateElementColors();

setIntervalID.refresh = setInterval(() => {
  colorLists();
  generateElementColors();
}, 60000);

function startCount() {
  if (count > 0) {
    count--;
    countsEle.textContent = "Counts Down: " + count;
  } else if (count <= 0) {
    count = 20;
    // count--;
    countsEle.textContent = "Counts Down: " + count;
  }
}

setIntervalID.count = setInterval(startCount, 6000);
