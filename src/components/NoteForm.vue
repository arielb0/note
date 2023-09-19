<template>
  <q-form>
    <q-input placeholder="Title" v-model="notes.title" borderless />
    <q-input placeholder="Tags" v-model="notes.tags" borderless />
    <q-input
      placeholder="Body"
      v-model="notes.body"
      type="textarea"
      flat
      borderless
      rows="20"
    />
  </q-form>
</template>

<script setup>
import { useNotesStore } from 'stores/notes';

/**
 * Note store.
 */
const notes = useNotesStore();
</script>

<style scoped></style>
