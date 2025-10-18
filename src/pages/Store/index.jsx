import React, { useState, useMemo } from 'react';
import StoreHeader from './components/StoreHeader';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import { products, categories, priceRanges } from './data';

const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter products based on selected criteria
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    const priceRange = priceRanges[selectedPriceRange];
    if (priceRange.min !== 0 || priceRange.max !== Infinity) {
      filtered = filtered.filter(product => 
        product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, selectedPriceRange, searchQuery]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (index) => {
    setSelectedPriceRange(index);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange(0);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="container mx-auto px-4 py-8">
          <StoreHeader 
            totalProducts={products.length}
            filteredCount={filteredProducts.length}
          />
        </div>

        {/* Store Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <FilterBar
                  categories={categories}
                  priceRanges={priceRanges}
                  selectedCategory={selectedCategory}
                  selectedPriceRange={selectedPriceRange}
                  searchQuery={searchQuery}
                  onCategoryChange={handleCategoryChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  onSearchChange={handleSearchChange}
                  onClearFilters={handleClearFilters}
                  totalProducts={products.length}
                  filteredCount={filteredProducts.length}
                />
              </div>
            </div>

            {/* Main Content - Products */}
            <div className="lg:col-span-3">
              <ProductGrid
                products={filteredProducts}
                onProductClick={handleProductClick}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <button
          onClick={() => {
            const filterElement = document.querySelector('[data-filter-bar]');
            if (filterElement) {
              filterElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-glass-interactive hover:shadow-glass flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      <div className="lg:hidden">
        <div 
          data-filter-bar
          className="fixed inset-x-0 bottom-0 z-30 transform translate-y-full transition-transform duration-300 bg-background border-t border-border p-4 max-h-[80vh] overflow-y-auto"
          style={{ display: 'none' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Filters</h3>
            <button
              onClick={() => {
                const filterElement = document.querySelector('[data-filter-bar]');
                if (filterElement) {
                  filterElement.style.display = 'none';
                }
              }}
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <FilterBar
            categories={categories}
            priceRanges={priceRanges}
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
            searchQuery={searchQuery}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            onSearchChange={handleSearchChange}
            onClearFilters={handleClearFilters}
            totalProducts={products.length}
            filteredCount={filteredProducts.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Store;
