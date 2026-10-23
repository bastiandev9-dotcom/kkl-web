<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type * as Three from 'three';
import { models } from '../../data/models';

const props = defineProps<{
  model: string;
}>();

const host = ref<HTMLDivElement | null>(null);
const status = ref<'loading' | 'ready' | 'fallback'>('loading');

type ThreeNamespace = typeof Three;

function createMeru(THREE: ThreeNamespace): Three.Group {
  const group = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: 0xd8d2c4, roughness: 0.85 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x7d4b32, roughness: 0.8 });
  const thatch = new THREE.MeshStandardMaterial({ color: 0x3d4a3a, roughness: 0.95 });

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.3, 2), stone);
  base.position.y = 0.15;
  group.add(base);

  let y = 0.3;

  for (let index = 0; index < 7; index += 1) {
    const width = 1.7 - index * 0.16;
    const depth = 1.3 - index * 0.12;
    const bodyHeight = 0.3;

    const body = new THREE.Mesh(new THREE.BoxGeometry(width, bodyHeight, depth), wood);
    body.position.y = y + bodyHeight / 2;
    group.add(body);
    y += bodyHeight;

    const roof = new THREE.Mesh(new THREE.ConeGeometry(width * 0.82, 0.28, 4), thatch);
    roof.position.y = y + 0.14;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);
    y += 0.28;
  }

  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, 0.5, 8), stone);
  spire.position.y = y + 0.25;
  group.add(spire);

  return group;
}

function createCandiBentar(THREE: ThreeNamespace): Three.Group {
  const group = new THREE.Group();
  const brick = new THREE.MeshStandardMaterial({ color: 0x9b5a3c, roughness: 0.9 });
  const stone = new THREE.MeshStandardMaterial({ color: 0xd8d2c4, roughness: 0.9 });

  const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.25, 1.2), stone);
  base.position.y = 0.125;
  group.add(base);

  const buildSide = (x: number) => {
    let y = 0.25;

    for (let index = 0; index < 4; index += 1) {
      const width = 0.9 - index * 0.1;
      const height = 0.5 - index * 0.05;

      const block = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.9 - index * 0.08), brick);
      block.position.set(x, y + height / 2, 0);
      group.add(block);
      y += height + 0.03;
    }

    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), stone);
    cap.position.set(x, y + 0.175, 0);
    group.add(cap);
  };

  buildSide(-1.15);
  buildSide(1.15);

  const step = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.18, 0.9), stone);
  step.position.y = 0.09;
  group.add(step);

  return group;
}

function disposeObject(THREE: ThreeNamespace, root: Three.Object3D) {
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];

    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value && typeof value === 'object' && 'isTexture' in value) {
          (value as Three.Texture).dispose();
        }
      }

      material.dispose();
    }
  });
}

let cleanup: (() => void) | undefined;

onMounted(async () => {
  const container = host.value;

  if (!container) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };
  const lowMemory =
    navigatorWithMemory.deviceMemory !== undefined && navigatorWithMemory.deviceMemory <= 2;
  const lowCores =
    navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2;

  if (lowMemory || lowCores) {
    status.value = 'fallback';
    return;
  }

  const entry = models.find((model) => model.key === props.model);

  if (!entry?.file) {
    status.value = 'fallback';
    return;
  }

  try {
    const THREE = await import('three');
    const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(3.8, 2.6, 6.2);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.HemisphereLight(0xffffff, 0x9aa58f, 2.2);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(4, 6, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xd9f18a, 1.2);
    fill.position.set(-4, 2, -3);
    scene.add(fill);

    const platformMaterial = new THREE.MeshStandardMaterial({ color: 0xeef3ed, roughness: 1 });
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 0.12, 64), platformMaterial);
    platform.position.y = -0.06;
    scene.add(platform);

    let animationFrame = 0;
    let lastTime = performance.now();
    let visible = true;
    let disposed = false;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      if (reduceMotion) {
        renderer.render(scene, camera);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const intersectionObserver = new IntersectionObserver(
      ([record]) => {
        visible = record?.isIntersecting ?? false;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      visible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const tick = (time: number) => {
      if (disposed) {
        return;
      }

      animationFrame = requestAnimationFrame(tick);
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (visible) {
        root.rotation.y += delta * 0.18;
        renderer.render(scene, camera);
      }
    };

    const dispose = () => {
      if (disposed) {
        return;
      }

      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      disposeObject(THREE, root);
      platform.geometry.dispose();
      platformMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };

    cleanup = dispose;

    const place = (object: Three.Object3D) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = maxDimension > 0 ? 2.6 / maxDimension : 1;

      object.scale.setScalar(scale);
      object.updateMatrixWorld(true);

      const fitted = new THREE.Box3().setFromObject(object);
      object.position.x -= (fitted.min.x + fitted.max.x) / 2;
      object.position.z -= (fitted.min.z + fitted.max.z) / 2;
      object.position.y -= fitted.min.y;

      root.add(object);
      status.value = 'ready';

      if (reduceMotion) {
        renderer.render(scene, camera);
      } else {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    const fallback = () => {
      if (disposed) {
        return;
      }

      if (entry.fallback === 'procedural' && entry.proceduralId) {
        place(
          entry.proceduralId === 'candiBentar'
            ? createCandiBentar(THREE)
            : createMeru(THREE),
        );
        return;
      }

      cleanup?.();
      status.value = 'fallback';
    };

    const loader = new GLTFLoader();
    loader.load(
      entry.file,
      (gltf) => {
        if (disposed) {
          return;
        }

        const object = gltf.scene;
        object.rotation.y = entry.rotationY ?? 0;
        place(object);
      },
      undefined,
      fallback,
    );
  } catch {
    status.value = 'fallback';
  }
});

onBeforeUnmount(() => {
  cleanup?.();
});
</script>

<template>
  <div
    class="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface"
    aria-hidden="true"
  >
    <div
      ref="host"
      class="absolute inset-0 transition-opacity duration-300"
      :class="status === 'ready' ? 'opacity-100' : 'opacity-0'"
    ></div>

    <div v-if="status !== 'ready'" class="absolute inset-0 grid place-items-center">
      <div class="px-6 text-center">
        <svg
          class="mx-auto h-16 w-16 text-brand/45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 20h18L14 9l-3 5-2-3-6 9Z"></path>
          <path d="M7 20v-4M17 20v-4"></path>
        </svg>
        <p class="mt-3 text-xs text-fg-muted">
          {{ status === 'loading' ? 'Memuat model 3D...' : 'Tampilan 3D belum tersedia' }}
        </p>
      </div>
    </div>
  </div>
</template>
