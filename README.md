# Slop

An incremental game that starts 100% vibecoded by an AI and ends 100% hand coded by a human who learned to code while building it.

## The story

You get access to **Clood**, an AI coding assistant. It vibecodes you a complete incremental game in seconds, and it works perfectly. Then you press **Rebirth**, Clood tries to implement prestige, and everything breaks.

From there, every prestige layer is a part of the game rebuilt by hand. The AI code gets replaced piece by piece until none of it is left.

## Two ways to play

- **Just play.** Open the game and enjoy it.
- **Learn to code it.** Each layer comes with a tutorial and a git tag. Check out a layer, try building the next one yourself, then compare with how I did it. *(Coming with Layer 1.)*

## Where the code stands

| Folder | Written by | Status |
|---|---|---|
| `clood/` | AI (Claude, playing "Clood") | Layer 0. Will be deleted, one file at a time. |
| `leon/` | Me, by hand | Empty, for now. |

## Running it

Serve the folder with any local web server, then open it in your browser:

```bash
python3 -m http.server 8000
```

Add `?reset` to the URL to wipe your save, or `?speed=20` to make time pass faster while testing.
