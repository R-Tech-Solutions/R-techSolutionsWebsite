import React from 'react';

const FilterBar = ({ 
  categories, 
  priceRanges, 
  selectedCategory, 
  selectedPriceRange, 
  searchQuery,
  onCategoryChange, 
  onPriceRangeChange, 
  onSearchChange,
  onClearFilters,
  totalProducts,
  filteredCount 
}) => {
  return (
    <div className="glass-morphism rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Filter Products</h2>
          <p className="text-sm text-muted-foreground">
            Showing {filteredCount} of {totalProducts} products
          </p>
        </div>
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors duration-200 text-sm font-medium"
        >
          Clear All Filters
        </button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-card-foreground">Search Products</label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-card-foreground">Category</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-glass'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-card-foreground">Price Range</label>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value={index}
                checked={selectedPriceRange === index}
                onChange={() => onPriceRangeChange(index)}
                className="w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-muted-foreground">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== 'All' || selectedPriceRange !== 0 || searchQuery) && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-card-foreground">Active Filters</label>
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Category: {selectedCategory}
                <button
                  onClick={() => onCategoryChange('All')}
                  className="ml-2 hover:text-primary/80"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {selectedPriceRange !== 0 && (
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Price: {priceRanges[selectedPriceRange].label}
                <button
                  onClick={() => onPriceRangeChange(0)}
                  className="ml-2 hover:text-primary/80"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Search: "{searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 hover:text-primary/80"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
