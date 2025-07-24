<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="top-sidebar">
      <div class="logomarca" @click="handleLogoClick">
        <img src="../assets/logog2.png" alt="">
      </div>
      <button v-if="!isCollapsed" class="toggle-btn" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-linecap="round"
          stroke-linejoin="round" width="20" height="20" stroke-width="2">
          <path d="M4 6l16 0"></path>
          <path d="M4 12l16 0"></path>
          <path d="M4 18l16 0"></path>
        </svg>
      </button>
    </div>
    <div class="body-sidebar">
      <!-- <a class="sidebar-link" href="/dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black"
          stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M13.41 10.59l2.59 -2.59"></path>
          <path d="M7 12a5 5 0 0 1 5 -5"></path>
        </svg>
        <span v-if="!isCollapsed" class="link-text">Dashboard</span>
      </a> -->
      <a class="sidebar-link" href="/criar-produto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-linecap="round"
          stroke-linejoin="round" width="20" height="20" stroke-width="2">
          <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
          <path d="M15 12h-6"></path>
          <path d="M12 9v6"></path>
        </svg>
        <span v-if="!isCollapsed" class="link-text">Criar Produto</span>
      </a>
      <a class="sidebar-link" href="/criar-aula">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2">
          <path
            d="M10 19h-6a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2z">
          </path>
          <path d="M12 5v16"></path>
          <path d="M7 7h1"></path>
          <path d="M7 11h1"></path>
          <path d="M16 7h1"></path>
          <path d="M16 11h1"></path>
          <path d="M16 15h1"></path>
        </svg>
        <span v-if="!isCollapsed" class="link-text">Criar Aula</span>
      </a>
      <a class="sidebar-link" href="/configuracoes">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2">
          <path
            d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z">
          </path>
          <path d="M10 9v6l5 -3z"></path>
        </svg>
        <span v-if="!isCollapsed" class="link-text">Configurações</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      isCollapsed: localStorage.getItem("sidebarCollapsed") === "true"
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      localStorage.setItem("sidebarCollapsed", this.isCollapsed);
    },
    handleLogoClick() {
      if (this.isCollapsed) {
        this.isCollapsed = false;
        localStorage.setItem("sidebarCollapsed", this.isCollapsed);
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 15%;
  background-color: #F6F6F6;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 4.7%;
}

.top-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar.collapsed .top-sidebar {
  justify-content: center;
}

.logomarca {
  width: 4em;
  height: 4em;
  transition: width 0.3s ease, height 0.3s ease;
  border-radius: 100%;
}

.logomarca img {
  width: 60px;
}

.sidebar.collapsed .logomarca {
  width: 3em;
  height: 3em;
}

.toggle-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2em;
  outline: none;
}

.body-sidebar {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-link {
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 5px;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s ease, padding 0.3s ease;
}

.sidebar-link:hover {
  background-color: #E8E8E8;
}

.sidebar.collapsed .sidebar-link {
  justify-content: center;
}

.link-text {
  transition: opacity 0.3s ease;
}

/* Responsive Styles */
@media (max-width: 1366px) {
  .sidebar {
    width: 20%;
  }

  .sidebar.collapsed {
    width: 8%;
  }
}

@media (max-width: 1024px) {
  .sidebar {
    width: 220px;
    padding: 15px;
  }

  .sidebar.collapsed {
    width: 70px;
  }

  .logomarca {
    width: 3.5em;
    height: 3.5em;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 180px;
    padding: 10px;
  }

  .sidebar.collapsed {
    width: 60px;
  }

  .sidebar-link {
    padding: 12px;
  }

  .logomarca {
    width: 3em;
    height: 3em;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 150px;
    padding: 8px;
  }

  .sidebar.collapsed {
    width: 50px;
  }

  .sidebar-link {
    padding: 10px;
  }

  .logomarca {
    width: 2.5em;
    height: 2.5em;
  }
}
</style>
