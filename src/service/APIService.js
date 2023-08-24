import api from '../api/axios'

export default {
    getCategories() {
        return api.get('/list.php?c=list')
    },
    searchRecipes( search ) {
        return api.get(`/filter.php?c=${search.category}&i=${search.name}`)
    },
    searchDrink( id ) {
        return api.get(`/lookup.php?i=${id}`)
    }
}