<script setup>
defineProps({
    time: Number,
    timeType: String
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="text-4xl">{{ time }}</div>
    <div>{{ timeType }}</div>
  </div>
</template>
