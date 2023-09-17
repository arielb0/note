<template>
  <q-btn
    flat
    rounded
    icon="arrow_back"
    @click="props.warnUser ? showBackConfirmationDialog() : back()"
  />
</template>

<script setup lang="ts">
import { useRouter, RouteLocationRaw } from 'vue-router';
import { useNotesStore } from 'src/stores/notes';
import { useQuasar } from 'quasar';

const router = useRouter();
const quasar = useQuasar();
const notes = useNotesStore();

/**
 * Vue component properties.
 */
const props = defineProps<{
  warnUser: boolean;
  route: RouteLocationRaw;
}>();

/**
 * Logic to show back confirmation dialog.
 */
function showBackConfirmationDialog() {
  quasar
    .dialog({
      title: 'Are you sure?',
      message: 'Any changes will be lost. Are you sure?',
      cancel: true,
    })
    .onOk(() => {
      back();
    });
}

/**
 * Handler for back to list notes page button
 */
function back() {
  notes.clean();
  router.push(props.route);
}
</script>
