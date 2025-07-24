<template>
  <div>
    <FullScreenLoader v-if="showScreenLoader" />
    <div v-else class="app-container">
      <SidebarComponent />
      <AlertMessage
        v-for="alert in alerts"
        :key="alert.id"
        :message="alert.message"
        :type="alert.type"
        :duration="alert.duration"
        @closed="removeAlert(alert.id)"
      />
      <div class="main-content">
        <TopbarComponent />
        <div class="header">
          <h1>Aulas</h1>
          <div class="header-buttons">
            <button class="btn criar-btn" @click="openModal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="20"
                height="20"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Criar Aula
            </button>
          </div>
        </div>
        <div class="content">
          <table class="produtos-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Cards</th>
                <th>Criado Por</th>
                <th>Dia Criado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="aula in aulas" :key="aula.id" class="table-row">
                <td>{{ aula.titulo }}</td>
                <td>{{ aula.descricao }}</td>
                <td>
                  <ul>
                    <li v-for="(card, i) in aula.cards" :key="i">
                      {{ card.cardText || 'Sem texto' }}
                    </li>
                  </ul>
                </td>
                <td>{{ aula.criadoPor || 'N/A' }}</td>
                <td>{{ aula.criadoEm }}</td>
                <td>
                  <button class="btn editar-btn" @click="editAula(aula)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      width="20"
                      height="20"
                      stroke-width="2"
                    >
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.385z"></path>
                      <path d="M16 5l3 3"></path>
                    </svg>
                    Editar
                  </button>
                  <button class="btn excluir-btn" @click="openDeleteModal(aula)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      width="20"
                      height="20"
                      stroke-width="2"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-1 14H6L5 6"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                    </svg>
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal de Criação/Edição -->
    <div
      v-if="showModal"
      class="modal-overlay"
      @click.self="closeModal"
      tabindex="-1"
      @keydown.esc="closeModal"
    >
      <div class="modal-content" ref="modalContent">
        <span class="modal-close" @click="closeModal">&times;</span>
        <div class="form-produto">
          <div class="top-produto">
            <h1>{{ isEditMode ? "Editar Aula" : "Criar Aula" }}</h1>
          </div>
          <div class="body-produto">
            <div class="modal-grid">
              <div class="info-section">
                <input
                  class="input-field"
                  placeholder="Título da Aula"
                  type="text"
                  v-model="tituloAula"
                />
                <textarea
                  class="input-field"
                  placeholder="Descrição da Aula"
                  v-model="descricaoAula"
                ></textarea>
                <label class="input-label">Imagem da Aula</label>
                <div class="image-upload">
                  <label class="custom-file-upload">
                    Selecione a imagem
                    <input type="file" accept="image/*" @change="handleImageChange" />
                  </label>
                  <div class="image-preview" v-if="imageAula">
                    <img :src="imageAulaUrl" alt="Preview da imagem" />
                  </div>
                </div>
              </div>
              <div class="cards-section">
                <h2>Cards da Aula</h2>
                <div v-for="(card, index) in cards" :key="index" class="card-item">
                  <input
                    class="input-field"
                    placeholder="Texto do Card"
                    type="text"
                    v-model="card.cardText"
                  />
                  <textarea
                    class="input-field"
                    placeholder="Descrição do Card"
                    v-model="card.cardDescription"
                  ></textarea>

                  <!-- Seção de Parágrafos (cada parágrafo é um objeto com texto e etapas) -->
                  <div class="paragraphs-section">
                    <h3>Parágrafos</h3>
                    <div
                      v-for="(paragraph, pIndex) in card.paragraphs"
                      :key="pIndex"
                      class="paragraph-item"
                    >
                      <p>{{ paragraph.text }}</p>
                      <!-- Exibe as etapas se houver -->
                      <div v-if="paragraph.steps && paragraph.steps.length">
                        <h4>Etapas:</h4>
                        <ul>
                          <li
                            v-for="(step, sIndex) in paragraph.steps"
                            :key="sIndex"
                          >
                            {{ step }}
                            <button
                              class="btn excluir-btn"
                              @click="removeStep(index, pIndex, sIndex)"
                            >
                              Remover
                            </button>
                          </li>
                        </ul>
                      </div>
                      <!-- Input para adicionar nova etapa ao parágrafo -->
                      <input
                        class="input-field small"
                        placeholder="Adicionar etapa"
                        type="text"
                        v-model="paragraph.newStep"
                        @keyup.enter="addStep(index, pIndex)"
                      />
                      <button
                        class="btn add-btn small"
                        @click="addStep(index, pIndex)"
                      >
                        Adicionar Etapa
                      </button>
                      <button
                        class="btn excluir-btn"
                        @click="removeParagraph(index, pIndex)"
                      >
                        Remover Parágrafo
                      </button>
                    </div>
                    <!-- Input para adicionar novo parágrafo ao card -->
                    <input
                      class="input-field small"
                      placeholder="Adicionar parágrafo"
                      type="text"
                      v-model="card.newParagraph"
                      @keyup.enter="addParagraph(index)"
                    />
                    <button class="btn add-btn small" @click="addParagraph(index)">
                      Adicionar Parágrafo
                    </button>
                  </div>
                  <button class="btn excluir-btn3" @click="removeCard(index)">
                    Remover Card
                  </button>
                </div>
                <button class="btn add-btn" @click="addCard">
                  Adicionar Card
                </button>
              </div>
            </div>
            <button class="btn" @click="handleSubmit" :disabled="loading">
              <span v-if="!loading">
                {{ isEditMode ? "Atualizar Aula" : "Criar Aula" }}
              </span>
              <span v-else class="loader"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Exclusão -->
    <div
      v-if="showDeleteModal"
      class="modal-overlay"
      @click.self="closeDeleteModal"
      tabindex="-1"
      @keydown.esc="closeDeleteModal"
    >
      <div class="modal-content" ref="deleteModalContent">
        <span class="modal-close" @click="closeDeleteModal">&times;</span>
        <div class="delete-confirmation">
          <h1>Confirmação de Exclusão</h1>
          <p>Tem certeza que deseja excluir a aula "{{ aulaDeletar?.titulo }}"?</p>
          <div class="actions">
            <button class="btn" @click="deleteAula">Sim, excluir</button>
            <button class="btn" @click="closeDeleteModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
import SidebarComponent from "@/components/SidebarComponent.vue";
import TopbarComponent from "@/components/TopbarComponent.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import FullScreenLoader from "@/components/FullScreenLoader.vue";
import { ref as dbRef, push, set, onValue, remove } from "firebase/database";
import { db } from "@/firebase";

export default {
  name: "CriarAulaComponent",
  components: {
    SidebarComponent,
    TopbarComponent,
    AlertMessage,
    FullScreenLoader
  },
  data() {
    return {
      showScreenLoader: false,
      showModal: false,
      tituloAula: "",
      descricaoAula: "",
      imageAula: null,
      imageAulaData: null,
      cards: [],
      loading: false,
      alerts: [],
      isEditMode: false,
      aulaEditandoId: null,
      aulas: [],
      aulaDeletar: null,
      showDeleteModal: false
    };
  },
  computed: {
    imageAulaUrl() {
      return this.imageAula ? window.URL.createObjectURL(this.imageAula) : "";
    }
  },
  methods: {
    openModal() {
      this.resetForm();
      this.isEditMode = false;
      this.aulaEditandoId = null;
      this.showModal = true;
      this.$nextTick(() => {
        anime({
          targets: this.$refs.modalContent,
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 500,
          easing: "easeOutBack"
        });
      });
    },
    closeModal() {
      anime({
        targets: this.$refs.modalContent,
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 300,
        easing: "easeInBack",
        complete: () => {
          this.showModal = false;
        }
      });
    },
    resetForm() {
      this.tituloAula = "";
      this.descricaoAula = "";
      this.imageAula = null;
      this.imageAulaData = null;
      this.cards = [];
      this.isEditMode = false;
      this.aulaEditandoId = null;
    },
    handleImageChange(e) {
      this.imageAula = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageAulaData = reader.result;
      };
      reader.readAsDataURL(this.imageAula);
    },
    addCard() {
      this.cards.push({
        cardText: "",
        cardDescription: "",
        paragraphs: [],
        newParagraph: ""
      });
    },
    removeCard(index) {
      this.cards.splice(index, 1);
    },
    addParagraph(cardIndex) {
      const card = this.cards[cardIndex];
      if (card.newParagraph.trim()) {
        card.paragraphs.push({
          text: card.newParagraph.trim(),
          steps: [],
          newStep: ""
        });
        card.newParagraph = "";
      }
    },
    removeParagraph(cardIndex, paraIndex) {
      this.cards[cardIndex].paragraphs.splice(paraIndex, 1);
    },
    addStep(cardIndex, paraIndex) {
      const paragraph = this.cards[cardIndex].paragraphs[paraIndex];
      if (paragraph.newStep.trim()) {
        paragraph.steps.push(paragraph.newStep.trim());
        paragraph.newStep = "";
      }
    },
    removeStep(cardIndex, paraIndex, stepIndex) {
      this.cards[cardIndex].paragraphs[paraIndex].steps.splice(stepIndex, 1);
    },
    addAlert({ message, type = "system", duration = 3000 }) {
      const id = Date.now() + Math.random();
      this.alerts.push({ id, message, type, duration });
    },
    removeAlert(id) {
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
    },
    async handleSubmit() {
      if (!this.tituloAula || !this.descricaoAula) {
        this.addAlert({
          message: "Preencha os campos de Título e Descrição da Aula.",
          type: "error"
        });
        return;
      }
      this.loading = true;
      const aula = {
        titulo: this.tituloAula,
        descricao: this.descricaoAula,
        imagem: this.imageAulaData || null,
        cards: this.cards,
        criadoEm: new Date().toISOString().split("T")[0],
        criadoPor: "Admin"
      };
      try {
        if (this.isEditMode) {
          await set(dbRef(db, `aulas/${this.aulaEditandoId}`), aula);
          this.addAlert({ message: "Aula atualizada!", type: "success" });
        } else {
          await push(dbRef(db, "aulas"), aula);
          this.addAlert({ message: "Aula criada com sucesso!", type: "success" });
        }
        this.closeModal();
      } catch (e) {
        this.addAlert({ message: "Erro ao criar aula.", type: "error" });
      } finally {
        this.loading = false;
      }
    },
    editAula(aula) {
      this.tituloAula = aula.titulo;
      this.descricaoAula = aula.descricao;
      // Fazendo clone profundo dos cards
      this.cards = aula.cards ? JSON.parse(JSON.stringify(aula.cards)) : [];
      this.isEditMode = true;
      this.aulaEditandoId = aula.id;
      this.openModal();
    },
    fetchAulas() {
      const aulasRef = dbRef(db, "aulas");
      onValue(aulasRef, (snapshot) => {
        const data = snapshot.val() || {};
        this.aulas = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        anime({
          targets: ".table-row",
          translateX: [-50, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          duration: 500,
          easing: "easeOutQuad"
        });
      });
    },
    openDeleteModal(aula) {
      this.aulaDeletar = aula;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.aulaDeletar = null;
    },
    async deleteAula() {
      try {
        await remove(dbRef(db, `aulas/${this.aulaDeletar.id}`));
        this.addAlert({ message: "Aula excluída!", type: "success" });
      } catch (e) {
        this.addAlert({ message: "Erro ao excluir aula.", type: "error" });
      } finally {
        this.closeDeleteModal();
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.showScreenLoader = false;
    }, 2000);
    this.fetchAulas();
    anime({
      targets: ".app-container",
      opacity: [0, 1],
      duration: 1000,
      easing: "easeInOutQuad"
    });
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
  padding: 20px;
}
.modal-content {
  background: #ffffff;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
}
.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 28px;
  color: #888;
  cursor: pointer;
  transition: color 0.3s;
}
.modal-close:hover {
  color: #d02d1d;
}
.form-produto {
  background: #fdfdfd;
  padding: 20px;
  border-radius: 10px;
}
.top-produto h1 {
  text-align: center;
  color: #333;
  font-size: 26px;
  margin-bottom: 20px;
}
.body-produto {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.info-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.cards-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.card-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.paragraphs-section, .steps-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input-field {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}
.input-field:focus {
  border-color: #d02d1d;
  outline: none;
}
.custom-file-upload {
  display: block;
  padding: 12px;
  border: 2px dashed #ccc;
  border-radius: 5px;
  text-align: center;
  color: #666;
  cursor: pointer;
  transition: border-color 0.3s;
}
.custom-file-upload:hover {
  border-color: #d02d1d;
}
.image-preview img {
  margin-top: 10px;
  border-radius: 5px;
  max-width: 120px;
  max-height: 120px;
  object-fit: cover;
}
.form-produto .btn {
  background-color: #d02d1d;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.form-produto .btn:hover {
  background-color: #b52b1c;
}
.input-field.small {
  padding: 10px;
  font-size: 14px;
}
.cards-section .add-btn, .card-item .excluir-btn3 {
  width: 100%;
}
.produtos-table {
  width: 100%;
  font-family: "Arial", sans-serif;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  background: #f6f6f6;
}
.produtos-table thead {
  background-color: #f6f6f6;
  color: #1e1e1e;
}
.produtos-table thead th {
  padding: 15px;
  text-align: left;
  font-weight: bold;
  letter-spacing: 0.5px;
}
.produtos-table tbody tr {
  border-bottom: 1px solid #b00020;
  transition: background 0.3s ease;
}
.produtos-table tbody tr:hover {
  background-color: #2727271f;
}
.produtos-table tbody td {
  padding: 10px 13px;
  color: #333;
  border: 1px solid #fff;
}
.produto-thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}
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
.header-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.btn.criar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d02d1d;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
.criar-btn svg {
  margin-right: 5px;
}
.excel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #242424;
  font-size: 15px;
  cursor: pointer;
  position: relative;
}
.excel-btn svg {
  margin-right: 5px;
}
.excel-dropdown {
  position: relative;
}
.excel-options {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 118%;
  width: 10em;
  right: -36px;
  background-color: #f6f6f6;
  border-radius: 5px;
  flex-direction: column;
  z-index: 1000;
}
.excel-options button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: none;
  border: none;
  color: black;
  padding: 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s;
}
.excel-options svg {
  margin-right: 5px;
}
.excel-options button:hover {
  background-color: #e8e8e8;
}
.editar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #272727;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
  color: #fff;
  font-size: 15px;
  width: 100%;
  cursor: pointer;
}
.editar-btn svg {
  margin-right: 5px;
}
.excluir-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b00020;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-top: 5px;
  color: #fff;
  font-size: 15px;
  width: 100%;
  cursor: pointer;
}
.excluir-btn svg {
  margin-right: 5px;
}
.content {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
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
@media (max-width: 768px) {
  .modal-content {
    max-width: 90%;
  }
}
@media (max-width: 2560px) {
  .header h1 {
    font-size: 2.5rem;
  }
  .btn {
    font-size: 1.1rem;
  }
}
@media (max-width: 1920px) {
  .header h1 {
    font-size: 2.2rem;
  }
  .btn {
    font-size: 1rem;
  }
}
@media (max-width: 1366px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header-buttons {
    margin-top: 10px;
  }
  .produtos-table,
  .produtos-table th,
  .produtos-table td {
    font-size: 0.9rem;
  }
  .produto-thumb {
    width: 40px;
    height: 40px;
  }
}
@media (max-width: 1024px) {
  .modal-content {
    width: 90%;
  }
}
@media (max-width: 768px) {
  .header h1 {
    font-size: 1.8rem;
  }
  .btn {
    font-size: 0.9rem;
    padding: 6px;
  }
  .produtos-table,
  .produtos-table th,
  .produtos-table td {
    font-size: 0.8rem;
  }
  .produto-thumb {
    width: 35px;
    height: 35px;
  }
}
@media (max-width: 480px) {
  .header {
    padding: 10px;
  }
  .header h1 {
    font-size: 1.5rem;
  }
  .header-buttons {
    width: 100%;
    justify-content: space-between;
  }
  .excel-options {
    width: 8em;
    right: 0;
  }
  .produtos-table,
  .produtos-table th,
  .produtos-table td {
    font-size: 0.75rem;
  }
}
@media (max-width: 375px) {
  .header {
    padding: 8px;
  }
  .header h1 {
    font-size: 1.4rem;
  }
  .btn {
    font-size: 0.75rem;
    padding: 5px;
  }
  .produtos-table,
  .produtos-table th,
  .produtos-table td {
    font-size: 0.7rem;
  }
  .produto-thumb {
    width: 30px;
    height: 30px;
  }
}
</style>
