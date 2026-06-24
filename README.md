# Wacky Ball: Spellbound! 🎯

Wacky Ball is a premium, high-fidelity slingshot spelling arcade game built on top of the **Kaboom.js** physics engine and modern web frontend standards. Pull back the slingshot, aim with path projections, and shoot various wacky projectiles into moving hoops to light up letters and spell words!

## Features

- **Dynamic Projectiles & Physics**: Shoot distinct items (Watermelon, Rubber Chicken, Bubble Gum, Beach Ball) each equipped with unique mass, bounce coefficients, and trailing particle effects.
- **Accident-prone Hazards**: Avoid firing heavy items (Bowling Balls, Anvils) into hoops, which trigger physical collision reflections and strike penalties.
- **Parallax Starry Backgrounds**: Premium visuals featuring glassmorphism menu cards, parallax background stars, and particle confetti arpeggios.
- **Damped Harmonic Net Physics**: Hoops are attached to springy net physics that vibrate realistically when scored.
- **Sound Synth Engine**: Synthesizes custom game SFX (clicks, launch sweeps, bounces, score arpeggios, detuned alarm buzzers, and squeaky squeegee swipes) directly using the Web Audio API without asset lag.
- **4 Dynamic Levels & Word Dictionaries**:
  - **Level 1**: Standard unmoving hoops. Dictionaries: `["CAT", "DOG", "PIG"]`
  - **Level 2**: Floaty left-and-right moving hoops. Dictionaries: `["PLAY", "JUMP", "FROG"]`
  - **Level 3**: Floating center bounce shield obstacle. Dictionaries: `["KABOOM", "WACKY", "SLING"]`
  - **Level 4**: Sidelining wind gusts modifying aim trajectories. Dictionaries: `["SPELLED", "VICTORY", "WACKIEST"]`
- **Randomized Spelling Mechanics**: When a level starts, a word is chosen randomly from the level's dictionary. Outfield hoops are dynamically assigned letters (with the correct next letter guaranteed on at least one hoop). Hitting the correct hoop advances the spelling (blanks reveal letters), while hitting a wrong hoop triggers a Strike penalty. Winning a word triggers confetti before moving to the next word. Completing all words in the level advances the level.

---

## Interactive 3-Strikes Water Penalty Overlay 💦

Rather than ending the game immediately, reaching **3 Strikes** triggers an interactive recovery minigame:

1. A giant silhouette of a bucket grows in the center of the screen and tips over.
2. The screen gets splashed with a full-screen, blurred blue radial gradient wet overlay.
3. Realistic water droplets drip down the screen.
4. **The Wipe Mechanic**: The player must tap or swipe the screen 3 times to wipe the water away. Each wipe plays a squeaky squeegee sound, flashes the screen, and fills a progress bar.
5. Once fully wiped, the screen clears, the strike counter resets to `0`, and the player resumes playing the current level with their spelling progress intact.

---

## Controls

### Mouse / Touch

- **Drag & Release Batter**: Pull back the slingshot, aim with the projected dot path, and release to shoot.
- **Click Batter or Discard Button**: Swap/recycle the currently loaded item (especially useful to discard heavy Hazards!).
- **Click HUD buttons**: Toggle sound or pause the game.

### Keyboard

- **Left / Right Arrow Keys**: Rotate the aiming angle.
- **Spacebar (Hold & Release)**: Pull back the slingshot elastic and release to fire.
- **Enter / Return**: Recycle/discard the loaded item.
- **Escape**: Pause the game.

### Developer Cheat Codes 🛠️

- **`c`**: Instantly light up the next spelling letter in the current word.
- **`w`**: Instantly win the current level.
- **`s`**: Instantly trigger the 3 Strikes Water Splash Penalty sequence.

---

## Getting Started (Local Development)

To run the game locally:

1. Ensure you have **Python 3** installed.
2. Open a terminal in the project directory.
3. Run the HTTP server:
   ```bash
   python -m http.server 8090
   ```
4. Navigate to `http://127.0.0.1:8090/` in your browser.
