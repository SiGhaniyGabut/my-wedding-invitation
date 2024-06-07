<script setup>
import BrideImage from './partials/BrideImage.vue'
import ManBrideImage from '../assets/images/PROFILE_GHANIY.webp'
import SectionContent from './partials/SectionContent.vue'
import SectionContentWrapper from './partials/SectionContentWrapper.vue'
</script>

<template>
  <SectionContent :isCover="false" :overflowAuto="false" :sectionSplitter="true">
    <SectionContentWrapper>
      <BrideImage :src="ManBrideImage" />
      <p class="cormorant-garamond-bold text-2xl md:text-3xl">Abdul Hakim Ghaniy, S.Kom</p>
      <p class="">Anak Pertama dari</p>
      <p class="cormorant-garamond-bold text-xl">Bapak Nur Wahyudin & Ibu Rumiasih</p>
    </SectionContentWrapper>
  </SectionContent>
</template>
