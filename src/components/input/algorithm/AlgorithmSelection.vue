<!-- later output file selection -->
<template>
  <div class="q-pa-md full-width">
    <div class="q-gutter-md">
      <q-select :disable="getIsActive" outlined v-model="selectedAlgorithm" :options="options" stack-label label="Algorithm"
        :display-value="selectedAlgorithm">
      </q-select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watchEffect , computed } from 'vue'
export default defineComponent({
  name: 'AlgorithmSelection',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    algorithm: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const selectedAlgorithm: Ref<string> = ref(props.algorithm)
    watchEffect(() => {
      emit('onAlgorithmSelection', selectedAlgorithm.value)
    })
    const options: string[] = [
      'Sequence Data (.fasta, .phy)', 'Distance Matrix (.dst, .csv)', 'Data Matrix (.csv)'
    ]
    const getIsActive = computed(() => {
      return props.isActive
    })
    return {
      selectedAlgorithm,
      options,
      getIsActive
    }
  }
})
</script>
<style lang="scss" scoped>
.q-select,
.q-field__native {
  border-color: rgba(0, 0, 0, 0.12);
}
</style>
