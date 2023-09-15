<template>
  <q-btn
    label="Back"
    @click="props.warnUser ? (discardPopUp = true) : back()"
  />
  <q-dialog v-model="discardPopUp">
    <q-card>
      <q-card-section>
        <div class="text-h6">Are you sure?</div>
      </q-card-section>
      <q-card-section>
        <p>Any changes produced will be lost. Are you sure?</p>
      </q-card-section>
      <q-card-section>
        <q-btn label="OK" v-close-popup @click="back" />
        <q-btn label="Cancel" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouteLocationRaw } from 'vue-router';
import { useNotesStore } from 'src/stores/notes';

const router = useRouter();
const discardPopUp = ref<boolean>(false);
const notes = useNotesStore();

/**
 * Vue component properties.
 */
const props = defineProps<{
  warnUser: boolean;
  route: RouteLocationRaw;
}>();

/**
 * Handler for back to list notes page button
 */
function back() {
  notes.clean();
  router.push(props.route);
}
</script>
