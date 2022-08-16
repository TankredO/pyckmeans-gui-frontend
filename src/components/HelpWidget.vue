<template>
    <q-card class="text-white">
        <q-bar dark class="bg-primary text-white">
            <div class="col text-center">
                Help
            </div>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip @click="closeHelp" class="bg-white text-primary right">Close</q-tooltip>
            </q-btn>
        </q-bar>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'HelpWidget',
    setup(props, { emit }) {
        const closeHelp = () => {
            emit('closeHelp')
        }
        return {
            closeHelp
        }
    }
})
</script>
<style lang="scss" scoped>
</style>