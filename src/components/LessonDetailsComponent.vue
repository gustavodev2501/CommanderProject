<template>
  <div class="container">
    <!-- Componente Topbar2 integrado -->
    <Topbar2Component />

    <div class="center">
      <div class="container-center">
        <div class="top-center">
          <div class="img">
            <img
              v-if="lesson.imagem"
              :src="getLessonImage(lesson.imagem)"
              alt="Imagem da Aula"
            />
          </div>
        </div>
        <div class="body-center">
          <div class="title">
            <h1>{{ lesson.titulo }}</h1>
            <p class="subtitle">
              {{
                lesson.subtitle
                  ? lesson.subtitle
                  : lesson.descricao
                    ? lesson.descricao.substring(0, 120) + "..."
                    : ""
              }}
            </p>
          </div>
          <div class="cards" v-if="lesson.cards && lesson.cards.length">
            <div v-for="(card, index) in lesson.cards" :key="index" class="card">
              <h2>{{ card.cardText }}</h2>
              <p>{{ card.cardDescription }}</p>
              <div v-if="card.paragraphs && card.paragraphs.length">
                <div
                  v-for="(paragraph, pIndex) in card.paragraphs"
                  :key="pIndex"
                  class="paragraph-step"
                >
                  <p class="paragraph-text">{{ paragraph.text }}</p>
                  <div v-if="paragraph.steps && paragraph.steps.length">
                    <p class="step-text">Etapas:</p>
                    <ul>
                      <li v-for="(step, sIndex) in paragraph.steps" :key="sIndex">
                        {{ step }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { ref as dbRef, get } from "firebase/database";
import Topbar2Component from "@/components/Topbar2Component.vue";

export default {
  name: "LessonDetailsComponent",
  components: {
    Topbar2Component
  },
  data() {
    return {
      lesson: {}
    };
  },
  methods: {
    getLessonImage(imagem) {
      if (!imagem) return "";
      if (imagem.startsWith("http") || imagem.startsWith("data:")) return imagem;
      return "../assets/" + imagem;
    }
  },
  mounted() {
    const lessonId = this.$route.params.id;
    const lessonRef = dbRef(db, `aulas/${lessonId}`);
    get(lessonRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.lesson = snapshot.val();
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar aula:", error);
      });
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  font-family: Arial, sans-serif;
}

.center {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.container-center {
  width: 50em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-center {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.img {
  width: 100%;
  max-height: 22em;
  background-color: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
}

.img img {
  max-width: 100%;
  display: block;
}

.body-center {
  width: 100%;
}

.title {
  text-align: start;
  margin-bottom: 15px;
}

.title h1 {
  font-size: 28px;
  margin: 0;
}

.subtitle {
  font-size: 16px;
  color: #9c9c9c;
  margin-top: 5px;
  width: 100%;
  word-wrap: break-word;
}

.cards {
  margin-top: 20px;
  width: 100%;
}

.card h2 {
  margin: 0 0 10px;
  font-size: 20px;
}

.card p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.paragraph-step {
  margin-bottom: 20px;
}

.paragraph-text {
  margin: 0;
  font-weight: bold;
}

.step-text {
  margin: 5px 0 0 10px;
  font-style: italic;
}
</style>
