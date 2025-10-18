import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import StoreHeader from './components/StoreHeader';
import FilterIcon from './components/FilterIcon';
import FilterPopup from './components/FilterPopup';
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
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [activeFilterType, setActiveFilterType] = useState(null);

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

  const handleFilterIconClick = (filterType) => {
    setActiveFilterType(filterType);
    setIsFilterPopupOpen(true);
  };

  const handleCloseFilterPopup = () => {
    setIsFilterPopupOpen(false);
    setActiveFilterType(null);
  };

  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (selectedPriceRange !== 0) count++;
    if (searchQuery.trim()) count++;
    return count;
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
        {/* Main Header */}
        <Header />
        
        {/* Header Section */}
        <div className="container mx-auto px-4 py-8">
          <StoreHeader 
            totalProducts={products.length}
            filteredCount={filteredProducts.length}
          />
        </div>

        {/* Store Content */}
        <div className="container mx-auto px-4 pb-12">
          {/* Filter Icons Bar */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <FilterIcon
                type="search"
                isActive={!!searchQuery.trim()}
                onClick={() => handleFilterIconClick('search')}
                count={searchQuery.trim() ? 1 : 0}
              />
              <FilterIcon
                type="category"
                isActive={selectedCategory !== 'All'}
                onClick={() => handleFilterIconClick('category')}
                count={selectedCategory !== 'All' ? 1 : 0}
              />
              <FilterIcon
                type="price"
                isActive={selectedPriceRange !== 0}
                onClick={() => handleFilterIconClick('price')}
                count={selectedPriceRange !== 0 ? 1 : 0}
              />
              {getActiveFilterCount() > 0 && (
                <FilterIcon
                  type="clear"
                  isActive={false}
                  onClick={handleClearFilters}
                  count={0}
                />
              )}
            </div>
            
            {/* Active Filters Summary */}
            {getActiveFilterCount() > 0 && (
              <div className="mt-4 text-center lg:text-left">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                  {getActiveFilterCount() > 0 && ` • ${getActiveFilterCount()} filter${getActiveFilterCount() > 1 ? 's' : ''} active`}
                </p>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={filteredProducts}
            onProductClick={handleProductClick}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Filter Popup */}
      <FilterPopup
        isOpen={isFilterPopupOpen}
        onClose={handleCloseFilterPopup}
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
        filterType={activeFilterType}
      />
    </div>
  );
};

export default Store;
