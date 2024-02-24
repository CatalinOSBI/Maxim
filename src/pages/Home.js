import React from 'react';
import Sneakers from '../Components/Sneakers';
import Banner from '../Components/Banner';
import Header from '../Components/Header';
import LoginModal from '../Components/Login/LoginModal';
import Ad from '../Components/Ad';

const Page2 = () => {
  return (
    <>
      <div className='main'>
        <Header />
        <LoginModal/>
        <Banner />
        <Sneakers />
        <Ad/>
      </div>
    </>
  );
};

export default Page2;
