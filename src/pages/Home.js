import React, { useEffect } from 'react';
import Sneakers from '../Components/Sneakers';
import Banner from '../Components/Banner';
import Header from '../Components/Header';
import LoginModal from '../Components/Login/LoginModal';
import Ad from '../Components/Ad';
import { MenuProvider } from '../Components/Sneakers/MenuContext';
import Footer from '../Components/Footer';
import { useAuth } from '../Components/Login/AuthContext';

const Page2 = () => {

  useEffect(() => {

    if (IsLoggedIn) {
      setTimeout(() => {
        handleCheckUserRole()
      }, 300);
    }

  }, []);

  const {
    handleCheckUserRole,
    IsLoggedIn,
  } = useAuth()

  return (
    <>
      <div className='main'>
        <Header />

        <LoginModal />
        <Banner />

        <MenuProvider>
          <Sneakers />
        </MenuProvider>

        <Ad />
        <Footer />
      </div>
    </>
  );
};

export default Page2;
