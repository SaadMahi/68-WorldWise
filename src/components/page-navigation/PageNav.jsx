import React from 'react';
import { NavLink } from 'react-router-dom';

/** NAVIGATION BAR
 * This is a reusable nav bar component which can be used in every single page
 */

const PageNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
