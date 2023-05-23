export default ($axios) => ({
  searchMeal: (params = { f: 'b' }) => $axios.get('search.php/', { params })
})