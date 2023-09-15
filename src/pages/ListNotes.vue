<template>
  <q-page>
    <div class="q-pa-md">
      <q-toolbar>
        <q-checkbox
          v-model="selectAllNotes"
          @click="setSelectedNotes"
          label="Select all"
        />
        <q-btn-group actions>
          <q-btn actions label="Create" :to="{ name: 'createNote' }" />
          <q-btn actions label="Reload" @click="notes.loadData" />
          <q-btn
            color="negative"
            actions
            label="Delete"
            @click="removeNotes(selectedNotes)"
            :disabled="selectedNotes.length == 0"
          />
        </q-btn-group>
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filterNotes"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
      <q-table
        :rows="notes.data"
        :columns="columns"
        :filter="filterNotes"
        grid
        flat
        bordered
        row-key="id"
        selection="multiple"
        v-model:selected="selectedNotes"
      >
        <template v-slot:item="props">
          <div
            class="q-pa-xs"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card
              v-ripple
              class="my-card cursor-pointer q-hoverable"
              @click="
                router.push({
                  name: 'updateNote',
                  params: { id: props.row.id },
                })
              "
            >
              <q-card-section>
                <q-checkbox
                  dense
                  v-model="props.selected"
                  :label="props.row.name"
                ></q-checkbox>
              </q-card-section>
              <q-card-section>
                <div class="text-h6">
                  {{
                    props.row.title.length > 16
                      ? `${props.row.title.substring(0, 16)}..`
                      : props.row.title
                  }}
                </div>
                <p class="text-body1">
                  {{
                    props.row.body.length > 128
                      ? `${props.row.body.substring(0, 128)}..`
                      : props.row.body
                  }}
                </p>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useNotesStore } from 'src/stores/notes';
import { useRouter } from 'vue-router';
import { Note } from 'src/ts/interfaces/note';

/**
 * Vue router instance.
 */
const router = useRouter();

/**
 * Pinia store to centralize note's data.
 */
const notes = useNotesStore();

/**
 * Columns definition for q-table component.
 */
const columns = [
  { name: 'title', label: '', field: 'title', sortable: true },
  { name: 'body', label: '', field: 'body', sortable: true },
];

/**
 * Store a string to filter notes.
 */
const filterNotes = ref<string>('');

/**
 * Store selected notes objects.
 */
const selectedNotes = ref<Note[]>([]);

/**
 * Define if all notes are selected or not.
 */
const selectAllNotes = ref<boolean>(false);

/**
 * Selects all or none notes.
 */
function setSelectedNotes() {
  if (selectedNotes.value.length != notes.data.length) {
    selectAllNotes.value = true;
    selectedNotes.value = notes.data;
  } else {
    selectAllNotes.value = false;
    selectedNotes.value = [];
  }
}

/**
 * Remove notes.
 * @param {Note[]} selectedNotes Selected notes to remove.
 */
function removeNotes(selectedNotes: Note[]): void {
  for (const selectedNote of selectedNotes) {
    notes.remove(selectedNote.id);
  }
}

onMounted(() => {
  if (notes.data.length == 0) {
    notes.loadData();
  }
});
</script>

<style>
.my-card {
  width: 100%;
  max-width: 350px;
}

.my-card:hover {
  background-color: #e8e8e8;
}
</style>
