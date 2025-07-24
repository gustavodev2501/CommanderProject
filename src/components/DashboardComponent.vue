<template>
    <div class="app-container">
      <SidebarComponent />
      <div class="main-content">
        <TopbarComponent />
  
        <div class="content">
          <!-- Cards de Métricas -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">🌍</div>
              <div class="stat-info">
                <div class="stat-label">Países Acessados</div>
                <div class="stat-value">{{ metrics.countriesAccessed }}</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">👀</div>
              <div class="stat-info">
                <div class="stat-label">Total de Visitas</div>
                <div class="stat-value">{{ metrics.totalVisits }}</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔥</div>
              <div class="stat-info">
                <div class="stat-label">Produto Mais Acessado</div>
                <div class="stat-value">{{ metrics.mostAccessedProduct }}</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📱</div>
              <div class="stat-info">
                <div class="stat-label">Dispositivos Acessados</div>
                <div class="stat-value">{{ metrics.devicesAccessed }}</div>
              </div>
            </div>
          </div>
  
          <!-- Estatísticas de Visitantes/Localidade -->
          <div class="user-stats">
            <div class="user-count">
              <div>
                <div class="stat-label">Localidades Atendidas</div>
                <div class="big-number">{{ metrics.localities }}</div>
                <div class="sub-text">Cidades</div>
              </div>
              <div>
                <div class="stat-label">Visitantes Únicos</div>
                <div class="big-number">{{ metrics.uniqueVisitors }}</div>
                <div class="sub-text">Último mês</div>
              </div>
              <div class="update-info">
                <span>Atualizado há 2s</span>
                <a href="#" @click.prevent="fetchMetrics" class="refresh-link">↻ Atualizar</a>
              </div>
            </div>
          </div>
  
          <!-- Grade Principal do Dashboard -->
          <div class="dashboard-grid">
            <!-- Lista de Planos Populares -->
            <div class="panel popular-plans">
              <div class="panel-header">
                <h3>Planos Populares</h3>
                <button class="add-btn">+ Adicionar Plano</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>PLANO</th>
                    <th>SESSÕES</th>
                    <th>AVALIAÇÃO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="plan in popularPlans" :key="plan.name">
                    <td>
                      <div class="plan-info">
                        <img :src="plan.icon" :alt="plan.name" />
                        <span>{{ plan.name }}</span>
                      </div>
                    </td>
                    <td>{{ plan.sessions }}</td>
                    <td>{{ plan.rating }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <!-- Gráfico Demográfico dos Membros -->
            <div class="panel demographics">
              <h3>Perfil dos Membros</h3>
              <div class="age-gender-chart">
                <!-- Insira aqui seu componente de gráfico (ex.: gráfico de barras ou pizza) -->
              </div>
            </div>
  
            <!-- Gráfico Radar com Preferências -->
            <div class="panel interests">
              <h3>Atividades Preferidas</h3>
              <div class="radar-chart">
                <!-- Insira aqui seu componente de gráfico radar -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import SidebarComponent from './SidebarComponent.vue'
  import TopbarComponent from './TopbarComponent.vue'
  
  export default {
    name: 'DashboardComponent',
    components: {
      SidebarComponent,
      TopbarComponent
    },
    data() {
      return {
        // Variável para armazenar as métricas recebidas da API
        metrics: {
          countriesAccessed: 0,
          totalVisits: 0,
          mostAccessedProduct: '',
          devicesAccessed: '',
          localities: 0,
          uniqueVisitors: 0
        },
        // Lista dos planos (ou produtos/serviços) populares
        popularPlans: []
      }
    },
    created() {
      this.fetchMetrics()
      this.fetchPopularPlans()
    },
    methods: {
      async fetchMetrics() {
        try {
          // Substitua a URL abaixo pelo endpoint real da sua API
          const response = await axios.get('https://api.example.com/analytics')
          const data = response.data
  
          // Atualize as métricas com os dados retornados
          this.metrics.countriesAccessed = data.countriesAccessed
          this.metrics.totalVisits = data.totalVisits
          this.metrics.mostAccessedProduct = data.mostAccessedProduct
          this.metrics.devicesAccessed = data.devicesAccessed
          this.metrics.localities = data.localities
          this.metrics.uniqueVisitors = data.uniqueVisitors
        } catch (error) {
          console.error('Erro ao buscar métricas:', error)
        }
      },
      async fetchPopularPlans() {
        try {
          // Substitua a URL abaixo pelo endpoint real que retorna os planos populares ou produtos
          const response = await axios.get('https://api.example.com/popular-plans')
          this.popularPlans = response.data
        } catch (error) {
          console.error('Erro ao buscar planos populares:', error)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
    height: 100vh;
  }
  
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f5f6fa;
  }
  
  .content {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .stat-icon {
    font-size: 24px;
    margin-right: 15px;
  }
  
  .stat-info {
    display: flex;
    flex-direction: column;
  }
  
  .stat-label {
    color: #666;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: 600;
  }
  
  .user-stats {
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .user-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .big-number {
    font-size: 28px;
    font-weight: 600;
    margin: 5px 0;
  }
  
  .sub-text {
    color: #666;
    font-size: 14px;
  }
  
  .refresh-link {
    color: blue;
    text-decoration: none;
    margin-left: 10px;
  }
  
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .panel {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .add-btn {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .plan-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .plan-info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    color: #666;
    font-weight: 500;
  }
  
  .demographics, .interests {
    height: 300px;
  }
  </style>
  