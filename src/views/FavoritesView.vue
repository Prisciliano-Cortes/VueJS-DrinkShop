<script setup>
    import { useFavoritesStore } from '../stores/favorites'
    import Recipes from '../components/Recipes.vue';

    const favoriteStore = useFavoritesStore()
    
</script>

<template>
    <h1 class="text-4xl font-extrabold">Favorites</h1>

    <p 
        v-if="favoriteStore.noFavorites"
        class="my-1o text-center text-2xl"
    >
        No exist favorites
    </p>

    <div 
        v-else
        class="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 mt-10 my-10 gap-10"
    >
        <Recipes 
            v-for="favorite in favoriteStore.favorites"
            :key="favorite.idDrink"
            :recipe="favorite"
        />
    </div>
</template>