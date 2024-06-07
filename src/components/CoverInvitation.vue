<script setup>
import SectionContent from './partials/SectionContent.vue'
import SectionContentWrapper from './partials/SectionContentWrapper.vue'

const saveEventToCalendar = () => {
  window.open(
    'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20240629T020000Z%2F20240629T170000Z&details=Akad%20Nikah%20dan%20Resepsi%20Abdul%20Hakim%20Ghaniy%20-%20Mega%20Apriyani%20Tarwiyah%20di%20Pesakih%2C%20Kalideres%2C%20Jakarta%20Barat.&location=Pesakih%2C%20Kalideres%2C%20Jakarta%20Barat&text=Wedding%20of%20Ghaniy%20and%20Mega%20A.%20T'
  )
}
</script>

<template>
  <SectionContent :isCover="true" :overflowAuto="false">
    <SectionContentWrapper>
      <p class="cormorant-garamond-medium text-2xl">THE WEDDING OF</p>
      <p
        class="cormorant-garamond-bold-italic text-5xl flex flex-col gap-2 justify-center md:flex-row md:text-6xl"
      >
        <span>GHANIY</span><span>&</span><span>MEGA</span>
      </p>
      <div class="additional-info flex flex-col gap-2">
        <p class="cormorant-garamond-bold text-2xl">Sabtu, 29 Juni 2024</p>
        <button
          type="button"
          class="border py-2 px-4 cormorant-garamond-bold text-xl outline-none border-none bg-rose-400 hover:bg-rose-200 rounded-md shadow-md transition duration-300 ease-in-out"
          @click="saveEventToCalendar"
        >
          Save to Google Calendar
        </button>
      </div>
    </SectionContentWrapper>
  </SectionContent>
</template>
