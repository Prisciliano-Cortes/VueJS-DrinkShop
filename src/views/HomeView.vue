<script setup>
    import { useDrinksStore } from '../stores/drinks'
    import Recipes from '../components/Recipes.vue';

    const drinkStore = useDrinksStore()
</script>

<template>
    <h1 class="text-4xl font-extrabold">Home</h1>

    <p 
        v-if="drinkStore.noRecipes"
        class="my-1o text-center text-2xl"
    >
        No exist results
    </p>

    <div
        v-else 
        class="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 mt-10 my-10 gap-10"
    >
        <Recipes 
            v-for="recipe in drinkStore.recipes"
            :key="recipe.idDrink"
            :recipe="recipe"
        />
    </div>
</template>
