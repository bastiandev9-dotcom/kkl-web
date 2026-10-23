import * as THREE from 'three';
import { disposeObject } from './dispose';

export interface HeroSceneHandle {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGLRenderer;
  readonly spin: THREE.Group;
  readonly tilt: THREE.Group;
  resize: () => boolean;
  render: () => void;
  dispose: () => void;
}

function createBlobShadow() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  const context = canvas.getContext('2d');

  if (context) {
    const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(26, 26, 26, 0.42)');
    gradient.addColorStop(0.55, 'rgba(26, 26, 26, 0.14)');
    gradient.addColorStop(1, 'rgba(26, 26, 26, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    opacity: 0.55,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 3.5), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.008;

  return mesh;
}

export function createHeroScene(container: HTMLElement): HeroSceneHandle {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(3.8, 2.7, 6.3);
  camera.lookAt(0, 0.8, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const ambient = new THREE.HemisphereLight(0xffffff, 0x9aa58f, 2.3);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xfff4de, 3.1);
  key.position.set(4, 6, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xd9f18a, 1.15);
  fill.position.set(-4, 2, -3);
  scene.add(fill);

  const platformMaterial = new THREE.MeshStandardMaterial({
    color: 0xeef3ed,
    roughness: 1,
  });
  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(2.35, 2.35, 0.12, 64),
    platformMaterial,
  );
  platform.position.y = -0.06;
  scene.add(platform);

  const shadow = createBlobShadow();
  scene.add(shadow);

  const tilt = new THREE.Group();
  const spin = new THREE.Group();
  tilt.add(spin);
  scene.add(tilt);
  spin.rotation.y = -0.35;

  let disposed = false;

  const resize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) {
      return false;
    }

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    return true;
  };

  const render = () => {
    if (!disposed) {
      renderer.render(scene, camera);
    }
  };

  resize();

  return {
    scene,
    camera,
    renderer,
    spin,
    tilt,
    resize,
    render,
    dispose: () => {
      if (disposed) {
        return;
      }

      disposed = true;
      disposeObject(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
