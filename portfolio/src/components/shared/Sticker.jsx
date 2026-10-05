import React from 'react';

export const Sticker = ({ 
  label, 
  color = '#2C2C2C', 
  rotation = 0,
  className = ''
}) => {
  return (
    <div 
      className={`tech-sticker ${className}`}
      style={{ 
        '--rotation': `${rotation}deg`,
        backgroundColor: color,
        color: ['#F7DF1E', '#B3FFB3', '#FFFACD'].includes(color) ? '#2C2C2C' : 'white'
      }}
    >
      {label}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getTechColor = (tech) => {
  const colors = {
    'Python': '#4B8BBE',
    'React': '#61DAFB',
    'Docker': '#2496ED',
    'JavaScript': '#F7DF1E',
    'TypeScript': '#3178C6',
    'Node.js': '#339933',
    'Linux': '#FCC624',
    'Git': '#F05032',
    'PostgreSQL': '#336791'
  };
  return colors[tech] || '#2C2C2C';
};
