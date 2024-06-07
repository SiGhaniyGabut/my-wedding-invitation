<script setup>
import { onMounted, ref, onUnmounted, watch } from 'vue'
import { useEnvelopeStore } from './stores/envelope'
import { useGuestStore } from './stores/guest'

// Covers Components
import CoverEnvelope from './components/CoverEnvelope.vue'
import CoverInvitation from './components/CoverInvitation.vue'
import CoverBrideProfile from './components/CoverBrideProfile.vue'

// Content Components
import ContentHadit from './components/ContentHadit.vue'
import ContentAyah from './components/ContentAyah.vue'
import ContentBrideProfileMan from './components/ContentBrideProfileMan.vue'
import ContentBrideProfileWoman from './components/ContentBrideProfileWoman.vue'

import BackGround from './components/partials/BackGround.vue'
import FlowerVertical from './components/partials/FlowerVertical.vue'
import FlowerCorner from './components/partials/FlowerCorner.vue'

const envelopeStore = useEnvelopeStore()
const guestStore = useGuestStore()
const verticalFlowerOpacity = ref(0)

onMounted(() => {
  // Create observer to watch for cover elements visibility on viewport
  // If the element is visible, add event listener to change opacity value,
  // else remove the event listener
  const observer = new IntersectionObserver(
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

  onUnmounted(() => {
    observer.disconnect()
  })

  watch(
    () => guestStore.isGuestRegistered,
    (value) => {
      if (!value) return

      const coverElements = document.querySelectorAll('.cover')
      coverElements.forEach((coverElement) => observer.observe(coverElement))
    }
  )
})
</script>

<template>
  <main class="w-full mx-auto relative h-full">
    <BackGround />
    <div
      :class="envelopeStore.isEnvelopeOpened ? 'hidden' : 'block'"
      class="recipient-name text-center h-full"
    >
      <FlowerCorner />
      <CoverEnvelope />
    </div>
    <div
      :class="envelopeStore.isEnvelopeOpened ? 'block' : 'hidden'"
      class="background text-center h-full"
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
    </div>
  </main>
</template>
