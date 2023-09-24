<template>
  <q-page padding>
    <q-header elevated>
      <q-toolbar>
        <BackButton :warnUser="noteHasChanged" :route="{ name: 'listNotes' }" />
        <q-space />
        <q-btn flat rounded icon="save" @click="notes.update()" />
        <q-btn
          flat
          rounded
          icon="delete"
          @click="showConfirmDeleteDialog"
        ></q-btn>
      </q-toolbar>
    </q-header>
    <NoteForm />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotesStore } from 'src/stores/notes';
import { useQuasar } from 'quasar';
import { Note } from 'src/ts/interfaces/note';

import NoteForm from 'src/components/NoteForm.vue';
import BackButton from 'src/components/BackButton.vue';

/**
 * Route instance
 */
const route = useRoute();

/**
 * Router instance
 */
const router = useRouter();

/**
 * Note store instance.
 */
const notes = useNotesStore();

/**
 * Quasar composable. Useful to create dialogs using Quasar API.
 */
const quasar = useQuasar();

/**
 * reference note. Useful to compare if user has updated
 * a note or not.
 */
const referenceNote: Note = {
  id: 0,
  title: '',
  body: '',
  tags: '',
  timestamp: 0,
  owner: 0,
};

/**
 * Computed property to determine if note has changed or not.
 */
const noteHasChanged = computed(
  () =>
    notes.title !== referenceNote.title ||
    notes.body !== referenceNote.body ||
    notes.tags !== referenceNote.tags
);

/**
 * Logic to show confirm delete dialog.
 */
function showConfirmDeleteDialog() {
  quasar
    .dialog({
      title: 'Are you sure?',
      message:
        'Are you sure you want delete this note? This action can be undone..',
      cancel: true,
    })
    .onOk(() => {
      notes.remove(Number.parseInt(route.params.id as string));
      notes.clean();
      router.push({ name: 'listNotes' });
    });
}

onMounted(() => {
  quasar.dark.set('auto');
  notes.read(Number.parseInt(route.params.id as string));

  // Create a reference note.
  // Compare temporal properties to reference note.
  // If temporal properties are equal to reference note, then note has no changed.
  // Otherwise, note has changed.

  referenceNote.title = notes.title;
  referenceNote.body = notes.body;
  referenceNote.tags = notes.tags;
});
</script>

<style scoped></style>
