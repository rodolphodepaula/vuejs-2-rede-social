<template>
 <nav :class="cor || 'blue'">
    <div class="nav-wrapper container">
      <router-link :to="url || '/'" class="brand-logo">{{logo || 'Site'}}</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <slot />
      </ul>
    </div>
  </nav>
</template>
<script>
export default{
 name: 'NavBar',
 props:['logo','url','cor'],
 data(){
   return{

   }
  },
  created(){
   // this.$store.commit('setNome', 'Outro Nome');
  }
}
</script>
<style scoped>

</style>
