import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#282c34', padding: '1rem', color: 'white' }}>
      <div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem' }}>
          ☰
        </button>
        {menuOpen && (
          <div style={{ position: 'absolute', background: 'white', color: 'black', padding: '1rem', marginTop: '0.5rem' }}>
            <Link to="/">Home</Link><br />
            <Link to="/in-progress">In Progress</Link>
          </div>
        )}
      </div>
      <h1>Working Memory App</h1>
      <div>
        <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem' }}>
          👤
        </button>
        {userMenuOpen && (
          <div style={{ position: 'absolute', right: '1rem', background: 'white', color: 'black', padding: '1rem' }}>
            <div>Profile</div>
            <div>Settings</div>
          </div>
        )}
      </div>
    </nav>
  );
}