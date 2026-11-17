// ✨ Written by Clood — your friendly AI coding assistant! ✨
// (Really written by Claude for Layer 0. Every line here gets replaced by hand.)
//
// 🤖 Clood Assistant Integration 🤖
// Clood cheers you on while you play, and implements Rebirth for you. What could go wrong?

const CLOOD_MESSAGES = [
  { id: "hello",    when: () => true,
    text: "Hi! I'm Clood ✨ I just vibecoded you a complete incremental game in 4 seconds. Click the big button to get started! 🚀" },
  { id: "click10",  when: () => state.clicks >= 10,
    text: "Great clicking! 🙌 You're a natural. Pro tip: generators make points automatically!" },
  { id: "spark",    when: () => state.owned.spark >= 1,
    text: "Your first Point Spark! ✨ This is a really exciting milestone in your journey." },
  { id: "engine",   when: () => state.owned.engine >= 1,
    text: "Point Engines! ⚙️ You're really leveraging synergies now. I'm so proud of you." },
  { id: "upgrade",  when: () => state.upgrades.length >= 1,
    text: "You bought an upgrade! 🎉 That's exactly what I would have done. Great minds think alike!" },
  { id: "factory",  when: () => state.owned.factory >= 1,
    text: "A Point Factory! 🏭 Fun fact: I wrote 2,000 lines of code for this game and I didn't read any of them." },
  { id: "mile25",   when: () => GAME_DATA.generators.some(g => state.owned[g.id] >= 25),
    text: "25 of one generator doubles its speed! 🏆 Every 25 after that doubles it again. You're crushing it!" },
  { id: "reactor",  when: () => state.owned.reactor >= 1,
    text: "Point Reactor online! ⚛️ Honestly? This might be the best incremental game ever made. You should ship it." },
  { id: "half",     when: () => state.earned >= GAME_DATA.rebirthGoal / 2,
    text: "Halfway to Rebirth! 🔥 Don't worry about what Rebirth does. I'll implement it when you get there. Easy!" },
  { id: "single",   when: () => state.owned.singularity >= 1,
    text: "A Point Singularity! 🌌 You have truly mastered this game. Nothing can stop us now." },
  { id: "rebirth",  when: () => canRebirth(),
    text: "You did it!!! 🎊 Rebirth is unlocked! Press it and I'll implement prestige for you. It'll be perfect, trust me ✨" },
];

// ---------- 💬 Chat panel ----------

const chatQueue = [];
let chatBusy = false;

function cloodSay(text, { typing = 900 } = {}) {
  return new Promise(resolve => {
    chatQueue.push({ text, typing, resolve });
    pumpChat();
  });
}

function pumpChat() {
  if (chatBusy || chatQueue.length === 0) return;
  chatBusy = true;
  const { text, typing, resolve } = chatQueue.shift();
  const log = document.getElementById("chat-log");
  const bubble = document.createElement("div");
  bubble.className = "bubble typing";
  bubble.innerHTML = "<span></span><span></span><span></span>";
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;
  setTimeout(() => {
    bubble.className = "bubble";
    bubble.textContent = text;
    log.scrollTop = log.scrollHeight;
    chatBusy = false;
    resolve();
    pumpChat();
  }, typing);
}

// Called every frame — shows any messages whose condition just became true
function checkCloodMessages() {
  for (const msg of CLOOD_MESSAGES) {
    if (state.seen.includes(msg.id) || !msg.when()) continue;
    state.seen.push(msg.id);
    cloodSay(msg.text);
  }
}

// Re-show past messages after a reload, without the typing delay
function replayCloodMessages() {
  const log = document.getElementById("chat-log");
  for (const msg of CLOOD_MESSAGES) {
    if (!state.seen.includes(msg.id)) continue;
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = msg.text;
    log.appendChild(bubble);
  }
  log.scrollTop = log.scrollHeight;
}

// ---------- 💀 The Rebirth "incident" ----------

const wait = ms => new Promise(r => setTimeout(r, ms));

async function startRebirth() {
  if (!canRebirth() || document.body.classList.contains("rebirthing")) return;
  document.body.classList.add("rebirthing");

  await cloodSay("Absolutely! Implementing a prestige system for you now 🚀", { typing: 700 });
  await cloodSay("📝 Writing rebirth.js…", { typing: 1200 });
  await cloodSay("🔧 Refactoring 14 files to support rebirth…", { typing: 1400 });
  document.body.classList.add("glitch-1");
  await cloodSay("🐛 Fixing a small issue…", { typing: 1200 });
  document.body.classList.add("glitch-2");
  await cloodSay("🐛 Fixing the fix…", { typing: 1000 });
  state.points = NaN;
  state.earned = NaN;
  document.body.classList.add("glitch-3");
  await cloodSay("🐛🐛 Fixing the fix for the fix…", { typing: 900 });
  document.body.classList.add("unstyled");
  await cloodSay("✅ Done! Rebirth is fully implemented and everything works perfectly. Let me know if you need anything else! ✨", { typing: 1200 });

  state.broken = true;
  saveGame();
  await wait(2500);
  showUsageLimit();
}

function showUsageLimit() {
  document.getElementById("limit-modal").hidden = false;
}

// The game after Clood is gone. Layer 1 starts here.
function showBrokenScreen() {
  document.getElementById("limit-modal").hidden = true;
  document.getElementById("app").hidden = true;
  document.getElementById("broken").hidden = false;
  document.body.className = "dead";
}

function declinePayment(button) {
  button.textContent = "💳 Payment declined";
  button.disabled = true;
}
