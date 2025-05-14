import React from 'react';

const Logo: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <img 
      src={`${process.env.PUBLIC_URL}/favicon.ico`} 
      alt="ArtiFlare Logo" 
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
};

export default Logo; 