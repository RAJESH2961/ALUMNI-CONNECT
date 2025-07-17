import React from 'react';
import Button from './UI/Button';
import Background from './UI/Background'

const containerStyle = {
  backdropFilter: 'blur(10px)',        // Blur effect
  WebkitBackdropFilter: 'blur(10px)',  // Safari support
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent to see blur
  borderRadius: '10px',
  padding: '20px',
};

const Main = () => {
  return (
    <>
      <Background />
      <div className="container">
        <div className='p-5 text-center bg-light-dark rounded'  style={containerStyle}>
          <h1 className='text-light'>Stock Prediction Portal</h1>
          <p className='text-light lead'>
            📊 Welcome to the Stock Prediction Portal!<br />
            Stay ahead of the market with smart, data-driven insights. Our portal uses advanced machine learning to analyze historical trends and forecast future stock prices. Simply enter a stock symbol to view predictions, interactive charts, and key insights — all designed to help you make informed investment decisions with confidence.
          </p>
          <Button text="Explore now" href="/dashboard"  />
        </div>
      </div>
    </>
  );
};

export default Main;
