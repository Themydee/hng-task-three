/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

const Spinner = () => {
  const colors = ['#3498db', 'black', '#27ae60', '#f1c40f']; // Define an array of colors
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const nextColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const spinnerStyle = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    spinner: {
      border: '6px solid rgba(0, 0, 0, 0.3)',
      borderTop: `6px solid ${colors[currentColorIndex]}`,
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      animation: 'spin 1s linear infinite',
    },
  };

  useEffect(() => {
    const colorChangeInterval = setInterval(nextColor, 1000); 

    return () => {
      clearInterval(colorChangeInterval); 
    };
  }, [currentColorIndex]);

  return (
    <div style={spinnerStyle.container}>
      <div style={spinnerStyle.spinner}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;