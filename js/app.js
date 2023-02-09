// const card = document.querySelector("#card");
// const dropZone = document.querySelector("#drop-zone");

// card.addEventListener("dragstart", function (e) {
//   console.log(e);
// });

// dropZone.addEventListener("dragover", function (e) {
//   e.preventDefault();
// });

// dropZone.addEventListener("drop", function () {
//   dropZone.prepend(card);
// });

///////////////////////////////// SELECT ELEMENTS
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
// const modalElement = document.querySelector(".modal");
const form = document.querySelector("#player-names-form");
const player1NameInput = document.querySelector("#player-1-name");
const player2NameInput = document.querySelector("#player-2-name");
const playersSubmitBtn = document.querySelector(".btn-players-submit");
const player1 = document.querySelector("#player-1");
const player2 = document.querySelector("#player-2");
const requiredField = document.querySelector(".required");
const player1Rack = document.querySelector("#player-1-rack");
const player2Rack = document.querySelector("#player-2-rack");
const pouch = document.querySelector("#pouch");

////////////// ANIMATION

// Animate modal window
gsap.from(".modal", { scale: 3, duration: 0.5 });

/////////////// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", function () {
  overlay.classList.remove("hide");
});

document.addEventListener("error", function (e) {
  if (e.detail) {
    requiredField.classList.remove("hide");
    e.target.classList.add("error");
  }

  window.setTimeout(() => {
    requiredField.classList.add("hide");
    e.target.classList.remove("error");
  }, 2000);
});

playersSubmitBtn.addEventListener("click", function () {
  if (player1NameInput.value && player2NameInput.value) {
    // Change the value of the text content for player 1 and 2
    player1.textContent = player1NameInput.value;
    player2.textContent = player2NameInput.value;

    // Clear form fields
    player1NameInput.value = "";
    player2NameInput.value = "";

    // Remove overlay
    overlay.classList.add("hide");
  } else {
    if (!player1NameInput.value) {
      player1NameInput.dispatchEvent(
        new CustomEvent("error", { detail: true, bubbles: true })
      );
    } else if (!player2NameInput.value) {
      player2NameInput.dispatchEvent(
        new CustomEvent("error", { detail: true, bubbles: true })
      );
    }
  }
});

pouch.addEventListener("click", function () {
  console.log("POUCH CLICKED");
});

///////////////////  Create a class to produce all the scrabble letters
class Tile {
  constructor(letter, value, quantity, img) {
    this.letter = letter;
    this.value = value;
    this.quantity = quantity;
    this.img = img;
  }
}

// Letters and quantity
const letters = [
  { A: 1, quantity: 9 },
  { B: 3, quantity: 2 },
  { C: 3, quantity: 2 },
  { D: 2, quantity: 4 },
  { E: 1, quantity: 12 },
  { F: 4, quantity: 2 },
  { G: 2, quantity: 3 },
  { H: 4, quantity: 2 },
  { I: 1, quantity: 9 },
  { J: 8, quantity: 1 },
  { K: 5, quantity: 1 },
  { L: 1, quantity: 4 },
  { M: 3, quantity: 2 },
  { N: 1, quantity: 6 },
  { O: 1, quantity: 8 },
  { P: 3, quantity: 2 },
  { Q: 10, quantity: 1 },
  { R: 1, quantity: 6 },
  { S: 1, quantity: 4 },
  { T: 1, quantity: 6 },
  { U: 1, quantity: 4 },
  { V: 4, quantity: 2 },
  { W: 4, quantity: 2 },
  { X: 8, quantity: 1 },
  { Y: 4, quantity: 2 },
  { Z: 10, quantity: 1 },
];

// Create individual tiles
const tiles = letters.map((element, index) => {
  return new Tile(
    Object.keys(element)[0],
    Object.values(element)[0],
    Object.values(element)[1],
    `${Object.keys(element)[0]}.PNG`
  );
});

// Add blank tiles
tiles.push(new Tile("", 0, 2, "Blank.PNG"));

// Let players pick on letter each to determine turns
