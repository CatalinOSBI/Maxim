import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  //vars
  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenYear, setIsOpenYear] = useState(false);
  const [optionValueType, setoptionValueType] = useState('Any');
  const [optionValueYear, setoptionValueYear] = useState('Any');

  //dropdown
  const toggleDropdownType = () => {
    setIsOpenType(!isOpenType);
  };

  const toggleDropdownYear = () => {
    setIsOpenYear(!isOpenYear);
  };

  const handleGetValueType = (value) => {
    console.log(value);
    setoptionValueType(value)
    setIsOpenType(!isOpenType);
  }

  const handleGetValueYear = (value) => {
    console.log(value);
    setoptionValueYear(value)
    setIsOpenYear(!isOpenYear);
  }

  return (
    <MenuContext.Provider value={{ 
      isOpenType,
      isOpenYear,
      setIsOpenType,
      setIsOpenYear,
      optionValueType,
      optionValueYear,
      setoptionValueType,
      setoptionValueYear,
      toggleDropdownType,
      toggleDropdownYear,
      handleGetValueType,
      handleGetValueYear,
      }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};
