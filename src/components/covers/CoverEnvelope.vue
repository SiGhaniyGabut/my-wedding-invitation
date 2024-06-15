<script setup>
import { onMounted, watch } from 'vue'
import { useGuestStore } from '@/stores/guest'
import { useEnvelopeStore } from '@/stores/envelope'
import { useWeddingInformationStore } from '@/stores/wedding-information'

import ButtonAction from '@partials/ButtonAction.vue'
import SectionContent from '@partials/SectionContent.vue'
import SectionContentWrapper from '@partials/SectionContentWrapper.vue'

const guestStore = useGuestStore()
const envelopeStore = useEnvelopeStore()
const weddingInformationStore = useWeddingInformationStore()
const information = weddingInformationStore.getInformation()

onMounted(async () => {
  const musicSrc = (await information.music.src).default
  const guests = await (await fetch('/guests.json')).json()
  const codePath = window.location.pathname.split('/').pop()
  const guest = guests.find((guest) => guest.guestCode === codePath)

  if (!guest) return

  guestStore.registerGuest(guest)

  watch(
    () => envelopeStore.isEnvelopeOpened,
    (value) => {
      if (!value) return

      const music = new Audio(musicSrc)
      music.loop = information.music.loop
      music.play()
    }
  )
})
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
        <p>
          Kepada Yth. Bapak/Ibu/Saudara/i
          <br />
          <span class="cormorant-garamond-bold text-2xl underline bg-white">{{
            guestStore.name.toUpperCase()
          }}</span>
        </p>
        <ButtonAction
          text="Open Invitation"
          type="button"
          @click="envelopeStore.openEnvelope"
          v-if="guestStore.isGuestRegistered"
        />
      </div>
    </SectionContentWrapper>
  </SectionContent>
</template>
