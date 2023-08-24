import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFavoritesStore } from './favorites'
import { useDrinksStore } from './drinks'

export const useModalStore = defineStore('modal', () => {

    const drinksStore = useDrinksStore()
    const favoritesStore = useFavoritesStore()

    const modal = ref(false)

    //*** actions */
    function handleClickModal() {
        modal.value = !modal.value
    }

    //*** Getters */
    const textButton = computed( () => {
        return favoritesStore.existFavorites(drinksStore.drink.idDrink) ? 'Delete favorites' : 'Add favorites'
    })

    return {
        modal,
        handleClickModal,
        textButton
    }
})