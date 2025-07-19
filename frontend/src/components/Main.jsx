import React from 'react';
import Button from './UI/Button';
import Background from './UI/Background';

const containerStyle = {
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  padding: '20px',
};

const Main = () => {
  return (
    <>
      <Background />
      <div className="">
        <div>
          <h1 className="text-light">🎓 Alumni Connect Portal</h1>
          <p className="text-light lead">
            Welcome to the official Alumni Portal of [Your Institution Name]!
            <br /><br />
            🌐 Reconnect with your batchmates<br />
            📅 Stay updated on upcoming alumni events<br />
            🧠 Share your journey and mentor current students<br />
            💼 Explore career opportunities and job postings<br />
            ❤️ Contribute to college development initiatives
          </p>
          <Button text="Get Started" href="/dashboard" />
        </div>
      </div>
    </>
  );
};

export default Main;
