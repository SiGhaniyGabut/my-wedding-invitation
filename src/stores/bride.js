import { defineStore } from 'pinia'

const createPersonState = () => ({
  name: null,
  title: null,
  nickname: null,
  birthOrder: null,
  photo: {
    src: null,
    alt: null
  },
  parents: {
    father: null,
    mother: null
  }
})

const setPersonActions = (person) => ({
  setPerson({ name, title, birthOrder, nickname, photo, parents }) {
    person.name = name
    person.title = title
    person.photo = photo
    person.parents = parents
    person.nickname = nickname
    person.birthOrder = birthOrder
  }
})

export const useBrideStore = defineStore({
  id: 'bride',
  state: () => ({
    groom: createPersonState(),
    bride: createPersonState()
  }),
  actions: {
    setGroom(person) {
      setPersonActions(this.groom).setPerson(person)
    },
    setBride(person) {
      setPersonActions(this.bride).setPerson(person)
    }
  }
})
