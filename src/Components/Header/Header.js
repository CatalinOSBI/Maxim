import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';
import { useCart } from '../Cart/CartContext';
import './Header.css'

function Header() {
  const { UserEmail,
    IsLoggedIn,
    UserDisplayName,
    handleSignOut,
    UserRole,
    handleCheckUserRole,
    handleOpenModal,
    handleGetUserData,
  } = useAuth()

  const { cNumber, reset } = useCart();
  const navigate = useNavigate()

  const CartIcon = 
  <svg style={{ width: '30px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#131314" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>

  const storedCartNumber = localStorage.getItem('cNumber Local Storage')

  //check wether user is admin or not
  const handleGoToAdminPage = async () => {
    await handleCheckUserRole()
    navigate('/AdminPage')
  }

  return (
    <>
      <header>
        <div className='headerContainer'>

          <button>
            <Link to={'/Home'}>Home</Link>
          </button>
          <button>
            <Link to={'/Cart'}>View Cart</Link>
          </button>
          <button onClick={handleCheckUserRole}>
            <Link to={'/Profile'}>My Profile</Link>
          </button>

          <div className='cartCircle'>
            <p className='cartNumber'>{storedCartNumber}</p>
          </div>

          <button onClick={() => { console.log(IsLoggedIn) }}>Check if user is logged in</button>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={handleCheckUserRole}>Pass Role</button>
          <button onClick={handleOpenModal}>Sign In</button>
          <button onClick={handleGetUserData}>Get User Data</button>

          <button onClick={handleGoToAdminPage}>
            Go to Admin Page
          </button>

          <p style={{ marginRight: '20px', color: 'white' }}>{UserDisplayName}</p>

          <p style={{ marginRight: '20px', color: 'white' }}>{UserEmail}</p>

          <p style={{ marginRight: '20px', color: 'white' }}>{UserRole}</p>

        </div>
      </header>

      {/* ////////////////////////////////////////////////////////////// */}

      <header>
        <div className='headerContainer'>

          <h1 style={{ fontFamily: 'Zabal', color: 'black', fontSize: '3rem' }}>
            <Link className='Link' to={'/Home'}>MaxiM</Link>
          </h1>

          {CartIcon}

        </div>
      </header>
    </>
  );
}

export default Header;