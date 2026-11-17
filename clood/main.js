// ✨ Written by Clood — your friendly AI coding assistant! ✨
// (Really written by Claude for Layer 0. Every line here gets replaced by hand.)
//
// 🚀 Application Entry Point 🚀
// Boots everything up and keeps the game running smoothly!

function frame() {
  tick();
  if (!state.broken) {
    render();
    checkCloodMessages();
  }
  requestAnimationFrame(frame);
}

function start() {
  const away = loadGame();
  if (state.broken) {
    showBrokenScreen();
    return;
  }
  buildUI();
  replayCloodMessages();
  if (away > 60 && pointsPerSecond() > 0) {
    cloodSay(`Welcome back! 👋 While you were away for ${Math.round(away / 60)} minutes, your generators made ${format(pointsPerSecond() * away)} points! 💰`);
  }
  setInterval(saveGame, 10000);
  window.addEventListener("beforeunload", saveGame);
  requestAnimationFrame(frame);
}

start();
