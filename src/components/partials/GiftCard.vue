<script setup>
defineProps({
    cardBackgroundIlustration: String,
})
</script>

<template>
  <div class="gift-card w-full relative">
    <img
      :src="cardBackgroundIlustration"
      alt="Card Background Ilustration"
      class="w-full max-w-48 m-0 absolute bottom-0 opacity-20"
    />
    <div
      class="card-content flex flex-col gap-4 mt-10 justify-between p-5 bg-amber-500 text-left w-full h-52 md:h-60 rounded-lg shadow-md"
    >
      <div class="card-header text-xl flex justify-between items-center">
        <slot name="card-header"></slot>
      </div>
      <div class="card-information text-right flex flex-col gap-2 z-10">
        <slot name="card-information"></slot>
      </div>
    </div>
  </div>
</template>
