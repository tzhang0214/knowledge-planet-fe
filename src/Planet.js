import React, { useState } from 'react';
import './Planet.css';

const Planet = ({ id, size, left, top, floatDuration, floatDelay, imgSrc }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="planet-container"
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        zIndex: 2,
        cursor: 'pointer',
        animation: `planet-float ${floatDuration}s ease-in-out infinite`,
        animationDelay: floatDelay,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => console.log(`星球编号: ${id}`)}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={`planet-${id}`}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            boxShadow: '0 8px 24px 0 rgba(0,0,0,0.4)',
            filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.3))',
            objectFit: 'cover',
            transition: 'box-shadow 0.3s',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
            boxShadow: '0 8px 24px 0 rgba(0,0,0,0.4)',
            filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.3))',
            transition: 'box-shadow 0.3s',
          }}
        />
      )}
      {hovered && (
        <span className="planet-id">{id}</span>
      )}
    </div>
  );
};

export default Planet; 