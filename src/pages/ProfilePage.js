import React, { useState } from 'react';
import Header from '../Components/Header';
import LoginModal from '../Components/Login/LoginModal';
import { useAuth } from '../Components/Login/AuthContext';
import { createRipples } from 'react-ripples';
import './CSS pages/profile.css';

const ProfilePage = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleSetActive = (index) => {
    setActiveMenu(index);
  };

  const getMenuListItemStyle = (index) => ({
    paddingLeft: '8px',
    transition: 'border-left 250ms',
    cursor: 'pointer',
    borderLeft: `${activeMenu === index ? 'solid 8px #e6c300' : ''}`,
  });

  const MyRipples = createRipples({
    color: 'rgba(255, 255, 255, 0.336)',
    during: 800,
  });

  const { UserEmail,
    UserDisplayName,
    UserEmailVerified,
    UserAccountCreationTime,
    handleSignOut,
    UserRole,
    handleGetUserData } =
    useAuth();

  const menuItems = ['Account Overview', 'Coming Soon'];
  const menuItemsMap = menuItems.map((item, index) => (
    <li key={index} onClick={() => handleSetActive(index)} style={getMenuListItemStyle(index)}>
      {item}
    </li>
  ))

  const profilePageContent =
    <div className='profilePageContainer'>
      <div className='profilePageMenu'>
        <ul className='profileMenuList'>
          {menuItemsMap}
        </ul>
      </div>

      <div className='profileMenuContent'>
        <p>Username: <span> {UserDisplayName}</span> </p>
        <p>User Role:<span> {UserRole}</span></p>
        <p>Email: <span> {UserEmail}</span></p>
        <p>Email Verfied: <span> {`${UserEmailVerified ? 'Yes' : 'No'}`}</span></p>
        <p>Account Creation Date: <span>{UserAccountCreationTime}</span></p>

        <div className='profileMenuContentBottom'>
          <MyRipples >
            <button onClick={handleSignOut} className='addToCartButton' style={{ margin: '16px' }}>Sign Out</button>
          </MyRipples>
        </div>

      </div>

    </div>

  return (
    <>
      <Header />
      <LoginModal />
      {profilePageContent}
    </>
  )
}

export default ProfilePage