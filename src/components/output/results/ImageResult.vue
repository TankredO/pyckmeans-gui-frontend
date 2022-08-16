<template>
  <div class="q-pa-md">
    <div class="text-h6">Graph:</div>
    <div class="card-image">
      <img :src="getImg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'ImageResult',
  props: {
    result: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const getImg = computed(() => {
      const image = 'data:image/png;base64, ' + props.result;
      return image;
    })
    return {
      getImg,
    }
  },
})
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
}
</style>