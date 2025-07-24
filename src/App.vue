<template>
  <div id="app">
    <nav>
      <!-- Seu menu ou navegação -->
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // Injetar o script somente em ambiente de produção
    if (process.env.NODE_ENV === "production") {
      const script = document.createElement("script");
      script.defer = true;
      script.src = "https://static.vercel-insights.com/v1/script.js";
      document.head.appendChild(script);
    }
  },
};
</script>

<style>
/* Seus estilos */
</style>
