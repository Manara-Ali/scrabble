const card = document.querySelector("#card");
const dropZone = document.querySelector("#drop-zone");

card.addEventListener("dragstart", function (e) {
  console.log(e);
});

dropZone.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropZone.addEventListener("drop", function () {
  dropZone.prepend(card);
});
