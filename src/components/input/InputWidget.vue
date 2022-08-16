<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">InputWidget</div>
    </q-card-section>
    <AlgorithmSelection :algorithm="algorithmSelection" :isActive="(!getIsActive || !resetCondition)" @onAlgorithmSelection="onAlgorithmSelection"  />
    <div class="q-pa-md q-gutter-y-md column items-start full-width">
      <q-btn-group class="full-width" outline>
        <q-banner class="full-width file-selection">{{ fileSelectionDisplay }}</q-banner>
        <q-btn icon="folder" :disable="!resetCondition" class="file-selection" @click="openModel = true" />
      </q-btn-group>
      <q-dialog v-model="openModel">
        <q-card>
          <q-card-section>
            <div class="text-h6">File Explorer</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="scroll">
            <ModelComponent @modelAccept="modelAccept" @modelDecline="modelDecline" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <AlgorithmConfig :algorithm="algorithmSelection" :isActive="!resetCondition" @onConfigSelection="onConfigSelection" />
    <q-list bordered class="rounded-borders btn-submit-group">
      <q-btn flat :disable="(runCondition || !resetCondition)" label="Run" color="primary" @click="run" />
      <q-btn flat :disable="resetCondition" label="Reset" color="primary" @click="reset" />
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue';
import ModelComponent from '../input/model/Model.vue'
import AlgorithmSelection from '../input/algorithm/AlgorithmSelection.vue'
import AlgorithmConfig from '../input/algorithm/AlgorithmConfig.vue'
import { FileObjectData, PYCKSubmissionObject, PYCKconfig } from '../../types/interfaces';
import { usePYCKStore } from '../../stores/pyck-store';
export default defineComponent({
  name: 'InputWidget',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    algorithm: {
      type: String,
      required: true
    },
  },
  components: { ModelComponent, AlgorithmSelection, AlgorithmConfig },
  setup(props, { emit }) {
    const pyckStoreInstance = usePYCKStore()
    const openModel:Ref<boolean> = ref(false)
    const fileSelection: Ref<FileObjectData> = ref({} as FileObjectData)
    const algorithmSelection: Ref<string> = ref(props.algorithm)
    const algorithmConfig: Ref<PYCKconfig> = ref({} as PYCKconfig)
    const modelAccept = (file: FileObjectData) => {
      fileSelection.value = file
      openModel.value = false
    }
    const modelDecline = () => {
      openModel.value = false
    }
    const run = () => {
      const submission: PYCKSubmissionObject = {
        filepath: fileSelection.value.metaData?.path,
        algorithm: algorithmSelection.value,
        config: algorithmConfig.value.config
      } as PYCKSubmissionObject
      emitInitialAlgorithm()
      pyckStoreInstance.fetchResult(submission)
    }
    const runCondition = computed(() => {
      if (fileSelection.value.metaData == undefined) {
        return true
      } else {
        return false
      }
    })
    const reset = () => {
      pyckStoreInstance.clearResults(algorithmSelection.value)
    }
    const resetCondition = computed(() => {
      const pyckResultMap = pyckStoreInstance.getResult
      let condition = true
      pyckResultMap.forEach((element,key) => {
        if (key == algorithmSelection.value && element.info != undefined) {
          condition = false;
        }
      });
      return condition
    })
    const fileSelectionDisplay = computed(() => {
      if (Object.keys(fileSelection.value).length == 0) {
        return 'File Selection'
      }
      else {
        if (fileSelection.value.metaData != undefined) {
          return fileSelection.value.metaData.path
        }
        else {
          return 'File Selection'
        }
      }
    })
    const onAlgorithmSelection = (algorithm: string) => {
      algorithmSelection.value = algorithm
    }
    const onConfigSelection = (config: PYCKconfig) => {
      algorithmConfig.value = config
    }
    const emitInitialAlgorithm = () => {
      let emitable = true
      const pyckResultMap = pyckStoreInstance.getResult
      pyckResultMap.forEach(element => {
        if (element.info != undefined) {
          emitable = false
        }
      });
      if (emitable) {
        emit('initialAlgorithm', algorithmSelection.value)
      }
    }
    const getIsActive = computed(() => {
      return props.isActive
    })
    return {
      modelAccept,
      modelDecline,
      onAlgorithmSelection,
      onConfigSelection,
      run,
      reset,
      runCondition,
      resetCondition,
      fileSelectionDisplay,
      fileSelection,
      algorithmSelection,
      openModel,
      getIsActive
    }
  }
});
</script>
<style lang="scss" scoped>
.q-card {
  max-height: 600px;
  width: 90vw;
  min-width: 360px;
  max-width: 860px;
}

.btn-submit-group {
  display: flex;
  justify-content: space-between;
}

.file-selection {
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: none;
}
</style>
