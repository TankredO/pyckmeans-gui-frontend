<template>
  <div class="q-pa-md">
    <q-list bordered class="rounded-borders">
      <q-expansion-item v-model="expanded" dense-toggle color="primary" icon="settings">
        <q-card>
          <q-card-section>
            <div v-if="getAlgorithm == 'Sequence Data (.fasta, .phy)'" class="q-gutter-md">
              <q-select :disable="getIsActive" outlined color="primary" v-model="selectedDistanceType" :options="distanceType" stack-label
                label="Distance Type" :display-value="selectedDistanceType">
              </q-select>
              <q-select :disable="getIsActive" outlined color="primary" v-model="selectedMissingDataAction" :options="missingDataAction"
                stack-label label="Missing Data Action" :display-value="selectedMissingDataAction">
              </q-select>
            </div>
            <div v-if="getAlgorithm == 'Distance Matrix (.dst, .csv)'" class="q-gutter-md">
              <q-select :disable="getIsActive" outlined color="primary" v-model="selectedCorrection" :options="correction" stack-label
                label="Correction" :display-value="selectedCorrection">
              </q-select>
              <div class="slider">
                <label>
                  Eps: {{ eps }}
                </label>
                <q-slider :disable="getIsActive" v-model="eps" :min="0.0001" :max="0.001" :step="0.0001" snap label color="primary" />
              </div>
            </div>
            <div v-if="getAlgorithm == 'Data Matrix (.csv)'" class="q-gutter-md">
              <div class="slider">
                <label>
                  Proportion of samples: {{ proportionOfSamples }}
                </label>
                <q-slider :disable="getIsActive" v-model="proportionOfSamples" :min="0.0001" :max="0.001" :step="0.0001" snap label
                  color="primary" />
              </div>
              <div class="slider">
                <label>
                  Proportion of features: {{ proportionOfFeatures }}
                </label>
                <q-slider :disable="getIsActive" v-model="proportionOfFeatures" :min="0.0001" :max="0.001" :step="0.0001" snap label
                  color="primary" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watchEffect } from 'vue'
import { PYCKconfig } from '../../../types/interfaces';
export default defineComponent({
  name: 'AlgorithmConfig',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    algorithm: {
      type: String,
      required: false
    }
  },
  setup(props, { emit }) {
    const selectedAlgorithm: Ref<string> = ref('')
    const expanded: Ref<boolean> = ref(false)
    const distanceType: string[] = ['p', 'junkes_cantor', 'kimura_2_parameter']
    const missingDataAction: string[] = ['pairwise deletion', 'complete deletion']
    const correction: string[] = ['None', 'lingoes', 'cailliez']
    const eps: Ref<number> = ref(0.0001)
    const proportionOfSamples: Ref<number> = ref(0.0001)
    const proportionOfFeatures: Ref<number> = ref(0.0001)
    const getAlgorithm = computed(() => {
      return props.algorithm
    })
    const getIsActive = computed(() => {
      return props.isActive
    })
    const selectedDistanceType: Ref<string> = ref(distanceType[0])
    const selectedMissingDataAction: Ref<string> = ref(missingDataAction[0])
    const selectedCorrection: Ref<string> = ref(correction[0])
    watchEffect(() => {
      const submission: PYCKconfig = {
        config: {
          distanceType: selectedDistanceType.value,
          missingDataAction: selectedMissingDataAction.value,
          correction: selectedCorrection.value,
          eps: eps.value,
          proportionOfSamples: proportionOfSamples.value,
          proportionOfFeatures: proportionOfFeatures.value,
        }
      } as PYCKconfig
      emit('onConfigSelection', submission)
    })
    return {
      selectedAlgorithm,
      expanded,
      selectedDistanceType,
      selectedMissingDataAction,
      selectedCorrection,
      distanceType,
      missingDataAction,
      correction,
      eps,
      proportionOfSamples,
      proportionOfFeatures,
      getAlgorithm,
      getIsActive
    }
  }
})
</script>
<style lang="scss" scoped>
.slider {
  padding: 0 !important;
}
</style>