import { ref, reactive, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../service/APIService'
import { useModalStore } from './modal'

export const useDrinksStore = defineStore('drinks', () => {

    const modalStore = useModalStore()

    //*** States */
    const categories = ref([])
    const search = reactive({
        name: '',
        category: ''
    })
    const recipes = ref([])
    const drink = ref({})

    onMounted( async() => {
        const { data: { drinks } } = await APIService.getCategories()

        categories.value = drinks
    })

    //*** Actions */
    async function getRecipe() {
        const { data: { drinks } } = await APIService.searchRecipes(search)
        recipes.value = drinks
    }

    async function selectDrink( id ) {
        const { data: { drinks } } = await APIService.searchDrink(id)
        drink.value = drinks[0]
        modalStore.handleClickModal()
    }

    const noRecipes = computed( () => {
        return recipes.value.length === 0
    })

    return {
        //*** states */
        categories,
        search,
        recipes,
        drink,

        //*** actions */
        getRecipe,
        selectDrink,
        noRecipes
    }
})