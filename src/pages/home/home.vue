<template>
<site-template>
<span slot="menuesquerdo">
<div class="row valign-wrapper">
  <grid-vue tamanho="4" >
   <router-link :to="'/pagina/'+usuario.id+'/'+$slug(usuario.name, {lower: true})">
    <img :src="usuario.imagem" :alt="usuario.name" class="circle responsive-img"> <!-- notice the "circle" class -->
   </router-link>
  </grid-vue>
  <grid-vue tamanho="8" >
      <span class="black-text">
      <router-link :to="'/pagina/'+usuario.id+'/'+$slug(usuario.name, {lower: true})">
        <h5>{{ usuario.name }}</h5>
      </router-link>

    </span>
  </grid-vue>
</div>
</span>
<span slot="menuesquerdoamigos">
  <h3>Seguindo</h3>
  <router-link v-for="item in amigos" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name, {lower: true})">
    <li >{{item.name}}</li>
  </router-link>
  <li v-if="!amigos.length">Nenhum Usuário</li>

  <h3>Seguidores</h3>
  <router-link v-for="item in seguidores" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name, {lower: true})">
    <li >{{item.name}}</li>
  </router-link>
  <li v-if="!seguidores.length">Nenhum Usuário</li>
</span>


<span slot="principal">
  <publicar-conteudo-vue />
  <card-conteudo-vue v-for="item in listaConteudos" :key="item.id"
          :id="item.id"
          :totalcurtidas = "item.total_curtidas"
          :comentarios = "item.comentarios"
          :curtiuconteudo = "item.curtiu_conteudo"
          :totalcomentarios = "item.total_comentarios"
          :usuarioid="item.user.id"
          :perfil="item.user.imagem"
          :nome="item.user.name"
          :data="item.data">

        <card-detalhe-vue
            :img="item.imagem"
            :titulo="item.titulo"
            :txt="item.texto"
            :link="item.link" />

    </card-conteudo-vue>
   <!--  <button v-if="urlProximaPagina" @click="carregaPaginacao()" class="btn blue">Mais...</button> -->
    <div v-scroll="handleScroll">

    </div>
</span>
</site-template>


</template>

<script>
import SiteTemplate from '@/Templates/SiteTemplate'
import CardConteudoVue from '@/components/social/CardConteudoVue'
import CardDetalheVue from '@/components/social/CardDetalheVue'
import PublicarConteudoVue from '@/components/social/PublicarConteudoVue'
import GridVue from '@/components/layouts/GridVue'

export default {
  name: 'Home',
  data () {
    return {
      usuario:{imagem:'', name:''},
      urlProximaPagina:null,
      pararScroll: false,
      amigos:[],
      seguidores:[]
     }
  },
   created(){
     this.atualizaPagina();

  },
  components:{
    SiteTemplate,
    CardConteudoVue,
    CardDetalheVue,
    PublicarConteudoVue,
    GridVue
  },

  methods:{
    atualizaPagina(){
      let usuarioAux = this.$store.getters.getUsuario;
    if(usuarioAux){
      this.usuario = this.$store.getters.getUsuario;
      this.$http.get(this.$urlAPI+'conteudo/lista',
      {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
       // console.log(response);
        if(response.data.status){
          this.$store.commit('setConteudosLinhaTempo', response.data.conteudos.data);
          this.urlProximaPagina = response.data.conteudos.next_page_url;

          this.$http.get(this.$urlAPI+'usuario/listaamigos',
          {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
          .then(response => {
            if(response.data.status){
              console.log(response);
              this.amigos = response.data.amigos;
              this.seguidores = response.data.seguidores;
            }else{
              alert(response.data.erros);
            }

          })
          .catch(e => {
            console.log(e)
            alert("Erro! Tente novamente mais tarde!");
          })

        }

      })
      .catch(e => {
        console.log(e)
        alert("Erro! Tente novamente mais tarde!");
      });
    }

    },
    handleScroll: function () {
     //console.log(window.scrollY);
     //console.log(document.body.clientHeight);
     if(this.pararScroll){
       return;
     }
      if(window.scrollY >= document.body.clientHeight - 828){
        this.pararScroll = true;
        this.carregaPaginacao();
      }
    },
    carregaPaginacao(){
      if(!this.urlProximaPagina)
      {
        return;
      }

      this.$http.get(this.urlProximaPagina,
      {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
        //console.log(response);
        if(response.data.status && this.$route.name == "Home"){
          this.$store.commit('setPaginacaoConteudosLinhaTempo', response.data.conteudos.data);
          this.urlProximaPagina = response.data.conteudos.next_page_url;
          this.pararScroll = false;
        }
      })
      .catch(e => {
        console.log(e)
        alert("Erro! Tente novamente mais tarde!");
      });
    }
  },
  computed:{
    listaConteudos(){
      return this.$store.getters.getConteudosLinhaTempo;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
