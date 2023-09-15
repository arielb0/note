import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Note } from 'src/ts/interfaces/note';

/*
export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})

*/

export const useNotesStore = defineStore('notes', () => {
  /**
   * Store notes data.
   */
  const data = ref<Note[]>([]);

  // DONE: Create note properties inside store (id, title, body, tags, date, time, owner)
  /**Temporal properties for single note */
  const id = ref<number>(0);
  const title = ref<string>('');
  const body = ref<string>('');
  const tags = ref<string>('');
  const date = ref<string>('');
  const time = ref<string>('');
  const owner = ref<number>(0);

  // Create functions to manage notes.
  //
  // DONE: Load data from backend to storage.
  // DONE: Create.
  // DONE: Read.
  // DONE: Update.
  // DONE: Delete.
  // DONE: Find.

  /**
   * Load notes data from server.
   * events to load data from server.
   * @returns A promise of eventual completion or failure of load data from server.
   */
  function loadData() {
    return fetch('/json/notes.json', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((downloadedData) => {
        console.log(
          'Load data from server to notes store finished sucesfully.'
        );
        data.value = downloadedData;
      })
      .catch((error) => {
        // TODO: Create or activate a user interface to manage errors.
        console.log(
          `Something has happened when trying to load data from server. Error: ${error}`
        );
      });
  }

  /**
   * Create a note.
   * @param {any} note The note to be created.
   * @returns none
   */
  function create(note: Note) {
    data.value.push(note);
    // TODO: Add note into backend.
    // TODO: Return a value for completion or failure of the operation.
    // Not implemented because this app not communicate with backend.
  }

  /**
   * Set note properties. This private function encapsulate repeated code
   * present on read function.
   * @param {number} noteId The note id.
   */
  function setNoteProperties(noteId: number) {
    const note = data.value.filter((note) => note.id === noteId)[0];
    console.log(`This is the note id: ${note.id}`);
    id.value = note.id;
    title.value = note.title;
    body.value = note.body;
    tags.value = note.tags;
    date.value = note.date;
    time.value = note.time;
    owner.value = note.owner;
  }

  /**
   * Read a note and put values on store note properties.
   * @param {number} noteId The note id
   */
  function read(noteId: number) {
    if (data.value.length === 0) {
      loadData().then(() => {
        setNoteProperties(noteId);
      });
    } else {
      setNoteProperties(noteId);
    }
  }

  /**
   * Update a note.
   */
  function update() {
    data.value = data.value.filter((note) => note.id !== id.value);

    data.value.push({
      id: id.value,
      title: title.value,
      body: body.value,
      tags: tags.value,
      date: date.value,
      time: time.value,
      owner: owner.value,
    });
    // TODO: Update note on backend
    // TODO: Return a value of completion or failure of this operation.
  }

  /**
   * Remove or delete a note.
   * @param {number} id The id of the note to delete
   * @returns none
   */
  function remove(id: number) {
    data.value = data.value.filter((note) => note.id !== id);
    // TODO: Remove note on backend.
    // TODO: Return a value of completion or failure of this operation.
  }

  /**
   * Clean note properties.
   */
  function clean() {
    id.value = 0;
    title.value = '';
    body.value = '';
    tags.value = '';
    date.value = '';
    time.value = '';
    owner.value = 0;
  }

  return {
    data,
    id,
    title,
    body,
    tags,
    date,
    time,
    owner,
    loadData,
    create,
    read,
    update,
    remove,
    clean,
  };
});
