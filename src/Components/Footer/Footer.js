import React,{useState, useEffect} from 'react'
import './Footer.css'
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
  let location = useLocation()
  let page = location.pathname.split('/')[1]

  const [KORN, setKORN] = useState();

  useEffect(() => {

    if (page === 'Product' && isPhone) {
      setKORN('')
    } else {
      setKORN('0')
    } 


  }, [location]);


  const isPhone = useMediaQuery({ query: '(max-width: 600px)' })

  const position = page ==='Product' && isPhone ? 'absolute' : (page ==='Product' ? 'absolute' : 'absolute1')
  const bottom = page ==='Profile' && isPhone ? '0' : (page ==='Cart' && isPhone ? '' : '')

  return (
    <footer style={{ position: `${page ==='Product' && isPhone ? 'absolute' : (page ==='Product' ? 'relative' : (page ==='Home' ? 'relative' : 'absolute'))}`, bottom: KORN}}>
      <p>MaxiM&trade;</p>
    </footer>
  )
}

export default Footer