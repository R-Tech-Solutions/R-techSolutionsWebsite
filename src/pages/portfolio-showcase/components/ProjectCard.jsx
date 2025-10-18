import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, index, onExplore }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleDemoClick = (e) => {
    e.stopPropagation();
    if (project?.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef?.current || window.innerWidth < 768) return;
    
    const rect = cardRef?.current?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;
    
    const centerX = rect?.width / 2;
    const centerY = rect?.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef?.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-80 sm:h-96 glass-morphism rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transform-3d"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onExplore(project)}
    >
      {/* Background Image with Glass Overlay */}
      <div className="absolute inset-0">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className={`absolute inset-0 glass-surface transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-0'}`} />
      </div>
      {/* Floating Glass Elements */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-1 sm:space-x-2">
        {project?.technologies?.slice(0, 3)?.map((tech, idx) => (
          <div
            key={tech}
            className="w-6 h-6 sm:w-8 sm:h-8 glass-interactive rounded-md sm:rounded-lg flex items-center justify-center text-xs font-mono text-white/80"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {tech?.charAt(0)}
          </div>
        ))}
      </div>
      {/* Project Category Badge */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
        <div className="glass-morphism px-2 sm:px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-white/90">{project?.category}</span>
        </div>
      </div>
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
        <div className="glass-morphism rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-glass-heavy">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate">{project?.title}</h3>
              <p className="text-xs sm:text-sm text-white/70 truncate">{project?.client}</p>
            </div>
            <div className="flex items-center space-x-1 text-amber-400 ml-2">
              <Icon name="Star" size={14} className="fill-current" />
              <span className="text-xs sm:text-sm font-medium">{project?.rating}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 line-clamp-2">{project?.description}</p>

          {/* Project Stats */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-white/60">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={10} />
                <span className="hidden sm:inline">{project?.duration}</span>
                <span className="sm:hidden">{project?.duration?.split(' ')[0]}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={10} />
                <span className="hidden sm:inline">{project?.teamSize}</span>
                <span className="sm:hidden">{project?.teamSize?.split(' ')[0]}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={10} />
                <span className="hidden sm:inline">{project?.impact}</span>
                <span className="sm:hidden">{project?.impact?.split('%')[0]}%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-xs sm:text-sm"
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={12}
            >
              <span className="hidden sm:inline">Explore Project</span>
              <span className="sm:hidden">Explore</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="glass-interactive border-white/20 text-white hover:bg-white/10 text-xs sm:text-sm"
              iconName="Play"
              iconSize={12}
              onClick={handleDemoClick}
            >
              Demo
            </Button>
          </div>
        </div>
      </div>
      {/* Hover Effects */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;