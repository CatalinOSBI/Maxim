import React, { useState } from 'react';
import Header from '../Components/Header';
import LoginModal from '../Components/Login/LoginModal';
import { useAuth } from '../Components/Login/AuthContext';
import './CSS pages/profile.css';
import Ripple from '../Components/Ripple Button/Ripple';

const ProfilePage = () => {
  const [activeMenu, setActiveMenu] = useState(0);

  const handleSetActive = (index) => {
    setActiveMenu(index);
  };

  const getMenuListItemStyle = (index) => ({
    paddingLeft: '8px',
    transition: 'border-left 160ms',
    cursor: 'pointer',
    borderLeft: `${activeMenu === index ? 'solid 8px #e6c300' : ''}`,
  });

  const { UserEmail,
    UserDisplayName,
    UserEmailVerified,
    UserAccountCreationTime,
    handleSignOut,
    UserRole,
    handleGetUserData } =
    useAuth();

  const menuItems = ['Account Overview', 'Coming Soon...'];
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
        <p> <span>Username: </span> {UserDisplayName}</p>
        <p> <span>User Role: </span> {UserRole}</p>
        <p> <span>Email: </span> {UserEmail}</p>
        <p> <span>Email Verfied: </span>  {`${UserEmailVerified ? 'Yes' : 'No'}`}</p>
        <p> <span>Account Creation Date: </span> {UserAccountCreationTime}</p>

        <div className='profileMenuContentBottom'>
            <button onClick={handleSignOut} className='addToCartButton' style={{ margin: '16px' }}>Sign Out
            <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={1600}/>
            </button>
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