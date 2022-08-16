<template>
    <q-card flat bordered>
        <q-card-section>
            <div class="text-h6">{{ resultAlgorithm }}</div>
        </q-card-section>
        <DataResult :result="resultInfo" />
        <ImageResult :result="resultImage" />
    </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import DataResult from '../output/results/DataResult.vue'
import ImageResult from '../output/results/ImageResult.vue'
import { PYCKResultObject } from '../../types/interfaces';
export default defineComponent({
    name: 'OutputWidget',
    components: { DataResult, ImageResult },
    props: {
        algorithm: {
            type: Object as PropType<PYCKResultObject>,
            required: true
        }
    },
    setup(props) {
        const resultImage = computed(() => {
            return props.algorithm.image
        })
        const resultInfo = computed(() => {
            return props.algorithm.info
        })
        const resultAlgorithm = computed(() => {
            const algorithm = props.algorithm.info.algorithm.toUpperCase()
            return algorithm
        })
        return {
            resultImage,
            resultInfo,
            resultAlgorithm
        }
    }
})
</script>
<style lang="scss" scoped>
.q-card {
    margin: 2rem 0 2rem 0;
    width: 90vw;
    min-width: 360px;
    max-width: 860px;
    flex: 1 0 50%;
}

a,
a:visited,
a:hover,
a:active {
    text-decoration: none;
}
</style>