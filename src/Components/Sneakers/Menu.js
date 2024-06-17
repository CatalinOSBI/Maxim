import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import './Menu.css'
import { useMenu } from './MenuContext';

const Menu = () => {

  const {
    isOpenType,
    isOpenYear,
    optionValueType,
    optionValueYear,
    toggleDropdownType,
    toggleDropdownYear,
    handleGetValueType,
    handleGetValueYear,
  } = useMenu();

  //vars
  const [release_year, setRelease_year] = useState([]);
  const [type, setType] = useState([]);

  //api calls
  useEffect(() => {
    axios.get(`https://maxim-backend-s8un.onrender.com/sneakers3/column/${'type'}`)
      .then((res) => {
        setType(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get(`https://maxim-backend-s8un.onrender.com/sneakers3/column/${'release_year'}`)
      .then((res) => {
        setRelease_year(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const typeList = type.map((item) =>
    <div style={{color:`${optionValueType === item.type ? 'black' : 'white'}`, backgroundColor:`${optionValueType === item.type ? 'white' : 'black'}`}} className='optionContainer'>
      <li className='option' key={item.index} onClick={() => handleGetValueType(item.type)}>
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

//rendering
  return (
    <>
    {/* //type */}
    <div className="dropdown-container">
    <p style={{fontSize:'32px'}}>Type:</p>

      <div className={`dropdown-header ${isOpenType ? 'open' : ''}`} onClick={toggleDropdownType}>
        {optionValueType}
        <p><i className={`arrow down ${isOpenType ? 'rotate' : ''}`} style={{ borderBottom: 'solid white', borderRight: 'solid white' }}></i></p>
      </div>

      <ul className={`dropdown-options ${isOpenType ? 'show' : ''}`}>

      <div style={{color:`${optionValueType === 'Any' ? 'black' : 'white'}`, backgroundColor:`${optionValueType === 'Any' ? 'white' : 'black'}`}} className='optionContainer'>
        <li className='option' onClick={() => handleGetValueType('Any')}>
          Any
        </li>
        </div>

        {typeList}
      </ul>

    {/* //year */}
    <p style={{fontSize:'32px'}}>Year:</p>

      <div className={`dropdown-header ${isOpenYear ? 'open' : ''}`} onClick={toggleDropdownYear}>
        {optionValueYear}
        <p><i className={`arrow down ${isOpenYear ? 'rotate' : ''}`} style={{ borderBottom: 'solid white', borderRight: 'solid white' }}></i></p>
      </div>

      <ul className={`dropdown-options ${isOpenYear ? 'show' : ''}`}>

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
export default Menu