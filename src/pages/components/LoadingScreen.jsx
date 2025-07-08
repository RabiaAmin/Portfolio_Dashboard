import React from 'react';

function LoadingScreen() {
  return (
    <div className='w-[100vw] h-[100vh] bg-[#080B13] flex justify-center items-center'>
      <img
        src="./assets/personal-log.png"
        alt="Loading..."
        className="w-50 h-50 animate-caret-blink"
      />
    </div>
  );
}

export default LoadingScreen;