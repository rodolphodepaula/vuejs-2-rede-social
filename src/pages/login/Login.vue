<template>
  <login-template>
    <span slot="menuesquerdo">
      <img src="../../assets/img-logo.jpg" class="responsive-img" />
    </span>

    <span slot="principal">
      <h2>Login</h2>
      <input type="text" placeholder="E-mail" v-model="email" />
      <input type="password" placeholder="Senha" v-model="password" />
      <button class="btn waves-effect pink darken-4" v-on:click="login">
        Entrar
      </button>
      <router-link class="btn waves-effect waves-light orange" to="/cadastro"
        >Cadastre-se</router-link
      >
    </span>
  </login-template>
</template>

<script>
import LoginTemplate from "@/Templates/LoginTemplate";

export default {
  name: "Login",
  data() {
    return {
      /* usuario: {email:'', password:''} */
      email: "",
      password: "",
    };
  },
  components: {
    LoginTemplate,
  },
  methods: {
    login() {
      console.log("Login");
      this.$http
        .post(this.$urlAPI + "login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          //console.log(response)
          if (response.data.status) {
            //login com sucesso
            console.log("login com sucesso");
            this.$store.commit("setUsuario", response.data.usuario);
            sessionStorage.setItem(
              "usuario",
              JSON.stringify(response.data.usuario)
            );
            this.$router.push("/");
          } else if (response.data.status == false && response.data.validacao) {
            console.log("erro de validação");
            let erros = "";
            for (let erro of Object.values(response.data.erros)) {
              erros += erro + " ";
            }
            alert(erros);
          } else {
            //Login não existe
            console.log("Login não existe");
            alert("Login Inválido.");
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
