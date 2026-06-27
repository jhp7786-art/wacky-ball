const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// 1. Remove the misplaced background
code = code.replace(
`    // ── Game Background ──────────────────────────────────────────────────
    addAnimatedBackground();`, 
``);

// 2. Fix coinsHUD and btnShop
const uiTarget = `      // Economy UI
      const coinsHUD = add([
        text(\`Coins: \${gameState.coins}\`, { size: 18, font: "monospace" }),
        pos(W - 15, 20),
        anchor("topright"),
        color(255, 215, 0),
        z(10),
        "coinsHUD"
      ]);

      const btnShop = add([
        rect(80, 30, { radius: 8 }),
        pos(width() - 20, 20),
        anchor("topright"),
        color(50, 150, 50),
        area({ cursor: "pointer" }),
        z(10),
        "btnShop"
      ]);
      btnShop.add([text("SHOP", { size: 14, font: "monospace" }), pos(-40, 15), anchor("center"), color(255, 255, 255)]);
      btnShop.add([text("SHOP", { size: 14, font: "monospace" }), anchor("center"), color(255, 255, 255)]);`;

const uiReplacement = `      // Economy UI
      const coinsHUD = add([
        text(\`Coins: \${gameState.coins}\`, { size: 18, font: "monospace" }),
        pos(20, 20),
        anchor("topleft"),
        color(255, 215, 0),
        z(10),
        "coinsHUD"
      ]);

      const btnShop = add([
        rect(80, 30, { radius: 8 }),
        pos(width() - 20, 20),
        anchor("topright"),
        color(50, 150, 50),
        area({ cursor: "pointer" }),
        z(10),
        "btnShop"
      ]);
      btnShop.add([text("SHOP", { size: 14, font: "monospace" }), anchor("center"), color(255, 255, 255)]);`;

code = code.replace(uiTarget, uiReplacement);

// 3. Fix background stars inside scene("game"
const bgRegex = /\/\/ ── Background stars ─────────────────────────────────────────────────[\s\S]*?\/\/ ── Ground ───────────────────────────────────────────────────────────\r?\n\s+add\(\[rect\(W,16\), pos\(0,H-20\), color\(32,32,60\), area\(\), "ground", z\(1\)\]\);/g;

code = code.replace(bgRegex, `// ── Game Background ──────────────────────────────────────────────────
      addAnimatedBackground();`);

// 4. Fix rubber chicken audio trigger
const launchRegex = /if \(!inFlight\) {\r?\n\s+inFlight = true;\r?\n\s+sfx\.playStretch\(0\); sfx\.playThud\(\);\r?\n\s+ball = add\(\[/g;
code = code.replace(launchRegex, `if (!inFlight) {
            inFlight = true;
            sfx.playStretch(0); 
            if (gameState.equippedPlayerSkin === "rubber_chicken") sfx.playSquawk();
            else sfx.playThud();
            ball = add([`);

fs.writeFileSync('index.html', code, 'utf8');
console.log('Patch complete.');
