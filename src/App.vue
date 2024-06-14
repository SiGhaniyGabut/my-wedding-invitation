<script setup>
import { onMounted, ref } from 'vue'

import BackGround from '@partials/BackGround.vue'
import LoadingScreen from '@partials/LoadingScreen.vue'
import EnvelopeComponent from '@components/EnvelopeComponent.vue'
import InvitationContentComponent from '@components/InvitationContentComponent.vue'

const pageLoaded = ref(false)

onMounted(() => {
  window.onload = () => (pageLoaded.value = true)
})
</script>

<template>
  <main class="w-full mx-auto relative h-full">
    <LoadingScreen :pageLoaded="pageLoaded" />
    <BackGround />

    <!-- Envelope Component -->
    <EnvelopeComponent />

    <!-- Invitation Content Component -->
    <InvitationContentComponent />
  </main>
</template>
