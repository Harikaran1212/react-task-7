import React from 'react';
import {useNavigate } from 'react-router-dom';
import "./css/navbar.css";

const Navbar = ({ setActiveMenuItem }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };
 
    const handleMenuItemClick = (menuItem) => {
      setActiveMenuItem(menuItem);
    };
  return (
    <>
      <nav>
      <ul>
      <li>
            <button onClick={() => handleMenuItemClick('users')}>Users</button>
          </li>
          <li>
            <button onClick={() => handleMenuItemClick('taskLists')}>Task Lists</button>
          </li>
          <li>
            <button onClick={() => handleMenuItemClick('tasks')}>Tasks</button>
          </li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </>
  );
};

export default Navbar;