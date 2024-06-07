import { defineStore } from "pinia";

export const useGuestStore = defineStore({
    id: 'guest',
    state: () => ({
        name: 'ERROR_INVALID_GUEST_CODE',
        code: 'ERROR_INVALID_GUEST_CODE',
        isGuestRegistered: false,
    }),
    actions: {
        setNameAndCode(name, code) {
            this.name = name;
            this.code = code;
        },
        registerGuest({ name, code }) {
            this.setNameAndCode(name, code);
            this.isGuestRegistered = true;
        },
    },
});