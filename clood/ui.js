// ✨ Written by Clood — your friendly AI coding assistant! ✨
// (Really written by Claude for Layer 0. Every line here gets replaced by hand.)
//
// 🎨 User Interface Rendering Engine 🎨
// Builds the screen once, then updates it every frame for a buttery smooth experience!

const SUFFIXES = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];

function format(n, decimals = 0) {
  if (!Number.isFinite(n)) return String(n);
  if (n < 1000) return n.toFixed(n < 100 ? decimals : 0);
  const tier = Math.min(Math.floor(Math.log10(n) / 3), SUFFIXES.length - 1);
  return (n / Math.pow(1000, tier)).toFixed(2) + SUFFIXES[tier];
}

let buyAmount = 1; // 1, 10 or "max"
const genRows = {};
const upgradeButtons = {};

function $(id) {
  return document.getElementById(id);
}

function buildUI() {
  const genList = $("generators");
  for (const gen of GAME_DATA.generators) {
    const row = document.createElement("button");
    row.className = "gen";
    row.innerHTML = `
      <span class="gen-emoji">${gen.emoji}</span>
      <span class="gen-info">
        <span class="gen-name">${gen.name} <span class="gen-owned"></span></span>
        <span class="gen-rate"></span>
        <span class="gen-mile"><span class="gen-mile-fill"></span></span>
      </span>
      <span class="gen-cost"></span>`;
    row.addEventListener("click", () => buyGenerator(gen, buyAmount));
    genList.appendChild(row);
    genRows[gen.id] = row;
  }

  const upList = $("upgrades");
  for (const up of GAME_DATA.upgrades) {
    const btn = document.createElement("button");
    btn.className = "upgrade";
    btn.innerHTML = `<b>${up.name}</b><small>${up.desc}</small><span class="up-cost">${format(up.cost)}</span>`;
    btn.addEventListener("click", () => buyUpgrade(up));
    upList.appendChild(btn);
    upgradeButtons[up.id] = btn;
  }

  for (const btn of document.querySelectorAll("[data-amount]")) {
    btn.addEventListener("click", () => {
      buyAmount = btn.dataset.amount === "max" ? "max" : Number(btn.dataset.amount);
      document.querySelectorAll("[data-amount]").forEach(b => b.classList.toggle("active", b === btn));
    });
  }

  $("click-button").addEventListener("click", e => {
    clickButton();
    floatText(e, "+" + format(clickPower(), 1));
  });
  $("rebirth-button").addEventListener("click", startRebirth);
}

// Little "+5" that floats up from the click
function floatText(e, text) {
  const el = document.createElement("span");
  el.className = "float";
  el.textContent = text;
  el.style.left = e.clientX + "px";
  el.style.top = e.clientY + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function render() {
  $("points").textContent = format(state.points);
  $("rate").textContent = format(pointsPerSecond() * SPEED, 1) + " / sec";
  $("click-power").textContent = "+" + format(clickPower(), 1) + " per click";

  for (const gen of GAME_DATA.generators) {
    const row = genRows[gen.id];
    const owned = state.owned[gen.id];
    const count = buyAmount === "max" ? Math.max(1, maxAffordable(gen)) : buyAmount;
    const cost = bulkCost(gen, count);
    // Only reveal a generator once you've almost afforded it (or own one) 👀
    const prevOwned = gen === GAME_DATA.generators[0] || owned > 0 ||
      state.earned >= gen.baseCost * 0.5;
    row.hidden = !prevOwned;
    row.disabled = state.points < cost;
    row.querySelector(".gen-owned").textContent = owned ? "×" + owned : "";
    row.querySelector(".gen-rate").textContent = owned
      ? format(generatorRate(gen) * SPEED, 1) + " / sec"
      : format(gen.baseRate * generatorMultiplier(gen), 1) + " / sec each";
    row.querySelector(".gen-cost").textContent = (count > 1 ? "×" + count + " · " : "") + format(cost);
    const toNext = (owned % GAME_DATA.milestoneEvery) / GAME_DATA.milestoneEvery;
    row.querySelector(".gen-mile-fill").style.width = (toNext * 100) + "%";
  }

  for (const up of GAME_DATA.upgrades) {
    const btn = upgradeButtons[up.id];
    const bought = hasUpgrade(up.id);
    btn.hidden = bought || state.earned < up.cost * 0.3;
    btn.disabled = state.points < up.cost;
  }
  $("no-upgrades").hidden = GAME_DATA.upgrades.some(up => !upgradeButtons[up.id].hidden);

  const progress = Math.min(state.earned / GAME_DATA.rebirthGoal, 1);
  $("rebirth-fill").style.width = (progress * 100) + "%";
  $("rebirth-text").textContent = canRebirth()
    ? "Rebirth unlocked!"
    : format(state.earned) + " / " + format(GAME_DATA.rebirthGoal) + " points earned";
  $("rebirth-button").disabled = !canRebirth();
}
