import React from 'react';
import { Link } from 'react-router-dom';

/** NAVIGATION BAR
 * This is a reusable nav bar component which can be used in every single page
 */

const PageNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/pricing'>Pricing</Link>
        </li>
        <li>
          <Link to='/product'>Product</Link>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
