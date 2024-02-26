import React, { useState, useRef } from 'react'
import './Test.css'

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionValue, setOptionValue] = useState();


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    console.log(`${value}`);
    setOptionValue(`${value}`)
  };

  return (
    <div className="dropdown-container">
      <div className={`dropdown-header ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        Option
        <p style={{ marginLeft: '16px' }} ><i className={`arrow down ${isOpen ? 'rotate' : ''}`}></i></p>
      </div>
      <ul className={`dropdown-options ${isOpen ? 'show' : ''}`}>
        <li className="option" onClick={() => handleOptionClick("Option 1")}>
          Option 1
        </li>
        <li className="option" onClick={() => handleOptionClick("Option 2")}>
          Option 2
        </li>
        <li className="option" onClick={() => handleOptionClick("Option 3")}>
          Option 3
        </li>
      </ul>

      <p>{optionValue}</p>
    </div>
  );
};
export default Test