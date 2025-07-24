<template>
    <transition name="slide-fade">
      <div v-if="visible" :class="['alert', alertTypeClass]">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'AlertMessage',
    props: {
      type: { type: String, default: 'system' },
      message: { type: String, default: '' },
      duration: { type: Number, default: 4000 } // 4 segundos
    },
    data() {
      return { visible: false }
    },
    computed: {
      alertTypeClass() {
        return this.type === 'success'
          ? 'alert-success'
          : this.type === 'error'
            ? 'alert-error'
            : 'alert-system'
      }
    },
    watch: {
      message(newVal) {
        if (newVal) { 
          this.showAlert() 
        }
      }
    },
    methods: {
      showAlert() {
        this.visible = true
        setTimeout(() => {
          this.visible = false
          this.$emit('closed')
        }, this.duration)
      }
    },
    mounted() {
      if (this.message) { 
        this.showAlert() 
      }
    }
  }
  </script>
  
  <style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  
  .slide-fade-enter {
    transform: translateY(100%);
    opacity: 0;
  }
  
  .slide-fade-enter-to {
    transform: translateY(0);
    opacity: 1;
  }
  
  .slide-fade-leave {
    opacity: 1;
  }
  
  .slide-fade-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
  
  .alert {
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    padding: 10px 15px;
    border-radius: 5px;
    color: black;
    z-index: 2000;
    white-space: nowrap; /* Apenas o tamanho do conteúdo */
    font-size: 1rem;
  }
  
  .alert-success {
    background-color: #44b45e44;
  }
  
  .alert-error {
    background-color: #b345504d;
  }
  
  .alert-system {
    background-color: #007bff;
  }
  </style>
  