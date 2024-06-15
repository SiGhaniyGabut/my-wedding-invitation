<script setup>
import { useWeddingInformationStore } from '@/stores/wedding-information'

import SectionContent from '@partials/SectionContent.vue'
import SectionContentWrapper from '@partials/SectionContentWrapper.vue'

const information = useWeddingInformationStore().getInformation()
</script>

<template>
  <SectionContent :isCover="true" :overflowAuto="false">
    <SectionContentWrapper>
      <p
        class="cormorant-garamond-bold text-4xl flex flex-col gap-2 justify-center md:flex-row md:text-5xl"
      >
        TERIMA KASIH
      </p>
      <p>
        Kami ucapkan kepada seluruh pihak yang telah membantu dan mendukung pernikahan kami. Semoga
        Allah SWT membalas seluruh kebaikan dengan balasan yang berlipat ganda.
      </p>
      <p>
        Tak lupa, kami juga memohon doa dan restu dari handai tolan, agar pernikahan ini menjadi
        pernikahan yang Sakinah Mawaddah Warahmah.
      </p>
      <p>Aamiin, Ya Rabbal 'Alamin.</p>
      <p>
        Hormat Kami,
        <br />
        <span class="text-xs"
          >- {{ information.brides.groom.name }} &amp; {{ information.brides.bride.name }} -</span
        >
      </p>
    </SectionContentWrapper>
  </SectionContent>
</template>
