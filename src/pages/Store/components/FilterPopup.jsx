import React from 'react';
import FilterBar from './FilterBar';

const FilterPopup = ({ 
  isOpen, 
  onClose, 
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
  filteredCount,
  filterType 
}) => {
  if (!isOpen) return null;

  const getTitle = () => {
    switch (filterType) {
      case 'search':
        return 'Search Products';
      case 'category':
        return 'Filter by Category';
      case 'price':
        return 'Filter by Price';
      default:
        return 'Filters';
    }
  };

  const getContent = () => {
    switch (filterType) {
      case 'search':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Products</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredCount} of {totalProducts} products
            </div>
          </div>
        );
      
      case 'category':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredCount} of {totalProducts} products
            </div>
          </div>
        );
      
      case 'price':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Price Range</label>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value={index}
                      checked={selectedPriceRange === index}
                      onChange={() => onPriceRangeChange(index)}
                      className="w-4 h-4 text-blue-500 bg-white border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredCount} of {totalProducts} products
            </div>
          </div>
        );
      
      default:
        return (
          <FilterBar
            categories={categories}
            priceRanges={priceRanges}
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
            searchQuery={searchQuery}
            onCategoryChange={onCategoryChange}
            onPriceRangeChange={onPriceRangeChange}
            onSearchChange={onSearchChange}
            onClearFilters={onClearFilters}
            totalProducts={totalProducts}
            filteredCount={filteredCount}
          />
        );
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl max-w-md mx-auto max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{getTitle()}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {getContent()}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm font-medium"
          >
            Clear All Filters
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPopup;
