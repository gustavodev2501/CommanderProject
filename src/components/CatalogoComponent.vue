<template>
  <div class="page">
    <TopbarSiteComponent />
    <div class="container">
      <div class="left-filter">
        <div class="top-filter">
          <h1>Filtro</h1>
        </div>
        <div class="body-filter">
          <div
            v-for="categoria in categorias"
            :key="categoria.id"
            class="categoria-item"
          >
            <input
              type="checkbox"
              :value="categoria.name"
              v-model="selectedCategories"
              :id="'cat-' + categoria.id"
            />
            <label :for="'cat-' + categoria.id">{{ categoria.name }}</label>
          </div>
        </div>
      </div>
      <div class="catalogo">
        <div class="top-catalogo">
          <h1>Catálogo</h1>
        </div>
        <div class="body-catalogo">
          <div
            class="card"
            v-for="produto in paginatedEquipamentos"
            :key="produto.id"
            @click="goToDetails(produto)"
          >
            <div
              class="imagem"
              :style="{
                backgroundImage:
                  (produto.imagens && produto.imagens.length)
                    ? 'url(' + produto.imagens[0] + ')'
                    : ''
              }"
            ></div>
            <p>{{ produto.nome }}</p>
          </div>
        </div>
        <div
          class="pagination"
          v-if="filteredEquipamentos.length > productsPerPage"
        >
          <button @click="prevPage" :disabled="currentPage === 1">
            Anterior
          </button>
          <span>{{ currentPage }} / {{ lastPage }}</span>
          <button @click="nextPage" :disabled="currentPage === lastPage">
            Próximo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import TopbarSiteComponent from '@/components/TopbarSiteComponent.vue';
import { db } from '@/firebase.js';
import { ref, onValue } from 'firebase/database';
  
export default {
  name: 'CatalogoComponent',
  components: { TopbarSiteComponent },
  data() {
    return {
      equipamentos: [],
      currentPage: 1,
      productsPerPage: 18,
      selectedCategories: []
    };
  },
  computed: {
    categorias() {
      const unique = new Set();
      this.equipamentos.forEach(e => {
        if (e.categoria) unique.add(e.categoria);
      });
      return Array.from(unique).map((cat, i) => ({ id: i, name: cat }));
    },
    filteredEquipamentos() {
      return this.selectedCategories.length
        ? this.equipamentos.filter(e =>
            this.selectedCategories.includes(e.categoria)
          )
        : this.equipamentos;
    },
    lastPage() {
      return Math.ceil(this.filteredEquipamentos.length / this.productsPerPage);
    },
    paginatedEquipamentos() {
      const start = (this.currentPage - 1) * this.productsPerPage;
      return this.filteredEquipamentos.slice(start, start + this.productsPerPage);
    }
  },
  watch: {
    selectedCategories() {
      this.currentPage = 1;
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.lastPage) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    goToDetails(produto) {
      this.$router.push({ name: 'ProductDetails', params: { id: produto.id } });
    }
  },
  created() {
    const equipamentosRef = ref(db, 'equipamentos');
    onValue(equipamentosRef, snapshot => {
      const data = snapshot.val();
      const list = [];
      for (let key in data) {
        list.push({ id: key, ...data[key] });
      }
      this.equipamentos = list;
    });
  },
  mounted() {
    // Carrega o Vercel Analytics apenas em produção
    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement('script');
      script.src = "https://cdn.vercel-analytics.com/script.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }
};
</script>
  
<style scoped>
/* Estilos padrões para desktop */
.container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.left-filter {
  width: 17%;
  height: 100vh;
  background-color: #f6f6f6;
  border-right: 2px solid #e6e6e6;
  overflow-y: auto;
}

.top-filter {
  border-top: 2px solid #e6e6e6;
  border-bottom: 2px solid #e6e6e6;
  padding: 15px;
  font-size: 13px;
}

.body-filter {
  margin-top: 10px;
  padding: 15px;
}

.categoria-item {
  margin-bottom: 10px;
  position: relative;
}

.categoria-item input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #272727;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  outline: none;
  margin-right: 10px;
}

.categoria-item input[type='checkbox']:checked {
  background-color: #1e1e1e;
  border-color: #1e1e1e;
}

.categoria-item input[type='checkbox']:checked::after {
  content: '✓';
  position: absolute;
  top: -4px;
  left: 1px;
  color: #fff;
  font-size: 16px;
}

.categoria-item label {
  cursor: pointer;
  font-size: 14px;
}

.catalogo {
  padding: 20px;
  flex: 1;
}

.top-catalogo h1 {
  margin-bottom: 15px;
}

/* Grid para distribuição dos cards */
.body-catalogo {
  margin-top: 15px;
  display: grid;
  /* Define colunas com largura mínima de 220px, adaptando-se conforme o espaço disponível */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.03);
}

.card p {
  margin-top: 10px;
  text-align: center;
}

.imagem {
  width: 100%;
  /* Mantém a proporção quadrada */
  aspect-ratio: 1 / 1;
  background-color: #e6e6e6;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 5px 10px;
  background-color: #1e1e1e;
  border: 1px solid #272727;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsividade para tablets e telas menores */
@media (max-width: 1024px) {
  .container {
    display: grid;
    grid-template-columns: 2fr;
    flex-direction: column;
  }

  .left-filter {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 2px solid #e6e6e6;
  }

  .catalogo {
    padding: 15px;
  }
}

/* Responsividade para celulares */
@media (max-width: 600px) {
  .left-filter {
    padding: 10px;
  }
  
  .top-filter {
    padding: 10px;
    font-size: 14px;
  }
  
  .body-filter {
    padding: 10px;
  }
  
  .catalogo {
    padding: 10px;
  }
  
  .body-catalogo {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-direction: column;
    gap: 5px;
  }
  
  .pagination span {
    font-size: 14px;
  }
}
</style>
