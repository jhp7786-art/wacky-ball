const fs = require('fs');

function applyPatch(filename) {
  let code = fs.readFileSync(filename, 'utf8');
  
  const rules = [
    // 1. coinsHUD
    [
      /const coinsHUD = add\(\[\s*text\(`Coins: \$\{gameState\.coins\}`,\s*\{\s*size:\s*16,\s*font:\s*"monospace"\s*\}\),\s*pos\(20,\s*55\),\s*color\(255,\s*215,\s*0\),\s*z\(10\),\s*"coinsHUD"\s*\]\);/g,
      'const coinsHUD = add([\n        text(`Coins: ${gameState.coins}`, { size: 16, font: "monospace" }),\n        pos(20, 20),\n        anchor("topleft"),\n        color(255, 215, 0),\n        z(10),\n        "coinsHUD"\n      ]);'
    ],
    // 3. Game Background
    [
      /scene\("game",\s*\(\)\s*=>\s*\{\s*\/\/\s*──\s*Game UI & HUD ────────────────────────────────────────────────────\s*const W = width\(\);\s*const H = height\(\);\s*\/\/\s*Starry background\s*for \(let i=0; i<40; i\+\+\)\s*\{\s*add\(\[\s*circle\(rand\(1,3\)\),\s*pos\(rand\(0,W\),\s*rand\(0,H\)\),\s*color\(255,255,255\),\s*opacity\(rand\(0\.2,0\.8\)\),\s*z\(0\)\s*\]\);\s*\}/g,
      'scene("game", () => {\n      // ── Game UI & HUD ────────────────────────────────────────────────────\n      const W = width(); const H = height();\n      \n      addAnimatedBackground();'
    ],
    // 4. Shop Inventories
    [
      /const SHOP_BACKGROUNDS = \[\s*\{ id: "default", name: "Deep Space", cost: 0 \},\s*\{ id: "sunset", name: "Neon Sunset", cost: 15 \},\s*\{ id: "matrix", name: "Matrix Grid", cost: 30 \}\s*\];\s*const SHOP_SKINS = \[\s*\{ id: "default", name: "Default Boy", cost: 0 \},\s*\{ id: "red_boy", name: "Red Skin", cost: 5 \},\s*\{ id: "green_boy", name: "Green Skin", cost: 5 \},\s*\{ id: "blue_boy", name: "Blue Skin", cost: 5 \},\s*\{ id: "macaroni", name: "Macaroni", cost: 20 \},\s*\{ id: "noodle", name: "Pool Noodle", cost: 30 \},\s*\{ id: "ballplayer", name: "Ball Player", cost: 50 \}\s*\];\s*const SHOP_BALLS = \[\s*\{ id: "white", name: "Standard", cost: 0 \},\s*\{ id: "red", name: "Red Ball", cost: 5 \},\s*\{ id: "green", name: "Green Ball", cost: 5 \},\s*\{ id: "purple", name: "Purple Ball", cost: 5 \},\s*\{ id: "gold", name: "Gold Ball", cost: 10 \},\s*\{ id: "neon", name: "Neon Blue", cost: 15 \}\s*\];/g,
      '      const SHOP_BACKGROUNDS = [\n        { id: "default", name: "Deep Space", cost: 0 },\n        { id: "basketball", name: "Basketball Court", cost: 10 },\n        { id: "baseball", name: "Baseball Field", cost: 15 },\n        { id: "football", name: "Football Field", cost: 20 },\n        { id: "neon", name: "Neon", cost: 30 }\n      ];\n  \n      const SHOP_SKINS = [\n        { id: "default", name: "Default Boy", cost: 0 },\n        { id: "robot", name: "Robot", cost: 10 },\n        { id: "astronaut", name: "Astronaut", cost: 15 },\n        { id: "ninja", name: "Ninja", cost: 20 },\n        { id: "camo", name: "Camo", cost: 25 },\n        { id: "macaroni", name: "Macaroni", cost: 30 },\n        { id: "ballcap", name: "Ball Cap", cost: 35 },\n        { id: "rubber_chicken", name: "Rubber Chicken", cost: 50 }\n      ];\n      \n      const SHOP_BALLS = [\n        { id: "white", name: "Standard", cost: 0 },\n        { id: "red", name: "Red Ball", cost: 5 },\n        { id: "green", name: "Green Ball", cost: 5 },\n        { id: "purple", name: "Purple Ball", cost: 5 },\n        { id: "gold", name: "Gold Ball", cost: 10 },\n        { id: "neon", name: "Neon Blue", cost: 15 }\n      ];\n\n      const SHOP_STRINGS = [\n        { id: "default", name: "Default Band", cost: 0 },\n        { id: "red", name: "Red Band", cost: 10 },\n        { id: "blue", name: "Blue Band", cost: 10 },\n        { id: "green", name: "Green Band", cost: 10 }\n      ];'
    ],
    // 5. Unlocked logic
    [
      /const unlocked = \(type === "skin" && gameState\.unlockedPlayerSkins\.includes\(item\.id\)\) \|\|\s*\(type === "ball" && gameState\.unlockedBallColors\.includes\(item\.id\)\) \|\|\s*\(type === "bg" && gameState\.unlockedBackgrounds\.includes\(item\.id\)\);\s*const equipped = \(type === "skin" && gameState\.equippedPlayerSkin === item\.id\) \|\|\s*\(type === "ball" && gameState\.equippedBallColor === item\.id\) \|\|\s*\(type === "bg" && gameState\.equippedBackground === item\.id\);/g,
      '            const unlocked = (type === "skin" && gameState.unlockedPlayerSkins.includes(item.id)) ||\n                             (type === "ball" && gameState.unlockedBallColors.includes(item.id)) ||\n                             (type === "bg" && gameState.unlockedBackgrounds.includes(item.id)) ||\n                             (type === "band" && (gameState.unlockedBands || ["default"]).includes(item.id));\n            const equipped = (type === "skin" && gameState.equippedPlayerSkin === item.id) ||\n                             (type === "ball" && gameState.equippedBallColor === item.id) ||\n                             (type === "bg" && gameState.equippedBackground === item.id) ||\n                             (type === "band" && (gameState.equippedBand || "default") === item.id);'
    ],
    // 6. Buying logic
    [
      /if \(type === "skin"\) gameState\.equippedPlayerSkin = item\.id;\s*if \(type === "ball"\) gameState\.equippedBallColor = item\.id;\s*if \(type === "bg"\) gameState\.equippedBackground = item\.id;\s*saveGame\(\); wait\(0\.01, \(\) => go\("shop"\)\);\s*\} else if \(gameState\.coins >= item\.cost\) \{\s*sfx\.playClick\(\);\s*gameState\.coins -= item\.cost;\s*if \(type === "skin"\) gameState\.unlockedPlayerSkins\.push\(item\.id\);\s*if \(type === "ball"\) gameState\.unlockedBallColors\.push\(item\.id\);\s*if \(type === "bg"\) gameState\.unlockedBackgrounds\.push\(item\.id\);\s*saveGame\(\); wait\(0\.01, \(\) => go\("shop"\)\);/g,
      '                if (type === "skin") gameState.equippedPlayerSkin = item.id;\n                if (type === "ball") gameState.equippedBallColor = item.id;\n                if (type === "bg") gameState.equippedBackground = item.id;\n                if (type === "band") gameState.equippedBand = item.id;\n                saveGame(); wait(0.01, () => go("shop"));\n              } else if (gameState.coins >= item.cost) {\n                sfx.playClick();\n                gameState.coins -= item.cost;\n                if (type === "skin") gameState.unlockedPlayerSkins.push(item.id);\n                if (type === "ball") gameState.unlockedBallColors.push(item.id);\n                if (type === "bg") gameState.unlockedBackgrounds.push(item.id);\n                if (type === "band") {\n                  if (!gameState.unlockedBands) gameState.unlockedBands = ["default"];\n                  gameState.unlockedBands.push(item.id);\n                }\n                saveGame(); wait(0.01, () => go("shop"));'
    ],
    // 7. Shop Menu Layout
    [
      /createShopList\("- Player Skins -", SHOP_SKINS, "skin", 130\);\s*createShopList\("- Ball Colors -", SHOP_BALLS, "ball", 320\);\s*createShopList\("- Backgrounds -", SHOP_BACKGROUNDS, "bg", 490\);\s*createRichButton\("BACK", vec2\(W\/2, H - 60\), \(\) => wait\(0\.01, \(\) => go\("menu"\)\), \[150, 50, 50\]\);/g,
      '        createShopList("- Player Skins -", SHOP_SKINS, "skin", 105);\n        createShopList("- Ball Colors -", SHOP_BALLS, "ball", 285);\n        createShopList("- Backgrounds -", SHOP_BACKGROUNDS, "bg", 445);\n        createShopList("- Strings -", SHOP_STRINGS, "band", 580);\n        \n        createRichButton("BACK", vec2(W/2, H - 50), () => wait(0.01, () => go("menu")), [150, 50, 50]);'
    ],
    // 8. Squawk Audio
    [
      /osc\.start\(\); osc\.stop\(this\.ctx\.currentTime \+ 0\.3\);\s*\}/g,
      'osc.start(); osc.stop(this.ctx.currentTime + 0.3);\n      }\n\n      playSquawk() {\n        if (this.muted) return;\n        this.init();\n        if (this.ctx.state === "suspended") this.ctx.resume();\n        const osc = this.ctx.createOscillator();\n        const g = this.ctx.createGain();\n        osc.type = "triangle";\n        osc.frequency.setValueAtTime(800, this.ctx.currentTime);\n        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.2);\n        osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.4);\n        g.gain.setValueAtTime(0.15, this.ctx.currentTime);\n        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);\n        osc.connect(g); g.connect(this.ctx.destination);\n        osc.start(); osc.stop(this.ctx.currentTime + 0.4);\n      }'
    ],
    // 9. Play squawk on launch
    [
      /if \(!inFlight\)\s*\{\s*inFlight = true;\s*sfx\.playStretch\(0\); sfx\.playThud\(\);\s*ball = add\(\[/g,
      '          if (!inFlight) {\n            inFlight = true;\n            sfx.playStretch(0); \n            if (gameState.equippedPlayerSkin === "rubber_chicken") sfx.playSquawk();\n            else sfx.playThud();\n            ball = add(['
    ],
    // 11. addAnimatedBackground update
    [
      /function addAnimatedBackground\(\)\s*\{\s*let c1 = \[10, 20, 40\], c2 = \[40, 10, 30\];\s*if \(gameState\.equippedBackground === "sunset"\)\s*\{\s*c1 = \[40, 10, 20\]; c2 = \[80, 40, 10\];\s*\}\s*else if \(gameState\.equippedBackground === "matrix"\)\s*\{\s*c1 = \[5, 20, 5\]; c2 = \[10, 40, 10\];\s*\}/g,
      '    function addAnimatedBackground() {\n        let c1 = [10, 20, 40], c2 = [40, 10, 30];\n        if (gameState.equippedBackground === "neon") {\n          c1 = [40, 10, 40]; c2 = [80, 20, 80];\n        } else if (gameState.equippedBackground === "basketball") {\n          c1 = [200, 100, 50]; c2 = [220, 120, 60];\n        } else if (gameState.equippedBackground === "baseball") {\n          c1 = [50, 150, 50]; c2 = [80, 180, 80];\n        } else if (gameState.equippedBackground === "football") {\n          c1 = [30, 100, 30]; c2 = [40, 120, 40];\n        }'
    ],
    // 12. drawBatter update
    [
      /if \(skin === "macaroni"\)\s*\{\s*drawRect\(\{width:BATTER_W,height:BATTER_H,radius:24,anchor:"center",color:rgb\(255,200,50\),outline:\{color:rgb\(200,100,20\),width:3\}\}\);\s*\}\s*else if \(skin === "noodle"\)\s*\{\s*drawRect\(\{width:BATTER_W-20,height:BATTER_H\+30,radius:12,anchor:"center",color:rgb\(255,50,150\),outline:\{color:rgb\(150,20,80\),width:3\}\}\);\s*drawLine\(\{p1:vec2\(-10, -BATTER_H\/2\), p2:vec2\(10, -BATTER_H\/2\), width:3, color:rgb\(150,20,80\)\}\);\s*\}\s*else if \(skin === "ballplayer"\)\s*\{\s*drawRect\(\{width:BATTER_W,height:BATTER_H,radius:12,anchor:"center",color:rgb\(240,180,140\),outline:\{color:rgb\(20,20,30\),width:3\}\}\);\s*drawRect\(\{width:BATTER_W\+14,height:10,radius:3,pos:vec2\(0,-BATTER_H\/2-4\),anchor:"center",color:rgb\(20,50,200\)\}\);\s*drawRect\(\{width:BATTER_W,height:16,radius:8,pos:vec2\(0,-BATTER_H\/2-10\),anchor:"center",color:rgb\(20,50,200\)\}\);\s*drawText\(\{text:"24",pos:vec2\(0,-BATTER_H\/2-12\),size:14,font:"monospace",anchor:"center",color:rgb\(255,255,255\)\}\);\s*\}\s*else if \(skin === "red_boy"\)\s*\{\s*drawRect\(\{width:BATTER_W,height:BATTER_H,radius:12,anchor:"center",color:rgb\(255,80,80\),outline:\{color:rgb\(20,20,30\),width:3\}\}\);\s*\}\s*else if \(skin === "green_boy"\)\s*\{\s*drawRect\(\{width:BATTER_W,height:BATTER_H,radius:12,anchor:"center",color:rgb\(80,255,80\),outline:\{color:rgb\(20,20,30\),width:3\}\}\);\s*\}\s*else if \(skin === "blue_boy"\)\s*\{\s*drawRect\(\{width:BATTER_W,height:BATTER_H,radius:12,anchor:"center",color:rgb\(80,150,255\),outline:\{color:rgb\(20,20,30\),width:3\}\}\);\s*\}/g,
      'if (skin === "robot") {\n                drawRect({width:BATTER_W,height:BATTER_H,radius:4,anchor:"center",color:rgb(150,150,170),outline:{color:rgb(50,50,50),width:3}});\n                drawCircle({radius:6,pos:vec2(-10, -5),color:rgb(255,50,50)});\n                drawCircle({radius:6,pos:vec2(10, -5),color:rgb(255,50,50)});\n                drawLine({p1:vec2(-10, 10), p2:vec2(10, 10), width:3, color:rgb(50,50,50)});\n              } else if (skin === "astronaut") {\n                drawRect({width:BATTER_W+10,height:BATTER_H+10,radius:16,anchor:"center",color:rgb(240,240,255),outline:{color:rgb(100,100,120),width:3}});\n                drawRect({width:BATTER_W-10,height:BATTER_H-20,radius:8,pos:vec2(0,-5),anchor:"center",color:rgb(50,50,80)});\n              } else if (skin === "ninja") {\n                drawRect({width:BATTER_W,height:BATTER_H,radius:12,anchor:"center",color:rgb(30,30,40),outline:{color:rgb(0,0,0),width:3}});\n                drawRect({width:BATTER_W,height:12,pos:vec2(0,-5),anchor:"center",color:rgb(250,200,150)});\n              } else if (skin === "camo") {\n                drawRect({width:BATTER_W,height:BATTER_H,radius:12,anchor:"center",color:rgb(80,120,60),outline:{color:rgb(40,60,30),width:3}});\n                drawCircle({radius:8,pos:vec2(-10, -10),color:rgb(60,90,40)});\n                drawCircle({radius:12,pos:vec2(10, 10),color:rgb(60,90,40)});\n              } else if (skin === "macaroni") {\n                drawPolygon({pts:[vec2(-20,15), vec2(-10,-10), vec2(10,-10), vec2(20,15), vec2(10,25), vec2(0,5), vec2(-10,25)],color:rgb(255,200,50),outline:{color:rgb(200,100,20),width:3}});\n              } else if (skin === "ballcap") {\n                drawRect({width:BATTER_W,height:BATTER_H,radius:12,anchor:"center",color:rgb(240,180,140),outline:{color:rgb(20,20,30),width:3}});\n                drawRect({width:BATTER_W+14,height:10,radius:3,pos:vec2(0,-BATTER_H/2-4),anchor:"center",color:rgb(200,50,50)});\n                drawRect({width:BATTER_W,height:16,radius:8,pos:vec2(0,-BATTER_H/2-10),anchor:"center",color:rgb(200,50,50)});\n              } else if (skin === "rubber_chicken") {\n                drawRect({width:BATTER_W-10,height:BATTER_H+20,radius:10,anchor:"center",color:rgb(255,220,50),outline:{color:rgb(200,150,0),width:3}});\n                drawCircle({radius:8,pos:vec2(0, -BATTER_H/2-10),color:rgb(255,50,50)});\n              }'
    ]
  ];

  let successCount = 0;
  for (let i = 0; i < rules.length; i++) {
    const rx = rules[i][0];
    const to = rules[i][1];
    
    // Test regex match
    if (rx.test(code)) {
      code = code.replace(rx, to);
      successCount++;
    } else {
      console.log('Rule ' + (i+1) + ' failed to match in ' + filename);
    }
  }

  fs.writeFileSync(filename, code, 'utf8');
  console.log('Patched ' + successCount + '/' + rules.length + ' rules in ' + filename);
}

applyPatch('index.html');
applyPatch('test.js');
