<template>
  <img
    class="vuetify-logo"
    alt="Vuetify Logo"
    src="/vuetify-logo.svg"
  >
</template>

<style>
.vuetify-logo {
  height: 180px;
  width: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes rotate {
  100% {
    transform: rotateX(90deg);
  }
}
</style>
