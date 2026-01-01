import React from 'react';
import '../css/Menuitem.css'; // Assuming you have a CSS file for styling

function MenuItem({ icon, label, active }) {
  return (
    <div className={`menu-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default MenuItem;