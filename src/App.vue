<template>
  <router-view />
</template>

<script lang="ts">
// import { env } from 'process';
import { defineComponent } from 'vue';
// declare global {
//   interface Window {
//     appConfig: any; // 👈️ turn off type checking
//   }
// }
export default defineComponent({
  name: 'App',
  setup(){
    console.log(process.env.API)
    return{

    }
  }
})
</script>
