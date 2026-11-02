import {
  AmbientLight,
  CanvasTexture,
  Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  SRGBColorSpace,
  Scene,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DECK_LENGTH, DECK_WIDTH, createDeckGeometry } from "./deckGeometry";

// The DeckForge preview, rebuilt in plain three.js so this page doesn't need React.
// Loaded with a dynamic import only after the visitor asks for it.

/** Camera, lights and materials match DeckForge's DeckViewer.tsx. */
const CAMERA_START = [1.5, -2.1, 2.4] as const;
const BARE_DECK = "#b9b4ab";
const GRIP = "#242424";
/** The longest side a visitor's own image is drawn at before it becomes a texture. */
const MAX_UPLOAD_SIDE = 2048;

export interface DeckScene {
  /** Puts an image on the decal face; returns how much it is stretched along the deck. */
  showImage(source: string | File): Promise<number>;
  reset(): void;
  dispose(): void;
}

/** DeckForge's default fit (DR-012): fill the whole surface and say how much that stretches. */
export function stretchFor(width: number, height: number) {
  return DECK_LENGTH / DECK_WIDTH / (height / width);
}

export function mountDeck(container: HTMLElement, { autoRotate }: { autoRotate: boolean }): DeckScene {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.append(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(...CAMERA_START);

  scene.add(new AmbientLight(0xffffff, 0.9));
  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(4, -6, 5);
  const fill = new DirectionalLight(0xffffff, 0.7);
  fill.position.set(-4, 6, -3);
  scene.add(key, fill);

  const decalFace = new MeshStandardMaterial({ color: BARE_DECK, roughness: 0.55 });
  const topAndRim = new MeshStandardMaterial({ color: GRIP, roughness: 0.95 });
  const geometry = createDeckGeometry();
  scene.add(new Mesh(geometry, [decalFace, topAndRim]));

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.minDistance = 1.2;
  controls.maxDistance = 8;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = 1.2;
  controls.addEventListener("start", () => (controls.autoRotate = false));
  controls.saveState();

  // Let the page scroll over the deck; zoom only with a pinch or Ctrl/⌘ + scroll.
  container.addEventListener(
    "wheel",
    (event) => {
      if (!event.ctrlKey && !event.metaKey) event.stopPropagation();
    },
    { capture: true },
  );

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  // Only render while the deck is on screen.
  const tick = () => {
    controls.update();
    renderer.render(scene, camera);
  };
  const visibility = new IntersectionObserver(([entry]) => renderer.setAnimationLoop(entry.isIntersecting ? tick : null));
  visibility.observe(container);

  let texture: Texture | null = null;

  const apply = (next: Texture, width: number, height: number) => {
    next.colorSpace = SRGBColorSpace;
    next.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    texture?.dispose();
    texture = next;
    decalFace.map = next;
    decalFace.color = new Color("#ffffff");
    decalFace.needsUpdate = true;
    return stretchFor(width, height);
  };

  return {
    async showImage(source) {
      if (typeof source === "string") {
        const loaded = await new TextureLoader().loadAsync(source);
        const image = loaded.image as HTMLImageElement;
        return apply(loaded, image.naturalWidth, image.naturalHeight);
      }

      // A visitor's own file: decoded and drawn in the browser, never uploaded anywhere.
      const url = URL.createObjectURL(source);
      try {
        const image = new Image();
        image.src = url;
        await image.decode();
        const scale = Math.min(1, MAX_UPLOAD_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.naturalWidth * scale);
        canvas.height = Math.round(image.naturalHeight * scale);
        canvas.getContext("2d")!.drawImage(image, 0, 0, canvas.width, canvas.height);
        return apply(new CanvasTexture(canvas), canvas.width, canvas.height);
      } finally {
        URL.revokeObjectURL(url);
      }
    },
    reset() {
      controls.reset();
      controls.autoRotate = false;
    },
    dispose() {
      renderer.setAnimationLoop(null);
      visibility.disconnect();
      resizeObserver.disconnect();
      controls.dispose();
      texture?.dispose();
      geometry.dispose();
      decalFace.dispose();
      topAndRim.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
