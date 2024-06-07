<script setup>
defineProps({
  overflowAuto: Boolean,
  isCover: Boolean,
  sectionSplitter: Boolean
})
</script>

<template>
  <section
    :class="{ cover: isCover }"
    class="content-container flex flex-col justify-center items-center w-full h-full relative"
  >
    <div class="overflow-auto" v-if="overflowAuto">
      <slot></slot>
    </div>
    <slot v-else></slot>

    <div class="section-splitter absolute -bottom-8 md:-bottom-14 w-full max-w-24 md:max-w-32" v-if="sectionSplitter">
      <LottieAnimation
        animationLink="https://lottie.host/439bcfc3-a4b6-4cf6-bfd4-3894a5f73a63/prGFxNhAQb.json"
        autoplay
        loop
      />
    </div>
  </section>
</template>
