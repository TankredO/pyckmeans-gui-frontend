<template>
  <q-item>
    <q-item-section>{{ selectedRoot.metaData?.path }}</q-item-section>
  </q-item>
  <q-item clickable v-ripple class="collection" v-for="child in selectedRoot.children" :key="child.metaData?.path" v-on:click="fileClicked(child)"
    :node="child" :class="{ highlight: isFileSelected(child) }">
    <q-item-section class="collection-item">
      {{ child.metaData?.name }}
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFileStore } from '../../../../stores/file-store'
import { FileObjectData } from '../../../../types/interfaces';
import { computed, ref, Ref } from 'vue';
export default defineComponent({
  name: 'FileTree',
  emits: ['fileSelected'],
  setup(props, { emit }) {
    const fileStoreInstance = useFileStore()
    const selected: Ref<FileObjectData> = ref({} as FileObjectData);
    const isFileSelected = (child: FileObjectData) => {
      if (child.metaData?.name == selected.value.metaData?.name) {
        return true;
      }
      else {
        return false;
      }
    }
    const fileClicked = (node: FileObjectData) => {
      selected.value = node
      emit('fileSelected', node)
    }
    const selectedRoot = computed(() => {
      const selectedRoot: FileObjectData = fileStoreInstance.getSelectedRoot
      if (selectedRoot != undefined) {
        return selectedRoot;
      }
      else {
        return {}
      }
    })
    return {
      fileClicked,
      selectedRoot,
      selected,
      isFileSelected
    }
  }
})
</script>
<style lang="scss" scoped>
.highlight {
  background-color: rgba(128, 128, 128, 0.3);
}
.q-list--dense>.q-item,
.q-item--dense {
  padding: 0;
  margin: 2px 16px;
}
</style>
