import React from 'react'
import './Header.css'

function Header() {

    return (
    <header>
        <div className='headerContainer'>
            <div className='cartCircle'>
                <p className='cartNumber'>{cNumber}</p>
            </div>
        </div>
    </header>    
  )
}

export default Header