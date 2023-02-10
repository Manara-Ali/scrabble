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

// const rule = CSSRulePlugin.getRule("h3:after");
// gsap.from(rule, { cssRule: { scale: 10 }, duration: 1.5, delay: 5 });

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
const player1RackDiv = document.querySelector("#player-1-rack");
const player2RackDiv = document.querySelector("#player-2-rack");
const player1MsgDiv = document.querySelector("#player-1-tile-selection");
const pouch = document.querySelector("#pouch");
const player1MarkerDiv = document.querySelector("#player-1-marker-div");
const player2MarkerDiv = document.querySelector("#player-2-marker-div");
// const activePlayerMarker = document.querySelector(".active-player");
// const player2MsgDiv = document.querySelector("#player-2-tile-selection");
// const rack1Position1 = document.querySelector("#rack-1-position-1");

////////////////////////// VARAIBLES
const player1Rack = [];
const player2Rack = [];
let activePlayer = 1;
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

// Create a class to produce all the scrabble letters
class Tile {
  constructor(letter, value, quantity, img) {
    this.letter = letter;
    this.value = value;
    this.quantity = quantity;
    this.img = `/img/${img}`;
  }
}

// Create individual tiles
let tiles = letters.map((element, index) => {
  return new Tile(
    Object.keys(element)[0],
    Object.values(element)[0],
    Object.values(element)[1],
    `${Object.keys(element)[0]}.PNG`
  );
});

// Add blank tiles
tiles.push(new Tile("", 0, 2, "Blank.PNG"));

////////////////////////// FUNCTIONS
const random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const selectTile = function () {
  let tile;

  while (!tile?.quantity && tiles.length) {
    // Randomly select a tile
    const tileIndex = tiles.length && random(0, tiles.length - 1);

    tile = tiles[tileIndex];

    // Check for its letter count
    // if (!tile.quantity) {
    //   continue;
    // } else {
    tile.quantity--;

    if (tile.quantity === 0) {
      tiles.filter((element) => {
        return element.letter !== tile.letter;
      });
    }

    console.log("selected tile", tile);
    return tile;
  }
};

const switchPlayer = () => {
  activePlayer = activePlayer === 1 ? 2 : 1;
  console.log(activePlayer);
  player1MarkerDiv.classList.toggle("hidden-marker");
  player2MarkerDiv.classList.toggle("hidden-marker");
  player1.classList.toggle("active-player");
  player2.classList.toggle("active-player");
};

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

    // At this point I know the text content has changed
    player1.dispatchEvent(
      new CustomEvent("textcontentchange", { detail: true, bubbles: true })
    );

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

document.addEventListener("textcontentchange", function (e) {
  if (e.detail) {
    player1MsgDiv.textContent = `${player1.textContent}, click on pouch and select first letter!`;

    // Animate player selection tile dive
    gsap.to("#player-1-tile-selection", {
      left: "30%",
      delay: 0.5,
      duration: 1,
      ease: "Elastic.easeOut",
    });
  }
});

pouch.addEventListener("click", function () {
  // Animate player selection tile dive
  gsap.to("#player-1-tile-selection", {
    left: "-1000%",
    duration: 2,
    // ease: "Back.easeInOut",
  });

  // Select a letter
  if (activePlayer === 1) {
    player1Rack.push(selectTile());

    // Create an image tag
    const imgTag = document.createElement("img");

    // Add id and class
    imgTag.classList.add("rack-img");

    imgTag.src = player1Rack[player1Rack.length - 1].img;

    // Select the parent div
    const parentDiv = document.querySelector(
      `#rack-1-div-${player1Rack.length - 1}`
    );

    // Add tile to player rack
    parentDiv?.append(imgTag);

    // Switch current player
    switchPlayer();
  } else {
    player2Rack.push(selectTile());

    console.log("p2rack", player2Rack);

    // Create an image tag
    const imgTag = document.createElement("img");

    // Add id and class
    imgTag.classList.add("rack-img");

    imgTag.src = player2Rack[player2Rack.length - 1].img;

    // Select the parent div
    const parentDiv = document.querySelector(
      `#rack-2-div-${player2Rack.length - 1}`
    );

    // Add tile to player rack
    parentDiv?.append(imgTag);

    // Switch current player
    switchPlayer();
  }
  // player1Rack.push(selectTile());

  // // Create an image tag
  // const imgTag = document.createElement("img");

  // // Add id and class
  // imgTag.classList.add("rack-img");

  // imgTag.src = player1Rack[player1Rack.length - 1].img;

  // // Select the parent div
  // const parentDiv = document.querySelector(
  //   `#rack-1-div-${player1Rack.length - 1}`
  // );

  // // Add tile to player rack
  // parentDiv?.append(imgTag);

  // // Switch current player
  // switchPlayer();

  // // rack1Position1.src = player1Rack[player1Rack.length - 1].img;
  // console.log(player1Rack);
});
