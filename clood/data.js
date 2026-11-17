// ✨ Written by Clood — your friendly AI coding assistant! ✨
// (Really written by Claude for Layer 0. Every line here gets replaced by hand.)
//
// 🎮 Game Data Configuration Module 🎮
// This file contains all the amazing content that powers your incredible game!

const GAME_DATA = {
  // 💰 The number of points needed to unlock the AMAZING Rebirth feature
  rebirthGoal: 5e6,

  // 📈 How much more each generator costs every time you buy one
  costGrowth: 1.15,

  // 🏆 Owning this many of a generator doubles its output (every multiple!)
  milestoneEvery: 25,

  // ⚡ All the powerful generators that will supercharge your journey!
  generators: [
    { id: "spark",       name: "Point Spark",       emoji: "✨", baseCost: 10,      baseRate: 0.5 },
    { id: "engine",      name: "Point Engine",      emoji: "⚙️", baseCost: 120,     baseRate: 4 },
    { id: "factory",     name: "Point Factory",     emoji: "🏭", baseCost: 1500,    baseRate: 32 },
    { id: "reactor",     name: "Point Reactor",     emoji: "⚛️", baseCost: 20000,   baseRate: 260 },
    { id: "singularity", name: "Point Singularity", emoji: "🌌", baseCost: 300000,  baseRate: 2400 },
  ],

  // 🚀 One-time upgrades that take your experience to the NEXT LEVEL!
  // type "click" multiplies click power, "gen" multiplies one generator,
  // "all" multiplies every generator, "clickRate" adds a % of points/sec to each click.
  upgrades: [
    { id: "click1",   name: "Ergonomic Clicking",      desc: "Clicks are 2× stronger",               cost: 50,     type: "click", value: 2 },
    { id: "spark1",   name: "Spark Synergy",           desc: "Point Sparks are 2× faster",           cost: 400,    type: "gen", target: "spark", value: 2 },
    { id: "click2",   name: "Click Optimization",      desc: "Clicks are 3× stronger",               cost: 1500,   type: "click", value: 3 },
    { id: "engine1",  name: "Turbo Engines",           desc: "Point Engines are 2× faster",          cost: 4000,   type: "gen", target: "engine", value: 2 },
    { id: "all1",     name: "Holistic Paradigm Shift", desc: "All generators are 1.5× faster",       cost: 12000,  type: "all", value: 1.5 },
    { id: "factory1", name: "Lean Manufacturing",      desc: "Point Factories are 2× faster",        cost: 40000,  type: "gen", target: "factory", value: 2 },
    { id: "clickRate",name: "Synergistic Clicking",    desc: "Each click also gives 5% of points/sec", cost: 75000, type: "clickRate", value: 0.05 },
    { id: "reactor1", name: "Fusion Breakthrough",     desc: "Point Reactors are 2× faster",         cost: 250000, type: "gen", target: "reactor", value: 2 },
    { id: "all2",     name: "Leverage Synergies",      desc: "All generators are 2× faster",         cost: 500000, type: "all", value: 2 },
  ],
};
