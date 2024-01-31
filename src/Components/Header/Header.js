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
          } = useAuth()

  const { cNumber, reset } = useCart();
  const navigate = useNavigate()

  const storedCartNumber = localStorage.getItem('cNumber Local Storage')

  //check wether user is admin or not
  const handleGoToAdminPage = async() => { 
    await handleCheckUserRole()
    navigate('/AdminPage')
   }

  return (
    <header>
      <div className='headerContainer'>

        <button>View Cart</button>
        <div className='cartCircle'>
          <p className='cartNumber'>{storedCartNumber}</p>
        </div>

    <button onClick={() => {console.log(IsLoggedIn)} }>Check if user is logged in</button>
    <button onClick={handleSignOut}>Sign Out</button>
    <button onClick={handleCheckUserRole}>Pass Role</button>
    <button onClick={handleOpenModal}>Sign In</button>

    <button onClick={handleGoToAdminPage}>
      Go to Admin Page
    </button>

    <p style={{marginRight:'20px', color:'white'}}>{UserDisplayName}</p>

    <p style={{marginRight:'20px', color:'white'}}>{UserEmail}</p>

    <p style={{marginRight:'20px', color:'white'}}>{UserRole}</p>

      </div>
    </header>
  );
}

export default Header;