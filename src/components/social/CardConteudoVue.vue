<template>
<div class="row">
  <div class="input-field col s12">
    <div class="card">
      <div class="card-content">
      <div class="row valign-wrapper">
          <grid-vue tamanho="1" >
           <router-link :to="'/pagina/'+usuarioid+'/'+$slug(nome, {lower: true})">
            <img :src="perfil" :alt="nome" class="circle responsive-img"> <!-- notice the "circle" class -->
           </router-link>
          </grid-vue>
          <grid-vue tamanho="11" >

                <span class="black-text">
                    <router-link :to="'/pagina/'+usuarioid+'/'+$slug(nome, {lower: true})"><strong>{{nome}}</strong></router-link> - <small>{{data}}</small>
                </span>

          </grid-vue>
        </div>
        <slot/>
        <div class="card-action">
        <p>
          <a style="cursor: pointer;" @click="curtida(id)" ><i class="material-icons">{{curtiu}}</i><small>{{totalCurtidas}}</small></a>
          <a style="cursor: pointer;" @click="abreComentarios()" ><i class="material-icons">insert_comment</i><small>{{listaComentarios.length}}</small></a>
        </p>
        <p class="right-align">
          <input type="text" placeholder="Comentar" v-model="textoComentario">
          <button v-if="textoComentario" @click="comentar(id)" class="btn waves-effect waves-light orange"><i class="material-icons">send</i></button>
        </p>
        <p v-if="exibirComentario">
          <ul class="collection">
            <li class="collection-item avatar" v-for="item in comentarios" :key="item.id">
              <img :src="item.user.imagem" alt="" class="circle">
              <span class="title">{{ item.user.name }} <small> - {{ item.data }} </small></span>
              <p>
                {{ item.texto }}
              </p>
            </li>


          </ul>
        </p>
        </div>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import GridVue from '@/components/layouts/GridVue'

export default{
 name: 'CardConteudoVue',
 props:['id','perfil', 'nome','data', 'totalcurtidas', 'curtiuconteudo', 'comentarios', 'usuarioid'],
 data(){
    return{
     curtiu:this.curtiuconteudo ? 'favorite' : 'favorite_border',
     totalCurtidas:this.totalcurtidas,
     exibirComentario:false,
     textoComentario:'',
     listaComentarios: this.comentarios || []

   }
  },
  components:{
    GridVue
  },
  methods:{
    curtida(id){
      let url = '';
      if(this.$route.name == "Home"){
        url = 'conteudo/curtir/';
      }else{
        url = 'conteudo/curtirPagina/';
      }

      this.$http.put(this.$urlAPI+url+id,
      {},{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
       .then(response => {
         if(response.data.status){
           this.totalCurtidas = response.data.curtidas;
            this.$store.commit('setConteudosLinhaTempo', response.data.lista.conteudos.data);
           if(this.curtiu == 'favorite_border' ){
              this.curtiu = 'favorite';
            }else{
              this.curtiu = 'favorite_border';
            }
         }else{
           alert(response.data.erros);
         }
       })
       .catch(e => {
        console.log(e)
        alert("Erro! Tente novamente mais tarde!");
      });
    },
    abreComentarios(){
      this.exibirComentario = !this.exibirComentario;

    },
    comentar(id){
      if(!this.textoComentario){
        return;
      }
       let url = '';
      if(this.$route.name == "Home"){
        url = 'conteudo/comentar/';
      }else{
        url = 'conteudo/comentarPagina/';
      }
       this.$http.put(this.$urlAPI+url+id,
        {texto:this.textoComentario},
        {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
       .then(response => {
         if(response.status){
           this.textoComentario = "";
           this.$store.commit('setConteudosLinhaTempo', response.data.lista.conteudos.data);
         }else{
           alert(response.data.erros);
         }
       })
       .catch(e => {
        console.log(e)
        alert("Erro! Tente novamente mais tarde!");
      })

    }
  }
}
</script>
<style scoped>

</style>
