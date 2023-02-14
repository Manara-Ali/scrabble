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
const player2MsgDiv = document.querySelector("#player-2-tile-selection");
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
  { A: 1, quantity: 9, position: 1 },
  { B: 3, quantity: 2, position: 2 },
  { C: 3, quantity: 2, position: 3 },
  { D: 2, quantity: 4, position: 4 },
  { E: 1, quantity: 12, position: 5 },
  { F: 4, quantity: 2, position: 6 },
  { G: 2, quantity: 3, position: 7 },
  { H: 4, quantity: 2, position: 8 },
  { I: 1, quantity: 9, position: 9 },
  { J: 8, quantity: 1, position: 10 },
  { K: 5, quantity: 1, position: 11 },
  { L: 1, quantity: 4, position: 12 },
  { M: 3, quantity: 2, position: 13 },
  { N: 1, quantity: 6, position: 14 },
  { O: 1, quantity: 8, position: 15 },
  { P: 3, quantity: 2, position: 16 },
  { Q: 10, quantity: 1, position: 17 },
  { R: 1, quantity: 6, position: 18 },
  { S: 1, quantity: 4, position: 18 },
  { T: 1, quantity: 6, position: 20 },
  { U: 1, quantity: 4, position: 21 },
  { V: 4, quantity: 2, position: 22 },
  { W: 4, quantity: 2, position: 23 },
  { X: 8, quantity: 1, position: 24 },
  { Y: 4, quantity: 2, position: 25 },
  { Z: 10, quantity: 1, position: 26 },
];
let roundSelection = true;
let selectedPlayer;

// Create a class to produce all the scrabble letters
class Tile {
  constructor(letter, value, quantity, position, img) {
    this.letter = letter;
    this.value = value;
    this.quantity = quantity;
    this.position = position;
    this.img = `/img/${img}`;
  }
}

// Create individual tiles
let tiles = letters.map((element, index) => {
  return new Tile(
    Object.keys(element)[0],
    Object.values(element)[0],
    Object.values(element)[1],
    Object.values(element)[2],
    `${Object.keys(element)[0]}.PNG`
  );
});

// Add blank tiles
tiles.push(new Tile("", 0, 2, 0, "Blank.PNG"));

console.log(tiles);

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
      tiles = tiles.filter((element) => {
        return element.letter !== tile.letter;
      });
    }

    return tile;
  }
};

const switchPlayer = () => {
  activePlayer = activePlayer === 1 ? 2 : 1;
  console.log(activePlayer);
  player1MarkerDiv.classList.toggle("hide-marker");
  player2MarkerDiv.classList.toggle("hide-marker");
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

    // Show visibility on player 1
    player1MarkerDiv.classList.remove("hide-marker");
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
      left: "20%",
      delay: 0.5,
      duration: 1,
      ease: "Elastic.easeOut",
    });
  }
});

document.addEventListener("player2selectionturn", function (e) {
  if (e.detail) {
    player2MsgDiv.textContent = `${player2.textContent}, click on pouch and select first letter!`;

    // Animate player selection tile dive
    gsap.to("#player-2-tile-selection", {
      right: "20%",
      delay: 0.5,
      duration: 1,
      ease: "Elastic.easeOut",
    });
  }
});

document.addEventListener("selectedplayer", function (e) {
  console.log("SELECTION COMPLETED!");
  console.log([...player1Rack, ...player2Rack]);
  // Compare both letters and find who should go first
  selectedPlayer = player1Rack.concat(player2Rack).sort((a, b) => {
    console.log(a, b);
    return a.position - b.position <= 0 ? -1 : 1;
  })[0].owner;

  // Assuming first player won the turn draw
  if (player1Rack[0].owner === selectedPlayer) {
    player1MsgDiv.textContent = `Congratulations ${selectedPlayer}! You will start the game.`;

    // Animate player selection tile dive
    gsap.to("#player-1-tile-selection", {
      left: "20%",
      delay: 0.5,
      duration: 1,
      ease: "Elastic.easeOut",
    });

    // Remove animation after 1.5 seconds
    window.setTimeout(() => {
      console.log("HERE");
      gsap.to("#player-1-tile-selection", {
        left: "-1000%",
        duration: 1,
        // ease: "Back.easeInOut",
      });
    }, 3000);
  }

  if (player2Rack[0].owner === selectedPlayer) {
    // Assuming player 2 wont the turn
    player2MsgDiv.textContent = `Congratulations ${selectedPlayer}! You will start the game.`;

    // Animate player selection tile dive
    gsap.to("#player-2-tile-selection", {
      right: "20%",
      delay: 0.5,
      duration: 1,
      ease: "Elastic.easeOut",
    });

    // Remove animation after 1.5 seconds
    window.setTimeout(() => {
      console.log("THERE");
      gsap.to("#player-2-tile-selection", {
        right: "-1000%",
        duration: 1,
        // ease: "Back.easeInOut",
      });
    }, 3000);
  }
});

pouch.addEventListener("click", function () {
  // // Animate player selection tile dive
  // gsap.to("#player-1-tile-selection", {
  //   left: "-1000%",
  //   duration: 2,
  //   // ease: "Back.easeInOut",
  // });

  if (roundSelection) {
    if (activePlayer === 1) {
      // Animate player selection tile dive
      gsap.to("#player-1-tile-selection", {
        left: "-1000%",
        duration: 2,
        // ease: "Back.easeInOut",
      });

      player1Rack.push({ owner: player1.textContent, ...selectTile() });

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

      // Dispatch from pouch
      pouch.dispatchEvent(
        new CustomEvent("player2selectionturn", { detail: true, bubbles: true })
      );

      // Switch current player
      switchPlayer();
    } else {
      // Animate player selection tile dive
      gsap.to("#player-2-tile-selection", {
        right: "-1000%",
        duration: 2,
        // ease: "Back.easeInOut",
      });
      player2Rack.push({ owner: player2.textContent, ...selectTile() });

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
      // switchPlayer();
      roundSelection = false;

      if (!roundSelection) {
        // document.dispatchEvent(
        //   new CustomEvent("selectedplayer", { detail: true })
        // );
        window.setTimeout(() => {
          document.dispatchEvent(
            new CustomEvent("selectedplayer", { detail: true })
          );
        }, 500);
      }
    }
  }
});
