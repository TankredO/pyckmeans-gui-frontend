<template>
  <div class="q-pa-md">
    <div class="text-h6">Solution:</div>
    <q-list dense padding>
      <q-item v-for="child in getInfo" :key="child" :node="child">
        {{ child }}
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { PYCKResultInfoObject } from '../../../types/interfaces';
export default defineComponent({
  name: 'DataResult',
  props: {
    result: {
      type: Object as PropType<PYCKResultInfoObject>,
      required: true
    }
  },
  setup(props) {
    const getInfo = computed(() => {
      const properties = [];
      for (const [key, value] of Object.entries(props.result)) {
        properties.push(`${key.toUpperCase()}: ${value}`);
      }
      return properties;
    })
    return {
      getInfo,
    }
  },
})
</script>
