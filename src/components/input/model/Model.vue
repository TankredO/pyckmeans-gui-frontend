<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 400px;width: auto;">
      <template v-slot:before>
        <div class="q-pa-md">
          <q-list dense padding class="rounded-borders">
            <DirectoryTree :node="root" />
          </q-list>
        </div>
      </template>
      <template v-slot:after>
        <div class="q-pa-md">
          <q-list dense padding class="rounded-borders">
            <FileTree @fileSelected="setSelectedFile" />
          </q-list>
        </div>
      </template>
    </q-splitter>
    <q-card-actions align="right">
      <q-btn flat label="Accept" color="primary" v-on:click="modelAccept" />
      <q-btn flat label="Decline" color="primary" v-on:click="modelDecline" />
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref } from 'vue'
import DirectoryTree from '../model/model_components/DirectoryTree.vue'
import FileTree from '../model/model_components/FileTree.vue'
import { useFileStore } from '../../../stores/file-store'
import { FileObjectData } from '../../../types/interfaces'
export default defineComponent({
  name: 'ModelComponent',
  components: { DirectoryTree, FileTree },
  setup(props, { emit }) {
    const fileStoreInstance = useFileStore()
    const selectedFile:Ref<FileObjectData> = ref({} as FileObjectData);
    const splitterModel:Ref<number> = ref(50)
    const root = computed(() => {
      return fileStoreInstance.getRoot
    });
    const setSelectedFile = (node: FileObjectData) => {
      selectedFile.value = node
    }
    const modelAccept = () => {
      emit('modelAccept', selectedFile.value)
    }
    const modelDecline = () => {
      emit('modelDecline')
    }
    const asyncfetchRoot = async () => {
      fileStoreInstance.fetchFolder('.')
    };
    onMounted(asyncfetchRoot)
    return {
      fileStoreInstance,
      root,
      splitterModel,
      setSelectedFile,
      modelAccept,
      modelDecline
    };
  }
})
</script>
<style lang="scss" scoped>
.q-pa-md{
  min-width: 25%;
}
</style>