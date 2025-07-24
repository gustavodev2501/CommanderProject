<template>
    <div style="display: none;"></div>
</template>

<script>
export default {
    name: "VercelAnalytics",
    mounted() {
        if (process.env.NODE_ENV === "production") {
            const script = document.createElement("script");
            script.defer = true;
            script.src = "https://static.vercel-insights.com/v1/script.js";
            document.head.appendChild(script);
        }
    },
};
</script>