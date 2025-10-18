import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  technologies,
  selectedTechnology,
  onTechnologyChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}) => {
  const sortOptions = [
    { value: 'recent', label: 'Most Recent', icon: 'Clock' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'impact', label: 'Biggest Impact', icon: 'TrendingUp' },
    { value: 'duration', label: 'Project Length', icon: 'Calendar' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3' },
    { value: 'list', icon: 'List' },
    { value: 'masonry', icon: 'LayoutGrid' }
  ];

  return (
    <motion.div
      className="glass-morphism rounded-2xl p-6 mb-8 backdrop-blur-glass"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      
    </motion.div>
  );
};

export default FilterBar;