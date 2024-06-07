<script setup>
defineProps({
  pageLoaded: Boolean
})
</script>

<template>
  <Transition name="loading" mode="out-in">
    <div class="loading-screen fixed w-full h-full z-50 backdrop-blur-lg" v-if="!pageLoaded">
      <div
        class="animation w-full absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2 flex flex-col items-center justify-center prose"
      >
        <LottieAnimation
          autoplay
          class="w-full max-w-64 h-auto"
          animationLink="https://lottie.host/9e3f614e-3856-452f-ac9e-12cfca2fb014/JBz9wNjZYq.json"
        />
        <p class="text-2xl font-black">LOADING</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-enter-active {
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-leave-active {
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-enter,
.loading-leave-to {
  opacity: 0;
}
</style>
