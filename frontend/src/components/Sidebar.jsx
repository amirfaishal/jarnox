import React from 'react';

function Sidebar({ companies, onSelect }) {
  return (
    <div className="sidebar">
      <h2>Companies</h2>
      <div className="company-list">
        {companies.map((c, index) => (
          <div 
            key={index} 
            className="company-item"
            onClick={() => onSelect(c.symbol)}
          >
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
