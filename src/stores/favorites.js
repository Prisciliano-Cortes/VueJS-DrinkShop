import { ref, watch, onMounted, computed } from 'vue'
import { defineStore } from "pinia"
import { useModalStore } from './modal'
import { useDrinksStore } from './drinks'
import { useNotificationStore } from '../stores/notifications'

export const useFavoritesStore = defineStore('favorites', () => {

    const modalStore = useModalStore()
    const drinksStore = useDrinksStore()
    const notificationStore = useNotificationStore()

    const favorites = ref([])

    onMounted( () => {
        favorites.value = JSON.parse(localStorage.getItem('favorites')) ?? []
    })

    watch(favorites, () => {
        listenLocalStorage()
    }, { deep: true })

    const listenLocalStorage = () => {
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    const existFavorites = () => {
        const favoritesStorage = JSON.parse(localStorage.getItem('favorites')) ?? []

        return favoritesStorage.some( favorite => favorite.idDrink === drinksStore.drink.idDrink )
    } 

    const deleteFavorite = () => {
        favorites.value = favorites.value.filter( favorite => favorite.idDrink !== drinksStore.drink.idDrink )
        
        notificationStore.view = true
        notificationStore.text = 'Delete in favorites'
    }

    const addFavorite = () => {
        favorites.value.push(drinksStore.drink)
        
        notificationStore.view = true
        notificationStore.text = 'Add in favorites'
    }

    const handleFavorites = () => {
        if ( existFavorites() ) {
            deleteFavorite()
        } else {
            addFavorite()
        }

        modalStore.modal = false
    }

    const noFavorites = computed( () => {
        return favorites.value.length === 0
    })

    return {
        favorites,
        existFavorites,
        handleFavorites,
        noFavorites
    }
})