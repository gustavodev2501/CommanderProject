<template>
  <div>

    <div class="whats-app">
      <a class="whats" href="https://api.whatsapp.com/send?phone=5511999999999&text=Eu gostaria de tirar uma dúvida poderia me ajudar por favor?"
      target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#5CB338"
          stroke-linecap="round" stroke-linejoin="round" width="60" height="60" stroke-width="2.25">
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1">
          </path>
        </svg>
      </a>
    </div>

    <div class="topbar2">
      <div class="topbar-content">
        <div class="logomarca">
          <img src="../assets/sadasd.png" alt="Logo" />
        </div>

        <div class="links" :class="{ active: isMenuActive }">
          <ul>
            <li><a href="/">Início</a></li>
            <li><a href="/catalogo">Produtos</a></li>
            <li><a href="/central-educativa">Central Educativa</a></li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=5511999999999&text=Eu gostaria de tirar uma dúvida poderia me ajudar por favor?"
                target="_blank" rel="noopener noreferrer">
                Fale conosco
              </a>
            </li>
          </ul>
        </div>

        <div class="btn">
        </div>
      </div>

      <div class="menu-icon" @click="toggleMenu">
        <svg width="30" height="30" viewBox="0 0 100 80" fill="currentColor">
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      </div>
    </div>

    <section class="apresentation">
      <div class="container">
        <video autoplay loop muted playsinline class="background-video">
          <source :src="homeConfig.videoUrl ? homeConfig.videoUrl : videoDefault" type="video/mp4" />
        </video>
        <div class="content">
          <div class="center">
            <h1>
              {{ homeConfig.centerH1 ||
                "Alcance a performance perfeita com nossos equipamentos de academia!" }}
            </h1>
            <p>
              {{ homeConfig.centerP ||
                "As melhores opções em equipamentos de academia estão aqui na Commander! Confira agora mesmo!" }}
            </p>
            <button class="btn2" @click="goToCatalogo">Ver catálogo</button>
          </div>
        </div>
      </div>
    </section>

    <div class="carousel-container">
      <button class="carousel-button left" @click="scrollLeft">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path
            d="M12 2a10 10 0 0 1 .324 19.995l-.324.005l-.324-.005a10 10 0 0 1 .324-19.995zm.707 5.293a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0-.083.094l-.064.092l-.052.098l-.044.11l-.03.112l-.017.126l-.003.075l.004.09l.007.058l.025.118l.035.105l.054.113l.043.07l.071.095l.054.058l4 4l.094.083a1 1 0 0 0 1.32-1.497l-2.292-2.293h5.585l.117-.007a1 1 0 0 0-.117-1.993h-5.586l2.293-2.293l.083-.094a1 1 0 0 0-.083-1.32z">
          </path>
        </svg>
      </button>

      <div class="carrousel-products" ref="carousel">
        <router-link v-for="(card, index) in carouselCards" :key="card.id || index"
          :to="{ name: 'ProductDetails', params: { id: card.id } }" class="cards-carrousel">
          <div class="imagem-carrousel">
            <img v-if="card.imagens && card.imagens.length" :src="card.imagens[0]" alt="Imagem do Produto" />
          </div>
          <p>{{ card.nome }}</p>
        </router-link>
      </div>

      <button class="carousel-button right" @click="scrollRight">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path
            d="M12 2l.324.005a10 10 0 1 1-.648 0l.324-.005zm.613 5.21a1 1 0 0 0-1.32 1.497l2.291 2.293h-5.584l-.117.007a1 1 0 0 0 .117 1.993h5.584l-2.291 2.293l-.083.094a1 1 0 0 0 1.497 1.32l4-4l.073-.082l.064-.089l.062-.113l.044-.11l.03-.112l.017-.126l.003-.075l-.007-.118l-.029-.148l-.035-.105l-.054-.113l-.071-.111a1.008 1.008 0 0 0-.097-.112l-4-4z">
          </path>
        </svg>
      </button>
    </div>

    <section class="depoimentos">
      <div class="top-depoimentos">
        <h1>Avaliações</h1>
      </div>
      <div class="avaliacao-list">
        <div class="card-avaliacao" v-for="(depoimento, idx) in depoimentosList" :key="idx">
          <div class="apostrofo">
            <h1>””</h1>
          </div>
          <p class="depoimento">{{ depoimento }}</p>
        </div>
      </div>
    </section>

    <section class="products">
      <div class="top-product">
        <h1>Produtos em <span class="color">Destaque</span>.</h1>
      </div>
      <div class="product-list">
        <router-link v-for="produto in produtosLimitados" :key="produto.id"
          :to="{ name: 'ProductDetails', params: { id: produto.id } }" class="card-product">
          <div class="imagem-product">
            <img v-if="produto.imagens && produto.imagens.length" :src="produto.imagens[0]" alt="Imagem do Produto" />
          </div>
          <p>{{ produto.nome }}</p>
        </router-link>
      </div>
    </section>

    <section class="form">
      <div class="top-form">
        <h1>Receba o seu orçamento</h1>
      </div>
      <div class="form-container">
        <div class="top-container">
          <h1>Chegou a hora de equipar a sua academia com equipamentos de última geração.</h1>
        </div>
        <form @submit.prevent="submitForm" class="inputs-container">
          <input placeholder="Nome" type="text" v-model="formData.nome" />
          <input placeholder="E-mail" type="email" v-model="formData.email" />
          <input placeholder="(DDD) + Número" type="tel" v-model="formData.telefone" />
          <button type="submit" class="btn4">Fale conosco!</button>
        </form>
      </div>
    </section>

    <!-- INÍCIO DO NOVO RODAPÉ -->
    <footer class="rodape">
      <div class="rodape-content">
        <div class="rodape-coluna">
          <img src="../assets/logog2.png" alt="Logo Commander" />
          <p>As melhores opções em equipamentos de academia estão aqui na Commander! Confira agora mesmo!</p>
        </div>
        <div class="rodape-coluna">
          <h4>Navegação</h4>
          <ul>
            <li><a href="/">Início</a></li>
            <li><a href="/catalogo">Produtos</a></li>
            <li><a href="/central-educativa">Central Educativa</a></li>
            <li><a href="https://api.whatsapp.com/send?phone=5511999999999&text=Eu%20gostaria%20de%20tirar%20uma%20dúvida" target="_blank" rel="noopener noreferrer">Fale Conosco</a></li>
          </ul>
        </div>
        <div class="rodape-coluna">
          <h4>Contato</h4>
          <p>commander.brasil@commanderbrasil.com.br</p>
          <p>By Song Shop</p>
          <p>CNPJ: 42.594.508/0001-05</p>
        </div>
      </div>
      <div class="rodape-bottom">
        <p>©2025 Commander Brasil. Todos os direitos reservados.</p>
        <!-- <p>Desenvolvido por <a href="#">Song Shop</a></p> -->
      </div>
    </footer>
    <!-- FIM DO NOVO RODAPÉ -->
  </div>
</template>

<script>
import { db } from "@/firebase";
import { ref as dbRef, onValue } from "firebase/database";
import videoDefault from "@/assets/video.mp4";

export default {
  name: "HomeComponent",
  data() {
    return {
      // Dados do Topbar
      isMenuActive: false,

      // Dados para o restante da Home
      produtos: [],
      homeConfig: {
        videoUrl: "",
        centerH1: "",
        centerP: "",
        img1Url: "",
        img2Url: ""
      },
      carouselCards: [],
      depoimentosList: [
        "As máquinas são extremamente confortáveis e realmente fazem a diferença nos meus treinos. A ergonomia é excelente, sinto que meu corpo está sempre na posição certa, reduzindo o cansaço e prevenindo lesões.",
        "Outra avaliação aqui, o layout se adapta a mensagens de diversos tamanhos!",
        "Mais uma avaliação, o layout é flexível e se adapta bem a diferentes conteúdos."
      ],
      formData: {
        nome: "",
        email: "",
        telefone: ""
      }
    };
  },
  created() {
    this.fetchProdutos();
    const configRef = dbRef(db, "configuracoes/home");
    onValue(configRef, (snapshot) => {
      if (snapshot.exists()) {
        this.homeConfig = snapshot.val();
      }
    });
  },
  methods: {
    // Métodos do Topbar
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    goToCatalogo() {
      // Redireciona para a rota "/catalogo"
      this.$router.push("/catalogo");
    },
    // Métodos da HomeComponent
    fetchProdutos() {
      const equipamentosRef = dbRef(db, "equipamentos");
      onValue(equipamentosRef, (snapshot) => {
        const data = snapshot.val() || {};
        this.produtos = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        this.carouselCards = this.produtos.slice(0, 12);
      });
    },
    scrollLeft() {
      this.$refs.carousel.scrollBy({
        left: -this.$refs.carousel.clientWidth,
        behavior: "smooth"
      });
    },
    scrollRight() {
      this.$refs.carousel.scrollBy({
        left: this.$refs.carousel.clientWidth,
        behavior: "smooth"
      });
    },
    submitForm() {
      console.log("Dados do formulário:", this.formData);
      this.$router.push({ name: "CatalogoComponent" });
    }
  },
  computed: {
    produtosLimitados() {
      return this.produtos.slice(0, 12);
    },
    videoDefault() {
      return videoDefault;
    }
  }
};
</script>

<style scoped>

.whats-app{
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1001; /* Garante que fique acima do rodapé */
}

.whats{
  background-color: transparent;
}

/* ---------- Estilos do Topbar ---------- */
.topbar2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(245, 247, 248, 0.8);
  /* Fundo semi-transparente para sobrepor o vídeo */
}

.topbar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logomarca img {
  width: 622px;
  max-width: 100%;
  height: auto;
}

.links {
  margin-top: 30px;
}

.links ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

.links a {
  text-decoration: none;
  color: #1e1e1e;
  font-size: 31px;
  margin-right: 20px;
  margin-left: 20px;
}

.btn {
  margin-top: 10px;
}

.orcamentobtn {
  padding: 10px 15px;
  background-color: #d02d1d;
  border: none;
  border-radius: 5px;
  color: #fff;
}

/* Ícone do menu (mobile) */
.menu-icon {
  display: none;
  cursor: pointer;
  margin-top: 10px;
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

  /* Exibe os itens do menu em coluna */
  .links ul {
    flex-direction: column;
    gap: 10px;
  }

  /* Ajusta o tamanho da logo em telas menores */
  .logomarca img {
    width: 300px;
  }
}

/* ---------- Estilos já existentes da HomeComponent ---------- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  font-family: Arial, sans-serif;
}

.apresentation {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1em;
}

.center {
  text-align: center;
  color: #fff;
  width: 80%;
}

.center h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: bold;
}

.center p {
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin-top: 10px;
  color: #a8a8a8;
}

.btn2 {
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(208, 45, 29, 0.18);
  border: 2px solid #d02d1d;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: background 0.6s;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.btn2:hover {
  background-color: #d02d1d;
}

.carousel-container {
  position: relative;
  margin: 50px 0;
  width: 100%;
  display: flex;
  align-items: center;
}

.carrousel-products {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  padding: 0 50px;
}

.carrousel-products::-webkit-scrollbar {
  display: none;
}

.cards-carrousel {
  flex: 0 0 auto;
  width: clamp(150px, 20%, 300px);
  text-align: center;
}

.imagem-carrousel {
  width: 100%;
  height: 15em;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
}

.imagem-carrousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 2;
  border-radius: 50%;
  transition: background 0.3s;
}

.carousel-button.left {
  left: 10px;
}

.carousel-button.right {
  right: 10px;
}

.products {
  padding: 2em 1em;
  text-align: center;
}

.top-product h1 {
  color: #1e1e1e;
  font-size: 2rem;
}

.top-product .color {
  color: #d02d1d;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  padding: 0 1em;
}

.card-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
}

.imagem-product {
  width: 100%;
  height: 200px;
  background-color: #2b2b2b;
}

.imagem-product img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-product p {
  margin: 20px 0;
  font-size: 1.125rem;
  color: #1e1e1e;
}

.form {
  padding: 2em 1em;
  text-align: center;
}

.top-form h1 {
  color: #313131;
  font-size: 2rem;
}

.form-container {
  max-width: 36em;
  margin: 20px auto 0;
  padding: 20px;
  background-color: #f6f6f6;
  border-radius: 15px;
}

.top-container h1 {
  font-size: 0.9rem;
  color: #313131;
  margin-bottom: 20px;
}

.inputs-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.inputs-container input {
  padding: 15px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.btn4 {
  padding: 11px;
  background-color: #d02d1d;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: background 0.6s;
  margin-top: 15px;
}

.btn4:hover {
  background-color: #b02220;
}

.depoimentos {
  padding: 2em 1em;
  text-align: center;
}

.top-depoimentos h1 {
  font-size: 2rem;
  color: #313131;
}

.avaliacao-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.card-avaliacao {
  background-color: #f6f6f6;
  padding: 20px;
  border-radius: 10px;
  flex: 1 1 300px;
  max-width: 400px;
  box-sizing: border-box;
}

.apostrofo h1 {
  font-size: 3rem;
  color: #d02d1d;
  font-weight: bold;
}

.depoimento {
  font-size: 1.5rem;
  color: #313131;
  margin-top: 10px;
}

/* --- INÍCIO DOS ESTILOS DO NOVO RODAPÉ --- */
.rodape {
    background-color: #F6F6F6;
  color: black; /* Texto cinza claro */
  padding: 60px 5% 20px; /* Espaçamento: topo | laterais | fundo */
  margin-top: 60px; /* Espaço acima do rodapé */
}

.rodape-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
  max-width: 1200px; /* Limita a largura máxima do conteúdo */
  margin-left: auto;
  margin-right: auto;
}

.rodape-coluna {
  flex: 1;
  min-width: 220px; /* Largura mínima antes de quebrar a linha */
}

.rodape-coluna img {
  width: 120px;
  margin-bottom: 20px;
}

.rodape-coluna h4 {
  font-size: 1.1rem;
  color: black;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Efeito de linha abaixo dos títulos */
.rodape-coluna h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 2px;
  background-color: #d02d1d; /* Cor de destaque do site */
}

.rodape-coluna p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 10px;
  color: black;
}

.rodape-coluna ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rodape-coluna ul li {
  margin-bottom: 10px;
}

.rodape-coluna ul li a {
  color: black;
  text-decoration: none;
  transition: color 0.3s ease, padding-left 0.3s ease;
}

.rodape-coluna ul li a:hover {
  color: black;
  padding-left: 5px;
}

.rodape-bottom {
  border-top: 1px solid #333;
  padding-top: 20px;
  text-align: center;
  font-size: 0.85rem;
  color: black;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.rodape-bottom p {
  margin: 5px 0;
}

.rodape-bottom a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.rodape-bottom a:hover {
  color: #d02d1d;
  text-decoration: underline;
}
/* --- FIM DOS ESTILOS DO NOVO RODAPÉ --- */


/* Responsividade */
@media (max-width: 1024px) {
  .form-container {
    width: 90%;
  }

  .cards-carrousel {
    width: clamp(150px, 25%, 250px);
  }

  .imagem-carrousel {
    height: 13em;
  }
}

@media (max-width: 768px) {
  .avaliacao-list {
    flex-direction: column;
    align-items: center;
  }

  .card-avaliacao {
    width: 90%;
  }

  /* --- Responsividade do Rodapé --- */
  .rodape-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .rodape-coluna {
    width: 100%;
    max-width: 400px;
    margin-bottom: 30px;
  }

  .rodape-coluna:last-of-type {
    margin-bottom: 0;
  }

  .rodape-coluna h4::after {
    left: 50%;
    transform: translateX(-50%);
  }
  /* --- Fim da Responsividade do Rodapé --- */
}

@media (max-width: 480px) {
  .center h1 {
    font-size: 6vw;
  }

  .center p {
    font-size: 4vw;
  }

  .btn2 {
    width: 80%;
    font-size: 4vw;
    padding: 10px;
  }

  .carrousel-products {
    padding: 0 10px;
  }

  .imagem-carrousel {
    height: 10em;
  }

  .carousel-button {
    padding: 6px;
  }

  .product-list {
    grid-template-columns: 1fr;
  }

  .card-product p {
    font-size: 1rem;
  }

  .btn4 {
    padding: 10px;
  }
}

@media (max-width: 375px) {

  .center h1,
  .center p {
    width: 95%;
  }

  .btn2 {
    font-size: 4vw;
  }

  .carousel-button {
    padding: 4px;
  }

  .cards-carrousel {
    width: clamp(120px, 40%, 180px);
  }

  .imagem-carrousel {
    height: 8em;
  }

  .top-container h1 {
    font-size: 1.2rem;
  }

  .inputs-container input {
    padding: 10px;
    font-size: 0.9rem;
  }

  .card-avaliacao {
    padding: 10px;
  }

  .depoimento {
    font-size: 1rem;
  }
}
</style>
