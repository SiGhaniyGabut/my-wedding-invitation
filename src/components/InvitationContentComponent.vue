<script setup>
import { onMounted, ref, nextTick, watch } from 'vue'
import { useEnvelopeStore } from '../stores/envelope'

import FlowerVertical from './partials/FlowerVertical.vue'

// Covers Components
import CoverInvitation from './covers/CoverInvitation.vue'
import CoverBrideProfile from './covers/CoverBrideProfile.vue'
import CoverDateAndVenue from './covers/CoverDateAndVenue.vue'
import CoverMomentsAndGallery from './covers/CoverMomentsAndGallery.vue'
import CoverWeddingGift from './covers/CoverWeddingGift.vue'

// Content Components
import ContentHadit from './contents/ContentHadit.vue'
import ContentAyah from './contents/ContentAyah.vue'
import ContentBrideProfileMan from './contents/ContentBrideProfileMan.vue'
import ContentBrideProfileWoman from './contents/ContentBrideProfileWoman.vue'
import ContentDate from './contents/ContentDate.vue'
import ContentMoments from './contents/ContentMoments.vue'
import ContentGallery from './contents/ContentGallery.vue'
import ContentWeddingGift from './contents/ContentWeddingGift.vue'
import ContentThanks from './contents/ContentThanks.vue'
import ContentAuthorshipAndLicense from './contents/ContentAuthorshipAndLicense.vue'

const envelopeStore = useEnvelopeStore()
const verticalFlowerOpacity = ref(0)

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

    <!-- Wedding Gift -->
    <CoverWeddingGift />
    <ContentWeddingGift />

    <!-- Thanks -->
    <ContentThanks />

    <!-- Authorship and License -->
    <ContentAuthorshipAndLicense />
  </div>
</template>
