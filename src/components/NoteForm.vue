<template>
  <q-form>
    <q-input placeholder="Title" v-model="notes.title" borderless />
    <q-input placeholder="Tags" v-model="notes.tags" borderless />
    <q-input
      placeholder="Body"
      v-model="notes.body"
      type="textarea"
      borderless
    />
  </q-form>
</template>

<script setup>
import { useNotesStore } from 'stores/notes';

const notes = useNotesStore();
</script>

<style scoped></style>
