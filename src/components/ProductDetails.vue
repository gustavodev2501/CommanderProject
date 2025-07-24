<template>
  <div class="container">
    <TopbarSiteComponent :cart="cart" />

    <AlertMessage
      v-if="alertMessage"
      :message="alertMessage"
      :type="alertType"
      @closed="alertMessage = ''"
    />

    <div class="product-container">
      <div class="product-images">
        <div class="main-image">
          <button
            v-if="product.imagens && product.imagens.length > 1"
            class="arrow-button left"
            @click="previousImage"
          >
            ←
          </button>
          <img
            v-if="product.imagens && product.imagens.length"
            :src="product.imagens[currentImageIndex]"
            :alt="product.nome"
          />
          <div v-else class="image-placeholder">Imagem indisponível</div>
          <button
            v-if="product.imagens && product.imagens.length > 1"
            class="arrow-button right"
            @click="nextImage"
          >
            →
          </button>
        </div>
        <div class="image-grid">
          <img
            v-for="(imagem, index) in product.imagens"
            :key="index"
            :src="imagem"
            :alt="`${product.nome} view ${index}`"
            @click="setCurrentImage(index)"
            :class="{ active: index === currentImageIndex }"
          />
        </div>
      </div>

      <div class="product-info">
        <div class="category">{{ product.categoria || 'Categoria' }}</div>
        <h1 class="product-title">{{ product.nome || 'Produto sem nome' }}</h1>

        <div class="rating" v-if="product.avaliacoes">
          <span class="stars">★★★★★</span>
          <span class="review-count">
            ({{ product.avaliacoes.media }}) {{ product.avaliacoes.total }} Reviews
          </span>
        </div>

        <p class="description">
          {{ product.detalhes || 'Sem descrição disponível.' }}
        </p>

        <div class="price" v-if="product.preco">
          ${{ product.preco }}
        </div>

        <div class="creator-info">
          <p class="product-creator">
            <strong>Criado por:</strong> {{ product.criadoPor || '-' }}
          </p>
          <p class="product-date">
            <strong>Criado em:</strong> {{ product.criadoEm || '-' }}
          </p>
        </div>

        <div v-if="product.novidades && product.novidades.length" class="features">
          <h3>Novidades / Diferenciais:</h3>
          <ul>
            <li v-for="(item, _index) in product.novidades" :key="_index">
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="action-buttons">
          <button class="icon-button" @click="addToCart">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>

    <section class="similar-products">
      <h2>OUTROS PRODUTOS</h2>
      <div class="products-grid">
        <div
          v-for="item in products"
          :key="item.id"
          class="product-card"
          @click="goToProduct(item.id)"
        >
          <div class="carousel-image">
            <img
              v-if="item.imagens && item.imagens.length"
              :src="item.imagens[0]"
              :alt="item.nome"
            />
            <div v-else class="image-placeholder">Imagem indisponível</div>
          </div>
          <h3>{{ item.nome }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TopbarSiteComponent from '@/components/TopbarSiteComponent.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import { db } from '@/firebase.js'
import { ref, onValue } from 'firebase/database'

export default {
  name: 'ProductDetails',
  components: { 
    TopbarSiteComponent,
    AlertMessage 
  },
  data() {
    return {
      product: {},
      products: [],
      currentImageIndex: 0,
      cart: [], 
      alertMessage: '',
      alertType: 'success' 
    }
  },
  created() {
    this.fetchProductData(this.$route.params.id)
    this.fetchSimilarProducts(this.$route.params.id)
    
    // Recupera o carrinho do localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      this.cart = JSON.parse(storedCart)
    }
  },
  methods: {
    fetchProductData(id) {
      const productRef = ref(db, 'equipamentos/' + id)
      onValue(productRef, snapshot => {
        const data = snapshot.val()
        if (data) {
          this.product = { id, ...data }
          this.currentImageIndex = 0
        }
      })
    },
    fetchSimilarProducts(currentId) {
      const productsRef = ref(db, 'equipamentos')
      onValue(productsRef, snapshot => {
        const data = snapshot.val()
        if (data) {
          this.products = Object.keys(data)
            .map(key => ({ id: key, ...data[key] }))
            .filter(item => item.id !== currentId)
        }
      })
    },
    previousImage() {
      if (!this.product.imagens || this.product.imagens.length === 0) return
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.product.imagens.length) %
        this.product.imagens.length
    },
    nextImage() {
      if (!this.product.imagens || this.product.imagens.length === 0) return
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.product.imagens.length
    },
    setCurrentImage(index) {
      this.currentImageIndex = index
    },
    addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push({
        id: this.product.id,
        nome: this.product.nome,
        preco: this.product.preco,
        imagem: (this.product.imagens && this.product.imagens.length)
          ? this.product.imagens[0]
          : ''
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      this.cart = cart
      this.alertType = 'success'
      this.alertMessage = 'Produto adicionado ao carrinho!'
    },
    goToProduct(productId) {
      this.$router.push({ name: 'ProductDetails', params: { id: productId } })
    }
  },
  beforeRouteUpdate(to, from, next) {
    const newId = to.params.id
    this.fetchProductData(newId)
    this.fetchSimilarProducts(newId)
    next()
  }
}
</script>

<style scoped>

.container {
  margin: 0 auto;
  padding: 0 24px;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding: 48px 0;
}

.product-images {
  display: grid;
  gap: 24px;
}

.main-image {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #f7f7f7;
  min-height: 400px;
  max-height: 671px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.arrow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  z-index: 1;
}

.arrow-button.left {
  left: 16px;
}

.arrow-button.right {
  right: 16px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.image-grid img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
}

.image-grid img.active {
  border-color: black;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.product-info {
  padding: 24px 0;
}

.category {
  color: #666;
  margin-bottom: 8px;
}

.product-title {
  font-size: 32px;
  margin-bottom: 16px;
  color: #333;
}

.rating {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.stars {
  color: gold;
}

.description {
  margin-bottom: 24px;
  line-height: 1.6;
  color: #555;
}

.price {
  font-size: 32px;
  font-weight: bold;
  margin: 24px 0;
}

.creator-info {
  margin: 24px 0;
}

.product-creator,
.product-date {
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #777;
}

.features {
  margin: 24px 0;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  margin: 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.icon-button {
  background: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
}

.similar-products {
  padding: 48px 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 24px;
}

.product-card {
  text-align: center;
  cursor: pointer;
}

.carousel-image {
  height: 200px;
  background: #f0f0f0;
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
