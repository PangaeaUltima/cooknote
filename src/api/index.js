export default ($axios) => ({
  filterByCategory: (category = 'Seafood') => $axios.get(`filter.php?c=${category}`),
  filterByMainIngredient: (ingredient = 'chicken_breast') => $axios.get(`filter.php?i=${ingredient}`),
  listCategories: () => $axios.get('list.php?c=list'),
  listIngredients: () => $axios.get('list.php?i=list'),
  searchMeal: (params = { f: 'b' }) => $axios.get('search.php/', { params }),
  viewMeal: (id) => $axios.get(`lookup.php?i=${id}`),
})