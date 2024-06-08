<script setup>
import BrideImage from '../partials/BrideImage.vue'
import WomanBrideImage from '../../assets/images/PROFILE_MEGA.webp'
import SectionContent from '../partials/SectionContent.vue'
import SectionContentWrapper from '../partials/SectionContentWrapper.vue'
</script>

<template>
  <SectionContent :isCover="false" :overflowAuto="false">
    <SectionContentWrapper>
      <BrideImage :src="WomanBrideImage" />
      <p class="cormorant-garamond-bold text-2xl md:text-3xl">Mega Apriyani Tarwiyah, S.Pd</p>
      <p class="">Anak Pertama dari</p>
      <p class="cormorant-garamond-bold text-xl">Bapak Subur & Ibu Yeni Yulidawati</p>
    </SectionContentWrapper>
  </SectionContent>
</template>
