<template>
  <q-item clickable v-ripple>
    <q-item-section class="collection-item" :style="{ 'padding-left': depth * 20 + 12 + 'px' }"
      v-on:click="folderClicked">
      <div class="folder">
        <i class="material-icons arrow-icon" v-on:click.stop="expandFolder"><span v-if="!expanded"
            class="material-icons arrow-icon">chevron_right</span><span v-if="expanded"
            class="material-icons arrow-icon">expand_more</span></i>
        <i class="material-icons arrow-icon"><span class="material-icons arrow-icon">_</span></i>
        <span class="material-icons folder-icon">folder</span> {{ getNameFromPath }}
      </div>
    </q-item-section>
  </q-item>
  <DirectoryTree v-for="child in folderExpanded" :key="getKey(child)" :node="child" :depth="depth + 1" />
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, PropType } from 'vue'
import { FileObjectData } from '../../../../types/interfaces';
import { useFileStore } from '../../../../stores/file-store'

export default defineComponent({
  name: 'DirectoryTree',
  props: {
    node: {
      type: Object as PropType<FileObjectData>,
      required: true
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const fileStoreInstance = useFileStore()
    const expanded:Ref<boolean> = ref(false)
    const getNameFromPath = computed(() => {
      if (props.node.metaData !== undefined) {
        return props.node.metaData.name;
      } else {
        return '';
      }
    })
    const folderExpanded = computed(() => {
      if (expanded.value) {
        return props.node.children;
      } else {
        return undefined;
      }
    })
    const expandFolder = () => {
      if (props.node.metaData !== undefined) {
        if (props.node.metaData.type === 'dir') {
          fileStoreInstance.fetchFolder(props.node.metaData.path)
          expanded.value = !expanded.value;
        }
      }
    }
    const folderClicked = () => {
      if (props.node.metaData !== undefined) {
        fileStoreInstance.fetchAllFiles(props.node)
      }
    }
    const getKey = (child: FileObjectData) => {
      if (child.metaData !== undefined) {
        return child.metaData.name
      }
      else {
        return ''
      }
    }
    return {
      expanded,
      getNameFromPath,
      folderExpanded,
      expandFolder,
      folderClicked,
      getKey
    }
  }
})
</script>
<style lang="scss" scoped>
.q-item,
.q-splitter__panel {
  overflow-x: hidden;
  white-space: nowrap;
}
</style>
