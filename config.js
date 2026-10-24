// ─────────────────────────────────────────────────────────────
//  Everything you will want to change lives in this file.
//
//  Reorder clips   → move a { ... } block up or down in `clips`.
//  Swap a video    → change its `src` (drop the file in /clips).
//  Rename a title  → edit `title` (shown when you hover a box).
//  The boxes always show the clips in the order listed here.
// ─────────────────────────────────────────────────────────────
window.SITE = {
  name: "musti",
  barTitle: "musti’s dev portfolio", // centered in the top bar

  bio:
    "I’m a Roblox scripter who builds clean, reliable systems and takes the time to get them right. " +
    "I learn new tools fast, I test before I deliver, and I communicate clearly so you’re never left guessing about progress.",

  // Shorter option if you want it. Swap it in above to try it.
  // "Roblox scripter building clean, reliable systems: shops, data saving, round logic. I learn fast, test before I deliver, and keep you updated so you’re never left guessing."

  tagline: "Roblox scripting",

  // Top right. Set status to "" to hide the green dot line.
  status: "Available for commissions",
  services: ["Round systems", "Shops", "Data saving", "Combat"],

  // Add or remove blocks to change how many boxes there are.
  clips: [
    { src: "clips/round-system.mp4", title: "Round system" },
    { src: "clips/shop.mp4", title: "Shop" },
    { src: "clips/data-saving.mp4", title: "Data saving" },
    { src: "clips/coins.mp4", title: "Coin pickups" },
    { src: "clips/knife.mp4", title: "Knife combat" },
  ],

  place: {
    city: "Istanbul",
    country: "Turkey",
    timeZone: "Europe/Istanbul",
    utc: "UTC+3",
  },

  discord: {
    handle: "@robotur",
    id: "704281455315910656", // opens your profile, where they press Message
  },
};
