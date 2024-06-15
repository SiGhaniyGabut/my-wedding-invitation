import { defineStore } from 'pinia'

const marriageTimeState = () => ({
  date: null,
  time: {
    start: null,
    end: null
  }
})

const marriageVenueState = () => ({
  location: {
    name: null,
    address: null,
    googleMapLink: null
  }
})

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export const useWeddingInformationStore = defineStore({
  id: 'wedding-information',
  state: () => ({
    locale: null,
    dateTime: null,
    calendarLink: null,
    addHijriDate: false,
    localeDateString: null,
    brides: { groom: null, bride: null },
    music: {
      src: null,
      loop: false
    },
    gifts: {
      cashless: {
        bank: null,
        colorHex: null,
        bankIcon: null,
        accountNumber: null,
        accountOwner: null
      },
      delivery: {
        note: null,
        place: null,
        address: null,
        colorHex: null
      }
    },
    marriage: { ...marriageTimeState(), ...marriageVenueState() },
    reception: { ...marriageTimeState(), ...marriageVenueState() },
    ...marriageVenueState()
  }),
  actions: {
    setInformation({
      gifts,
      music,
      brides,
      locale,
      location,
      dateTime,
      marriage,
      reception,
      addHijriDate,
      calendarLink
    }) {
      this.gifts = gifts
      this.music = music
      this.brides = brides
      this.locale = locale
      this.location = location
      this.dateTime = dateTime
      this.marriage = marriage
      this.reception = reception
      this.addHijriDate = addHijriDate
      this.calendarLink = calendarLink
    },
    getInformation() {
      return {
        gifts: this.gifts,
        music: this.music,
        brides: this.brides,
        locale: this.locale,
        location: this.location,
        dateTime: this.dateTime,
        timeZone: this.timeZone,
        marriage: this.marriage,
        reception: this.reception,
        calendarLink: this.calendarLink,
        addHijriDate: this.addHijriDate,
        localeDateString: this.dateTime.toLocaleDateString(this.locale, dateOptions)
      }
    }
  }
})
