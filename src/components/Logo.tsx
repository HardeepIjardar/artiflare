import React from 'react';
import logoImage from '../assets/images/logo.png';

const Logo: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <img 
      src={logoImage} 
      alt="ArtiFlare Logo" 
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
};

export default Logo; 