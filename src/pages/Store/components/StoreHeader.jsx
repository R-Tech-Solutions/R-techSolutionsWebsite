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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="glass-surface rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">{totalProducts}</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide">Total Services</div>
        </div>
        <div className="glass-surface rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-success mb-2">100%</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide">Client Satisfaction</div>
        </div>
        <div className="glass-surface rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-accent mb-2">24/7</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide">Support Available</div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 glass-surface rounded-xl p-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">Quick turnaround times</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 glass-surface rounded-xl p-4">
          <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Secure & Reliable</h3>
            <p className="text-sm text-muted-foreground">Enterprise-grade security</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 glass-surface rounded-xl p-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Custom Solutions</h3>
            <p className="text-sm text-muted-foreground">Tailored to your needs</p>
          </div>
        </div>
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
