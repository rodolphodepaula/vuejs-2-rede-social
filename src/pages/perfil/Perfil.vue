<template>
  <site-template>
    <span slot="menuesquerdo">
      <img :src="usuario.imagem" class="responsive-img" />
    </span>

    <span slot="principal">
      <h2>Perfil</h2>

      <input type="text" placeholder="Nome" v-model="name" />
      <input type="text" placeholder="E-mail" v-model="email" />

      <div class="file-field input-field">
        <div class="btn pink darken-4">
          <span>Imagem</span>
          <input type="file" class="" v-on:change="salvaImagem" />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>

      <input type="password" placeholder="Senha" v-model="password" />
      <input
        type="password"
        placeholder="Confirme sua Senha"
        v-model="password_confirmation"
      />
      <button class="btn pink darken-4" v-on:click="perfil()">Atualizar</button>
    </span>
  </site-template>
</template>

<script>
import SiteTemplate from "@/templates/SiteTemplate";

export default {
  name: "Perfil",
  data() {
    return {
      usuario: false,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      imagem: "",
    };
  },
  created() {
    let usuarioAux = this.$store.getters.getUsuario;
    if (usuarioAux) {
      this.usuario = this.$store.getters.getUsuario;
      this.name = this.usuario.name;
      this.email = this.usuario.email;
    }
  },
  components: {
    SiteTemplate,
  },
  methods: {
    salvaImagem(e) {
      let arquivo = e.target.files || e.dataTransfer.files;
      if (!arquivo.length) {
        return;
      }

      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.imagem = e.target.result;
      };
      reader.readAsDataURL(arquivo[0]);

      console.log(this.imagem);
    },
    perfil() {
      this.$http
        .put(
          this.$urlAPI + "perfil",
          {
            name: this.name,
            email: this.email,
            imagem: this.imagem,
            password: this.password,
            password_confirmation: this.password_confirmation,
          },
          {
            headers: {
              authorization: "Bearer " + this.$store.getters.getToken,
            },
          }
        )
        .then((response) => {
          //console.log(response)
          if (response.data.status) {
            // login com sucesso
            //console.log(response.data.usuario);
            this.usuario = response.data.usuario;
            this.$store.commit("setUsuario", response.data.usuario);
            sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
            alert("Perfil atualizado!");
          } else if (response.data.status == false && response.data.validacao) {
            // erros de validação
            //console.log('erros de validação')
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
