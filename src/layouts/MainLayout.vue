<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-bar>
        <div :ripple="true" @click="openHelp = !openHelp" class="cursor-pointer">Help</div>
        <q-space />
        <div class="cursor-pointer"><a class="github" href="https://github.com/TankredO/pyckmeans"><i
              class="fa fa-github"></i></a></div>
      </q-bar>
    </q-header>
    <q-dialog v-model="openHelp" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
      <HelpWidget @closeHelp="openHelp = false" />
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import HelpWidget from '../components/HelpWidget.vue'
export default defineComponent({
  name: 'MainLayout',
  components: { HelpWidget },
  setup() {
    const openHelp: Ref<boolean> = ref(false);
    return {
      openHelp
    };
  },
});
</script>
<style lang="scss" scoped>
.github {
  color: white;
}
</style>