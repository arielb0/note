<template>
  <q-page padding>
    <q-toolbar>
      <q-btn-group actions>
        <BackButton warnUser :route="{ name: 'listNotes' }" />
        <q-btn actions label="Update" @click="notes.update()" />
      </q-btn-group>
    </q-toolbar>
    <NoteForm />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNotesStore } from 'src/stores/notes';

import NoteForm from 'src/components/NoteForm.vue';
import BackButton from 'src/components/BackButton.vue';

const route = useRoute();
const notes = useNotesStore();

onMounted(() => {
  notes.read(Number.parseInt(route.params.id as string));
});
</script>

<style scoped></style>
