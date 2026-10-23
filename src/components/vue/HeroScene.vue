<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { models } from '../../data/models';
import type { HeroSceneHandle } from '../../three/createScene';

const props = defineProps<{
  model: string;
}>();

const entry = computed(() => models.find((model) => model.key === props.model));
const poster = computed(() => entry.value?.poster ?? '');
const host = ref<HTMLDivElement | null>(null);
const status = ref<'loading' | 'ready' | 'fallback'>('loading');

let scene: HeroSceneHandle | undefined;
let resizeObserver: ResizeObserver | undefined;
let intersectionObserver: IntersectionObserver | undefined;
let motionQuery: MediaQueryList | undefined;
let mounted = false;
let running = false;
let reduceMotion = false;
let inView = false;
let pageVisible = true;
let animationFrame = 0;
let lastTime = 0;
let targetTiltX = 0;
let targetTiltZ = 0;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function onPointerMove(event: PointerEvent) {
  if (!scene || status.value !== 'ready' || reduceMotion || event.pointerType === 'touch') {
    return;
  }

  const bounds = host.value?.getBoundingClientRect();

  if (!bounds || bounds.width === 0 || bounds.height === 0) {
    return;
  }

  const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

  targetTiltZ = clamp(-x * 0.12, -0.16, 0.16);
  targetTiltX = clamp(y * 0.1, -0.14, 0.14);
}

function resetTilt() {
  targetTiltX = 0;
  targetTiltZ = 0;
}

function tick(time: number) {
  if (!running || !scene) {
    return;
  }

  animationFrame = requestAnimationFrame(tick);
  const delta = Math.min((time - lastTime) / 1000, 0.05);
  lastTime = time;

  const ease = 1 - Math.exp(-delta * 6);
  scene.spin.rotation.y += delta * 0.15;
  scene.tilt.rotation.x += (targetTiltX - scene.tilt.rotation.x) * ease;
  scene.tilt.rotation.z += (targetTiltZ - scene.tilt.rotation.z) * ease;
  scene.render();
}

function start() {
  if (!scene || running || reduceMotion || !inView || !pageVisible) {
    return;
  }

  running = true;
  lastTime = performance.now();
  animationFrame = requestAnimationFrame(tick);
}

function stop() {
  running = false;
  cancelAnimationFrame(animationFrame);
  animationFrame = 0;
}

function syncPlayback() {
  if (!scene || status.value !== 'ready') {
    return;
  }

  if (reduceMotion) {
    stop();
    scene.render();
    return;
  }

  if (inView && pageVisible) {
    start();
  } else {
    stop();
  }
}

function onVisibilityChange() {
  pageVisible = !document.hidden;
  syncPlayback();
}

function onMotionChange(event: MediaQueryListEvent) {
  reduceMotion = event.matches;
  syncPlayback();
}

function onContainerResize() {
  if (!scene) {
    return;
  }

  const sized = scene.resize();

  if (sized && (reduceMotion || !running)) {
    scene.render();
  }
}

function releaseScene() {
  stop();
  scene?.dispose();
  scene = undefined;
}

function fail() {
  releaseScene();
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  status.value = 'fallback';
}

onMounted(async () => {
  mounted = true;
  const container = host.value;
  const current = entry.value;

  if (!container || !current) {
    status.value = 'fallback';
    return;
  }

  const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };
  const lowMemory =
    navigatorWithMemory.deviceMemory !== undefined && navigatorWithMemory.deviceMemory <= 2;
  const lowCores =
    navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2;

  if (lowMemory || lowCores) {
    status.value = 'fallback';
    return;
  }

  pageVisible = !document.hidden;
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduceMotion = motionQuery.matches;
  motionQuery.addEventListener('change', onMotionChange);
  document.addEventListener('visibilitychange', onVisibilityChange);

  try {
    const [{ createHeroScene }, { loadModel }] = await Promise.all([
      import('../../three/createScene'),
      import('../../three/loadModel'),
    ]);

    if (!mounted) {
      return;
    }

    scene = createHeroScene(container);

    resizeObserver = new ResizeObserver(onContainerResize);
    resizeObserver.observe(container);

    intersectionObserver = new IntersectionObserver(
      ([record]) => {
        inView = record?.isIntersecting ?? false;
        syncPlayback();
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const loaded = await loadModel(current);

    if (!mounted) {
      loaded?.dispose();
      releaseScene();
      return;
    }

    if (!loaded) {
      fail();
      return;
    }

    scene.spin.add(loaded.object);
    status.value = 'ready';
    scene.resize();
    scene.render();
    syncPlayback();
  } catch {
    fail();
  }
});

onBeforeUnmount(() => {
  mounted = false;
  stop();
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  motionQuery?.removeEventListener('change', onMotionChange);
  document.removeEventListener('visibilitychange', onVisibilityChange);
  releaseScene();
});
</script>

<template>
  <div
    class="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-[radial-gradient(circle_at_50%_38%,#f8faf6_0%,#eef3ed_58%,#dfeadd_100%)]"
    :data-status="status"
    aria-hidden="true"
  >
    <div
      ref="host"
      class="absolute inset-0 transition-opacity duration-300"
      :class="status === 'ready' ? 'opacity-100' : 'opacity-0'"
      @pointermove="onPointerMove"
      @pointerleave="resetTilt"
    ></div>

    <img
      v-if="status === 'fallback' && poster"
      :src="poster"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />

    <span
      v-if="status === 'fallback' && poster"
      class="absolute bottom-3 left-3 rounded-pill bg-canvas/85 px-3 py-1 text-xs font-medium text-fg-muted backdrop-blur-sm"
    >
      Ilustrasi 2D
    </span>

    <div v-if="status === 'loading'" class="absolute inset-0 grid place-items-center">
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
        <p class="mt-3 text-xs text-fg-muted">Menyiapkan visual 3D...</p>
      </div>
    </div>

    <div
      v-else-if="status === 'fallback' && !poster"
      class="absolute inset-0 grid place-items-center"
    >
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
        <p class="mt-3 text-xs text-fg-muted">Tampilan 3D belum tersedia</p>
      </div>
    </div>
  </div>
</template>
