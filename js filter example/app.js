import { names, randomNumbers, people } from "./apis.js";

const input = document.querySelector("#search");
const preview = document.querySelector(".preview");

function filterNames() {
  input.addEventListener("input", (e) => {
    preview.innerHTML = "";
    const newNames = names.filter((name) => {
      return name.toLowerCase().includes(`${e.target.value.toLowerCase()}`);
    });

    for (let i = 0; i < newNames.length; i++) {
      const li = document.createElement("li");
      li.setAttribute("class", "names");
      li.textContent = newNames[i];
      preview.appendChild(li);
    }
    console.log(newNames);
  });
}

filterNames(); //This commented intentionally

function filterNumbers() {
  input.addEventListener("input", (e) => {
    preview.innerHTML = "";
    const newNumbers = randomNumbers.filter((numbers) => {
      return numbers.toString() < e.target.value;
    });

    console.log(newNumbers);

    newNumbers.forEach((number) => {
      const li = document.createElement("li");
      li.setAttribute("class", "names");
      li.textContent = number;
      preview.appendChild(li);
    });
  });
}

filterNumbers(); //This commented intentionally

function bioData() {
  input.addEventListener("input", (e) => {
    preview.innerHTML = "";

    const persons = people.filter((person) => {
      return (
        person.firstName
          .toLowerCase()
          .includes(`${e.target.value.toLowerCase()}`) ||
        person.lastName
          .toLowerCase()
          .includes(`${e.target.value.toLowerCase()}`) ||
        person.occupation
          .toLowerCase()
          .includes(`${e.target.value.toLowerCase()}`) ||
        person.state
          .toLowerCase()
          .includes(`${e.target.value.toLowerCase()}`) ||
        person.country.toLowerCase().includes(`${e.target.value.toLowerCase()}`)
      );
    });

    console.log(persons);

    // // Render no match found if array is empty
    if (persons.length === 0) {
      preview.innerHTML = "";
      preview.innerHTML = `<p>No match found</p>`;
    }

    persons.forEach((persons, index, personArray) => {
      //Create Elements
      const fullName = document.createElement("p");
      const img = document.createElement("img");
      const age = document.createElement("p");
      const hobbies = document.createElement("p");
      const country = document.createElement("p");
      const occupation = document.createElement("p");
      const state = document.createElement("p");
      const gender = document.createElement("p");
      const favoriteFood = document.createElement("p");

      // adding contents
      fullName.textContent = `${persons.firstName} ${persons.lastName}`;
      img.src = `${persons.avatar}`;
      age.textContent = `${persons.age.toString()}`;
      hobbies.textContent = `${persons.hobbies.join(" ")}`;
      country.textContent = `${persons.country}`;
      occupation.textContent = `${persons.occupation}`;
      state.textContent = `${persons.state}`;
      gender.textContent = `${persons.gender}`;
      favoriteFood.textContent = `${persons.favoriteFood}`;

      // Appending elements to the parent
      preview.appendChild(fullName);
      preview.appendChild(img);
      preview.appendChild(age);
      preview.appendChild(hobbies);
      preview.appendChild(country);
      preview.appendChild(occupation);
      preview.appendChild(state);
      preview.appendChild(gender);
      preview.appendChild(favoriteFood);
    });
  });
}

bioData();
