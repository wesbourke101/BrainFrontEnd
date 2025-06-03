import React from 'react';
import Navbar from './components/Navbar';
import brainImage from './assets/brain.png';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <img src={brainImage} alt="Brain" style={{ width: '300px' }} />
      </main>
    </div>
  );
}