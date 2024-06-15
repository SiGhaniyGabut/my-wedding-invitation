import { defineStore } from 'pinia'

export const useEnvelopeStore = defineStore({
  id: 'envelope',
  state: () => ({
    isEnvelopeOpened: false
  }),
  actions: {
    openEnvelope() {
      this.isEnvelopeOpened = true
    },
    closeEnvelope() {
      this.isEnvelopeOpened = false
    }
  }
})
