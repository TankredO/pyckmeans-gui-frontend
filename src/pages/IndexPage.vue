<template>
  <q-page class="column items-center justify-evenly">
    <InputWidget @initialAlgorithm="setInitalAlgorithm" :algorithm="initialAlgorithm" :isActive="true" />
    <template v-for="(child, index) in getResults" :key="index">
      <OutputWidget v-if="child != undefined" :algorithm="child" />
      <InputWidget v-if="checkForLastAlgorithm(child)" :algorithm="getNextAlgorithm(child)" :isActive="false" />
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, Ref, ref } from 'vue';
import InputWidget from '../components/input/InputWidget.vue';
import OutputWidget from '../components/output/OutputWidget.vue';
import { usePYCKStore } from '../stores/pyck-store';
import { PYCKResultObject } from '../types/interfaces';
export default defineComponent({
  name: 'IndexPage',
  components: { InputWidget, OutputWidget },
  setup() {
    const pyckStoreInstance = usePYCKStore();
    const initialAlgorithm: Ref<string> = ref('Sequence Data (.fasta, .phy)');
    const setInitalAlgorithm = (algorithm: string) => {
      initialAlgorithm.value = algorithm;
    }
    const getResults = computed(() => {
      const results: PYCKResultObject[] = []
      const pyckResultMap = pyckStoreInstance.resultMap
      pyckResultMap.forEach((element) => {
        if (element.info != undefined) {
          results.push(element);
        }
      })
      return results;
    })
    const getNextAlgorithm = (child: PYCKResultObject) => {
      const pyckResultMapKeys = pyckStoreInstance.resultMap.keys();
      let next = false
      for (const key of pyckResultMapKeys) {
        if (next) {
          return key
        }
        if (key == child.info.algorithm) {
          next = true
        }
      }
      return undefined
    }
    const checkForLastAlgorithm = (child: PYCKResultObject) => {
      const pyckResultMap = pyckStoreInstance.resultMap;
      let index = 0
      let result = true
      pyckResultMap.forEach((element, key) => {
        if (key == child.info.algorithm && index == pyckResultMap.size - 1) {
          result = false;
        }
        index++
      })
      return result
    }
    return {
      getResults,
      initialAlgorithm,
      checkForLastAlgorithm,
      getNextAlgorithm,
      setInitalAlgorithm,
    }
  },
})
</script>
<style lang="scss" scoped>
.q-card {
  margin: 2rem 0 2rem 0;
}
</style>
