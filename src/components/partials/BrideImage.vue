<script setup>
defineProps({
  src: String
})
</script>

<template>
  <div class="bride-image relative">
    <img
      :src="src"
      alt="Men Bride - Ghaniy"
      class="w-full max-w-52 h-auto m-auto rounded-2xl shadow-xl"
    />
    <div class="lottie-animation absolute w-full max-w-32 md:left-5 -top-10 rotate-180">
      <LottieAnimation
        autoplay
        animationLink="https://lottie.host/c80e2861-bfb2-4db7-8f33-9c864c9f5581/3lGG0Rbh8B.json"
      />
    </div>
  </div>
</template>
