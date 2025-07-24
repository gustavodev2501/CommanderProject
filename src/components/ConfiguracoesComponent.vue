<template>
    <div>
      <FullScreenLoader v-if="showScreenLoader" />
      <div v-else class="app-container">
        <SidebarComponent />
        <div class="main-content">
          <TopbarComponent />
          <div class="header">
            <h1>Configurações</h1>
          </div>
          <!-- Envolvendo os inputs e o botão em um formulário -->
          <form class="form" @submit.prevent="salvarConfiguracoes">
            <label for="">Título</label>
            <input v-model="centerH1" type="text" />
  
            <label for="">Subtítulo</label>
            <input v-model="centerP" type="text" />
  
            <label for="">Imagem 1</label>
            <input v-model="img1Url" type="text" />
  
            <label for="">Imagem 2</label>
            <input v-model="img2Url" type="text" />
  
            <button type="submit">Salvar</button>
          </form>
  
          <div class="alert-container">
            <AlertMessage
              v-for="alert in alerts"
              :key="alert.id"
              :message="alert.message"
              :type="alert.type"
              :duration="alert.duration"
              @closed="removeAlert(alert.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import anime from "animejs";
  import axios from "axios";
  import SidebarComponent from "./SidebarComponent.vue";
  import TopbarComponent from "./TopbarComponent.vue";
  import AlertMessage from "./AlertMessage.vue";
  import FullScreenLoader from "./FullScreenLoader.vue";
  import { ref as dbRef, set, onValue } from "firebase/database";
  import { db } from "@/firebase";
  
  export default {
    name: "ConfigComponent",
    components: { SidebarComponent, TopbarComponent, AlertMessage, FullScreenLoader },
    data() {
      return {
        showScreenLoader: false,
        alerts: [],
        videoUrl: "",
        centerH1: "",
        centerP: "",
        img1Url: "",
        img2Url: ""
      };
    },
    methods: {
      handleVideoUpload(e) {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("video", file);
  
          axios
            .post("http://localhost:3000/upload-video", formData, {
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
              this.videoUrl = response.data.filePath;
            })
            .catch(() => {
              this.addAlert({ message: "Erro ao fazer upload do vídeo.", type: "error" });
            });
        }
      },
      addAlert({ message, type = "system", duration = 3000 }) {
        const id = Date.now() + Math.random();
        this.alerts.push({ id, message, type, duration });
      },
      removeAlert(id) {
        this.alerts = this.alerts.filter(alert => alert.id !== id);
      },
      salvarConfiguracoes() {
        const settingsRef = dbRef(db, "configuracoes/home");
        set(settingsRef, {
          videoUrl: this.videoUrl,
          centerH1: this.centerH1,
          centerP: this.centerP,
          img1Url: this.img1Url,
          img2Url: this.img2Url
        })
          .then(() => {
            this.addAlert({ message: "Configurações salvas!", type: "success" });
          })
          .catch(() => {
            this.addAlert({ message: "Erro ao salvar configurações.", type: "error" });
          });
      },
      fetchSettings() {
        const settingsRef = dbRef(db, "configuracoes/home");
        onValue(settingsRef, snapshot => {
          const data = snapshot.val() || {};
          this.videoUrl = data.videoUrl || "";
          this.centerH1 = data.centerH1 || "";
          this.centerP = data.centerP || "";
          this.img1Url = data.img1Url || "";
          this.img2Url = data.img2Url || "";
        });
      }
    },
    mounted() {
      // Exemplo: simulando loader por 5 segundos
      setTimeout(() => { this.showScreenLoader = false; }, 5000);
      this.fetchSettings();
      anime({ targets: ".app-container", opacity: [0, 1], duration: 1000, easing: "easeInOutQuad" });
    }
  };
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
    height: 100vh;
  }
  
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    color: #1e1e1e;
    flex-wrap: wrap;
  }
  
  .alert-container {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  
  .form input {
    width: 251px;
    margin-top: 5px;
    padding: 10px;
    border-radius: 5px;
    background-color: #F6F6F6;
    border: none;
    outline: none;
  }
  
  .form button {
    width: 251px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #1e1e1e;
    border: none;
    outline: none;
    color: white;
  }
  
  label {
    margin-top: 20px;
  }
  </style>
  