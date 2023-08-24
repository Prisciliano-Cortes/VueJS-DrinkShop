<script setup>
    import { computed } from 'vue'
    import { RouterLink, useRoute } from 'vue-router';
    import { useDrinksStore } from '../stores/drinks'
    import { useNotificationStore } from '../stores/notifications';

    const route = useRoute()
    const drinkStore = useDrinksStore()
    const notificationStore = useNotificationStore()

    const pageInit = computed( () => {
        return route.name === 'home'
    })

    const handleSubmit = () => {
        //*** Validations */
        if (Object.values(drinkStore.search).includes('')) {
            notificationStore.$patch({
                text: 'Field is required',
                view: true,
                error: true
            })
            return
        }
        drinkStore.getRecipe()
    }
</script>

<template>
    <header 
        class="bg-slate-800"
        :class="{ header : pageInit }"
    >
        <div class="mx-auto container px-5 py-6">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink :to="{ name: 'home' }">
                        <img 
                            class="w-32"
                            src="/img/logo.svg"
                            alt="logo"
                        />
                    </RouterLink>
                </div>

                <nav class="flex gap-4 text-white">
                    <RouterLink 
                        :to="{ name: 'home' }"
                        class="uppercase font-bold"
                        active-class="text-orange-500" 
                    >
                        Home
                    </RouterLink>

                    <RouterLink 
                        :to="{ name: 'favorites' }"
                        class="uppercase font-bold" 
                        active-class="text-orange-500"
                    >
                        Favorites
                    </RouterLink>
                </nav>
            </div>

            <form   
                v-if="pageInit"
                @submit.prevent="handleSubmit"
                class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-10 p-10 rounded-lg shadow space-y-6"
            >
                <div class="space-y-4">
                    <label 
                        for="ingredient"
                        class="block text-white uppercase font-extrabold text-lg"
                    >
                        Name or ingredient
                    </label>

                    <input 
                        id="ingredient"
                        type="text"
                        placeholder="Name or ingredient"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        v-model="drinkStore.search.name"
                    />
                </div>

                <div class="space-y-4">
                    <label 
                        for="category"
                        class="block text-white uppercase font-extrabold text-lg"
                    >
                        Category
                    </label>

                    <select 
                        id="category"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        v-model="drinkStore.search.category"
                    >
                        <option> --Select-- </option>
                        <option
                            v-for="category in drinkStore.categories"
                            :key="category.strCategory"
                            :value="category.strCategory"
                        >
                            {{ category.strCategory }}
                        </option>
                    </select>
                </div>

                <input 
                    type="submit"
                    value="Search recipes"
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
                />
            </form>
        </div>
    </header>
</template>

<style scoped>
    .header {
        background-image: url('/img/bg.jpg');
        background-size: cover;
        background-position: center;
    }
</style>