# Copy deck: Kylian Algoet portfolio

All site copy in English. Use it verbatim.
`TODO(input)` = information Kylian still has to supply. Never ship a page that still contains one.
Every factual claim traces back to a repository (README or source) or to Kylian's own confirmation. Section 2a of `01-handoff.md` lists the sources.

---

## Global

- **Site title:** Kylian Algoet: AI & Automation / Fullstack Developer
- **Meta description (home):** Kylian Algoet is a junior developer in Belgium who builds software where AI, interfaces and hardware meet. Selected work: DeckForge AI and SK8Sense.
- **Nav:** Work · Experience · Playground · About · `CV ↓` · `GitHub ↗`
- **Skip link:** Skip to content
- **Footer:** © 2026 Kylian Algoet · Set in Instrument Serif, Geist and Geist Mono · Built with Astro · `Theme: Light / Dark`
- **404:** H1 *Bailed.* · Body: *This page doesn't exist, or it moved.* · Link: `Back to the homepage →`

---

## Home

### Hero
- **Eyebrow:** AI & AUTOMATION / FULLSTACK DEVELOPER · BELGIUM
- **H1:** I build software where AI, interfaces and *hardware* meet.
- **Lead:** Recent Multimedia & Creative Technology graduate from Erasmushogeschool Brussel. I'm looking for a junior role as an AI engineer, software developer or fullstack developer.
- **Buttons:** `View selected work` (→ #work) · `Download CV (PDF)` (→ /cv.pdf)
- **Links:** `GitHub ↗` (https://github.com/KylianAlgoet) · `kylianalgoet12@gmail.com`
- **Index label:** INDEX
- **01 DeckForge AI.** Locally trained image generation, previewed on an interactive 3D skateboard deck. *Tags:* Python · FastAPI · React · Three.js · LoRA
- **02 SK8Sense.** A connected skateboard: ESP32 sensors, a React Native app and AI coaching. *Tags:* ESP32 · BLE · React Native · Firebase · Claude API
- **Trick Trace caption:** SK8SENSE: KICKFLIP, RECORDED AT ~100 HZ *(only once real data exists; otherwise leave the hero trace out)*
- **Trick Trace aria-label:** Gyroscope reading from a kickflip recorded with the SK8Sense board. Rotation around the board's length axis peaks above the 220 degrees-per-second threshold, so the firmware classifies it as a kickflip.

### Selected work (#work)
- **H2:** Selected work
- **Sub:** Two systems I designed, built and tested end to end, on my own.

**DeckForge AI**
- **Kicker:** FULLSTACK · GENERATIVE AI · 3D · 2026
- **Summary:** A text prompt becomes skateboard deck artwork in one of three trained styles, then appears on an interactive 3D deck before anything is printed. It runs entirely on one laptop GPU: no cloud inference, no third-party image API.
- **What I built:**
  - Three Stable Diffusion 1.5 LoRA style adapters, trained on a 148-image dataset where every item has a recorded licence.
  - A FastAPI service with upload validation, a single-flight generation lock and live progress telemetry.
  - A React and TypeScript frontend with a Three.js deck preview that maps each result onto the board.
  - 528 pytest, 183 Vitest and 38 Playwright tests, running in GitHub Actions CI.
- **Facts:** 3 / trained style adapters · 40 / logged experiments · 17 / decision records · 8 GB / VRAM budget
- **Links:** `Read the case study →` · `Repository ↗`
- **Figure caption:** FIG. 01: A generated decal, shown flat and mapped onto the 3D deck.

**SK8Sense**
- **Kicker:** HARDWARE · MOBILE · AI COACHING · 2026
- **Summary:** A sensor module under the deck streams motion and foot pressure to a mobile app over Bluetooth Low Energy. Tricks are detected with transparent rules on the board itself; Claude then turns the measured session into short coaching cues.
- **What I built:**
  - ESP32 firmware that reads an MPU6050 motion sensor and four pressure sensors and streams JSON over BLE at around 100 Hz.
  - A rule-based trick classifier for ollies, kickflips, heelflips and shove-its, running on the board.
  - A React Native app with a live dashboard, practice mode, session summaries and history stored in Firebase.
  - A 3D-printed PETG enclosure that mounts between the trucks.
- **Pull quote:** The AI sits in the coaching layer, not the detection layer.
- **Facts:** 5 / trick types · 4 / pressure zones · ~100 Hz / BLE stream · Working / prototype
- **Links:** `Read the case study →` · `Repository ↗`
- **Figure caption:** FIG. 02: Home, live connection and session history in the SK8Sense app.

### More on GitHub
- **H3:** More on GitHub
- `Morph3D-Prototype`: TODO(input): confirm "An AI-powered, customizable text-to-3D generator prototype."
- `SkateTrickAI`: TODO(input): one line
- `LiveSkateparkHeatmap`: TODO(input): one line
- `AICharacterMaker`: TODO(input): one line
- **Link:** `All repositories ↗`

### How I work
- **H2:** How I work
1. **Measure before claiming.** Every model choice in DeckForge is backed by a logged experiment. I picked the base model because it fits the hardware, and the write-up says so, even though another model scored higher.
2. **Keep the intelligence explainable.** SK8Sense detects tricks with rules I can read, test and tune. The language model only comes in afterwards, to turn measured data into coaching.
3. **Write down what broke.** Both projects keep a record of what failed and how it was fixed: a GPU driver crash during a demo run, Bluetooth dropping on battery power, a sensor bus that couldn't handle vibration.

### Experience (#experience)
- **H2:** Experience
- **Row:** JAN – APR 2026 · **Software Development Intern**, BeerSecret · Internship
- **Body:** I automated internal booking and operations workflows by connecting FareHarbor, Zapier and Odoo, built pre- and post-experience email automations, and wrote handover documentation so the team could keep running the flows after my internship.
- **Tags:** FareHarbor · Zapier · Odoo · Email automation · Documentation

### Playground (#playground)
- **H2:** Playground
- **Sub:** Games, 3D and other things I make when nobody asked for them.
- **Tiles:** from the `playground` collection (TODO(input): Unity game, renders)
- **CTA:** `See everything in the Playground →`

### About (#about)
- **H2:** About
- **Body:** I'm Kylian, a developer based in Belgium. At Erasmushogeschool Brussel I studied Multimedia & Creative Technology, which taught me to move between code, interfaces and physical prototypes. TODO(input): confirm or drop: *Both of my final projects started on a skateboard: one generates deck graphics, the other measures what happens when you pop an ollie.* What I enjoy most is the whole path, from a sensor reading or a model output to an interface someone can actually use.
- **H3:** Tools I've used in real projects
  - **Backend:** Python, FastAPI, Pydantic, Java, Spring Boot, REST APIs
  - **Frontend:** JavaScript, TypeScript, React, Vue.js, Three.js / React Three Fiber, HTML/CSS
  - **Mobile:** React Native (Expo), Zustand
  - **Data & AI:** MySQL, Firebase / Firestore, PyTorch, Stable Diffusion, LoRA, IP-Adapter, Claude API
  - **Hardware:** ESP32, C++ (Arduino / PlatformIO), Bluetooth Low Energy, I²C sensors, 3D printing
  - **Quality & tooling:** Git/GitHub, GitHub Actions, pytest, Vitest, Playwright
  - **Automation:** Zapier, Odoo, FareHarbor
  - **Creative:** Unity, TODO(input): 3D tool
- **H3:** Education
  - 2023 – 2026 · **Bachelor in Multimedia and Creative Technology**, Erasmushogeschool Brussel · Graduated September 2026
- **H3:** Languages
  - Dutch, English, French

### Contact (#contact)
- **H2:** Let's talk.
- **Body:** If you're hiring a junior developer who's comfortable across AI, web and hardware, I'd like to hear from you.
- **Items:** `kylianalgoet12@gmail.com` (mailto link + `Copy` button → announces "Email copied") · `GitHub ↗` (https://github.com/KylianAlgoet) · `LinkedIn ↗` (https://www.linkedin.com/in/kylian-algoet-1912232a2) · `Download CV (PDF)`
- **Not on the site:** phone number (it stays on the CV only). The extra security jobs (Securitas, G4S) stay on the CV and off the portfolio.

---

## Case study: DeckForge AI (`/work/deckforge-ai`)

- **Meta description:** How I trained three Stable Diffusion style adapters and built a local, tested fullstack app that previews generated skateboard graphics on a 3D deck.
- **H1:** DeckForge AI
- **One-liner:** A self-trained, locally deployed generator for skateboard deck graphics, with a 3D preview.
- **Meta row:** ROLE Solo: research, ML, backend, frontend · YEAR 2026 · CONTEXT Bachelor final project, Erasmushogeschool Brussel · STACK Python, FastAPI, Pydantic, PyTorch, diffusers, React, TypeScript, Three.js
- **Links:** `Repository ↗` · `Research report (PDF, 91 pages) ↗`
- **Spec strip:** 3 / trained LoRA style adapters · 148 / licence-checked training images · 512 × 1536 / deck-format output · ~12 s / per generation after warm-up · 40 / logged experiments · 17 / decision records

### 01 The question
A skateboard customer wants a custom deck graphic but can't draw one, and stock artwork is generic. I wanted to find out whether a model trained and run on consumer hardware could turn a written description, and optionally a reference image, into usable deck art in a consistent style.

The constraint shaped everything: one laptop GPU with 8 GB of VRAM, no cloud inference and no third-party image API.

### 02 What I built
- **Three style adapters.** LoRA adapters for `ukiyo-e`, `minimal-geometric` and `retro-poster`, trained on Stable Diffusion 1.5 using a 148-image dataset. Every image is public domain, CC0 or my own work, and its licence is recorded in the manifest.
- **A generation service.** FastAPI with one resident pipeline, upload validation for reference images, a single-flight lock and live progress telemetry during denoising.
- **A frontend with a 3D preview.** React, TypeScript and Three.js. You write a prompt, pick a style, optionally add a reference and watch the progress, and the result lands on a 3D deck you can rotate. You can also map your own artwork onto the deck without generating anything.
- **Diagram:** React + Three.js → FastAPI (one worker) → resident SD 1.5 + LoRA (0.7) + IP-Adapter (0.55) → 512 × 1536 decal → 3D deck
- **Timeline (prototype ladder):** 0 · 3D deck viewer → 1 · Base-model benchmark → 2 · Reference conditioning → 3 · LoRA smoke test → 4 · Style learning → 5 · Integrated app

### 03 Key decisions
- **Stable Diffusion 1.5 over SDXL.** *Alternatives:* SDXL, SD 2.1 (planned, but never benchmarked because the repository was gated). *Why:* SDXL scored better under my rubric, but it doesn't leave room for a LoRA and reference conditioning in 8 GB. *Trade-off:* I chose for feasibility, not image quality, and the write-up says so.
- **IP-Adapter at 0.55 over img2img.** *Why:* in my sweeps, img2img either ignored the reference or reproduced it too closely. *Trade-off:* I measured copy risk explicitly instead of assuming it.
- **One adapter per style.** *Why:* checkpoints were compared at fixed seeds, and two of the three styles were better at step 300 than at 600. *Trade-off:* three files to manage, but each style ships its best checkpoint.
- **One API worker, on purpose.** *Why:* the generation lock is process-local, and a second pipeline doesn't fit: the stack leaves about 200 MiB of 8 GB spare. *Trade-off:* one generation at a time, no queue.

### 04 How it works
Prompt → style → optional reference → live denoising progress → result on the deck → download PNG plus a JSON metadata sidecar. The first request loads the pipeline, which takes about 30 seconds. After that, a generation takes 12–13 seconds.
- **Interactive figure:** `Rotate the deck` (loads the 3D viewer on demand). Fallback: three stills.

### 05 How I tested it
528 pytest, 183 Vitest and 38 Playwright tests run in GitHub Actions on Windows, the platform the project was validated on. The browser tests drive a real WebGL context against a mocked API.

No test loads the model. A green build shows that the code, the API contracts and the interface work. It says nothing about image quality. Real generations are evidenced separately, in the experiment registry and the GPU validation runs. I also ran the project from a clean clone, which surfaced five defects that a warm machine had hidden.

### 06 Limits and next steps
- Prompt adherence is limited: complex, multi-object prompts are unreliable.
- `retro-poster` is a partial pass and weaker than the other two styles. I report it as such.
- One process and one generation at a time.
- Training isn't bit-reproducible on this stack, so the adapters are kept and verified as files.
- It runs locally only. There is no hosted demo.
- **Next:** TODO(input): take these from `docs/09-final-reflection.md` in the repository; don't invent them.

---

## Case study: SK8Sense (`/work/sk8sense`)

- **Meta description:** How I built a connected skateboard coach: ESP32 sensors, rule-based trick detection on the board, a React Native app and coaching generated with the Claude API.
- **H1:** SK8Sense
- **One-liner:** A connected skateboard coach: sensors on the board, rules on the chip, coaching in the app.
- **Meta row:** ROLE Solo: hardware, firmware, app, design · YEAR 2026 · CONTEXT Final Work, Erasmushogeschool Brussel · STACK ESP32, C++ (PlatformIO), NimBLE, React Native (Expo), Zustand, Firebase, Claude API
- **Links:** `Repository ↗`
- **Spec strip:** ESP32 / microcontroller + BLE · MPU6050 / motion sensor · 4 / pressure zones · ~100 Hz / sensor stream · 5 / trick types · PETG / 3D-printed enclosure

### 01 The question
The technique behind a trick happens in a fraction of a second. A skater who films themselves can see that an attempt failed, but not why. I wanted to know whether the board itself could measure every attempt and turn that into feedback for the next one, without a coach standing next to you.

### 02 What I built
- **A sensor module.** An ESP32 reads an MPU6050 (acceleration and rotation) and four force-sensitive resistors under the grip tape: nose, heel, toe and tail. It runs on a LiPo with a charger and boost converter, inside a PETG enclosure mounted between the trucks.
- **Firmware.** Reads the sensors at around 100 Hz, classifies tricks with rules, and streams compact JSON over Bluetooth Low Energy.
- **A mobile app.** React Native with Expo: sign-in, board pairing, a live dashboard (pitch, roll, impact, foot pressure), live sessions with a trick feed, session summaries, a learning and practice flow, and history stored in Firestore.
- **AI coaching.** After a trick or a session, the app turns the measurements into short coaching cues with the Claude API.
- **Diagram:** MPU6050 + 4× FSR → ESP32 (rule-based classifier) → BLE notify (JSON) → React Native app → Firestore · Claude API

### 03 Key decisions
- **Rules, not a trained model, for detection.** *Why:* rules are fast, explainable and tunable on a microcontroller, and I can show exactly why a trick was classified. *Trade-off:* only a handful of tricks; a model trained on real skate data is a next step.
- **Detect on the board, not in the phone.** *Why:* the firmware sends its verdict along with the data, so the app logs what the board actually saw.
- **A boost converter in the power path.** *Why:* the ESP32 board's regulator needs more voltage than a LiPo delivers, and Bluetooth dropped out on battery power. Adding an MT3608 boost converter fixed it.
- **AI only after measurement.** *Why:* the app first turns rotation and landing data into plain verdicts ("under-rotated", "harsh landing"), and only then asks the model for a cue. The model doesn't get to invent its own reading of the numbers.

### 04 How it works
- **Trick Trace intro:** When the board's rotation rises above 70°/s, the firmware opens a short window. It records the peak rotation on each axis until the board settles or 480 ms pass, then checks the peaks against fixed thresholds. Scrub through a real recording below.
- **Rules (shown under the trace):**
  - Flip: rotation around the length axis ≥ 220°/s and at least 1.35× the pop axis → kickflip or heelflip, depending on direction
  - Shove-it: vertical rotation ≥ 170°/s and dominant → backside or frontside shove-it
  - Ollie: pop-axis rotation ≥ 150°/s
- **App flow (3 screens):** Connect → Live session → Session summary
- **Schematic fallback label (only without real data):** Schematic: thresholds from the firmware, not recorded data.

### 05 How I tested it
I tested the hardware and app on the bench with the PlatformIO serial monitor and an Expo development build on Android, then in a real skate session with the live dashboard. Along the way I fixed pressure-sensor cross-talk, a sensor bus that dropped out under vibration (by slowing I²C to 100 kHz) and a stale closure that froze the pitch and roll readouts. There is no automated test suite yet.
- TODO(input): only add bench figures (BLE range, packet loss, battery life) if Kylian confirms them as measured.

### 06 Limits and next steps
- A working prototype, not a consumer product. It is built on perfboard and needs drop and water testing.
- Android only. iOS was out of scope.
- The pressure sensors add context but don't drive classification yet.
- The app calls the Claude API directly. A production version would route that call through a backend so no key ships in the app.
- **Next:** a model trained on real skate data, a custom PCB, a water-resistant enclosure, and video synced to sensor events.

---

## Playground (`/playground`)
- **H1:** Playground
- **Intro:** Games, 3D and other things I make when nobody asked for them.
- **Tile labels:** GAME · RENDER · ANIMATION
- **Detail page sections (game):** What it is · What I made · What I learned *(only sections with real information)*
- All entries: TODO(input).

## Alt-text guidance
Describe what the image shows and why it matters. Example: "DeckForge interface with a ukiyo-e style decal mapped onto a rotated 3D skateboard deck". Don't start with "Image of". Decorative trace fragments get `alt=""` / `aria-hidden="true"`.
