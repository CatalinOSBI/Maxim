import React from 'react';
import Sneakers from '../Components/Sneakers';
import Banner from '../Components/Banner';
import Header from '../Components/Header';
import LoginModal from '../Components/Login/LoginModal';
import Ad from '../Components/Ad';
import Test from '../Components/Test/Test';

const Page2 = () => {
  return (
    <>
      <div className='main'>
        <Header />
        <LoginModal/>
        <Banner />
        <Test/>
        <Sneakers />
        <Ad/>
      </div>
    </>
  );
};

export default Page2;
