<template>
  <div class="container">
    <div class="topbar">
      <div class="logomarca">
        <img src="../assets/logog2.png" alt="Logo" />
      </div>
      <button class="menu-icon" @click="toggleMobileMenu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor"
          stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2">
          <path d="M4 6l16 0"></path>
          <path d="M4 12l16 0"></path>
          <path d="M4 18l16 0"></path>
        </svg>
      </button>
      <div class="links">
        <li><a href="/">Início</a></li>
        <li><a href="/catalogo">Produtos</a></li>
        <li><a href="/central-educativa">Central Educativa</a></li>
      </div>
      <div class="topbar-right">
        <div class="cart-container" @click="toggleCartDropdown">
          <span class="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2">
              <path d="M17.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"></path>
              <path d="M6 8v11a1 1 0 0 0 1.806 .591l3.694 -5.091v.055"></path>
              <path d="M6 8h15l-3.5 7l-7.1 -.747a4 4 0 0 1 -3.296 -2.493l-2.853 -7.13a1 1 0 0 0 -.928 -.63h-1.323">
              </path>
            </svg>
          </span>
          <span class="cart-count" v-if="cartItems && cartItems.length">{{ cartItems.length }}</span>
          <div class="cart-dropdown" v-if="cartDropdownOpen">
            <ul v-if="cartItems && cartItems.length">
              <li v-for="(item, index) in cartItems" :key="index">
                <img :src="item.imagem" alt="item image" />
                <span>{{ item.nome }}</span> - ${{ item.preco }}
                <!-- Botão para remover o item -->
                <button class="remove-btn" @click.stop="removeFromCart(index)">X</button>
              </li>
            </ul>
            <p v-else>Seu carrinho está vazio</p>
            <!-- Botão de Finalizar Compra -->
            <button v-if="cartItems && cartItems.length" class="btn finish-btn" @click.stop="finishPurchase">
              Finalizar Compra
            </button>
          </div>
        </div>
        <!-- <div class="button">
          <button class="btn">Faça seu orçamento!</button>
        </div> -->
      </div>
    </div>
    <div class="mobile-menu" v-if="mobileMenuOpen">
      <ul>
        <li><a href="">Nossas linhas</a></li>
        <li><a href="">Catálogo</a></li>
        <li><a href="">Sobre nós</a></li>
        <li><a href="">Central Educativa</a></li>
        <li><a href="">Contato</a></li>
        <li>
          <button class="btn">Faça seu orçamento!</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopbarSiteComponent",
  data() {
    return {
      mobileMenuOpen: false,
      cartDropdownOpen: false,
      // Inicializa o carrinho a partir do localStorage ou como array vazio
      cartItems: JSON.parse(localStorage.getItem("cart")) || []
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    toggleCartDropdown() {
      this.cartDropdownOpen = !this.cartDropdownOpen;
    },
    finishPurchase() {
      // Redireciona para a tela de Checkout (o carrinho já está salvo no localStorage)
      this.$router.push("/checkout");
    },
    removeFromCart(index) {
      // Remove o item do carrinho localmente
      this.cartItems.splice(index, 1);
      // Atualiza o localStorage para refletir a alteração
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    }
  }
}
</script>

<style scoped>
/* (Seu CSS existente permanece inalterado) */
.container {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #F6F6F6;
  padding: 15px;
  border-radius: 10px;
}

.logomarca img {
  width: 50px;
  height: 50px;
  border-radius: 100px;
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black !important;
}

.links li {
  margin-left: 20px;
  color: black !important;
}

a {
  color: black !important;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-container {
  position: relative;
  cursor: pointer;
}

.cart-icon {
  font-size: 24px;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -10px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

.cart-dropdown {
  position: absolute;
  right: 0;
  top: 30px;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  min-width: 200px;
}

.cart-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-dropdown li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.cart-dropdown li img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 5px;
}

.remove-btn {
  margin-left: auto;
  background: transparent;
  border: none;
  color: red;
  font-weight: bold;
  cursor: pointer;
}

.btn {
  padding: 10px;
  background-color: #D02D1D;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: white !important;
}

.finish-btn {
  width: 100%;
  margin-top: 8px;
}

.menu-icon {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.menu-icon span {
  display: block;
  height: 3px;
  background-color: #fff;
  border-radius: 2px;
}

.mobile-menu {
  background-color: #212121;
  border-radius: 0;
  margin-top: 10px;
}

.mobile-menu ul {
  list-style: none;
  padding: 10px;
  margin: 0;
}

.mobile-menu li {
  margin: 10px 0;
}

@media (max-width: 768px) {
  .topbar {
    justify-content: space-between;
  }

  .links,
  .button {
    display: none;
  }

  .menu-icon {
    display: flex;
  }

  .container {
    position: relative;
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 10px;
    background-color: #F6F6F6;
    z-index: 10;
  }
}
</style>
