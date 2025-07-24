<template>
  <div class="container">
    <!-- Topbar integrada como componente -->
    <Topbar2Component />

    <!-- Seção central com as aulas -->
    <div class="center">
      <div class="top-center">
        <!-- Aula principal -->
        <div
          class="image-primary"
          v-if="primaryAula"
          :style="{ backgroundImage: 'url(' + getLessonImage(primaryAula.imagem) + ')' }"
          @click="goToLesson(primaryAula)"
        >
          <div class="aula-title">{{ primaryAula.titulo }}</div>
        </div>

        <!-- Aulas secundárias -->
        <div class="images-divs" v-if="secondaryRows.length">
          <div class="row" v-for="(row, rowIndex) in secondaryRows" :key="rowIndex">
            <div
              v-for="(aula, index) in row"
              :key="aula.id"
              :class="rowIndex === 0 ? (index === 0 ? 'img1' : 'img2') : 'img-card'"
              :style="{ backgroundImage: 'url(' + getLessonImage(aula.imagem) + ')' }"
              @click="goToLesson(aula)"
            >
              <div class="aula-title">{{ aula.titulo }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { ref as dbRef, onValue } from "firebase/database";
import Topbar2Component from "@/components/Topbar2Component.vue";

export default {
  name: "EducativaComponent",
  components: {
    Topbar2Component
  },
  data() {
    return {
      aulas: []
    };
  },
  computed: {
    sortedAulas() {
      return this.aulas.slice().sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));
    },
    primaryAula() {
      return this.sortedAulas.length ? this.sortedAulas[0] : null;
    },
    secondaryAulas() {
      return this.sortedAulas.slice(1);
    },
    secondaryRows() {
      const rows = [];
      for (let i = 0; i < this.secondaryAulas.length; i += 2) {
        rows.push(this.secondaryAulas.slice(i, i + 2));
      }
      return rows;
    }
  },
  methods: {
    fetchAulas() {
      const aulasRef = dbRef(db, "aulas");
      onValue(aulasRef, (snapshot) => {
        const data = snapshot.val() || {};
        this.aulas = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      });
    },
    getLessonImage(imagem) {
      if (!imagem) return "";
      if (imagem.startsWith("http") || imagem.startsWith("data:")) return imagem;
      return "../assets/" + imagem;
    },
    goToLesson(aula) {
      // Redireciona para a rota do componente de detalhes da aula
      this.$router.push({ name: "LessonDetailsComponent", params: { id: aula.id } });
    }
  },
  mounted() {
    this.fetchAulas();
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  font-family: Arial, sans-serif;
}

/* Os estilos da topbar foram movidos para o componente Topbar2Component */

/* Estilos para a seção central */
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.top-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.image-primary {
  width: 90%;
  height: 20em;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img1,
.img2,
.img-card {
  width: 50%;
  height: 20em;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aula-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  text-align: center;
  font-size: 1.5em;
}

.images-divs {
  width: 90%;
}

.row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .image-primary,
  .images-divs {
    width: 90%;
  }
  .row {
    flex-direction: column;
  }
  .img1,
  .img2,
  .img-card {
    width: 100%;
    height: 15em;
  }
}

@media (max-width: 480px) {
  .logomarca img {
    width: 45px;
  }
}
</style>
