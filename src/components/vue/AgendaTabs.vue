<script setup lang="ts">
import { nextTick, ref } from 'vue';
import type { Hari } from '../../data/agenda';
import { activityMeta } from '../../lib/activity';
import { roman } from '../../lib/format';

const props = defineProps<{
  days: Hari[];
}>();

const active = ref<Hari['nomor']>(1);
const tabList = ref<HTMLDivElement | null>(null);

async function focusTab(index: number) {
  await nextTick();
  const tabs = tabList.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  tabs?.[index]?.focus();
}

function onKeydown(event: KeyboardEvent, index: number) {
  const last = props.days.length - 1;
  let nextIndex = index;

  if (event.key === 'ArrowRight') {
    nextIndex = index === last ? 0 : index + 1;
  } else if (event.key === 'ArrowLeft') {
    nextIndex = index === 0 ? last : index - 1;
  } else if (event.key === 'Home') {
    nextIndex = 0;
  } else if (event.key === 'End') {
    nextIndex = last;
  } else {
    return;
  }

  event.preventDefault();
  const day = props.days[nextIndex];

  if (!day) {
    return;
  }

  active.value = day.nomor;
  void focusTab(nextIndex);
}
</script>

<template>
  <div ref="tabList" class="grid grid-cols-5 gap-1.5 sm:gap-2.5" role="tablist" aria-label="Pilih hari agenda">
    <button
      v-for="(day, index) in days"
      :id="`tab-hari-${day.nomor}`"
      :key="day.nomor"
      type="button"
      role="tab"
      :aria-selected="active === day.nomor"
      :aria-controls="`panel-hari-${day.nomor}`"
      :tabindex="active === day.nomor ? 0 : -1"
      :class="[
        'rounded-2xl border px-1.5 py-3 text-center transition-all duration-200 sm:px-3 sm:py-4',
        active === day.nomor
          ? 'border-brand bg-brand text-on-brand shadow-md'
          : 'border-line bg-canvas text-fg-muted hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand',
      ]"
      @click="active = day.nomor"
      @keydown="onKeydown($event, index)"
    >
      <span class="block text-[10px] font-semibold uppercase tracking-wider sm:text-xs">
        Hari {{ roman(day.nomor) }}
      </span>
      <span class="mt-1 block text-xs font-semibold sm:text-sm">{{ day.hariLabel }}</span>
      <span class="mt-0.5 block text-[10px] opacity-75 sm:text-[11px]">{{ day.tanggal }}</span>
    </button>
  </div>

  <div
    v-for="day in days"
    v-show="active === day.nomor"
    :id="`panel-hari-${day.nomor}`"
    :key="`panel-${day.nomor}`"
    role="tabpanel"
    :aria-labelledby="`tab-hari-${day.nomor}`"
    tabindex="0"
    class="mt-6 scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-canvas shadow-soft"
  >
    <header class="flex flex-col gap-3 border-b border-line bg-surface px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
      <div class="flex items-center gap-4">
        <span
          class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand font-mono text-sm text-on-brand"
          aria-hidden="true"
        >
          {{ String(day.nomor).padStart(2, '0') }}
        </span>
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{{ day.judul }}</p>
          <h3 class="mt-1 text-h4 text-fg">{{ day.hariLabel }}</h3>
        </div>
      </div>
      <span class="self-start rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-fg-muted sm:self-auto">
        {{ day.zona }}
      </span>
    </header>

    <ol class="divide-y divide-line">
      <li
        v-for="(item, itemIndex) in day.item"
        :key="`${day.nomor}-${itemIndex}`"
        class="grid grid-cols-[5.25rem_1fr] gap-x-3 gap-y-2 px-5 py-4 transition-colors hover:bg-surface/60 sm:grid-cols-[7rem_1fr_auto] sm:items-start sm:px-7"
      >
        <span class="whitespace-nowrap pt-0.5 text-[13px] font-semibold tabular-nums text-brand sm:text-sm">
          {{ item.jam }}
        </span>
        <div class="min-w-0">
          <p class="text-sm font-medium text-fg">{{ item.kegiatan }}</p>
          <p v-if="item.lokasi" class="mt-1 text-xs text-fg-muted">{{ item.lokasi }}</p>
        </div>
        <div class="col-start-2 sm:col-start-3 sm:justify-self-end">
          <span
            :class="[
              'inline-flex items-center whitespace-nowrap rounded-pill border px-3 py-1 text-xs font-medium',
              activityMeta[item.jenis].className,
            ]"
          >
            {{ activityMeta[item.jenis].label }}
          </span>
        </div>
      </li>
    </ol>
  </div>
</template>
