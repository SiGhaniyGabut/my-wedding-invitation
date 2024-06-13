<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import CountDownTime from '../partials/CountDownTime.vue'
import SectionContent from '../partials/SectionContent.vue'
import SectionContentWrapper from '../partials/SectionContentWrapper.vue'

// Create countdown
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

onMounted(() => {
  const weddingDate = new Date('2024-06-29T04:00:00Z').getTime()

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime()
    const distance = weddingDate - now

    countdown.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    }

    if (distance < 0) {
      clearInterval(countdownInterval)
      countdown.value = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  }, 1000)

  onUnmounted(() => {
    clearInterval(countdownInterval)
  })
})
</script>

<template>
  <SectionContent :isCover="false" :overflowAuto="false" :sectionSplitter="false">
    <SectionContentWrapper class="flex flex-col gap-8 w-full">
      <div class="cormorant-garamond-bold text-3xl flex flex-col leading-loose p-2">
        Sabtu, 29 Juni 2024 M<span class="text-xl font-thin">(23 Dzulhijjah 1445 H)</span>
      </div>
      <div class="grid grid-cols-4 gap-3 border-y-4 border-double border-amber-500 p-2">
        <CountDownTime :time="countdown.days" timeType="Hari" />
        <CountDownTime :time="countdown.hours" timeType="Jam" />
        <CountDownTime :time="countdown.minutes" timeType="Menit" />
        <CountDownTime :time="countdown.seconds" timeType="Detik" />
      </div>
      <div
        class="grid grid-cols-2 gap-3 relative after:border-l-4 after:border-dotted after:border-yellow-500 after:absolute after:top-1/2 after:left-1/2 after:transform after:translate-x-1/2 after:-translate-y-1/2 after:w-1 after:h-full"
      >
        <div class="flex flex-col gap-2 p-2">
          <div class="cormorant-garamond-bold text-3xl">Akad</div>
          <div class="md:text-lg flex flex-col">11:00 WIB <span>s/d</span> 12:00 WIB</div>
        </div>
        <div class="flex flex-col gap-2 p-2">
          <div class="cormorant-garamond-bold text-3xl">Resepsi</div>
          <div class="md:text-lg flex flex-col">13:00 WIB <span>s/d</span> Selesai</div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="cormorant-garamond-bold text-3xl">Tempat</div>
        <div class="text-lg flex flex-col">
          Lapangan Parkir Pesakih <span>RT.005/014 Duri Kosambi, Jakarta Barat</span>
        </div>
        <a
          href="https://maps.app.goo.gl/YeuteziPudepcApp8"
          rel="noopener noreferrer"
          target="_blank"
          class="text-red-500"
          >Lihat di Google Maps</a
        >
      </div>
    </SectionContentWrapper>
  </SectionContent>
</template>
