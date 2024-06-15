<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWeddingInformationStore } from '@/stores/wedding-information'

import CountDownTime from '@partials/CountDownTime.vue'
import SectionContent from '@partials/SectionContent.vue'
import SectionContentWrapper from '@partials/SectionContentWrapper.vue'

const information = useWeddingInformationStore().getInformation()
const hijriDate = ref('')
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const fetchHijriDate = async (dateTime, locale) => {
  const apiHost = 'https://api.aladhan.com/v1/gToH/'
  const stringifiedDate = dateTime.toLocaleDateString(locale).split('/').join('-')

  try {
    const response = await (await fetch(apiHost + stringifiedDate)).json()
    const hijri = response.data.hijri

    return `${hijri.day} ${hijri.month.en} ${hijri.year}`
  } catch (error) {
    console.error(error)
    return null
  }
}

onMounted(async () => {
  hijriDate.value = await fetchHijriDate(information.dateTime, information.locale)

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime()
    const distance = information.dateTime.getTime() - now

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
        {{ information.localeDateString }} M<span
          class="text-xl font-thin"
          v-if="information.addHijriDate"
          >({{ hijriDate }} H)</span
        >
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
          <div class="md:text-lg flex flex-col">
            {{ information.marriage.time.start }} <span>s/d</span>
            {{ information.marriage.time.end }}
          </div>
        </div>
        <div class="flex flex-col gap-2 p-2">
          <div class="cormorant-garamond-bold text-3xl">Resepsi</div>
          <div class="md:text-lg flex flex-col">
            {{ information.reception.time.start }} <span>s/d</span>
            {{ information.reception.time.end }}
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="cormorant-garamond-bold text-3xl">Tempat</div>
        <div class="text-lg flex flex-col">
          {{ information.location.name }} <span>{{ information.location.address }}</span>
        </div>
        <a
          :href="information.location.googleMapLink"
          rel="noopener noreferrer"
          target="_blank"
          class="text-red-500"
          >Lihat di Google Maps</a
        >
      </div>
    </SectionContentWrapper>
  </SectionContent>
</template>
