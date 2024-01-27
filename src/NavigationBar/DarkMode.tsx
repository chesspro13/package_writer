import { useState } from 'react';
import dark_mode_button from '../assets/icons/dark_mode/dark_mode.png';


function DarkModeButton() {
  return (
    <img className='dark_mode_button' src={dark_mode_button} alt="logo" />
  );
}

export default DarkModeButton;