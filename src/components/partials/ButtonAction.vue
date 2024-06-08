<script setup>
defineProps({
  text: String,
  type: String
})
</script>

<template>
  <button
    :type="type"
    class="cormorant-garamond-bold text-xl outline-none border-none bg-rose-400 hover:bg-rose-200 rounded-md shadow-md transition duration-300 ease-in-out w-full p-2"
  >
    {{ text }}
  </button>
</template>
