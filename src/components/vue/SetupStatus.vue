<script setup lang="ts">
import { ref } from 'vue';

const active = ref(false);
</script>

<template>
  <div class="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-4">
    <span class="inline-flex h-2.5 w-2.5 rounded-full bg-success" aria-hidden="true"></span>
    <p class="text-sm text-fg-muted">Vue island terhubung.</p>
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-pill border border-line-strong bg-canvas px-4 py-2 text-sm font-medium text-fg transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-none focus-visible:shadow-focus"
      @click="active = !active"
    >
      {{ active ? 'Interaksi aktif' : 'Cek interaksi' }}
    </button>
  </div>
</template>
