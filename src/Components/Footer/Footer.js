import React from 'react'
import './Footer.css'
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {

  let location = useLocation()
  let page = location.pathname.split('/')[1]

  const isPhone = useMediaQuery({ query: '(max-width: 600px)' })

  const position = page ==='Product' && isPhone ? 'absolute' : (page ==='Product' ? 'absolute' : 'absolut')

  return (
    <footer style={{ position: `${page ==='Product' && isPhone ? 'absolute' : (page ==='Product' ? 'relative' : 'absolute')}` }}>
      <p>MaxiM&trade;</p>
      <button onClick={()=>{console.log(position)}}>asd</button>
    </footer>
  )
}

export default Footer