<template>
  <q-page padding>
    <q-toolbar>
      <BackButton warnUser :route="{ name: 'listNotes' }" />
      <q-btn label="Save" @click="createNote" />
    </q-toolbar>
    <NoteForm />
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import NoteForm from 'src/components/NoteForm.vue';
import BackButton from 'src/components/BackButton.vue';
import { useNotesStore } from 'stores/notes';
import { useRouter } from 'vue-router';

const router = useRouter();
const notes = useNotesStore();

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
