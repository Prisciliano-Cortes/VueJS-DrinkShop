import { ref, watchEffect } from "vue"
import { defineStore } from "pinia"

export const useNotificationStore = defineStore('notification', () => {

    const text = ref('')
    const error = ref(false)
    const view = ref(false)

    // const $reset = () => {
    //     text.value = ''
    //     error.value = false
    //     view.value = false
    // }

    watchEffect(() => {
        if (view.value) {
            setTimeout(() => {
                text.value = ''
                error.value = false
                view.value = false
            }, 3000);
        }
    })

    return {
        text,
        error,
        view,
        //$reset
    }
})
