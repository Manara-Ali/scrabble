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

// Blur the body after document content has loaded
document.addEventListener("DOMContentLoaded", function () {
  body.classList.add("blur");
});

// Create all the scrabble letters
class Tile {
  constructor(letter, value, quantity, img) {
    this.letter = letter;
    this.value = value;
    this.quantity = quantity;
    this.img = img;
  }
}

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

// Create tiles
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
