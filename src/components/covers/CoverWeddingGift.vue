<script setup>
import SectionContent from '@partials/SectionContent.vue'
import SectionContentWrapper from '@partials/SectionContentWrapper.vue'
</script>

<template>
  <SectionContent :isCover="true" :overflowAuto="false">
    <SectionContentWrapper>
      <p
        class="cormorant-garamond-bold text-4xl flex flex-col gap-2 justify-center md:flex-row md:text-5xl"
      >
        KADO PERNIKAHAN
      </p>
      <p class="text-sm italic">Wedding Gift</p>
    </SectionContentWrapper>
  </SectionContent>
</template>
