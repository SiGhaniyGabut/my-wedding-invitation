<script setup>
import { useWeddingInformationStore } from '@/stores/wedding-information'

import ButtonAction from '@partials/ButtonAction.vue'
import SectionContent from '@partials/SectionContent.vue'
import SectionContentWrapper from '@partials/SectionContentWrapper.vue'

const information = useWeddingInformationStore().getInformation()
const saveEventToCalendar = () => window.open(information.calendarLink, '_blank')
</script>

<template>
  <SectionContent :isCover="true" :overflowAuto="false">
    <SectionContentWrapper>
      <p class="cormorant-garamond-medium text-2xl">THE WEDDING OF</p>
      <p
        class="cormorant-garamond-bold-italic text-5xl flex flex-col gap-2 justify-center md:flex-row md:text-6xl"
      >
        <span>{{ information.brides.groom.nickname.toUpperCase() }}</span
        ><span>&</span><span>{{ information.brides.bride.nickname.toUpperCase() }}</span>
      </p>
      <div class="additional-info flex flex-col gap-2">
        <p class="cormorant-garamond-bold text-2xl">
          {{ information.localeDateString }}
        </p>
        <ButtonAction text="Save to Google Calendar" type="button" @click="saveEventToCalendar" />
      </div>
    </SectionContentWrapper>
  </SectionContent>
</template>
