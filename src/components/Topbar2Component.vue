<template>
  <div class="topbar2">
    <div class="logomarca">
      <img src="../assets/logog2.png" alt="Logo" />
    </div>
    <div class="menu-icon" @click="toggleMenu">
      <svg width="30" height="30" viewBox="0 0 100 80" fill="currentColor">
        <rect width="100" height="10"></rect>
        <rect y="30" width="100" height="10"></rect>
        <rect y="60" width="100" height="10"></rect>
      </svg>
    </div>
    <div class="links" :class="{ active: isMenuActive }">
      <li><a href="/">Início</a></li>
      <li><a href="/catalogo">Produtos</a></li>
      <li><a href="/central-educativa">Central Educativa</a></li>
    </div>
    <div class="btn">
      <button class="orcamentobtn" @click="goToCatalogo">Orçamento</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topbar2Component",
  data() {
    return {
      isMenuActive: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    goToCatalogo() {
      // Redireciona para a rota "/catalogo"
      this.$router.push("/catalogo");
    }
  }
};
</script>

<style scoped>
.topbar2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #f5f7f8;
  position: relative;
}

.logomarca img {
  width: 55px;
}

.menu-icon {
  display: none;
  cursor: pointer;
}

.links {
  display: flex;
  align-items: center;
  list-style: none;
}

.links li {
  margin-right: 20px;
}

.links a {
  text-decoration: none;
  color: #1e1e1e;
}

.orcamentobtn {
  padding: 10px 15px;
  background-color: #d02d1d;
  border: none;
  border-radius: 5px;
  color: #fff;
}

@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }
  .links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    background: #fff;
    padding: 10px 0;
    border-radius: 10px;
    text-align: center;
  }
  .links.active {
    display: flex;
  }
}
</style>
