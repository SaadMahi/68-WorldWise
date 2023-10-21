import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h1>WorldWise</h1>
      <Link to='/pricing'>Pricing</Link>
    </div>
  );
};

export default Homepage;
