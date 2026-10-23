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
    <div class="absolute inset-0 bg-fg/30 backdrop-blur-sm" aria-hidden="true" @click="close"></div>
    <div class="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col bg-canvas shadow-xl">
      <div class="flex h-16 items-center justify-between border-b border-line px-5">
        <span class="text-sm font-semibold text-fg">Menu</span>
        <button
          ref="closeButton"
          type="button"
          class="grid h-10 w-10 place-items-center rounded-md border border-line text-fg"
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

      <nav class="flex-1 overflow-y-auto px-5 py-6" aria-label="Navigasi seluler">
        <ul class="space-y-1">
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="block rounded-md px-3 py-3 text-base font-medium text-fg hover:bg-surface"
              @click="close"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="border-t border-line p-5">
        <a
          href="#agenda"
          class="flex items-center justify-center rounded-pill bg-brand px-4 py-3 text-sm font-medium text-on-brand hover:bg-brand-hover"
          @click="close"
        >
          Lihat agenda
        </a>
      </div>
    </div>
  </div>
</template>
