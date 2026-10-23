<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    to: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
  }>(),
  {
    duration: 1100,
    prefix: '',
    suffix: '',
  },
);

const element = ref<HTMLSpanElement | null>(null);
const value = ref(props.to);
const formatted = computed(() => `${props.prefix}${value.value}${props.suffix}`);

let animationFrame = 0;
let observer: IntersectionObserver | null = null;

function animate() {
  value.value = 0;
  const started = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - started) / props.duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    value.value = Math.round(props.to * eased);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(tick);
    }
  };

  animationFrame = requestAnimationFrame(tick);
}

onMounted(() => {
  if (!element.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  observer = new IntersectionObserver(
    ([record]) => {
      if (record?.isIntersecting) {
        observer?.disconnect();
        animate();
      }
    },
    { threshold: 0.4 },
  );

  observer.observe(element.value);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
  observer?.disconnect();
});
</script>

<template>
  <span ref="element" class="tabular-nums">{{ formatted }}</span>
</template>
