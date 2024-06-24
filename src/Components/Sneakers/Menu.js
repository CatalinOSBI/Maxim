import React, { useState, useEffect } from 'react'
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {

    //Update width whenever it changes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    //Event listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

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

  //Mapping
  const typeList = type.map((item) =>
    <div key={item.index} style={{ color: `${optionValueType === item.type ? 'black' : 'white'}`, backgroundColor: `${optionValueType === item.type ? 'white' : 'black'}` }} className='optionContainer'>
      <li className='option' onClick={() => handleGetValueType(item.type)}>
        {item.type}
      </li>
    </div>
  );

  const yearList = release_year.map((item) =>
    <div key={item.index} style={{ color: `${optionValueYear === item.release_year ? 'black' : 'white'}`, backgroundColor: `${optionValueYear === item.release_year ? 'white' : 'black'}` }} className='optionContainer'>
      <li className='option' onClick={() => handleGetValueYear(item.release_year)}>
        {item.release_year}
      </li>
    </div>
  );

  //rendering
  return (
    <>
      {/* //type */}
      <div className="dropdown-container" style={{display: windowWidth < 1400 ? 'none' : ''}}>
        <p style={{ fontSize: '32px' }}>Type:</p>

        <div className={`dropdown-header ${isOpenType ? 'open' : ''}`} onClick={toggleDropdownType}>
          {optionValueType}
          <p><i className={`arrow down ${isOpenType ? 'rotate' : ''}`} style={{ borderBottom: 'solid white', borderRight: 'solid white' }}></i></p>
        </div>

        <ul className={`dropdown-options ${isOpenType ? 'show' : ''}`}>

          <div key={'test2'} style={{ color: `${optionValueType === 'Any' ? 'black' : 'white'}`, backgroundColor: `${optionValueType === 'Any' ? 'white' : 'black'}` }} className='optionContainer'>
            <li className='option' onClick={() => handleGetValueType('Any')}>
              Any
            </li>
          </div>

          {typeList}
        </ul>

        {/* //year */}
        <p style={{ fontSize: '32px' }}>Year:</p>

        <div className={`dropdown-header ${isOpenYear ? 'open' : ''}`} onClick={toggleDropdownYear}>
          {optionValueYear}
          <p><i className={`arrow down ${isOpenYear ? 'rotate' : ''}`} style={{ borderBottom: 'solid white', borderRight: 'solid white' }}></i></p>
        </div>

        <ul className={`dropdown-options ${isOpenYear ? 'show' : ''}`}>

          <div key={'test1'} style={{ color: `${optionValueYear === 'Any' ? 'black' : 'white'}`, backgroundColor: `${optionValueYear === 'Any' ? 'white' : 'black'}` }} className='optionContainer'>
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