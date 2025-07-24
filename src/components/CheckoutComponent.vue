<template>
  <div>
    <TopbarSiteComponent :cart="cart" @remove-item="handleRemoveItem" />

    <AlertMessage v-if="alertMessage" :message="alertMessage" :type="alertType" @closed="alertMessage = ''" />

    <div class="checkout-container">
      <div class="cart-items">
        <h2>Equipamentos Selecionados</h2>
        <router-link to="/catalogo" class="back-link">Voltar para a loja</router-link>
        <div v-if="cart && cart.length">
          <div class="selected-item" v-for="(item, index) in cart" :key="index">
            <img :src="item.imagem" :alt="item.nome" class="product-image" />
            <div class="item-info">
              <p @click="handleRemoveItem(index)" class="remove-link" title="Clique para remover">
                {{ item.nome }}
              </p>
              <p>x 1</p>
            </div>
          </div>
        </div>
        <p v-else>Seu carrinho está vazio</p>
      </div>

      <div class="checkout-form">
        <h2>Receba seu Orçamento</h2>

        <div v-if="step === 1" class="email-section">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="formData.email" placeholder="Digite seu e-mail" />
          <button class="continue-btn" @click="nextStep" :disabled="!formData.email">
            Continuar
          </button>
        </div>

        <div v-else-if="step === 2" class="delivery-section">
          <h3>Informações para Orçamento</h3>
          <p class="required-fields">Todos os campos são obrigatórios.</p>
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Nome completo</label>
              <input type="text" v-model="formData.name" placeholder="Seu nome completo" />
            </div>
            <div class="form-group">
              <label>Telefone</label>
              <input type="tel" v-model="formData.phone" placeholder="Seu telefone" />
            </div>
            <div class="form-group">
              <label>WhatsApp</label>
              <input type="tel" v-model="formData.whatsapp" placeholder="Seu número de WhatsApp" />
            </div>
            <div class="form-group">
              <label>Estado</label>
              <select v-model="formData.state">
                <option value="">Selecione um estado</option>
                <option v-for="state in states" :key="state.id" :value="state.sigla">
                  {{ state.nome }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Cidade</label>
              <select v-model="formData.city">
                <option value="">Selecione uma cidade</option>
                <option v-for="city in cities" :key="city.id" :value="city.nome">
                  {{ city.nome }}
                </option>
              </select>
            </div>
          </div>
          <button class="continue-btn" @click="submitForm">
            Enviar
          </button>
        </div>

        <div v-else-if="step === 3" class="confirmation">
          <h2>Obrigado!</h2>
          <p>Sua solicitação foi enviada. Em breve entraremos em contato.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopbarSiteComponent from '@/components/TopbarSiteComponent.vue'
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  name: "CheckoutComponent",
  components: {
    TopbarSiteComponent,
    AlertMessage
  },
  data() {
    return {
      step: 1,
      cart: [],
      formData: {
        email: "",
        name: "",
        phone: "",
        whatsapp: "",
        city: "",
        state: ""
      },
      alertMessage: "",
      alertType: "error",
      states: [],
      cities: []
    }
  },
  created() {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      this.cart = JSON.parse(storedCart)
    }
    this.fetchStates()
  },
  watch: {
    "formData.state"(newState) {
      this.formData.city = ""
      this.fetchCities(newState)
    }
  },
  methods: {
    handleRemoveItem(index) {
      this.cart.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(this.cart))
    },
    nextStep() {
      if (this.formData.email) {
        this.step = 2
      }
    },
    submitForm() {
      if (
        !this.formData.name ||
        !this.formData.phone ||
        !this.formData.whatsapp ||
        !this.formData.city ||
        !this.formData.state
      ) {
        this.alertType = 'error'
        this.alertMessage = 'Por favor, preencha todos os campos obrigatórios.'
        return
      }

      const fixedWhatsAppNumber = "5511999999999"
      const message = `Olá, gostaria de um orçamento:\n\nEmail: ${this.formData.email}\nNome: ${this.formData.name}\nTelefone: ${this.formData.phone}\nWhatsApp: ${this.formData.whatsapp}\nCidade: ${this.formData.city}\nEstado: ${this.formData.state}\n\nProdutos: ${this.cart.map(item => item.nome).join(", ")}`
      const url = `https://wa.me/${fixedWhatsAppNumber}?text=${encodeURIComponent(message)}`
      window.open(url, '_blank')
      this.step = 3
    },
    fetchStates() {
      fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(response => response.json())
        .then(data => {
          this.states = data
        })
        .catch(error => console.error("Erro ao buscar estados:", error))
    },
    fetchCities(stateSigla) {
      if (!stateSigla) {
        this.cities = []
        return
      }
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateSigla}/municipios`)
        .then(response => response.json())
        .then(data => {
          this.cities = data
        })
        .catch(error => console.error("Erro ao buscar cidades:", error))
    }
  }
}
</script>

<style scoped>
.checkout-container {
  display: flex;
  gap: 32px;
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-items {
  flex: 1;
  padding-right: 32px;
  border-right: 1px solid #eee;
}

.back-link {
  color: #666;
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
}

.selected-item {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info p {
  margin: 0;
}

.remove-link {
  cursor: pointer;
  color: #d00;
  text-decoration: underline;
}

.checkout-form {
  flex: 2;
}

.email-section,
.delivery-section,
.confirmation {
  margin-top: 20px;
}

.email-section label,
.delivery-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input,
select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 16px;
}

.continue-btn {
  width: 100%;
  padding: 16px;
  background-color: #D02D1D;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.required-fields {
  color: #666;
  margin-bottom: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .checkout-container {
    flex-direction: column;
    padding: 16px;
  }

  .cart-items {
    padding-right: 0;
    border-right: none;
    margin-bottom: 32px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
