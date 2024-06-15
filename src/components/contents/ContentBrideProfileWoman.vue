<script setup>
import { ref, onMounted } from 'vue'
import { useWeddingInformationStore } from '@/stores/wedding-information'

import BrideImage from '@partials/BrideImage.vue'
import BrideProfile from '@partials/BrideProfile.vue'
import SectionContent from '@partials/SectionContent.vue'
import SectionContentWrapper from '@partials/SectionContentWrapper.vue'

const information = useWeddingInformationStore().getInformation()
const image = ref('')

onMounted(async () => {
  image.value = (await information.brides.bride.photo.src).default
})
</script>

<template>
  <SectionContent
    :isCover="false"
    :overflowAuto="false"
    :sectionSplitter="true"
    :showSplitterOnMediumScreen="true"
  >
    <SectionContentWrapper>
      <BrideImage :src="image" :alt="information.brides.bride.photo.alt" />
      <BrideProfile
        :name="information.brides.bride.name"
        :title="information.brides.bride.title"
        :birthOrder="information.brides.bride.birthOrder"
        :parents="information.brides.bride.parents"
      />
    </SectionContentWrapper>
  </SectionContent>
</template>
