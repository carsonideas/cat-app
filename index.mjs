import axios from "axios";

const myFactsInput = document.querySelector("#factsInput");
const myPhotosInput = document.querySelector("#photosInput");
const myFactsSubmitButton = document.querySelector(".submit_button1");
const myPhotosSubmitButton = document.querySelector(".submit_button2");

let myFactsResultContainer = document.querySelector(".facts-result");
let myPhotosResultContainer = document.querySelector(".photos-result");

// myFactsResultContainer = document.createElement("div");
// myFactsResultContainer.className = "facts-result";
// document.body.appendChild(myFactsResultContainer);

// <button onclick="showFacts()">Get Facts</button>

if (!myFactsResultContainer) {
  myFactsResultContainer = document.createElement("div");
  myFactsResultContainer.className = "facts-result";
  document.body.appendChild(myFactsResultContainer);
}

if (!myPhotosResultContainer) {
  myPhotosResultContainer = document.createElement("div");
  myPhotosResultContainer.className = "photos-result";
  myPhotosResultContainer.style.cssText = `
    display: grid;
    grid-template-columns: repeat(4, 20rem);
    gap: 0.4rem;
  `;
  document.body.appendChild(myPhotosResultContainer);
}

myFactsSubmitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const factsCount = parseInt(myFactsInput.value);
  myPhotosResultContainer.innerHTML = "";

  if (!(factsCount >= 1 && factsCount <= 50)) {
    myFactsResultContainer.innerHTML = `<p style="color: red;">Enter a number between 1 and 50</p>`;
    return;
  }

  myFactsResultContainer.style.marginTop = "1rem";

  myFactsResultContainer.innerHTML = `<p style="font-size: 1.4rem; color: var(--accent-color);">Please wait, fetching cat facts.....</p>`;
  myFactsSubmitButton.setAttribute("disabled", true);

  try {
    // const res = fetch(`https://meowfacts.herokuapp.com/?count=${factsCount}`);
    // fetch(`https://meowfacts.herokuapp.com/?count=${factsCount}`)
    //  .then(response => response.json())
    //  .then(data => { /* use data */ });

    const res = await axios.get(
      `https://meowfacts.herokuapp.com/?count=${factsCount}`
    );
    const list = res.data.data
      .map(
        (fact) =>
          `<li style="margin-bottom: 1rem; font-size: 1.2rem;">${fact}</li>`
      )
      .join("");
    myFactsResultContainer.innerHTML = `<ol style="margin-left: 2rem; margin-top: 1rem;">${list}</ol>`;
  } catch (error) {
    // console.log(error);

    myFactsResultContainer.innerHTML = `<p style="color:red;">Houston, we have a problem!!! Something went wrong fetching cat facts. Please try again.</p>`;
  } finally {
    myFactsSubmitButton.removeAttribute("disabled");
  }
});

myPhotosSubmitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const photosCount = parseInt(myPhotosInput.value);
  myFactsResultContainer.innerHTML = "";

  if (!(photosCount >= 1 && photosCount <= 10)) {
    myPhotosResultContainer.innerHTML = `<p style="color: red;">Enter a number between 1 and 10</p>`;
    return;
  }

  myPhotosResultContainer.innerHTML = `<p style="font-size: 1.4rem; color: var(--accent-color);">Please wait, fetching cat photos.....</p>`;
  myPhotosSubmitButton.setAttribute("disabled", true);

  try {
    // const res = await axios.get("https://api.thecatapi.com/v1/images/search");

    const res = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=${photosCount}`
    );
    myPhotosResultContainer.innerHTML = res.data
      .map(
        (photo, i) =>
          `<div><img src="${photo.url}" alt="Cat ${
            i + 1
          }" style="width:100%; height:200px;"></div>`
      )
      .join("");
  } catch (error) {
    myPhotosResultContainer.innerHTML = `<p style="color:red;">Houston, we have a problem!!! Something went wrong fetching cat photos. Please try again.</p>`;
  } finally {
    myPhotosSubmitButton.removeAttribute("disabled");
  }
});
