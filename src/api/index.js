export default ($axios) => ({
  searchMeal: (params = { f: 'b' }) => $axios.get('search.php/', { params }),
  viewMeal: (id) => $axios.get(`lookup.php?i=${id}`),
})