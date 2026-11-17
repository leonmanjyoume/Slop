// ✨ Written by Clood — your friendly AI coding assistant! ✨
// (Really written by Claude for Layer 0. Every line here gets replaced by hand.)
//
// 🧠 Core Game Engine 🧠
// Handles state, production, purchases, saving and loading. Robust and scalable!

const SAVE_KEY = "slop-save";
const OFFLINE_CAP_SECONDS = 8 * 60 * 60; // 8 hours of offline progress 🌙

// 🛠️ Dev helper: add ?speed=20 to the URL to make time pass faster
const SPEED = Number(new URLSearchParams(location.search).get("speed")) || 1;

function freshState() {
  const owned = {};
  for (const gen of GAME_DATA.generators) owned[gen.id] = 0;
  return {
    points: 0,
    earned: 0,          // total points earned this run (counts toward Rebirth)
    owned,
    upgrades: [],       // ids of bought upgrades
    clicks: 0,
    seen: [],           // ids of Clood messages already shown
    broken: false,      // 💀 set after the Rebirth "incident"
    lastTick: Date.now(),
  };
}

let state = freshState();

// ---------- 📊 Calculations ----------

function hasUpgrade(id) {
  return state.upgrades.includes(id);
}

function generatorCost(gen) {
  return gen.baseCost * Math.pow(GAME_DATA.costGrowth, state.owned[gen.id]);
}

// Cost of buying `count` generators in a row (geometric series)
function bulkCost(gen, count) {
  const r = GAME_DATA.costGrowth;
  return generatorCost(gen) * (Math.pow(r, count) - 1) / (r - 1);
}

// How many of a generator you can afford right now
function maxAffordable(gen) {
  const r = GAME_DATA.costGrowth;
  const n = Math.floor(Math.log(state.points * (r - 1) / generatorCost(gen) + 1) / Math.log(r));
  return Math.max(0, n);
}

function generatorMultiplier(gen) {
  let mult = Math.pow(2, Math.floor(state.owned[gen.id] / GAME_DATA.milestoneEvery));
  for (const up of GAME_DATA.upgrades) {
    if (!hasUpgrade(up.id)) continue;
    if (up.type === "all") mult *= up.value;
    if (up.type === "gen" && up.target === gen.id) mult *= up.value;
  }
  return mult;
}

function generatorRate(gen) {
  return state.owned[gen.id] * gen.baseRate * generatorMultiplier(gen);
}

function pointsPerSecond() {
  let total = 0;
  for (const gen of GAME_DATA.generators) total += generatorRate(gen);
  return total;
}

function clickPower() {
  let power = 1;
  for (const up of GAME_DATA.upgrades) {
    if (!hasUpgrade(up.id)) continue;
    if (up.type === "click") power *= up.value;
    if (up.type === "clickRate") power += pointsPerSecond() * up.value;
  }
  return power;
}

function canRebirth() {
  return state.earned >= GAME_DATA.rebirthGoal;
}

// ---------- 🎯 Actions ----------

function addPoints(amount) {
  state.points += amount;
  state.earned += amount;
}

function clickButton() {
  state.clicks++;
  addPoints(clickPower());
}

function buyGenerator(gen, count) {
  if (count === "max") count = maxAffordable(gen);
  if (count < 1) return false;
  const cost = bulkCost(gen, count);
  if (state.points < cost) return false;
  state.points -= cost;
  state.owned[gen.id] += count;
  return true;
}

function buyUpgrade(up) {
  if (hasUpgrade(up.id) || state.points < up.cost) return false;
  state.points -= up.cost;
  state.upgrades.push(up.id);
  return true;
}

// ---------- ⏱️ Game Loop ----------

function tick() {
  const now = Date.now();
  const seconds = Math.min((now - state.lastTick) / 1000, OFFLINE_CAP_SECONDS);
  state.lastTick = now;
  if (!state.broken) addPoints(pointsPerSecond() * seconds * SPEED);
}

// ---------- 💾 Save System ----------

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Save failed 😢", e);
  }
}

// Returns how many seconds of offline progress were applied
function loadGame() {
  if (new URLSearchParams(location.search).has("reset")) {
    localStorage.removeItem(SAVE_KEY);
    history.replaceState(null, "", location.pathname);
  }
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(SAVE_KEY));
  } catch (e) {
    console.warn("Save was corrupted, starting fresh 😢", e);
  }
  if (!saved) return 0;
  // Merge so new fields added in updates still get default values
  const base = freshState();
  state = { ...base, ...saved, owned: { ...base.owned, ...saved.owned } };
  const away = Math.min((Date.now() - state.lastTick) / 1000, OFFLINE_CAP_SECONDS);
  tick();
  return away;
}

function hardReset() {
  localStorage.removeItem(SAVE_KEY);
  state = freshState();
}
