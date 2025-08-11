function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="🔎 Product search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All categories</option>
        <option value="clothing">Clothing</option>
        <option value="accessories">Accessories</option>
        <option value="household">Household items</option>
        <option value="decorations">Decorations</option>
        <option value="kids corner">Kids corner</option>
        <option value="small appliances">Small appliances</option>
      </select>
    </div>
  );
}

export default SearchBar;
