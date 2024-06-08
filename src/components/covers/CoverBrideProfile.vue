<script setup>
import SectionContent from '../partials/SectionContent.vue'
import SectionContentWrapper from '../partials/SectionContentWrapper.vue'
</script>

<template>
  <SectionContent :isCover="true" :overflowAuto="false">
    <SectionContentWrapper>
      <p
        class="cormorant-garamond-bold text-4xl flex flex-col gap-2 justify-center md:flex-row md:text-5xl"
      >
        PROFIL CALON MEMPELAI
      </p>
      <p class="text-sm italic">Profiles of The Bride-to-be</p>
    </SectionContentWrapper>
  </SectionContent>
</template>
