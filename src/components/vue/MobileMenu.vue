<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

defineProps<{
  links: { href: string; label: string }[];
}>();

const open = ref(false);
const closeButton = ref<HTMLButtonElement | null>(null);
let toggleButton: HTMLElement | null = null;
let desktopQuery: MediaQueryList | null = null;

function close() {
  open.value = false;
}

function toggle() {
  open.value = !open.value;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    close();
  }
}

function onDesktop(event: MediaQueryListEvent | MediaQueryList) {
  if (event.matches && open.value) {
    close();
  }
}

onMounted(() => {
  toggleButton = document.querySelector('[data-menu-toggle]');
  toggleButton?.addEventListener('click', toggle);
  document.addEventListener('keydown', onKeydown);

  desktopQuery = window.matchMedia('(min-width: 1024px)');
  desktopQuery.addEventListener('change', onDesktop);
});

onBeforeUnmount(() => {
  toggleButton?.removeEventListener('click', toggle);
  document.removeEventListener('keydown', onKeydown);
  desktopQuery?.removeEventListener('change', onDesktop);
  document.body.style.overflow = '';
});

watch(open, async (value) => {
  document.body.style.overflow = value ? 'hidden' : '';
  toggleButton?.setAttribute('aria-expanded', String(value));

  if (value) {
    await nextTick();
    closeButton.value?.focus();
  } else {
    toggleButton?.focus();
  }
});
</script>

<template>
  <div
    v-show="open"
    id="menu-seluler"
    class="fixed inset-0 z-50 lg:hidden"
    role="dialog"
    aria-modal="true"
    aria-label="Menu navigasi"
  >
    <div class="absolute inset-0 bg-fg/35 backdrop-blur-sm" aria-hidden="true" @click="close"></div>
    <div
      class="absolute inset-y-0 right-0 flex w-[min(22rem,90vw)] flex-col border-l border-line bg-canvas shadow-floating"
    >
      <div class="flex h-20 items-center justify-between border-b border-line px-6">
        <span class="text-lg font-black tracking-[0.08em] text-brand">KARYAWISATA</span>
        <button
          ref="closeButton"
          type="button"
          class="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg"
          aria-label="Tutup menu"
          @click="close"
        >
          <svg
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18"></path>
          </svg>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto px-4 py-6" aria-label="Navigasi seluler">
        <ul class="space-y-1">
          <li v-for="(link, index) in links" :key="link.href">
            <a
              :href="link.href"
              :aria-current="index === 0 ? 'page' : undefined"
              :class="[
                'flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors',
                index === 0 ? 'bg-brand-subtle text-brand' : 'text-fg hover:bg-surface',
              ]"
              @click="close"
            >
              {{ link.label }}
              <span class="text-xs tabular-nums text-fg-subtle">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="border-t border-line p-5">
        <a
          href="#model-3d"
          class="flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-3.5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover"
          @click="close"
        >
          Jelajah 3D
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </a>
        <p class="mt-4 text-center text-[11px] text-fg-subtle">KKL Informatika UPGRIS 2026</p>
      </div>
    </div>
  </div>
</template>
