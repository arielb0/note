<template>
  <q-page>
    <div class="q-pa-md">
      <q-header elevated>
        <q-toolbar v-if="!toggleSearchBar && selectedNotes.length == 0">
          <!--Main bar-->
          <q-toolbar-title>Note</q-toolbar-title>
          <q-btn
            round
            flat
            icon="search"
            @click="toggleSearchBar = true"
          ></q-btn>
          <q-btn round flat icon="person">
            <q-menu>
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section> Username </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat icon="more_vert">
            <!--Select all-->
            <q-menu>
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section @click="setSelectedNotes"
                    >Select all</q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
        <q-toolbar v-if="toggleSearchBar && selectedNotes.length == 0">
          <!--Search bar-->
          <q-btn
            round
            flat
            icon="arrow_back"
            @click="
              toggleSearchBar = false;
              filterNotes = '';
            "
          />
          <q-space />
          <q-input v-model="filterNotes" flat dense dark rounded></q-input>
        </q-toolbar>
        <q-toolbar v-if="selectedNotes.length != 0">
          <!--Item bar-->
          <q-btn round flat icon="arrow_back" @click="selectedNotes = []" />
          <q-space />
          <q-btn
            round
            flat
            icon="delete"
            @click="
              removeNotes(selectedNotes);
              selectedNotes = [];
            "
          />

          <!--TODO: Implement Export notes funcionality-->
        </q-toolbar>
      </q-header>
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

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" :to="{ name: 'createNote' }" />
      </q-page-sticky>
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
 * Search bar visibility.
 */
const toggleSearchBar = ref<boolean>(false);

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
