<script setup>
import { onMounted, ref, nextTick, watch } from 'vue'
import { useEnvelopeStore } from './stores/envelope'

// Covers Components
import CoverEnvelope from './components/CoverEnvelope.vue'
import CoverInvitation from './components/CoverInvitation.vue'
import CoverBrideProfile from './components/CoverBrideProfile.vue'
import CoverDateAndVenue from './components/CoverDateAndVenue.vue'
import CoverMomentsAndGallery from './components/CoverMomentsAndGallery.vue'

// Content Components
import ContentHadit from './components/ContentHadit.vue'
import ContentAyah from './components/ContentAyah.vue'
import ContentBrideProfileMan from './components/ContentBrideProfileMan.vue'
import ContentBrideProfileWoman from './components/ContentBrideProfileWoman.vue'
import ContentDate from './components/ContentDate.vue'
import ContentMoments from './components/ContentMoments.vue'

import BackGround from './components/partials/BackGround.vue'
import FlowerCorner from './components/partials/FlowerCorner.vue'
import FlowerVertical from './components/partials/FlowerVertical.vue'
import LoadingScreen from './components/partials/LoadingScreen.vue'
import ContentGallery from './components/ContentGallery.vue'

const envelopeStore = useEnvelopeStore()
const verticalFlowerOpacity = ref(0)
const pageLoaded = ref(false)

let intersectionObserver

const startIntersectionObserver = () => {
  nextTick(() => {
    const coverElements = document.querySelectorAll('.cover')

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            window.removeEventListener('scroll', () => opacityHandler(entry))
            return
          }

          window.addEventListener('scroll', () => opacityHandler(entry))
          opacityHandler(entry)
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    coverElements.forEach((coverElement) => intersectionObserver.observe(coverElement))
  })
}

const opacityHandler = (entry) => {
  if (!entry) return

  const rect = entry.target.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // Calculate percentage visible (0 to 1)
  const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0))
  const visibleRatio = visibleHeight / rect.height

  // Calculate number of verticalFlowerOpacity steps based on visibility (0 to 20)
  const steps = Math.floor(visibleRatio * 20)

  // Set verticalFlowerOpacity based on visibility
  verticalFlowerOpacity.value = Math.round(steps * 5)
}

onMounted(() => {
  window.onload = () => (pageLoaded.value = true)

  watch(
    () => envelopeStore.isEnvelopeOpened,
    (value) => {
      if (!value) return

      startIntersectionObserver()
    }
  )
})
</script>

<template>
  <main class="w-full mx-auto relative h-full">
    <LoadingScreen :pageLoaded="pageLoaded" />
    <BackGround />
    <Transition name="envelope" mode="out-in">
      <div class="envelope text-center h-full" v-if="!envelopeStore.isEnvelopeOpened">
        <FlowerCorner />
        <CoverEnvelope />
      </div>
    </Transition>
    <div
      :class="envelopeStore.isEnvelopeOpened ? 'visible' : 'hidden'"
      class="invitation text-center h-full"
    >
      <!-- Invitation contents starts here -->
      <FlowerVertical :opacity="verticalFlowerOpacity" />
      <CoverInvitation />

      <!-- The Importance of Wedding: Ayah and Hadit -->
      <ContentAyah />
      <ContentHadit />

      <!-- Bride Profile -->
      <CoverBrideProfile />
      <ContentBrideProfileMan />
      <ContentBrideProfileWoman />

      <!-- Wedding Date and Venue -->
      <CoverDateAndVenue />
      <ContentDate />

      <!-- Moments and Gallery -->
      <CoverMomentsAndGallery />
      <ContentMoments />
      <ContentGallery />
    </div>
  </main>
</template>

<style scoped>
.envelope-enter-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.envelope-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.envelope-enter,
.envelope-leave-to {
  opacity: 0;
}
</style>
