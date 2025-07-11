import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center">
        <div>
          <NavLink to="/" className="text-white font-bold text-xl">
            CMS
          </NavLink>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <ul className="flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-white py-2 px-4 rounded ${isActive ? 'bg-blue-500' : ''} hover:bg-gray-700`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/createBlog"
                className={({ isActive }) =>
                  `text-white py-2 px-4 rounded ${isActive ? 'bg-blue-500' : ''} hover:bg-gray-700`
                }
              >
                Create Blog
              </NavLink>
            </li>
          </ul>
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 bg-gray-700 text-white placeholder-gray-400 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600">
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;