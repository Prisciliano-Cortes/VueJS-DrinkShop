<script setup>
    import { useDrinksStore } from '../stores/drinks'
    
    defineProps({
        recipe: {
            type: Object,
            required: true 
        }
    })

    const store = useDrinksStore()
</script>

<template>
    <div class="border shadow-lg">
        <div class="overflow-hidden">
            <img 
                :src="recipe.strDrinkThumb"
                :alt="recipe.strDrink"
                class="hover:scale-125 transition-transform hover:rotate-2"
            />
        </div>

        <div class="p-5">
            <h2 class="text-xl truncate font-extrabold">{{ recipe.strDrink }}</h2>
            <button
                type="button"
                @click="store.selectDrink( recipe.idDrink)"
                class="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
            >
                Ver recipe
            </button>
        </div>
    </div>
</template>