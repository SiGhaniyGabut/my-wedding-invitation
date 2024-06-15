<script setup>
defineProps({
  name: String,
  title: String,
  birthOrder: String,
  parents: Object
})
</script>

<template>
  <p class="cormorant-garamond-bold text-2xl md:text-3xl">
    {{ name }}<span v-if="title">, {{ title }}</span>
  </p>
  <p class="">{{ birthOrder }} dari</p>
  <p class="cormorant-garamond-bold text-xl">{{ parents.father }} & {{ parents.mother }}</p>
</template>
