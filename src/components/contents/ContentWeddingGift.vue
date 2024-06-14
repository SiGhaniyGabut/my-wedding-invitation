<script setup>
import { ref, onMounted } from 'vue'
import { useClipboard } from '@vueuse/core'

import GiftCard from '@partials/GiftCard.vue'
import ButtonAction from '@partials/ButtonAction.vue'
import SectionContent from '@partials/SectionContent.vue'
import SectionContentWrapper from '@partials/SectionContentWrapper.vue'
import BankJagoIcon from '@/assets/images/BANK_JAGO.svg'
import IlustrationMobileBanking from '@/assets/images/ILUSTRATION_MOBILE_BANKING.svg'
import IlustrationDelivery from '@/assets/images/ILUSTRATION_DELIVERY.svg'

const accountNumber = ref('102004549898')
const textAccountNumber = ref('')
const deliveryAddress = ref(
  'Jl. Marzuki 2, RT007/002 No.700, Penggilingan, Cakung, Jakarta Timur 13940 (Patokan: Ketoprak Bang Toyib). Telp: 0851-5710-5331'
)
const activeCard = ref('bank')

const { copy: copyAccountNumber, copied: copiedAccountNumber } = useClipboard({ accountNumber })
const { copy: copyDeliveryAddress, copied: copiedDeliveryAddress } = useClipboard({
  deliveryAddress
})

onMounted(() => {
  textAccountNumber.value = accountNumber.value.match(/.{1,4}/g).join(' ')
})
</script>

<template>
  <SectionContent :isCover="false" :overflowAuto="false">
    <SectionContentWrapper>
      <p class="cormorant-garamond-regular text-xl">
        Tanpa mengurangi rasa hormat. Jika rekan-rekan, sahabat dan handai tolan hendak memberikan
        tanda kasih di hari bahagia ini, tanda kasih tersebut dapat diberikan melalui:
      </p>
      <div class="wedding-gift-cta flex flex-col gap-4 justify-around items-center py-5">
        <div class="buttons-cta flex justify-around w-full gap-4">
          <ButtonAction text="Cashless" type="button" @click="activeCard = 'bank'" />
          <ButtonAction text="Wedding Gift" type="button" @click="activeCard = 'delivery'" />
        </div>
        <Transition name="fade" mode="out-in">
          <GiftCard
            :cardBackgroundIlustration="IlustrationMobileBanking"
            v-if="activeCard === 'bank'"
          >
            <template #card-header>
              <img :src="BankJagoIcon" alt="Bank Jago" class="w-full max-w-24 m-0" />
              <div class="">06/29</div>
            </template>
            <template #card-information>
              <div class="text-xs md:text-sm font-medium" v-if="copiedAccountNumber">Tersalin!</div>
              <div
                class="text-2xl md:text-3xl font-bold hover:cursor-pointer select-none"
                @click="copyAccountNumber(accountNumber)"
              >
                {{ textAccountNumber }}
              </div>
              <div class="italic md:text-xl">Abdul Hakim Ghaniy</div>
            </template>
          </GiftCard>
          <GiftCard :cardBackgroundIlustration="IlustrationDelivery" v-else>
            <template #card-header>
              <div class="text-white font-bold">DELIVERY</div>
              <div class="">06/29</div>
            </template>
            <template #card-information>
              <div class="text-xs md:text-sm font-medium" v-if="copiedDeliveryAddress">
                Tersalin!
              </div>
              <div
                class="text-lg md:text-3xl font-bold hover:cursor-pointer select-none"
                @click="copyDeliveryAddress(deliveryAddress)"
              >
                Jl. Marzuki 2, RT007/002 No.700
              </div>
              <div class="italic text-sm md:text-lg">Penggilingan, Cakung, Jakarta Timur 13940</div>
            </template>
          </GiftCard>
        </Transition>
      </div>
    </SectionContentWrapper>
  </SectionContent>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
