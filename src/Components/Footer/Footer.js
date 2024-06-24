import React,{useState, useEffect} from 'react'
import './Footer.css'
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
  let location = useLocation()
  let page = location.pathname.split('/')[1]

  const [position, setPosition] = useState();

  useEffect(() => {

    if (page === 'Product' && isPhone) {
      setPosition('')
    } else {
      setPosition('0')
    } 


  }, [location]);


  const isPhone = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <footer>
      <p>MaxiM&trade;</p>
    </footer>
  )
}

export default Footer