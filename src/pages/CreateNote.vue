<template>
  <q-page padding>
    <q-header elevated>
      <q-toolbar>
        <BackButton :warnUser="noteHasChanged" :route="{ name: 'listNotes' }" />
        <q-space />
        <q-btn icon="save" flat rounded @click="createNote" />
      </q-toolbar>
    </q-header>
    <NoteForm />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import NoteForm from 'src/components/NoteForm.vue';
import BackButton from 'src/components/BackButton.vue';
import { useNotesStore } from 'stores/notes';
import { useRouter } from 'vue-router';

const router = useRouter();
const notes = useNotesStore();

/**
 * Computed property to know if note has changed.
 */
const noteHasChanged = computed<boolean>(
  () => notes.title !== '' || notes.body !== '' || notes.tags !== ''
);

/**
 * Handler for create note button.
 */
function createNote() {
  let noteId = notes.data.length + 1;
  notes.create({
    id: noteId,
    title: notes.title,
    body: notes.body,
    tags: notes.tags,
    timestamp: Date.now(),
    owner: 1,
  });
  // TODO: Create a GUI for error management, based on value returned by the notes.create() function
  // You need to connect the application with backend to enable this feature.
  // DONE: Redirect to update note.
  router.push({ name: 'updateNote', params: { id: noteId } });
}

onMounted(() => {
  notes.clean();
});
</script>

<style scoped></style>
