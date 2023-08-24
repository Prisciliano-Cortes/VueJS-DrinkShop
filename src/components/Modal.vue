<script setup>
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { useModalStore } from '../stores/modal'
    import { useDrinksStore } from '../stores/drinks'
    import { useFavoritesStore } from '../stores/favorites'

    const storeModal = useModalStore()
    const storeDrink = useDrinksStore()
    const favorites = useFavoritesStore()

    const formatRecipes = () => {
        const recipesDiv = document.createElement('DIV')

        for (let i = 1; i <= 15; i++) {
            if ( storeDrink.drink[`strIngredient${i}`]) {
                const recipe = storeDrink.drink[`strIngredient${i}`]
                const quantity = storeDrink.drink[`strMeasure${i}`]

                const recipeQuantity = document.createElement('P')
                recipeQuantity.classList.add('text-lg', 'text-gray-500')
                recipeQuantity.textContent = `${recipe} - ${quantity}`

                recipesDiv.appendChild(recipeQuantity)
            }
        }

        return recipesDiv
    }
</script>

<template>
    <TransitionRoot as="template" :show="storeModal.modal" >
        <Dialog as="div" class="relative z-10" @close="storeModal.handleClickModal()">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                            <div>
                                <div class="mt-3">
                                    <DialogTitle as="h3" class="text-gray-900 text-2xl font-extrabold my-5 ">
                                        {{ storeDrink.drink.strDrink }}
                                    </DialogTitle>

                                    <img 
                                        :src="storeDrink.drink.strDrinkThumb"
                                        :alt="storeDrink.drink.strDrink"
                                        class="mx-auto w-72"
                                    />

                                    <DialogTitle as="h3" class="text-gray-900 text-2xl font-extrabold my-5 ">
                                        Recipes and quantities
                                    </DialogTitle>

                                    <div v-html="formatRecipes().outerHTML"></div>

                                    <DialogTitle as="h3" class="text-gray-900 text-2xl font-extrabold my-5 ">
                                        Instructions
                                    </DialogTitle>

                                    <p class="text-lg text-gray-500">
                                        {{ storeDrink.drink.strInstructions }}
                                    </p>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                                <button
                                    type="button"
                                    class="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500"
                                    @click="storeModal.handleClickModal()"
                                >
                                    Close
                                </button>

                                <button
                                    type="button"
                                    @click="favorites.handleFavorites"
                                    class="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500"
                                >
                                    {{ storeModal.textButton }}
                                </button>
                            </div> 
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  