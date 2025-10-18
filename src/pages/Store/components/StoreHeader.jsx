import React from 'react';

const StoreHeader = ({ totalProducts, filteredCount }) => {
  return (
    <div className="text-center space-y-6 py-12">
      {/* Main Title */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-card-foreground">
          Our <span className="gradient-accent">Digital Solutions</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover our comprehensive range of technology services designed to transform your business. 
          From web development to AI solutions, we provide cutting-edge digital services tailored to your needs.
        </p>
      </div>
      {/* Results Counter */}
      {filteredCount !== totalProducts && (
        <div className="glass-surface rounded-xl p-4 max-w-md mx-auto">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-primary">{filteredCount}</span> of{' '}
            <span className="font-semibold text-primary">{totalProducts}</span> services
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreHeader;
