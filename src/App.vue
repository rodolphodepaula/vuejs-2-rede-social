<template>
  <router-view/>

</template>

<script>
import NavBar from '@/Components/layouts/NavBar'
import FooterVue from '@/Components/layouts/FooterVue'
import GridVue from '@/components/layouts/GridVue'
import CardMenuVue from '@/components/layouts/CardMenuVue'
export default {
  name: 'App',
  components:{
    NavBar,
    FooterVue,
    GridVue,
    CardMenuVue
  }
}
</script>

<style>

</style>
