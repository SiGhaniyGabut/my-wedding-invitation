<script setup>
import { onMounted, ref } from 'vue'
import { useBrideStore } from '@/stores/bride'
import { useWeddingInformationStore } from '@/stores/wedding-information'

import BackGround from '@partials/BackGround.vue'
import LoadingScreen from '@partials/LoadingScreen.vue'
import EnvelopeComponent from '@components/EnvelopeComponent.vue'
import InvitationContentComponent from '@components/InvitationContentComponent.vue'

const pageLoaded = ref(false)
const brideStore = useBrideStore()
const weddingInformationStore = useWeddingInformationStore()

brideStore.setGroom({
  name: 'Abdul Hakim Ghaniy',
  title: 'S.Kom',
  nickname: 'Ghaniy',
  birthOrder: 'Anak Pertama',
  parents: {
    father: 'Bapak Nur Wahyudin',
    mother: 'Ibu Rumiasih'
  },
  photo: {
    src: import('@/assets/images/PROFILE_GHANIY.webp'),
    alt: 'Abdul Hakim Ghaniy - Groom'
  }
})

brideStore.setBride({
  name: 'Mega Apriyani Tarwiyah',
  title: 'S.Pd',
  nickname: 'Mega',
  birthOrder: 'Anak Pertama',
  parents: {
    father: 'Bapak Subur',
    mother: 'Ibu Yeni Yulidawati'
  },
  photo: {
    src: import('@/assets/images/PROFILE_MEGA.webp'),
    alt: 'Mega Apriyani Tarwiyah - Bride'
  }
})

weddingInformationStore.setInformation({
  brides: { ...brideStore },
  locale: 'id-ID',
  addHijriDate: true,
  dateTime: new Date('2024-06-29T04:00:00Z'),
  calendarLink:
    'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20240629T020000Z%2F20240629T170000Z&details=Akad%20Nikah%20dan%20Resepsi%20Abdul%20Hakim%20Ghaniy%20-%20Mega%20Apriyani%20Tarwiyah%20di%20Pesakih%2C%20Kalideres%2C%20Jakarta%20Barat.&location=Pesakih%2C%20Kalideres%2C%20Jakarta%20Barat&text=Wedding%20of%20Ghaniy%20and%20Mega%20A.%20T',
  music: {
    src: import('@/assets/music/RAPSODI-JKT48_SAXOPHONE-COVER.mp3'),
    loop: true
  },
  location: {
    name: 'Lapangan Parkir Pesakih',
    address: 'RT.005/014 Duri Kosambi, Jakarta Barat',
    googleMapLink: 'https://maps.app.goo.gl/YeuteziPudepcApp8'
  },
  marriage: {
    time: {
      start: '11:00 WIB',
      end: '12:00 WIB'
    }
  },
  reception: {
    time: {
      start: '13:00 WIB',
      end: 'Selesai'
    }
  },
  gifts: {
    cashless: {
      bank: 'Jago',
      colorHex: '#F59E0B',
      accountNumber: '102004549898',
      accountOwner: 'Abdul Hakim Ghaniy',
      bankIcon: import('@/assets/images/BANK_JAGO.svg')
    },
    delivery: {
      colorHex: '#63D678',
      place: 'Jl. Marzuki 2, RT007/002 No.700',
      address: 'Penggilingan, Cakung, Jakarta Timur 13940',
      note: 'Jl. Marzuki 2, RT007/002 No.700, Penggilingan, Cakung, Jakarta Timur 13940 (Patokan: Ketoprak Bang Toyib). Telp: 0851-5710-5331'
    }
  }
})

onMounted(async () => {
  window.onload = () => (pageLoaded.value = true)
})
</script>

<template>
  <main class="w-full mx-auto relative h-full">
    <LoadingScreen :pageLoaded="pageLoaded" />
    <BackGround />

    <!-- Envelope Component -->
    <EnvelopeComponent />

    <!-- Invitation Content Component -->
    <InvitationContentComponent />
  </main>
</template>
