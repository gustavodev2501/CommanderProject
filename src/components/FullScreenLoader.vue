<template>
    <div class="fullscreen-loader">
        <div class="loader">
            <li class="ball"></li>
            <li class="ball"></li>
            <li class="ball"></li>
        </div>
    </div>
</template>

<script>
export default {
    name: "FullScreenLoader"
};
</script>

<style scoped>
.fullscreen-loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1e1e1e36;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.loader {
    width: 60px;
    display: flex;
    justify-content: space-evenly;
}

.ball {
    list-style: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fff;
}

.ball:nth-child(1) {
    animation: bounce-1 2.1s ease-in-out infinite;
}

@keyframes bounce-1 {
    50% {
        transform: translateY(-18px);
    }
}

.ball:nth-child(2) {
    animation: bounce-3 2.1s ease-in-out 0.3s infinite;
}

@keyframes bounce-2 {
    50% {
        transform: translateY(-18px);
    }
}

.ball:nth-child(3) {
    animation: bounce-3 2.1s ease-in-out 0.6s infinite;
}

@keyframes bounce-3 {
    50% {
        transform: translateY(-18px);
    }
}
</style>