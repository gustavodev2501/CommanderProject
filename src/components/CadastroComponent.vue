<template>
  <div class="container">
    <div class="form" v-if="!showModal">
      <div class="top-form">
        <h1>Cadastro da Administração</h1>
      </div>
      <div class="body-form">
        <input v-model="userName" placeholder="Nome do usuário" type="text" />
        <input v-model="userEmail" placeholder="E-mail" type="text" />
        <button class="btn" @click="handleCadastro" :disabled="loading">
          <span v-if="!loading">Cadastrar</span>
          <span v-else class="loader"></span>
        </button>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Conta Criada com Sucesso!</h2>
        <p><strong>Nome:</strong> {{ userName }}</p>
        <p><strong>Senha:</strong> {{ generatedPassword }}</p>
        <button class="btn" @click="voltarPagina">
          Voltar para a Página Inicial ({{ countdown }})
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, push } from "firebase/database";
import { db, auth } from "@/firebase";

export default {
  name: "CadastroAdministracao",
  data() {
    return {
      userName: "",
      userEmail: "",
      generatedPassword: "",
      showModal: false,
      loading: false,       
      countdown: 30,       
      countdownInterval: null, 
    };
  },
  methods: {
    generateRandomPassword(length = 8) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    },
    startCountdown() {
      this.countdown = 30;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      this.countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.countdownInterval);
          this.voltarPagina();
        }
      }, 1000);
    },
    handleCadastro() {
      if (!this.userName || !this.userEmail) {
        alert("Preencha todos os campos");
        return;
      }
      
      this.loading = true;
      this.generatedPassword = this.generateRandomPassword();

      createUserWithEmailAndPassword(auth, this.userEmail, this.generatedPassword)
        .then((userCredential) => {
          const newUser = {
            name: this.userName,
            email: this.userEmail,
            password: this.generatedPassword,
            uid: userCredential.user.uid
          };
          return push(dbRef(db, "users"), newUser);
        })
        .then(() => {
          this.showModal = true;
          this.loading = false;
          this.startCountdown();
        })
        .catch((error) => {
          console.error("Erro ao cadastrar usuário: ", error);
          alert("Erro ao cadastrar usuário. Tente novamente.");
          this.loading = false;
        });
    },
    voltarPagina() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      this.$router.push("/");
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

.top-form {
  width: 100%;
  transition: all 0.6s;
}

.top-form h1 {
  margin: 0;
  color: black;
  text-align: left;
  font-size: 20px;
}

.body-form {
  width: 100%;
  margin-top: 10px;
  transition: all 0.6s;
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
  transition: all 0.6s;
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
  transition: all 0.6s;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Loader Styles */
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

/* Responsividade */
@media (max-width: 768px) {
  .form {
    width: 90%;
    padding: 15px;
  }
  
  .top-form h1 {
    font-size: 18px;
    text-align: center;
  }
  
  .body-form input,
  .btn {
    font-size: 16px;
    padding: 12px;
  }
}

/* Estilos do Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  text-align: start;
  max-width: 400px;
  width: 80%;
}

.modal h2 {
  margin-top: 0;
  color: white !important;
  font-size: 28px;
}

.modal p {
  margin: 10px 0;
  font-size: 16px;
  color: #ddd;
  margin-top: 15px;
}
</style>
