import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../components/HomeComponent.vue';
import DashboardComponent from '../components/DashboardComponent.vue';
import CadastroComponent from '../components/CadastroComponent.vue';
import LoginComponent from '../components/LoginComponent.vue';
import CriarProdutoComponent from '../components/CriarProdutoComponent.vue';
import CatalogoComponent from '../components/CatalogoComponent.vue';
import ProductDetails from '../components/ProductDetails.vue';
import CheckoutComponent from '../components/CheckoutComponent.vue'; 
import CreateAulaComponent from '../components/CreateAulaComponent.vue'; 
import EducativaComponent from '../components/EducativaComponent.vue'; 
import LessonDetailsComponent from '../components/LessonDetailsComponent.vue'; 
import ConfiguracoesComponent from '../components/ConfiguracoesComponent.vue'; 

const routes = [
  { 
    path: '/', 
    name: 'HomeComponent', 
    component: HomeComponent, 
    meta: { title: 'Commander - Inicio' } 
  },
  { 
    path: '/dashboard', 
    name: 'DashboardComponent', 
    component: DashboardComponent, 
    meta: { title: 'Commander - Dashboard' } 
  },
  { 
    path: '/cadastro', 
    name: 'CadastroComponent', 
    component: CadastroComponent, 
    meta: { title: 'Commander - Cadastro' } 
  },
  { 
    path: '/login', 
    name: 'LoginComponent', 
    component: LoginComponent, 
    meta: { title: 'Commander - Login' } 
  },
  { 
    path: '/criar-produto', 
    name: 'CriarProdutoComponent', 
    component: CriarProdutoComponent, 
    meta: { title: 'Commander - Criar Produto' } 
  },
  { 
    path: '/catalogo', 
    name: 'CatalogoComponent', 
    component: CatalogoComponent, 
    meta: { title: 'Commander - Catalogo' } 
  },
  { 
    path: '/produto/:id', 
    name: 'ProductDetails', 
    component: ProductDetails, 
    meta: { title: 'Commander - Detalhes do Produto' } 
  },
  { 
    path: '/checkout', 
    name: 'CheckoutComponent', 
    component: CheckoutComponent, 
    meta: { title: 'Commander - Checkout' } 
  },
  { 
    path: '/criar-aula', 
    name: 'CreateAulaComponent', 
    component: CreateAulaComponent, 
    meta: { title: 'Commander - Criar Aula' } 
  },
  { 
    path: '/central-educativa', 
    name: 'EducativaComponent', 
    component: EducativaComponent, 
    meta: { title: 'Commander - Central Educativa' } 
  },
  { 
    path: '/aula/:id', 
    name: 'LessonDetailsComponent', 
    component: LessonDetailsComponent, 
    meta: { title: 'Commander - Detalhes da Aula' } 
  },
  { 
    path: '/configuracoes', 
    name: 'ConfiguracoesComponent', 
    component: ConfiguracoesComponent, 
    meta: { title: 'Commander - Configurações' } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  const defaultTitle = 'Minha Aplicação';
  document.title = to.meta.title || defaultTitle;
});

export default router;
