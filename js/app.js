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
let gameOn = false;
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

////////////////////////// FUNCTIONS
const random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const selectTile = function () {
  let tile;

  while (!tile?.quantity && tiles.length) {
    // Randomly select a tile
    const tileIndex = tiles.length && random(0, tiles.length - 1);

    // Retrieve the selected tile
    tile = tiles[tileIndex];

    // Decrease the tile quantity by 1
    tile.quantity--;

    // Assuming the tile quantity is now 0 after selection, remove from pouch
    if (tile.quantity === 0) {
      tiles = tiles.filter((element) => {
        return element.letter !== tile.letter;
      });
    }

    // Return selected tile
    return tile;
  }
};

// Create a function to allow switch between players
const switchPlayer = () => {
  activePlayer = activePlayer === 1 ? 2 : 1;
  console.log(activePlayer);
  player1MarkerDiv.classList.toggle("hide-marker");
  player2MarkerDiv.classList.toggle("hide-marker");
  player1.classList.toggle("active-player");
  player2.classList.toggle("active-player");
};

// Create a function to append tile image to the rack div
function createAndAppendTileImage(
  playerRack = undefined,
  rackDivNumber,
  position
) {
  // Find the player rack based on the active player
  activePlayer === 1 ? (playerRack = player1Rack) : (playerRack = player2Rack);

  // Create an image tag
  const imgTag = document.createElement("img");

  // Add a class and source attribute to the
  imgTag.classList.add("rack-img");

  if (playerRack.length === 1) {
    imgTag.src = playerRack[position]?.img;
  } else {
    console.log(selectedTile);
  }

  // Select the parent div
  const parentDiv = document.querySelector(
    // `#rack-${rackDivNumber}-div-${playerRack.length - 1}`
    `#rack-${rackDivNumber}-div-${position}`
  );

  // Add tile to player rack
  parentDiv?.append(imgTag);
}

// Create a function to append tile image to the rack div
function createAndAppendSelectedTileImage(
  playerRack = undefined,
  rackDivNumber,
  position,
  selectedTileFn
) {
  // Find the player rack based on the active player
  playerRack = activePlayer === 1 ? player1Rack : player2Rack;

  // Create an image tag
  const imgTag = document.createElement("img");

  // Add a class and source attribute to the
  imgTag.classList.add("rack-img");

  playerRack.push(selectedTileFn());

  imgTag.src = playerRack[position]?.img;

  // Select the parent div
  const parentDiv = document.querySelector(
    // `#rack-${rackDivNumber}-div-${playerRack.length - 1}`
    `#rack-${activePlayer}-div-${position}`
  );

  // Add tile to player rack
  parentDiv?.append(imgTag);
}

////////////// ANIMATION
// Animate modal window
gsap.from(".modal", { scale: 3, duration: 0.5 });

/////////////// EVENT LISTENERS

// This event listener will add an overlay whenever the DOM loads
document.addEventListener("DOMContentLoaded", function () {
  overlay.classList.remove("hide");
});

// This event listener is responsible for watching for error in player's names
document.addEventListener("error", function (e) {
  if (e.detail) {
    requiredField.classList.remove("hide");
    e.target.classList.add("error"); // Add border around error input box
  }

  // Remove error markers after 2 seconds
  window.setTimeout(() => {
    requiredField.classList.add("hide");
    e.target.classList.remove("error");
  }, 2000);
});

// This event listener watches for player's name submission on the button
playersSubmitBtn.addEventListener("click", function () {
  if (player1NameInput.value && player2NameInput.value) {
    // Change the value of the text content for player 1 and 2
    player1.textContent = player1NameInput.value.toUpperCase();
    player2.textContent = player2NameInput.value.toUpperCase();

    // I know the players text content has changed so I can let the document know
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
    // If any of the input is missing I need to let the document know
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

// After players have entered their names provide on screen feedback
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

// Document receive dispatched event that let's the player2 know to select letter
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

// This document provides feed back on which player will start the game
document.addEventListener("selectedplayer", function (e) {
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

  // Wait for the feedback message code to execute and after 250ms execute game on
  window.setTimeout(() => {
    document.dispatchEvent(new CustomEvent("startgame", { detail: true }));
  }, 3250);
});

// Add an eventListener to the scrabble bag
pouch.addEventListener("click", function () {
  // Assuming we are still in the process of selecting players
  if (roundSelection) {
    // Assuming the active player is player1
    if (activePlayer === 1) {
      // Animate player selection tile dive
      gsap.to("#player-1-tile-selection", {
        left: "-1000%",
        duration: 2,
      });

      // Add player1 selected tile to his rack
      player1Rack.push({ owner: player1.textContent, ...selectTile() });

      // Create and append a tile image into the current player's rack
      createAndAppendTileImage(player1Rack, 1, 0);

      // Dispatch event from pouch. Let player-2 it is their turn to choose a letter
      pouch.dispatchEvent(
        new CustomEvent("player2selectionturn", { detail: true, bubbles: true })
      );

      // Switch current player from player1 to player2
      switchPlayer();
    } else {
      // Animate player selection tile dive
      gsap.to("#player-2-tile-selection", {
        right: "-1000%",
        duration: 2,
      });

      // Add player2 selected letter to the player's rack
      player2Rack.push({ owner: player2.textContent, ...selectTile() });

      // Create and append a tile image into the current player's rack
      createAndAppendTileImage(player2Rack, 2, 0);

      // Stop the round selection
      roundSelection = false;

      // Assuming the selection round is complete, provide feedback to users
      if (!roundSelection) {
        window.setTimeout(() => {
          document.dispatchEvent(
            new CustomEvent("selectedplayer", { detail: true })
          );
        }, 500);
      }
    }
  }
});

// Assuming the game is on
document.addEventListener("startgame", function (e) {
  if (e.detail) {
    // Assuming the selected player is not the active player
    const activePlayerDiv = document.querySelector(
      "div[id^='player-'].active-player"
    );

    if (activePlayerDiv.textContent !== selectedPlayer) {
      switchPlayer();
    }

    // Assuming the new active player has changed
    if (activePlayer !== 1) {
      activePlayer = parseInt(
        document.querySelector(".active-player").id.split("-")[1]
      );
    }

    for (let i = 1; i < 7; i++) {
      // const selectedTile = selectTile();
      createAndAppendSelectedTileImage(undefined, activePlayer, i, selectTile);
    }

    window.setTimeout(() => {
      if (activePlayer === 1) {
        activePlayer = 2;
      } else {
        activePlayer = 1;
      }
      for (let i = 1; i < 7; i++) {
        // const selectedTile = selectTile();
        createAndAppendSelectedTileImage(
          undefined,
          activePlayer === 1 ? 2 : 1,
          i,
          selectTile
        );
      }
    }, 2000);
  }
});
