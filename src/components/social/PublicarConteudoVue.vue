<template>
  <div class="row">
    <grid-vue class="input-field" tamanho="12">
      <input type="text" v-model="conteudo.titulo" />
      <textarea
        v-if="conteudo.titulo"
        placeholder="Conteúdo"
        v-model="conteudo.texto"
        class="materialize-textarea"
      ></textarea>
      <input
        v-if="conteudo.titulo && conteudo.texto"
        type="text"
        placeholder="Link"
        v-model="conteudo.link"
      />
      <input
        v-if="conteudo.titulo && conteudo.texto"
        type="text"
        placeholder="Url da Imagem"
        v-model="conteudo.imagem"
      />
      <label>O que está acontecendo?</label>
    </grid-vue>
    <p class="right-align">
      <button
        @click="addConteudo()"
        v-if="conteudo.titulo && conteudo.texto"
        class="btn waves-effect pink darken-4"
      >
        Publicar
      </button>
    </p>
  </div>
</template>

<script>
import GridVue from "@/components/layouts/GridVue";

export default {
  name: "PublicarConteudoVue",
  props: [],
  data() {
    return {
      conteudo: { titulo: "", texto: "", link: "", imagem: "" },
    };
  },
  components: {
    GridVue,
  },
  methods: {
    addConteudo() {
      console.log(this.conteudo);
      this.$http
        .post(this.$urlAPI + "conteudo/adicionar", this.conteudo, {
          headers: { authorization: "Bearer " + this.$store.getters.getToken },
        })
        .then((response) => {
          if (response.data.status) {
            console.log(response.data.conteudos);
            this.conteudo = { titulo: "", texto: "", link: "", imagem: "" };
            this.$store.commit(
              "setConteudosLinhaTempo",
              response.data.conteudos.data
            );
          } else if (response.data.status == false && response.data.validacao) {
            //erro de validação
            let erros = "";
            for (let erro of Object.values(response.data.erros)) {
              erros += erro + " ";
            }
            alert(erros);
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Erro! Tente novamente mais tarde!");
        });
    },
  },
};
</script>
<style scoped>
</style>
