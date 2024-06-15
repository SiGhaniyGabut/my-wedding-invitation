<script setup>
import IlustrationDelivery from '@/assets/images/ILUSTRATION_DELIVERY.svg'
import IlustrationMobileBanking from '@/assets/images/ILUSTRATION_MOBILE_BANKING.svg'

defineProps({
  activeCard: String,
  backgroundColor: String
})
</script>

<template>
  <div class="gift-card w-full relative">
    <img
      :src="activeCard === 'bank' ? IlustrationMobileBanking : IlustrationDelivery"
      alt="Card Background Ilustration"
      class="w-full max-w-48 m-0 absolute bottom-0 opacity-20"
    />
    <div
      class="card-content flex flex-col gap-4 mt-10 justify-between p-5 text-left w-full h-52 md:h-60 rounded-lg shadow-md"
      :style="`background-color: ${backgroundColor};`"
    >
      <div class="card-header text-xl flex justify-between items-center">
        <slot name="card-header"></slot>
      </div>
      <div class="card-information text-right flex flex-col gap-2 z-10">
        <slot name="card-information"></slot>
      </div>
    </div>
  </div>
</template>
