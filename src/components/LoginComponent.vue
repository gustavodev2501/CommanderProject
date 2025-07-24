<template>
  <div class="container">
    <div class="form">
      <div class="top-form">
        <h1>Login da Administração</h1>
      </div>
      <div class="body-form">
        <input v-model="userName" placeholder="Nome do Usuário" type="text" />
        <input v-model="userPassword" placeholder="Senha" type="password" />
        <button class="btn" @click="handleLogin" :disabled="loading">
          <span v-if="!loading">Entrar</span>
          <span v-else class="loader"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, get } from "firebase/database";
import { auth, db } from "@/firebase";

export default {
  name: "LoginAdministracao",
  data() {
    return {
      userName: "",
      userPassword: "",
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      if (!this.userName || !this.userPassword) {
        alert("Preencha todos os campos");
        return;
      }
      
      this.loading = true;
      
      try {
        const snapshot = await get(dbRef(db, "users"));
        if (snapshot.exists()) {
          const users = snapshot.val();
          let userEmail = null;
          
          for (let key in users) {
            if (users[key].name === this.userName) {
              userEmail = users[key].email;
              break;
            }
          }
          
          if (userEmail) {
            await signInWithEmailAndPassword(auth, userEmail, this.userPassword);
            this.$router.push("/criar-produto");
          } else {
            throw new Error("Usuário não encontrado");
          }
        } else {
          throw new Error("Banco de dados vazio");
        }
      } catch (error) {
        console.error("Erro ao fazer login: ", error);
        alert("Usuário ou senha inválidos");
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: #F6F6F6;
  border-radius: 10px;
  width: 21%;
  min-width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.top-form h1 {
  margin: 0;
  color: black;
  text-align: left;
  font-size: 20px;
}

.body-form input {
  padding: 15px;
  width: 100%;
  border: none;
  background-color: #FFFFFF;
  border-radius: 5px;
  outline: none;
  font-size: 15px;
  margin-top: 10px;
  color: black !important;
}

.btn {
  background-color: #bf5900;
  padding: 15px;
  border-radius: 5px;
  border: none;
  width: 100%;
  margin-top: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loader {
  width: 18px;
  height: 18px;
  border: 3px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
