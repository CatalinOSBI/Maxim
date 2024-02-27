import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import './Test.css'

const Test = () => {
  //vars
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [optionValueType, setoptionValueType] = useState('Any');
  const [optionValueYear, setoptionValueYear] = useState('Any');
  const [release_year, setRelease_year] = useState([]);
  const [type, setType] = useState([]);

  //api calls
  useEffect(() => {
    axios.get(`http://localhost:1989/sneakers3/column/${'type'}`)
      .then((res) => {
        setType(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get(`http://localhost:1989/sneakers3/column/${'release_year'}`)
      .then((res) => {
        setRelease_year(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  //dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleGetValue = (value) => {
    console.log(value);
    setoptionValueType(value)
    setIsOpen(!isOpen);
  }

  const handleGetValueYear = (value) => {
    console.log(value);
    setoptionValueYear(value)
    setIsOpen2(!isOpen2);
  }

  const typeList = type.map((item) =>
    <div style={{color:`${optionValueType === item.type ? 'black' : 'white'}`, backgroundColor:`${optionValueType === item.type ? 'white' : 'black'}`}} className='optionContainer'>
      <li className='option' key={item.index} onClick={() => handleGetValue(item.type)}>
        {item.type}
      </li>
    </div>
  );

  const yearList = release_year.map((item) =>
  <div style={{color:`${optionValueYear === item.release_year ? 'black' : 'white'}`, backgroundColor:`${optionValueYear === item.release_year ? 'white' : 'black'}`}} className='optionContainer'>
    <li className='option' key={item.index} onClick={() => handleGetValueYear(item.release_year)}>
      {item.release_year}
    </li>
  </div>
);

  return (
    <>
    {/* //type */}
    <div className="dropdown-container">
    <p style={{fontSize:'32px'}}>Type:</p>

      <div className={`dropdown-header ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        {optionValueType}
        <p><i className={`arrow down ${isOpen ? 'rotate' : ''}`} style={{ borderBottom: 'solid white', borderRight: 'solid white' }}></i></p>
      </div>

      <ul className={`dropdown-options ${isOpen ? 'show' : ''}`}>

      <div style={{color:`${optionValueType === 'Any' ? 'black' : 'white'}`, backgroundColor:`${optionValueType === 'Any' ? 'white' : 'black'}`}} className='optionContainer'>
        <li className='option' onClick={() => handleGetValue('Any')}>
          Any
        </li>
        </div>

        {typeList}
      </ul>
    </div>

    {/* //year */}
    <div className="dropdown-container">
    <p style={{fontSize:'32px'}}>Year:</p>

      <div className={`dropdown-header ${isOpen2 ? 'open' : ''}`} onClick={toggleDropdown2}>
        {optionValueYear}
        <p><i className={`arrow down ${isOpen2 ? 'rotate' : ''}`} style={{ borderBottom: 'solid white', borderRight: 'solid white' }}></i></p>
      </div>

      <ul className={`dropdown-options ${isOpen2 ? 'show' : ''}`}>

      <div style={{color:`${optionValueYear === 'Any' ? 'black' : 'white'}`, backgroundColor:`${optionValueYear === 'Any' ? 'white' : 'black'}`}} className='optionContainer'>
        <li className='option' onClick={() => handleGetValueYear('Any')}>
          Any
        </li>
        </div>

        {yearList}
      </ul>
    </div>
    </>
  );
};
export default Test