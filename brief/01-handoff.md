# Portfolio Kylian Algoet: onderzoek, artdirection en overdracht voor Claude Code

## Context

Kylian wil een Engelstalige portfolio-site die hem positioneert als **AI & Automation / Fullstack Developer** (junior AI engineer, software developer of fullstack developer). Twee projecten dragen de site: **DeckForge AI** en **SK8Sense**. Daarnaast komen de BeerSecret-stage (interne automatisatie) en een creatief deel (Unity-game en 3D-werk). In deze fase wordt niets gebouwd. Het resultaat is een uitvoerbaar ontwerpplan plus een startprompt voor Claude Code.

Legenda in dit document: **[VAST]** = bevestigd door jou of gecontroleerd in de repo · **[VOORSTEL]** = mijn ontwerpkeuze · **[INPUT]** = moet nog van jou komen.

---

## 1. Positionering en gekozen richting

**Positionering [VOORSTEL]:** *"I build software where AI, interfaces and hardware meet."*
Je onderscheidt je van andere junioren omdat je volledige systemen bouwt: van een sensorwaarde of modeloutput tot een interface die iemand echt kan gebruiken. Daarbij documenteer je eerlijk wat je meet en wat faalt. Dat blijkt uit beide repo's en wordt de rode draad.

**Gekozen richting: B. "Spec Sheet". Technische editorial vormgeving** (zie §3 voor alle drie de richtingen en de motivatie).
Een licht, warm-papieren canvas. Grote serif-koppen staan tegenover monospace-specificatielabels, met één ultramarijnblauw signaalaccent. Projecten verschijnen als ingelijste "platen" met spec-strips. Het herkenbare detail is de **Trick Trace**: echte gyroscoopdata van SK8Sense, gevisualiseerd volgens de detectieregels uit je firmware (§6.8).

---

## 2. Onderzoek

### 2a. Wat ik in je repositories heb gecontroleerd

Gecontroleerd via de GitHub API en raw files (README, CI-workflow, package.json, requirements, `aiCoach.js`, `trickScore.js`, `firmware/src/main.cpp`, bestandsbomen, screenshots bekeken).

**DeckForge AI**: `KylianAlgoet/Selftrained-and-deployed-AI-image-generator`
| Bewering | Status |
|---|---|
| 3 LoRA-stijladapters (`ukiyo-e`, `minimal-geometric`, `retro-poster`) op SD 1.5 | **Gecontroleerd** (README, `apps/api/styles.py`). `retro-poster` staat zelf als *PARTIAL PASS* gedocumenteerd: niet verzwijgen. |
| Python, FastAPI, Pydantic | **Gecontroleerd** (`fastapi==0.141.1`, `pydantic==2.13.4`) |
| React, TypeScript, Three.js | **Gecontroleerd** (React 19, three 0.185, @react-three/fiber 9 + drei, Vite) |
| Referentiebeelden, uploadvalidatie, voortgang | **Gecontroleerd** (`uploads.py`, `progress.py`, IP-Adapter @ 0.55, `ProgressPanel.tsx`) |
| pytest, Vitest, Playwright | **Gecontroleerd** (testbestanden aanwezig). Aantallen 528 / 183 / 38 komen uit de README: zelf gerapporteerd, niet door mij uitgevoerd. |
| GitHub Actions CI | **Gecontroleerd** (`ci.yml`: 3 jobs op `windows-latest`; pytest zonder GPU, lint/vitest/build, Playwright met gemockte API) |
| Gedocumenteerde ontwerpkeuzes | **Gecontroleerd** (17 decision records `DR-001…017`, 40 experimenten, onderzoeksrapport-PDF van 91 p.) |
| Extra feiten uit README | 148 beelden, alleen PD/CC0/eigen werk · 512×1536-decalformaat · RTX 4060 Laptop, ~200 MiB VRAM-marge · eerste generatie ±30 s, daarna 12–13 s · **alleen lokaal, geen gehoste demo** · **geen enkele test laadt het model** |

**SK8Sense**: `KylianAlgoet/Sk8Sense`
| Bewering | Status |
|---|---|
| ESP32 + MPU6050 + 4× FSR 402 | **Gecontroleerd** (firmware, pinout) |
| Bluetooth Low Energy | **Gecontroleerd** (NimBLE, JSON-notify; app: `react-native-ble-plx`) |
| React Native-app | **Gecontroleerd** (Expo SDK 54, RN 0.81.5, Zustand, 13 schermen) |
| Firebase Auth + Firestore | **Gecontroleerd** (`firebase ^11`, `config/firebase.js`, `authStore.js`) |
| Live dashboard + sessiegeschiedenis | **Gecontroleerd** (`DashboardScreen.js`, `HistoryScreen.js`, `sessionStore.js`) |
| Regelgebaseerde trick detection | **Gecontroleerd, met een correctie:** de huidige `main.cpp` gebruikt **geen** airtime-state-machine (`IDLE→AIRTIME→LANDING`) zoals de README beschrijft. Hij werkt met een **gyroscoop-piekvenster**: het venster opent bij \|gyro\| > 70 °/s, loopt max. 480 ms of sluit na 80 ms rust, en classificeert dan op de dominante as (flip: \|gx\| ≥ 220 én ≥ 1,35×\|gy\| · shuv: \|gz\| ≥ 170 · ollie: \|gy\| ≥ 150). **De site volgt de code, niet de README.** |
| Claude API voor coaching | **Gecontroleerd** (`aiCoach.js`, Messages API; deterministische verdicts *vóór* de prompt, fallback zonder key). Let op: de API-key zit client-side (`EXPO_PUBLIC_…`). Dat is aanvaardbaar voor een prototype en eerlijk te benoemen als volgende stap: de call achter een backend zetten. |
| Extra in code | `trickScore.js`: deterministische "clean score" 0–100 · 3D-geprinte PETG-behuizing (STL's in repo) |
| Alleen README (niet verifieerbaar) | Bankmetingen: BLE ±8 m, <2 % pakketverlies, 6+ uur batterij, fieldtest. **Geen geautomatiseerde testsuite in de repo.** Op de site formuleren als "bench-tested", zonder harde claims zoals "production-ready". |
| Kleine inconsistentie | README noemt `LiveBoardViewer.js`/`SkateboardGL.js`, die niet in de boom staan (3D-viewer vervangen door een Animated-fallback). |

**Andere publieke repo's (niet onderzocht, niet op de site tenzij jij het wil):** `Morph3D-Prototype` ("AI-powered customizable Text-to-3D Generator"), `SkateTrickAI`, `LiveSkateparkHeatmap`, `AICharacterMaker`.

**Visuele observatie:** beide project-UI's zijn **donker met signaaloranje** (DeckForge-interface, SK8Sense "MIS v3"). Een donker portfolio laat ze daarom wegvallen. Een licht canvas presenteert ze als ingelijste objecten. Dat stuurt de kleurkeuze.

### 2b. Visuele referenties (geverifieerd: live bezocht of opgehaald op 2 nov 2026)

| # | Referentie | Principe | Toepassing bij jou | Nadelen |
|---|---|---|---|---|
| 1 | [brittanychiang.com](https://brittanychiang.com) | **Recruiter-snelheid**: naam, rol, nav en socials meteen zichtbaar; ervaring als compacte lijst met datum, rol en tech-tags; "View Full Résumé"; skip-link. | Hero met rol, links naar cv en GitHub en een projectindex boven de vouw. Ervaring als datum/rol/tags-rij. | Veelgekopieerd format en weinig eigen karakter. Een sticky tweekolom werkt niet op mobiel en moet daar stapelen. |
| 2 | [rauno.me/craft](https://rauno.me/craft) | **Gedateerde craft-index**: een grid van tegels met titel en datum, waarbij elke tegel naar een prototype, een essay of alleen een still leidt. | Model voor **Playground**: één grid waarin een uitgebreid project (Unity-game → eigen pagina) en een losse render (→ lightbox) naast elkaar bestaan, met een label per type. | Grote blur- en video-thumbnails zijn zwaar en de tegels zijn soms cryptisch. Bij jou krijgt elke tegel een duidelijke titel en type. |
| 3 | [ciechanow.ski](https://ciechanow.ski/) | **Uitleg door directe manipulatie**: sliders en sleepbare diagrammen tonen oorzaak en gevolg vóór de tekst het uitlegt. | Inspiratie voor de **Trick Trace**: scrub door echte sensordata en zie wanneer het venster opent en welke drempel de trick bepaalt. Zo bewijs je in één interactie dat de detectie regelgebaseerd is. | Zeer arbeidsintensief en lange pagina's. Bij jou beperkt tot één diagram met een statische fallback. |
| 4 | [teenage.engineering/products/op-1](https://teenage.engineering/products/op-1) | **Hardware als product-verhaal**: kleine all-caps labels, specs met eenheden, productbeelden op neutraal vlak. | Spec-strips per project (`ESP32 · MPU6050 · 4× FSR · BLE · ~100 Hz`), monospace-labels, enclosure-foto's als productfoto. | Hun dichte all-caps-lijsten lezen moeizaam. Bij jou blijven labels kort en lopende tekst in sentence case. |
| 5 | [press.stripe.com](https://press.stripe.com) | **Editorial index**: een sobere tekstlijst van titels vooraf, daarna rijke secties per item. Uitgeversrust en typografisch zelfvertrouwen. | De **projectindex in de hero** als typografische lijst (01 / 02) en serif-koppen met royale witruimte. | De pagina is zwaar (zeer veel content op één pagina). Neem de typografie over, niet de lengte. |
| 6 | [emilkowal.ski](https://emilkowal.ski) | **Ingetogen toon**: rol, korte bio en projecten als naam + één regel. Geen marketingtaal. | Toon van je teksten: eerste persoon, concreet, geen superlatieven. Elk project krijgt één zin die zegt wat het doet. | Bijna geen beeld. Jouw werk is visueel, dus combineren met sterke project-platen. |
| 7 | [bruno-simon.com](https://bruno-simon.com) | **Tegenreferentie: immersieve 3D als poort.** Indrukwekkend, maar de inhoud zit achter een bestuurbare 3D-wereld. De opgehaalde inhoud toont geen klassieke fallback. | Bevestigt de keuze: **geen WebGL op de homepage**. 3D alleen als optionele, on-demand viewer op de DeckForge-pagina, waar het iets bewijst (de deck-preview is je product). | Slecht voor 15-secondenscan, mobiel, batterij en toegankelijkheid. |

*Niet gebruikt:* linear.app/method gaf alleen een laadstatus terug en locomotive.ca kon ik niet goed beoordelen. Ik heb ze daarom niet als referentie opgenomen.

**Conclusies:** (1) de scanbaarheid voor recruiters komt van #1 en #5, (2) het karakter komt van #4 en een eigen interactie in de geest van #3, (3) de creatieve sectie volgt het indexmodel van #2, (4) 3D is een gereedschap en geen decor (#7).

---

## 3. Drie creatieve richtingen

**A. "Night Session": immersief en donker [afgewezen]**
Sfeer: donkere studio, een roterend 3D-deck met DeckForge-decals als hero, cinematische scroll. Typografie: brede grotesk, wit op zwart. Kleur: zwart met neonaccent. Interactie: WebGL-hero, scroll-gestuurde camera. Projecten verschijnen als fullscreen-hoofdstukken.
→ Visueel sterk, maar zwaar op mobiel, en het vergroot het risico dat 3D de boodschap verdringt. Bovendien verdwijnen je eigen donker-oranje UI's erin.

**B. "Spec Sheet": technische editorial [GEKOZEN]**
Sfeer: zorgvuldig gezet technisch tijdschrift, de documentatie van een hardwareproduct. Compositie: 12-koloms grid, asymmetrisch, met veel witruimte en haarlijnen. Typografie: Instrument Serif voor koppen, Geist voor tekst en Geist Mono voor labels en data. Kleur: warm papier, inkt en één ultramarijn signaalkleur. Interactie: precies en kort, met één signatuur-interactie (Trick Trace) en geen scroll-jacking. Projecten verschijnen als ingelijste "platen" met spec-strips, beslissingskaarten en een architectuurdiagram.

**C. "Deck Graphic": skate-zine [afgewezen als geheel, deels gebruikt in Playground]**
Sfeer: risograph, collage, griptape-textuur, posterkoppen. Typografie: expressieve display-grotesk. Kleur: fluo en papier. Interactie: stickers, scheve kaarten. Projecten verschijnen als zine-spreads.
→ Veel persoonlijkheid en past bij de skatecultuur, maar het leest minder als serieuze developer voor een recruiter en de leesbaarheid lijdt. **Een vleugje C** mag in Playground: losser grid, iets grotere beelden, scheve labeltape als hover-detail.

**Waarom B:** je sterkste troef is technische geloofwaardigheid met zorg voor vorm. Je repo's tonen discipline (experimenten, decision records, eerlijke beperkingen). Een spec-sheet-esthetiek *visualiseert* die discipline. Het blijft snel, toegankelijk en werkt goed op mobiel, en het laat ruimte voor persoonlijkheid via typografie, de Trick Trace en Playground. Recruiters vinden alles direct; developers vinden diepgang in de case studies.

---

## 4. Pagina- en sectiestructuur

### Sitemap
```
/                          Home (één scrollpagina met ankers)
/work/deckforge-ai         Case study
/work/sk8sense             Case study
/playground                    Index creatief werk (grid + lightbox)
/playground/[slug]             Uitgebreid creatief project (bv. de Unity-game)
/cv.pdf                    Download (statisch bestand)
/404
```
Navigatie (4 items + 2 acties): `Work` · `Experience` · `Playground` · `About`, met rechts `CV ↓` en `GitHub ↗`. Op de homepage zijn het ankers, op subpagina's links naar `/#work` enz. De actieve pagina krijgt een onderstreping en `aria-current`.

### Homepage, volgorde en functie
1. **Hero**: wie, welke richting, de twee projecten als index, cv/GitHub/contact. *Doel: de 15-secondenscan.*
2. **Selected work**: twee grote project-platen met "What I built" en een feitenstrip, afgesloten met de compacte lijst **More on GitHub**. *Bewijs.*
3. **How I work**: drie principes, elk gestaafd met een concreet voorbeeld uit de repo's. *Onderscheid.*
4. **Experience**: BeerSecret-stage. *Werkcontext.*
5. **Playground**: 3–6 tegels van creatief werk, met een link naar `/playground`. *Persoonlijkheid.*
6. **About**: korte intro, tools gegroepeerd, opleiding. *Mens erachter.*
7. **Contact**: e-mail, GitHub, LinkedIn, cv. *Actie.*
8. **Footer**: colofon (lettertypes, gebouwd met Astro), copyright, thema-toggle.

### Eerste schermweergave

**Desktop (1440×900) [VOORSTEL]**
```
┌──────────────────────────────────────────────────────────────────────┐
│ Kylian Algoet          Work  Experience  Playground  About   CV↓  GitHub↗│
│──────────────────────────────────────────────────────────────────────│
│ AI & AUTOMATION / FULLSTACK DEVELOPER · BELGIUM        (mono label)   │
│                                                                      │
│ I build software where          │  INDEX                             │
│ AI, interfaces and              │  01  DeckForge AI           ──→    │
│ hardware meet.   (serif, ~96px) │      Local AI image generation,    │
│                                 │      previewed on a 3D deck.       │
│ Recent Multimedia & Creative    │      Python · FastAPI · React · …  │
│ Technology graduate … (lead)    │  ──────────────────────────────    │
│                                 │  02  SK8Sense               ──→    │
│ [View selected work] [CV ↓]     │      ESP32 sensors → BLE → app →   │
│ GitHub ↗   hello@…              │      AI coaching.                  │
│                                 │      ESP32 · BLE · React Native …  │
│ ~~~~~~~~~^^^\_/~~~~~~ Trick Trace (smalle strip over volle breedte) ~~│
└──────────────────────────────────────────────────────────────────────┘
```
Kolommen: kop en lead op 1–7, index op 8–12. De Trick Trace staat als strip van 96 px hoog onderaan het eerste scherm.

**Mobiel (390×844)**
```
┌────────────────────────────┐
│ Kylian Algoet     CV↓  ☰   │
│ AI & AUTOMATION / FULLSTACK│
│ I build software           │
│ where AI, interfaces       │
│ and hardware meet. (44px)  │
│ Recent … graduate … (lead) │
│ [View work]  [CV ↓]        │
│ GitHub ↗ · Email           │
│ ~~~~ Trick Trace (64px) ~~~│
│ 01 DeckForge AI       →    │  ← index begint ±75% van het scherm
└────────────────────────────┘
```
Het menu (☰) opent een fullscreen sheet met de vier items en de acties. De focus wordt erin vastgehouden en Esc sluit het.

### Project-plaat (homepage)
Tweekoloms "plaat", afwisselend gespiegeld: links een beeldkader met haarlijn en mono-bijschrift, rechts kicker, titel, samenvatting, "What I built" (4 bullets), feitenstrip en links. Beeld per project:
- **DeckForge:** desktop-screenshot (16:10) van resultaat + 3D-deck, met daarnaast een verticale strip van een gegenereerde decal (1:3). Het 512×1536-formaat is een sterk, eigen beeldelement.
- **SK8Sense:** drie telefoonscreens (9:19.5) in een rij, plus een foto van board en behuizing (4:5).

### Case study-template (beide projecten)
```
Header        Titel (serif) · one-liner · meta-rij: Role / Year / Context / Stack · links: Repository ↗, (Report PDF ↗)
Hero-beeld    Breed (16:9 of 16:10), met mono-bijschrift
Spec strip    4–6 kerngetallen/feiten
01 The question       Probleem en onderzoeksvraag
02 What I built       Systeemoverzicht + architectuurdiagram (inline SVG)
03 Key decisions      3–4 beslissingskaarten: Keuze · Alternatieven · Waarom · Trade-off
04 How it works       Doorloop met beelden / interactief element
05 How I tested it    Wat de tests bewijzen, en wat niet
06 Limits & next      Eerlijke beperkingen + concrete volgende stappen
Footer        "Next project →" + terug naar index
```
Een zijbalk-inhoudsopgave (sticky, vanaf 1200 px) met de zes kopjes; op mobiel valt die weg.

### Playground: creatief werk
- **Index (`/playground`)**: een gemengd grid. Tegel-types met een mono-label: `GAME` (→ eigen pagina), `RENDER` (→ lightbox), `ANIMATION` (→ lightbox met video). Tegels hebben een vaste verhouding per type (game 16:9 en 2 kolommen breed, render 4:5 en 1 kolom), zodat losse en uitgebreide items samen rustig ogen.
- **Uitgebreid project (`/playground/[slug]`)**: compacte variant van de case study: trailer/gameplay-video, 3–6 screenshots, "What it is", "What I made" (jouw rol, tools), "What I learned". Alleen secties waarvoor info bestaat.
- **Losse render**: lightbox (`<dialog>`) met groot beeld, titel, jaar, tool en één zin. Pijltjestoetsen navigeren, Esc sluit.
- Toon: dit is persoonlijk werk. Kop: **"Playground"** [VAST, jouw keuze]. Om het eigen te maken krijgt de sectie een lichte "C"-toets (§3): een losser grid, grotere beelden en mono-labeltape per tegel. De rest van de site blijft strak.

---

## 5. Engelse conceptteksten (op basis van bevestigde feiten)

> **Update 2 nov 2026:** `02-content.md` is leidend voor alle teksten. Het is bijgewerkt met je cv (BeerSecret: Software Development Intern, jan–apr 2026 · afgestudeerd sept 2026 · extra skills Java, Spring Boot, REST APIs, Vue.js, MySQL · talen NL/EN/FR · e-mail + LinkedIn). De teksten hieronder zijn de eerste versie.

> Tekst tussen [ ] = INPUT nodig. Alles hieronder kan Claude Code letterlijk overnemen.

### Hero
- Eyebrow: `AI & AUTOMATION / FULLSTACK DEVELOPER · BELGIUM`
- H1: **I build software where AI, interfaces and hardware meet.**
- Lead: *Recent Multimedia & Creative Technology graduate from Erasmushogeschool Brussel. I'm looking for a junior role as an AI engineer, software developer or fullstack developer.*
- Buttons: `View selected work` · `Download CV (PDF)` · link `GitHub ↗`
- Index 01: **DeckForge AI**, *Locally trained image generation, previewed on an interactive 3D skateboard deck.* `Python · FastAPI · React · Three.js · LoRA`
- Index 02: **SK8Sense**, *A connected skateboard: ESP32 sensors, a React Native app and AI coaching.* `ESP32 · BLE · React Native · Firebase · Claude API`

### Selected work
- H2: **Selected work** · sub: *Two systems I designed, built and tested end to end, on my own.*

**DeckForge AI**, kicker `FULLSTACK · GENERATIVE AI · 3D — 2026`
*A text prompt becomes skateboard deck artwork in one of three trained styles, then appears on an interactive 3D deck before anything is printed. It runs entirely on one laptop GPU: no cloud inference, no third-party image API.*
What I built:
- Three Stable Diffusion 1.5 LoRA style adapters, trained on a 148-image dataset where every item has a recorded licence.
- A FastAPI service with upload validation, a single-flight generation lock and live progress telemetry.
- A React and TypeScript frontend with a Three.js deck preview that maps each result onto the board.
- 528 pytest, 183 Vitest and 38 Playwright tests, running in GitHub Actions CI.

Facts: `3 trained style adapters` · `40 logged experiments` · `17 decision records` · `8 GB VRAM budget`
Links: `Read the case study →` · `Repository ↗`

**SK8Sense**, kicker `HARDWARE · MOBILE · AI COACHING — 2025–26`
*A sensor module under the deck streams motion and foot pressure to a mobile app over Bluetooth Low Energy. Tricks are detected with transparent rules on the board itself; Claude then turns the measured session into short coaching cues.*
What I built:
- ESP32 firmware that reads an MPU6050 motion sensor and four pressure sensors and streams JSON over BLE at around 100 Hz.
- A rule-based trick classifier for ollies, kickflips, heelflips and shove-its, running on the board.
- A React Native app with a live dashboard, practice mode, session summaries and history stored in Firebase.
- A 3D-printed PETG enclosure that mounts between the trucks.

Pull-quote: *"The AI sits in the coaching layer, not the detection layer."*
Facts: `5 trick types` · `4 pressure zones` · `~100 Hz BLE stream` · `Working prototype`

### How I work
- H2: **How I work**
1. **Measure before claiming.** *Every model choice in DeckForge is backed by a logged experiment. I picked the base model because it fits the hardware, and the write-up says so, even though another model scored higher.*
2. **Keep the intelligence explainable.** *SK8Sense detects tricks with rules I can read, test and tune. The language model only comes in afterwards, to turn measured data into coaching.*
3. **Write down what broke.** *Both projects keep a record of what failed and how it was fixed: a GPU driver crash during a demo run, Bluetooth dropping on battery power, a sensor bus that couldn't handle vibration.*

### Experience
- H2: **Experience**
- Row: `[MM YYYY – MM YYYY]` · **[Automation intern]**, BeerSecret · `FareHarbor · Zapier · Odoo`
- *I automated internal booking and operations workflows by connecting FareHarbor, Zapier and Odoo, set up email automations, and wrote handover documentation so the team could keep running the flows after my internship.*

### Playground
- H2: **Playground** · sub: *Games, 3D and other things I make when nobody asked for them.*
- CTA: `See everything in the Playground →`

### More on GitHub (compacte archieflijst, onder Selected work)
- H3: **More on GitHub**
- Rijen (naam · één regel · `↗`): `Morph3D-Prototype` · *[bevestig: "An AI-powered, customizable text-to-3D generator prototype." (uit de GitHub-omschrijving)]* · `SkateTrickAI` · *[INPUT]* · `LiveSkateparkHeatmap` · *[INPUT]* · `AICharacterMaker` · *[INPUT]*
- Stijl: tekstlijst met haarlijnen, mono-jaartal en taal, geen beelden. Duidelijk ondergeschikt aan de twee hoofdprojecten.

### About
- H2: **About**
- *I'm Kylian, a developer based in Belgium. At Erasmushogeschool Brussel I studied Multimedia & Creative Technology, which taught me to move between code, interfaces and physical prototypes. [Both of my final projects started on a skateboard: one generates deck graphics, the other measures what happens when you pop an ollie.] What I enjoy most is the whole path, from a sensor reading or a model output to an interface someone can actually use.*
- **Tools I've used in real projects** (alleen bevestigd):
  - *AI & ML:* Stable Diffusion 1.5, LoRA (PEFT), IP-Adapter, diffusers, PyTorch, Claude API
  - *Backend:* Python, FastAPI, Pydantic, pytest
  - *Frontend:* TypeScript, React, Three.js / React Three Fiber, Vite, Vitest, Playwright
  - *Mobile & data:* React Native (Expo), Zustand, Firebase Auth, Firestore
  - *Hardware:* ESP32, C++ (Arduino / PlatformIO), BLE, I²C sensors, 3D printing
  - *Automation:* Zapier, Odoo, FareHarbor, GitHub Actions
  - *Creative:* Unity, [3D-tool, bv. Blender]
- Education: **Bachelor in Multimedia & Creative Technology**, Erasmushogeschool Brussel, [2026]

### Contact
- H2: **Let's talk.**
- *If you're hiring a junior developer who's comfortable across AI, web and hardware, I'd like to hear from you.*
- `[email]` (met kopieerknop) · `GitHub ↗` · `[LinkedIn ↗]` · `Download CV (PDF)`

### Case study DeckForge AI: kernzinnen per sectie
- One-liner: *A self-trained, locally deployed generator for skateboard deck graphics, with a 3D preview.*
- Meta: Role *Solo — research, ML, backend, frontend* · Year 2026 · Context *Bachelor final project, EhB* · Links: Repository, Research report (PDF, 91 pages)
- **01 The question.** *A customer wants a custom deck graphic but can't draw one, and stock artwork is generic. Can a model trained and run on consumer hardware produce usable, style-consistent deck art from a prompt and an optional reference image?*
- **02 What I built.** Architectuurdiagram: `React + Three.js → FastAPI (one worker) → resident SD 1.5 + LoRA (0.7) + IP-Adapter (0.55) → 512×1536 decal → 3D deck`. Plus de prototypeladder 0–5 als horizontale tijdlijn.
- **03 Key decisions** (kaarten):
  - *SD 1.5 over SDXL.* SDXL scored better, but leaves no room for a LoRA and reference conditioning in 8 GB. Chosen for feasibility, stated as such.
  - *IP-Adapter at 0.55 over img2img.* img2img either ignored the reference or copied it; copy-risk was measured.
  - *Three per-style adapters over one multi-style adapter.* Checkpoints selected on evidence: two styles were better at step 300 than at 600.
  - *One API worker as a correctness requirement.* The single-flight lock is process-local, and a second pipeline doesn't fit in VRAM (~200 MiB spare).
- **04 How it works.** Flow: prompt → style → optional reference → live denoising progress → result on deck → download PNG + JSON sidecar. Optionele 3D-viewer (§7).
- **05 How I tested it.** *528 pytest, 183 Vitest and 38 Playwright tests run in CI on Windows, against a mocked API. No test loads the model, so a green build proves the code, contracts and UI work, not image quality. Real generation is evidenced separately in the experiment registry and GPU validation runs.*
- **06 Limits & next.** Prompt adherence is limited · `retro-poster` is a partial pass · one generation at a time · training isn't bit-reproducible · local only, no hosted demo. Next steps: alleen opnemen wat in `docs/09-final-reflection.md` staat [Claude Code leest dat bestand].

### Case study SK8Sense: kernzinnen per sectie
- One-liner: *A connected skateboard coach: sensors on the board, rules on the chip, coaching in the app.*
- Meta: Role *Solo — hardware, firmware, app, design* · Year 2025–26 · Context *Final Work, EhB* · Link: Repository
- **01 The question.** *The technique behind a trick happens in a fraction of a second. A skater filming themselves can see that an attempt failed, but not why. Can the board itself measure each attempt and turn that into feedback for the next one?*
- **02 What I built.** Diagram: `MPU6050 + 4× FSR → ESP32 (rule-based classifier) → BLE notify (JSON) → React Native app → Firestore · Claude API`. Plus foto's van module, behuizing en montage.
- **03 Key decisions:**
  - *Rules, not a trained model, for detection.* Fast, explainable and tunable on a microcontroller; training a model on real skate data is a next step.
  - *Detect on the board, not in the phone.* The firmware sends its verdict with the data, so the app logs what the board saw.
  - *A boost converter in the power path.* The board's regulator needed more than a LiPo delivers; BLE dropped on battery until an MT3608 was added.
  - *AI only after measurement.* The app turns rotation and landing data into plain verdicts first, so the model doesn't invent its own reading of the numbers.
- **04 How it works.** De **Trick Trace** in volle versie (§6.8) + app-flow in 3 schermen.
- **05 How I tested it.** *Bench-tested with the PlatformIO serial monitor and an Expo dev build, then tried in a real skate session. There is no automated test suite yet.* (Bankcijfers alleen met "measured on the bench" en als jij ze bevestigt.)
- **06 Limits & next.** Working prototype, not a consumer product · Android only · pressure sensors are context, not a classifier · the AI call runs from the app (next: move it behind a backend) · next: a model trained on real skate data, a custom PCB, a water-resistant enclosure, video synced to sensor events.

---

## 6. Designsysteem en interactie

### 6.1 Typografie (alle SIL Open Font License, vrij voor web, self-hosted)
| Rol | Font | Specificatie |
|---|---|---|
| Display / H1 / H2 | **Instrument Serif** (OFL, Google Fonts/Fontsource) | 400 + italic; H1 hero `clamp(2.75rem, 1.6rem + 4.6vw, 6rem)` / lh 1.0 / tracking −0.01em; H2 `clamp(2rem, 1.4rem + 2.2vw, 3.25rem)` / lh 1.05 |
| Tekst, UI, H3 | **Geist** (OFL, Vercel) | body 17px / lh 1.6 / max 68ch; lead 20px / 1.5; H3 600 20px / 1.3 |
| Labels, data, code | **Geist Mono** (OFL) | 12px uppercase / tracking 0.06em; getallen `tabular-nums` |
Italic serif wordt spaarzaam gebruikt voor één nadrukwoord per kop. Minimum tekstgrootte 12px, alleen voor labels.

### 6.2 Kleur (tokens, light + dark)
| Token | Light | Dark | Gebruik |
|---|---|---|---|
| `--paper` | `#F3F1EC` | `#111110` | achtergrond |
| `--paper-2` | `#E8E5DE` | `#1B1B19` | platen, kaarten |
| `--ink` | `#141414` | `#EDEAE3` | tekst |
| `--ink-2` | `#55524C` | `#A7A39A` | secundaire tekst (≥ 4.5:1) |
| `--rule` | `#CFCAC0` | `#2E2D2A` | haarlijnen (geen tekst) |
| `--signal` | `#2337E6` | `#8E9BFF` | links, focus, Trick Trace, actieve staat |
| `--signal-ink` | `#FFFFFF` | `#0B0B14` | tekst op signal |
De accentkleur komt alleen voor bij interactie en data, nooit als vlakvulling in grote oppervlakken. Ultramarijn vormt een complementair contrast met de oranje project-UI's. Contrast wordt gecontroleerd in de bouw (zie acceptatiecriteria). Dark mode volgt `prefers-color-scheme` en de toggle in de footer.

### 6.3 Grid, ruimte, beeld
- 12 kolommen, contentbreedte max 1320px, gutter `clamp(16px, 2vw, 24px)`, zijmarge `clamp(16px, 4vw, 48px)`; lopende tekst max 680px.
- Breakpoints: 640 / 960 / 1200. Spacingschaal (rem): 0.25 · 0.5 · 1 · 1.5 · 2 · 3 · 4 · 6 · 8 · 12. Sectie-afstand `clamp(4rem, 8vw, 8rem)`.
- Beeldverhoudingen: desktop-screenshot 16:10 · case-hero 16:9 · telefoon 9:19.5 · decal 1:3 · render 4:5 · OG 1200×630. Alle beelden krijgen een vaste `aspect-ratio` (geen CLS).
- Beeldkader: 1px `--rule`, 0 radius, mono-bijschrift eronder (`FIG. 02 — Result mapped onto the deck`).

### 6.4 Componenten
- **Button primary:** `--ink` op `--paper`-tekst, hoogte 44px, padding 0 20px, radius 2px; hover: achtergrond `--signal` (160ms). **Secondary:** 1px rand `--ink`, transparant; hover: `--paper-2`.
- **Tekstlink:** onderstreept, offset 0.2em, dikte 1px → 2px + kleur `--signal` bij hover; externe links met `↗` en `rel="noopener"`.
- **Index-rij:** nummer (mono), titel (serif 32px), één regel, tags; hover: de pijl schuift 4px op en de titel krijgt een signal-onderstreping. De hele rij is één link.
- **Project-plaat**, **Spec strip** (mono-label boven en waarde eronder, gescheiden door haarlijnen), **Decision card** (Choice / Alternatives / Why / Trade-off), **Architecture diagram** (inline SVG, tekst als echte tekst), **Figure**, **Playground-tegel**, **Lightbox** (`<dialog>`), **Copy-email-knop** (meldt "Copied" via `aria-live`).
- **Navigatie-staten:** default `--ink-2`, hover `--ink`, actief `--ink` met een 2px-onderlijn, focus een 2px `--signal`-outline met offset 3px. De header schuift bij het scrollen niet weg, maar krijgt na 24px scroll een haarlijn onderaan.

### 6.5 Beweging
- Tokens: `--dur-fast 140ms` (hover) · `--dur-ui 240ms` (menu, lightbox) · `--dur-reveal 560ms` · easing `cubic-bezier(.2,.7,.2,1)`.
- Reveal: secties onder de vouw faden eenmalig in met 12px translateY (IntersectionObserver), gestaggerd met max 60ms. **De hero animeert niet** (behalve de eenmalige trace-draw van 900ms), zodat de inhoud meteen leesbaar is.
- Paginaovergang: Astro view transitions (cross-fade 200ms; de projectplaat-afbeelding morpht naar de case-hero).
- Geen scroll-jacking, geen custom cursor, geen smooth-scroll library.
- `prefers-reduced-motion: reduce`: alle reveals, draw en morph uit; de trace is statisch; de lightbox opent zonder schaal.

### 6.6 Responsive gedrag
- Hero: 7/5-split vanaf 960px; daaronder gestapeld (kop → lead → knoppen → trace → index).
- Project-plaat: 2 kolommen vanaf 960px, gespiegeld per project; mobiel beeld boven tekst, telefoonscreens als horizontale scroll-snap rij.
- Case study: inhoudsopgave-zijbalk vanaf 1200px; beslissingskaarten 2×2 → 1 kolom.
- Playground-grid: 4 → 2 → 1 kolom; game-tegels behouden span 2 tot 640px.
- Touch targets ≥ 44×44px.

### 6.7 3D: wel of niet?
**Besluit [VOORSTEL]: geen 3D op de homepage, wel een optionele viewer op de DeckForge-pagina.**
- Meerwaarde: de interactieve deck-preview *is* een kernonderdeel van DeckForge. Een draaibare deck met je echte gegenereerde decals bewijst dat. Elders is 3D decoratie.
- Implementatie: een poster-afbeelding (render/screenshot) met een knop **"Rotate the deck"**. Pas bij klik wordt `three` dynamisch geladen (vanilla three.js, geen React-runtime nodig). Het deck-mesh wordt bij voorkeur hergebruikt uit je eigen `apps/web/src/deck/deckGeometry.ts` en `textureFit.ts`. Decal-switcher: 3 stijlen.
- Mobiel: dezelfde tap-to-load, één vinger om te draaien en twee om te zoomen, `dpr` max 2, geen schaduwen.
- Zonder WebGL of bij een fout: een statische reeks van drie beelden (vooraanzicht, gedraaid, onderaanzicht) of een korte video (6–8 s loop, zonder audio, met `poster`). Reduced motion: geen auto-rotate.
- Budget: three-chunk alleen on-demand; initiële JS van de pagina blijft < 30 kB gz.

### 6.8 Signatuurdetail: de **Trick Trace**
**Wat:** een lijn-visualisatie van **echte SK8Sense-gyroscoopdata** van één trick (bv. kickflip), getekend en geannoteerd volgens de regels in `firmware/src/main.cpp`.
**Hoe het werkt:**
1. Data: een JSON-bestand met ±1,2 s aan samples op ~100 Hz (`t, gx, gy, gz`), opgenomen met jouw board (zie vraag §10).
2. Weergave: drie lijnen (`gx` flip · `gy` pop · `gz` shuv). Alleen de beslissende lijn krijgt `--signal`, de andere `--ink-2`. Gestippelde drempellijnen: 220 / 150 / 170 °/s.
3. Het **piekvenster** verschijnt als lichte band vanaf het moment dat de gyro-magnitude > 70 °/s is, tot 80 ms rust of 480 ms verstreken.
4. Aan het einde verschijnt een mono-label met de echte regel: `|gx| 512 ≥ 220 and ≥ 1.35 × |gy| → KICKFLIP`.
5. **Hero (compact):** alleen de magnitude-lijn als dunne strip, één keer getekend (900ms) bij laden, met bijschrift `SK8SENSE — KICKFLIP, RECORDED AT ~100 HZ`. Hover of focus toont een cursor met `t` en de waarde.
6. **SK8Sense-pagina (volledig):** toggle `Ollie / Kickflip / Shove-it` (als je drie opnames hebt), scrubben met pointer of pijltjestoetsen, en de stappen lichten op in de lopende tekst.
**Wat het toevoegt:** in één beeld zie je je hardware, je data, je eigen logica en het verschil tussen regelgebaseerde detectie en AI. Het is uniek voor jou (geen generiek "particle"-effect) en loopt als visueel motief door de site: dunne trace-fragmenten als sectiescheiding.
**Toegankelijkheid:** SVG met `role="img"` en een beschrijvende `aria-label`, plus een `<details>` "View the data" met een tabel. Statisch bij reduced motion. Werkt zonder JS (server-gerenderde SVG; JS voegt alleen scrub toe).
**Zonder echte opname:** de compacte versie in de hero valt weg en op de SK8Sense-pagina staat een schematische versie met het label **"Schematic — thresholds from the firmware, not recorded data"**. Nooit nepdata als echt presenteren.

---

## 7. Technische aanpak

**Stack [VOORSTEL, gecontroleerd in officiële docs op 2 nov 2026]:**
- **Astro 7** (huidige major volgens docs.astro.build), static output, TypeScript strict.
- **Content collections** in `src/content.config.ts` met de `glob()`-loader: `work` (MDX, schema met titel, jaar, rol, stack, links, cover, facts[]), `playground` (MD/MDX, schema met type `game|render|animation`, media, tool, jaar), `experience` (YAML). Een nieuw project toevoegen = één MDX-bestand + beelden.
- **MDX** via `@astrojs/mdx`, met componenten (`<Figure>`, `<DecisionCard>`, `<SpecStrip>`, `<ArchDiagram>`, `<TrickTrace>`, `<DeckViewer>`).
- **Beelden** via `astro:assets` `<Picture>` (AVIF/WebP, `widths`/`sizes`, lazy behalve hero); video als `<video muted playsinline loop preload="none" poster>` in H.264 MP4 + WebM.
- **Fonts** via de ingebouwde **Astro Fonts API** (`fonts: [...]` in `astro.config.mjs`, `fontProviders.fontsource()`, `<Font cssVariable preload />`), dus self-hosted zonder externe requests.
- **Styling:** vanilla CSS met custom properties (tokens.css) + Astro-scoped styles. Geen UI-framework. Interactiviteit via kleine TS-scripts/web components; `three` alleen dynamisch geïmporteerd.
- **SEO:** unieke `<title>`/description per pagina, canonical, Open Graph + Twitter-kaart (statische OG-afbeelding per project), JSON-LD `Person` (+ `CreativeWork` per project), `@astrojs/sitemap`, `robots.txt`, `lang="en"`.
- **Kwaliteit:** `astro check`, ESLint/Prettier, Playwright-smoke tests (navigatie, links, lightbox, menu) + `@axe-core/playwright`, Lighthouse CI met budgetten.
- **Deployment:** GitHub-repo → **Vercel** (of Netlify/Cloudflare Pages; het is puur statisch) met preview-deploys per branch. Eigen domein [INPUT].
- **Instructie aan Claude Code:** versies en API's (Astro Fonts API, content collections, view transitions, three) bij de start opnieuw controleren in de officiële docs en niets uit het geheugen aannemen.

**Bouwvolgorde**
1. Project-setup, tokens, fonts, basislayout, header/footer, menu (mobiel), skip-link, dark mode.
2. Content collections + schema's; teksten uit §5 als content invoeren (placeholders gemarkeerd met `TODO(input)`).
3. Homepage-secties 1–7 met echte assets van GitHub (DeckForge-screenshots, SK8Sense-screens).
4. Case study-template + beide case studies (componenten Figure, SpecStrip, DecisionCard, ArchDiagram).
5. Playground-index, detailpagina, lightbox.
6. Trick Trace (eerst schematische/statische SVG, daarna data + interactie).
7. DeckForge 3D-viewer (on-demand) + fallback.
8. SEO, OG-beelden, sitemap, 404, cv-download.
9. Tests, a11y, Lighthouse-budgetten, deploy.

---

## 8. Assets

### Al beschikbaar (Claude Code kan ze uit de repo's halen)
| Asset | Bron | Plek | Essentieel v1 |
|---|---|---|---|
| DeckForge resultaat + deck | `docs/evidence/M11/gpu-validation/screenshots/03-result-and-deck.png` (1440×900) | Home-plaat, case-hero | Ja |
| Deck gedraaid | `…/M11/gpu-validation/screenshots/04-deck-orbited.png` | Case §04, 3D-fallback | Ja |
| UI-states (idle, denoising, succes, error, upload, responsive) | `docs/evidence/prototype-5/screenshots/ui/01…11.jpg` | Case §04/§05 | Ja (3–4 kiezen) |
| Stijl-checkpointsheets | `docs/evidence/prototype-4/final-sheets/*.jpg` | Case §03 | Ja (1–3) |
| Dataset-contactsheets | `docs/evidence/dataset-v1/contact-sheet-*.jpg` | Case §02 | Nee |
| Model-/conditioning-vergelijkingen | `docs/evidence/prototype-1/…`, `prototype-2/…` | Case §03 | Nee |
| Prototype 0-viewer, inverted-UV | `docs/evidence/prototype-0/*.png` | Case §02 tijdlijn | Nee |
| Onderzoeksrapport-PDF | `deliverables/DeckForge-AI-research-report.pdf` | Link in case-header | Ja (link) |
| SK8Sense app-screens | `docs/magazine/screenshots/01_home…06_history.png` (1220×2712) | Home-plaat, case | Ja |
| Enclosure-STL's | `hardware/enclosure/*.stl` | Eventueel render | Nee |

### Nog te maken / aan te leveren door jou
| Asset | Plek | Wat het moet tonen | Formaat | v1? |
|---|---|---|---|---|
| **CV (PDF, Engels)** | Header, hero, contact | Actueel cv | PDF < 1 MB | **Ja** |
| **Portretfoto** (optioneel) | About | Neutraal, natuurlijk licht | 4:5, ≥ 1200×1500 | Nee |
| **Trick-opname(s)** | Hero-trace, SK8Sense §04 | 1 kickflip (+ ollie, shove-it), ~100 Hz `t,gx,gy,gz` | CSV/JSON, ±1,5 s per trick | Ja (anders schematisch) |
| **Foto board + sensormodule** | SK8Sense-plaat, case §02 | Module gemonteerd tussen de trucks, de open behuizing, de FSR-plaatsing | 4:5 en 16:9, ≥ 2000px breed | **Ja** |
| **Korte SK8Sense-video** | SK8Sense case §04 | Trick → detectie verschijnt live in de app (split screen of telefoon in beeld) | 16:9 of 9:16, 8–15 s, zonder audio, ≤ 4 MB | Nee (sterk gewenst) |
| **DeckForge schermopname** | DeckForge case §04 | Prompt → voortgang → resultaat → deck draaien | 16:10, 1440×900, 10–15 s, ≤ 4 MB | Nee (sterk gewenst) |
| **3 losse decal-resultaten** (één per stijl) | Home-plaat, 3D-viewer | Gegenereerde PNG's 512×1536 uit `outputs/` | PNG | **Ja** |
| **Unity-game** | Playground detail + tegel | Titel, genre, jouw rol, tools, jaar, 3–6 screenshots, trailer/gameplay | screens 16:9 ≥ 1920×1080; video 20–45 s | Ja (minstens tegel) |
| **3D-renders** | Playground-grid | Titel, jaar, tool, één zin per render | 4:5 of 16:9, ≥ 2400px lange zijde | Ja (3+) |
| **BeerSecret-gegevens** | Experience | Exacte functietitel, periode | tekst | **Ja** |
| **E-mail en LinkedIn-URL** | Contact, footer, JSON-LD | Adres dat je publiek wil tonen | tekst | **Ja** |
| **Afstudeerjaar / diplomanaam** | About | Exacte titel | tekst | Ja |
| OG-afbeeldingen | Social previews | Titel + beeld per pagina | 1200×630 | Claude Code genereert |

---

## 9. Acceptatiecriteria

**Desktop (1440×900)**
- Boven de vouw zichtbaar: naam, rol, positioneringszin, beide projecten (titel + één regel), cv-link, GitHub-link.
- Elke projectplaat linkt naar de case study en de repo; elke case study heeft de 6 secties (of laat er bewust één weg die niet onderbouwd is).

**Mobiel (390×844 en 360×740)**
- Geen horizontale scroll; menu bereikbaar met toetsenbord en screenreader, focus-trap, Esc sluit.
- Projectindex begint binnen 1 schermhoogte; touch targets ≥ 44px; telefoonscreens als scroll-snap rij.

**Toegankelijkheid (WCAG 2.2 AA)**
- Tekstcontrast ≥ 4.5:1 (groot ≥ 3:1) in light én dark; zichtbare focus overal; skip-link; logische heading-volgorde (één H1 per pagina).
- Alle beelden met zinvolle `alt`; decoratieve `alt=""`; video zonder autoplay met geluid; Trick Trace en diagrammen met tekstalternatief.
- `prefers-reduced-motion` respecteert §6.5; axe-scan zonder serious/critical issues.

**Snelheid en kwaliteit**
- Core Web Vitals ("good" volgens web.dev, p75): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Lighthouse mobiel ≥ 95 voor Performance, Accessibility, Best Practices en SEO op home en case studies.
- Home: initiële JS ≤ 30 kB gz; geen WebGL; fonts preload alleen voor display + body; hero-beeld ≤ 200 kB.
- DeckForge-pagina: `three` laadt pas na klik; zonder WebGL een werkende fallback.
- Alle externe links werken; `astro check` en Playwright-tests groen in CI.

**Inhoud**
- Geen verzonnen ervaring, cijfers, klanten of skills. Elk getal is herleidbaar naar de repo of jouw input. Open plekken zijn gemarkeerd met `TODO(input)` en staan niet live.

---

## 10. Beantwoorde vragen [VAST]
1. **Trickdata:** jij neemt 1–3 tricks op → de Trick Trace is echt en komt ook in de hero. Opname-instructie: log tijdelijk *elke* sample (bv. `Serial.printf("%lu,%.1f,%.1f,%.1f\n", millis(), gx, gy, gz)` in de loop, of sla de BLE-stream in de app op), doe 1 trick per opname met ±0,5 s rust ervoor en erna, en bewaar het CSV. Noteer de trick en of de firmware hem correct herkende.
2. **Rol:** beide projecten volledig solo → "Role: Solo" op beide case studies.
3. **Creatieve sectie:** "Playground".
4. **Andere repo's:** ja, als korte archieflijst "More on GitHub" (je levert per repo één correcte regel).

---

## 11. Bijbehorende bestanden

| Bestand | Inhoud |
|---|---|
| `01-handoff.md` | Dit document: onderzoek, richting, structuur, designsysteem, assets, acceptatiecriteria |
| `02-content.md` | Alle Engelse teksten als copy-deck; Claude Code neemt ze letterlijk over |
| `03-claude-code-startprompt.md` | De startprompt voor Claude Code + checklist van mee te geven bestanden |
| Conceptbord (Artifact-link) | Visueel voorstel: hero desktop/mobiel, typografie, kleur, projectplaat, Trick Trace |

**Wat nog van jou moet komen voor v1** (zie §8): SK8Sense-screenshots van live dashboard, session summary en history (de repo bevat alleen twee varianten van het homescherm), 3 decal-PNGs, fotos van board en module, trick-opname(s), Playground-media en -info (incl. 3D-tool), één regel per repo voor "More on GitHub". Cv, contact, stage en opleiding zijn binnen.
