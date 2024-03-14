import React from 'react'
import './Footer.css'
import { useLocation } from 'react-router-dom';

const Footer = () => {

  let location = useLocation()
  let page =location.pathname.split('/')[1]

  return (
      <footer style={{bottom:`${page === 'Product' ? '-28%' : '0'}`}}>
        <p>MaxiM&trade;</p>
      </footer>
  )
}

export default Footer