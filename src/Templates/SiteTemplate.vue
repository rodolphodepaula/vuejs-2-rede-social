<template>
  <span>
    <header>
      <nav-bar logo="Social Desko" url="/" cor="deko-top">
        <li v-if="!usuario"><router-link to="/login">Entrar</router-link></li>
        <li v-if="!usuario">
          <router-link to="/cadastro">Cadastre-se</router-link>
        </li>
        <li v-if="usuario">
          <router-link to="/perfil">{{ usuario.name }}</router-link>
        </li>
        <li v-if="usuario"><a v-on:click="sair()">Sair</a></li>
      </nav-bar>
    </header>

    <main>
      <div class="container">
        <div class="row">
          <grid-vue tamanho="4">
            <card-menu-vue>
              <slot name="menuesquerdo" />
            </card-menu-vue>
            <card-menu-vue>
              <slot name="menuesquerdoamigos" />
            </card-menu-vue>
          </grid-vue>
          <grid-vue tamanho="8">
            <slot name="principal" />
          </grid-vue>
        </div>
      </div>
    </main>

    <footer-vue
      cor="deko-footer"
      logo="Social Desko"
      descricao="Sistema de rede social DESKO"
      ano="2021"
    >
      <li><a class="grey-text text-lighten-3" href="#!">Home</a></li>
      <!--<li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li> -->
    </footer-vue>
  </span>
</template>

<script>
import NavBar from "@/components/layouts/NavBar";
import FooterVue from "@/components/layouts/FooterVue";
import GridVue from "@/components/layouts/GridVue";
import CardMenuVue from "@/components/layouts/CardMenuVue";

export default {
  name: "SiteTemplate",
  data() {
    return {
      usuario: false,
    };
  },
  components: {
    NavBar,
    FooterVue,
    GridVue,
    CardMenuVue,
  },
  created() {
    console.log("created()");
    let usuarioAux = this.$store.getters.getUsuario;
    if (usuarioAux) {
      this.usuario = this.$store.getters.getUsuario;
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    sair() {
      this.$store.commit("setUsuario", null);
      sessionStorage.clear();
      this.usuario = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>
