import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDemoClick = () => {
    if (project?.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'process', label: 'Process', icon: 'Workflow' },
    { id: 'results', label: 'Results', icon: 'TrendingUp' },
    { id: 'technical', label: 'Technical', icon: 'Code' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project?.gallery?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project?.gallery?.length - 1 : prev - 1
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Overview</h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{project?.fullDescription}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Challenge</h5>
                <p className="text-sm text-gray-600">{project?.challenge}</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Solution</h5>
                <p className="text-sm text-gray-600">{project?.solution}</p>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Key Features</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                {project?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Development Process</h4>
            <div className="space-y-3 sm:space-y-4">
              {project?.processSteps?.map((step, index) => (
                <div key={index} className="flex space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">{step?.title}</h5>
                    <p className="text-sm text-gray-600">{step?.description}</p>
                    <div className="text-xs text-gray-500 mt-1">{step?.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Results</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {project?.metrics?.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">{metric?.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{metric?.label}</div>
                </div>
              ))}
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Client Testimonial</h5>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700 italic mb-3 text-sm sm:text-base">"{project?.testimonial?.quote}"</p>
                <div className="flex items-center space-x-3">
                  <Image
                    src={project?.testimonial?.avatar}
                    alt={project?.testimonial?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{project?.testimonial?.name}</div>
                    <div className="text-xs text-gray-600">{project?.testimonial?.position}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Technologies Used</h5>
                <div className="flex flex-wrap gap-2">
                  {project?.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3">Architecture</h5>
                <p className="text-sm text-gray-600">{project?.architecture}</p>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Performance Metrics</h5>
              <div className="space-y-3">
                {project?.performance?.map((perf, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{perf?.metric}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 sm:w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{ width: `${perf?.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">{perf?.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{project?.title}</h2>
                <p className="text-sm text-gray-600">{project?.client} • {project?.category}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon name="X" size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
              {/* Image Gallery */}
              <div className="lg:w-1/2 relative">
                <div className="relative h-48 sm:h-64 lg:h-full">
                  <Image
                    src={project?.gallery?.[currentImageIndex]}
                    alt={`${project?.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {project?.gallery?.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                      >
                        <Icon name="ChevronLeft" size={16} className="text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                      >
                        <Icon name="ChevronRight" size={16} className="text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Image Indicators */}
                  {project?.gallery?.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {project?.gallery?.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                        activeTab === tab?.id
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon name={tab?.icon} size={14} />
                      <span className="hidden sm:inline">{tab?.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {renderTabContent()}
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{project?.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-amber-400" />
                        <span>{project?.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                        iconName="ExternalLink"
                        iconPosition="right"
                        iconSize={14}
                        onClick={handleDemoClick}
                      >
                        Live Demo
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        iconName="MessageCircle"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Discuss Project
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;