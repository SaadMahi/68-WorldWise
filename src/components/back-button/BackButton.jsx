import React from 'react';

import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

const BackButton = () => {
  /** useNavigate HOOK TO GO ONE STEP BACK FROM CURRENT PAGE
   * ! here we will be applying a special condtion that when the user clicks the back button on the form
   * he will go back in the browser history
   * so in onClick btn in navigation function we just need to define
   * the nummber of steps that we want to go back in the browsers history
   * well here we will be using -1 which means we need to navigate back 1 step
   */
  const navigate = useNavigate();

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      type='back'
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
