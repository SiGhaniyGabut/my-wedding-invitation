<script setup>
import { useEnvelopeStore } from '@/stores/envelope'

import FlowerCorner from '@/components/partials/FlowerCorner.vue'
import CoverEnvelope from '@/components/covers/CoverEnvelope.vue'

const envelopeStore = useEnvelopeStore()
</script>

<template>
  <Transition name="envelope" mode="out-in">
    <div class="envelope text-center h-full" v-if="!envelopeStore.isEnvelopeOpened">
      <FlowerCorner />
      <CoverEnvelope />
    </div>
  </Transition>
</template>

<style scoped>
.envelope-enter-active,
.envelope-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.envelope-enter,
.envelope-leave-to {
  opacity: 0;
}
</style>
