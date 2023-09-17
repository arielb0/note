<template>
  <q-page padding>
    <q-header elevated>
      <q-toolbar>
        <BackButton warnUser :route="{ name: 'listNotes' }" />
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
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotesStore } from 'src/stores/notes';
import { useQuasar } from 'quasar';

import NoteForm from 'src/components/NoteForm.vue';
import BackButton from 'src/components/BackButton.vue';

const route = useRoute();
const router = useRouter();
const notes = useNotesStore();
const quasar = useQuasar();

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
  notes.read(Number.parseInt(route.params.id as string));
});
</script>

<style scoped></style>
