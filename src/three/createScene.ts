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
