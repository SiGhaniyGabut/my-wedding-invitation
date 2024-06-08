<script setup>
import { ref, onMounted } from 'vue'

import ImageGrid from './partials/ImageGrid.vue'
import SectionContent from './partials/SectionContent.vue'
import SectionContentWrapper from './partials/SectionContentWrapper.vue'

const imageFiles = [
  'IMAGE_XVI',
  'IMAGE_IX',
  'IMAGE_XI',
  'IMAGE_XII',
  'IMAGE_III',
  // 'IMAGE_I',
  'IMAGE_XIII',
  'IMAGE_IV'
]

const images = ref([])
const imageModules = ref({})
const imagesLoaded = ref(false)

onMounted(async () => {
  for (const image of imageFiles) {
    imageModules.value[image] = await import(`../assets/images/gallery/${image}.webp`)
  }

  images.value = Object.values(imageModules.value).map((image) => image.default)
  imagesLoaded.value = true
})
</script>

<template>
  <SectionContent :isCover="false" :overflowAuto="false" :sectionSplitter="true">
    <SectionContentWrapper>
      <ImageGrid :imageSources="images" v-if="imagesLoaded" />
    </SectionContentWrapper>
  </SectionContent>
</template>
