import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';
import { useCart } from '../Cart/CartContext';
import './Header.css'

function Header() {
  const {
    IsLoggedIn,
    UserDisplayName,
    UserRole,
    handleCheckUserRole,
    handleOpenModal,
  } = useAuth()

  //event listener scroll START

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [dynamicTransform, setDynamicTransform] = useState('');
  const [dynamicTransform2, setDynamicTransform2] = useState('');
  const [scrollCheck, setScrollCheck] = useState();
  const [dynamicOpacity, setDynamicOpacity] = useState();

  const hideHeader = () => {
    if (scrollCheck) {
      setDynamicTransform('translateY(-160%)')
    }
  }

  const showHeader = () => {
    setDynamicTransform('translateY(0%)')
  }


  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop; //browser compatibality. i guess
      const scrollThreshold = document.documentElement.scrollHeight * 0.2; // 20% of the page (document.documentElement.scrollHeight is the TOTAL HEIGHT OF THE PAGE)

      //check to see if treshhold is reached
      if (currentScroll > scrollThreshold) {
        setScrollCheck(true);
        console.log('Reached 20%')
      } else {
        setScrollCheck(false);
        // console.log('alternative')
      }

      if (currentScroll <= 50) {
        setDynamicTransform2('translateY(0%)')
      } else {
        setDynamicTransform2('translateY(-160%)')

      }

      if (currentScroll > lastScrollTop) {
        //If scrolling DOWN

        hideHeader()
        setDynamicOpacity(0)

      } else {
        //If scrolling UP

        showHeader()
        setDynamicOpacity(1)

      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  //event listener scroll END

  const { cNumber, reset } = useCart();
  const navigate = useNavigate()

  const CartIcon =
    <svg style={{ width: '24px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#131314" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>

  const UserIcon =
    <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>

  const ToolIcon =
    <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>

  const Username =
    <p className='username' style={{ fontFamily: "helvetica now text medium", color: 'black', position: 'absolute', left: '0' }}>{UserDisplayName}</p>

  const storedCartNumber = localStorage.getItem('cNumber Local Storage')

  //check wether user is admin or not
  const handleGoToAdminPage = async () => {
    await handleCheckUserRole()
    navigate('/Maxim/AdminPage')
  }

  return (
    <>
      <header style={{ zIndex: '51' }}>
        <div className='headerContainer' style={{ justifyContent: 'flex-end', backgroundColor: 'rgb(238, 238, 238)', transform: dynamicTransform }}>
          {Username}

          {UserRole === 'admin' ?
            <>
              {ToolIcon}
              <button className='headerButton' onClick={handleGoToAdminPage}>
                Admin Page
              </button>
            </>
            :
            ''
          }

          {CartIcon}
          
          <Link className='Link' to={'/Maxim/Cart'}>
            <button className='headerButton'>
            {storedCartNumber === '0' ? '' :
              <div className='cartCircle'>
                <p className='cartNumber'>{storedCartNumber}</p>
              </div>
            }
              View Cart
            </button>
          </Link>

          {UserIcon}
          {IsLoggedIn ?
            <Link className='Link' to={'/Maxim/Profile'}>
              <button className='headerButton' onClick={handleCheckUserRole} style={{ marginRight: '2vw', padding: '5.2px' }}>
                View Profile
              </button>
            </Link>
            :
            <button className='headerButton' style={{ marginRight: '2vw', padding: '5.2px' }} onClick={handleOpenModal}>Sign In</button>
          }

        </div>
      </header>

      {/* /////////////////////////////////////////////// */}

      <header>
        <div className='headerContainer' style={{ transform: dynamicTransform2, transition: 'all .218s' }} >

          <h1 style={{ fontFamily: 'Zabal', color: 'black', fontSize: '3rem' }}>
            <Link className='Link' to={'/Home'}>MaxiM</Link>
          </h1>

        </div>
      </header>
    </>
  );
}

export default Header;