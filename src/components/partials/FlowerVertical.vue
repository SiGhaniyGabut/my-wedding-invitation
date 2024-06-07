<script setup>
defineProps({
  opacity: Number
})
</script>

<template>
  <img
    :style="{ opacity: opacity + '%' }"
    src="@/assets/images/FLOWER_TOP-CENTER.webp"
    alt="Flower Top Center - Vertical"
    class="fixed top-0 w-full max-w-xs right-1/2 transform translate-x-1/2"
  />
  <img
    :style="{ opacity: opacity + '%' }"
    src="@/assets/images/FLOWER_BOTTOM-CENTER.webp"
    alt="Flower Bottom Center - Vertical"
    class="fixed bottom-0 w-full max-w-xs right-1/2 transform translate-x-1/2"
  />
</template>
