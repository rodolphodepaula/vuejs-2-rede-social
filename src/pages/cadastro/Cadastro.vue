<template>
  <login-template>
    <span slot="menuesquerdo">
      <img src="../../assets/img-logo.jpg" class="responsive-img" />
    </span>

    <span slot="principal">
      <h2>Cadastro</h2>
      <input type="text" placeholder="Nome" v-model="name" />
      <input type="text" placeholder="E-mail" v-model="email" />
      <input type="password" placeholder="Senha" v-model="password" />
      <input
        type="password"
        placeholder="Confirme sua senha"
        v-model="password_confirmation"
      />
      <button
        type="button"
        class="btn waves-effect pink darken-4"
        v-on:click="cadastro()"
      >
        Enviar
      </button>
      <router-link class="btn waves-effect waves-light orange" to="/login"
        >Já tenho conta</router-link
      >
    </span>
  </login-template>
</template>

<script>
import LoginTemplate from "@/Templates/LoginTemplate";

export default {
  name: "Cadastro",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  components: {
    LoginTemplate,
  },
  methods: {
    cadastro() {
      console.log("Login");
      this.$http
        .post(this.$urlAPI + "cadastro", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((response) => {
          //console.log(response)
          if (response.data.status) {
            //login com sucesso
            console.log("Cadastro realizado com sucesso");
            this.$store.commit("setUsuario", response.data.usuario);
            sessionStorage.setItem(
              "usuario",
              JSON.stringify(response.data.usuario)
            );
            this.$router.push("/");
          } else if (response.data.status == false && response.data.validacao) {
            //erro de validação
            console.log("erro de validação");
            let erros = "";
            for (let erro of Object.values(response.data.erros)) {
              erros += erro + " ";
            }
            alert(erros);
          } else {
            //Login não existe
            alert("Erro no cadastro! Tente novamente mais tarde.");
          }
        })
        .catch((e) => {
          console.log(e);
          //this.errors.push(e)
          alert("Erro! Tente novamente, mais tarde");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
