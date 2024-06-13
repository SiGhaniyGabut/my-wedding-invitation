import { defineStore } from "pinia";

export const useGuestStore = defineStore({
    id: 'guest',
    state: () => ({
        name: 'ERROR_INVALID_GUEST_CODE',
        guestCode: 'ERROR_INVALID_GUEST_CODE',
        isGuestRegistered: false,
    }),
    actions: {
        setNameAndCode(name, guestCode) {
            this.name = name;
            this.guestCode = guestCode;
        },
        registerGuest({ name, guestCode }) {
            this.setNameAndCode(name, guestCode);
            this.isGuestRegistered = true;
        },
    },
});