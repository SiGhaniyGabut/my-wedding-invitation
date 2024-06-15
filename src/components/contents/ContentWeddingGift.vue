<script setup>
import { ref, onMounted } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useWeddingInformationStore } from '@/stores/wedding-information'

import GiftCard from '@partials/GiftCard.vue'
import ButtonAction from '@partials/ButtonAction.vue'
import SectionContent from '@partials/SectionContent.vue'
import SectionContentWrapper from '@partials/SectionContentWrapper.vue'

const information = useWeddingInformationStore().getInformation()
const accountNumber = ref(information.gifts.cashless.accountNumber)
const deliveryAddress = ref(information.gifts.delivery.note)
const displayedAccountNumber = ref('')
const activeCard = ref('bank')
const bankIcon = ref('')

const { copy: copyAccountNumber, copied: copiedAccountNumber } = useClipboard({ accountNumber })
const { copy: copyDeliveryAddress, copied: copiedDeliveryAddress } = useClipboard({
  deliveryAddress
})

onMounted(async () => {
  bankIcon.value = (await information.gifts.cashless.bankIcon).default
  displayedAccountNumber.value = accountNumber.value.match(/.{1,4}/g).join(' ')
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
            :activeCard="activeCard"
            :backgroundColor="information.gifts.cashless.colorHex"
            v-if="activeCard === 'bank'"
          >
            <template #card-header>
              <img :src="bankIcon" alt="Bank Jago" class="w-full max-w-24 m-0" />
              <div>06/29</div>
            </template>
            <template #card-information>
              <div class="text-xs md:text-sm font-medium" v-if="copiedAccountNumber">Tersalin!</div>
              <div
                class="text-2xl md:text-3xl font-bold hover:cursor-pointer select-none"
                @click="copyAccountNumber(accountNumber)"
              >
                {{ displayedAccountNumber }}
              </div>
              <div class="italic md:text-xl">{{ information.gifts.cashless.accountOwner }}</div>
            </template>
          </GiftCard>
          <GiftCard
            :activeCard="activeCard"
            :backgroundColor="information.gifts.delivery.colorHex"
            v-else
          >
            <template #card-header>
              <div class="text-white font-bold">DELIVERY</div>
              <div>06/29</div>
            </template>
            <template #card-information>
              <div class="text-xs md:text-sm font-medium" v-if="copiedDeliveryAddress">
                Tersalin!
              </div>
              <div
                class="text-lg md:text-3xl font-bold hover:cursor-pointer select-none"
                @click="copyDeliveryAddress(deliveryAddress)"
              >
                {{ information.gifts.delivery.place }}
              </div>
              <div class="italic text-sm md:text-lg">{{ information.gifts.delivery.address }}</div>
            </template>
          </GiftCard>
        </Transition>
      </div>
    </SectionContentWrapper>
  </SectionContent>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
