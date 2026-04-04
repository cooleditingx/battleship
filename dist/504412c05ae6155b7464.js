import { createGameboard, renderAllShips, eventHandlers, updateCell } from "./render.js";
import { initializeGame, handlesPlayerAttacks, getPlayer, getComputer } from "./Gameplay.js";
import "./style.css";
// Get containers
var playergameboard = document.getElementById("playergameboard");
var computergameboard = document.getElementById("computergameboard");

// Initialize game
initializeGame();

// Create grids
createGameboard(playergameboard, "playergameboard");
createGameboard(computergameboard, "computergameboard");

// Get player objects
var player = getPlayer();
var computer = getComputer();

// Render ships (only player's ships visible)
renderAllShips(player.gameBoard, playergameboard);
renderAllShips(computer.gameBoard, computergameboard);

// Setup event handlers
eventHandlers(computergameboard, function (coordinates) {
  var result = handlesPlayerAttacks(coordinates);
  if (result !== null) {
    var row = coordinates[0];
    var col = coordinates[1];
    updateCell(row, col, result, computergameboard);
  }
});
var restart = document.getElementById("restart");
var popup = document.getElementById("pop-up");
restart.addEventListener("click", function () {
  popup.close();
  window.location.reload();
});