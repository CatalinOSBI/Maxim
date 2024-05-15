import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sneakers.css'
import { useCart } from '../Cart/CartContext';
import { useMenu } from './MenuContext';
import Menu from './Menu';
import { useMediaQuery } from 'react-responsive';

function Sneakers() {
  const [sneakers, setSneakers] = useState([]);
  const [apiUrl, setApiUrl] = useState('http://localhost:1989/sneaker2/filter?&');
  const [dynamicJustifyContent, setDynamicJustifyContent] = useState('space-between');
  const [dynamicOpacityRight, setDynamicOpacityRight] = useState(1);
  const [dynamicOpacityLeft, setDynamicOpacityLeft] = useState(1);
  const [currentScroll, setCurrentScroll] = useState(0);
  const productContainerRef = useRef(null);

  //Cart States(Variabless)

  const { handleAddCartNumberStorage,
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveQuantity,
    cartList,
  } = useCart();

  const storedCartNumber = localStorage.getItem('cNumber Local Storage')

  //menu vars
  const {
    optionValueType,
    optionValueYear,
  } = useMenu();

  // SCROLL RIGHT

  const scrollRight = () => {
    if (productContainerRef.current) {

      productContainerRef.current.scrollLeft += 400;

    }
  };

  // SCROLL LEFT

  const scrollLeft = () => {
    if (productContainerRef.current) {

      productContainerRef.current.scrollLeft -= 200;

    }
  };

  //API FILTER

  useEffect(() => {
    
    let filterType = 'type=' + optionValueType;

    if (filterType === 'type=Any') {
      filterType = '';
    }

    let filterYear = 'release_year=' + optionValueYear;

    if (filterYear === 'release_year=Any') {
      filterYear = '';
    }

    const newApiUrl = `http://localhost:1989/sneaker2/filter?${filterType}&${filterYear}`;
    setApiUrl(newApiUrl);

//reset scroll
    if (productContainerRef.current.scrollLeft) {
      setTimeout(() => {

        productContainerRef.current.scrollLeft = 0;
  
      }, 500);
    }


  }, [optionValueType, optionValueYear]);

  // CHECK ANY START - dynamic arrangement of the products (CSS justify content)

  useEffect(() => {

    if (optionValueType === 'Any' && optionValueYear === 'Any') {
      setDynamicJustifyContent('space-between');
    } else {
      setDynamicJustifyContent('center');
    }

    //Check if container is scrollable horizontally done with freaking timeout
    const container = productContainerRef.current;
    if (container.scrollWidth) {
      
      setTimeout(() => {
  
        if (container.scrollWidth > container.clientWidth) {
          setDynamicOpacityRight(1)
          console.log('Turn on')
        }
        else {
          setDynamicOpacityRight(0.4)
          console.log('Turn off')
        }
  
      }, 160);

    }

  }, [optionValueType, optionValueYear]);

  //API

  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      setSneakers(res.data);
    });

  }, [apiUrl]);

  //DELETE

  const deleteSneaker = (id) => {
    axios.delete(`http://localhost:1989/sneakers/${id}`);
    window.location.reload();
  };

  //DYNAMIC OPACITY with event listeners

  const handleScroll = () => {
    if (productContainerRef.current) {
      setCurrentScroll(productContainerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    if (productContainerRef.current) {
      productContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (productContainerRef.current) {
        productContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (productContainerRef.current) {
      const container = productContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (currentScroll >= maxScroll && maxScroll !== 0) {
        setDynamicOpacityRight(0.4);
      }
      else if (currentScroll === 0) {
        setDynamicOpacityLeft(0.4);
      }
      else {
        setDynamicOpacityLeft(1)
        setDynamicOpacityRight(1)
      }

    }
  }, [currentScroll]);
  //RENDER

  const isPhone = useMediaQuery({query:'(max-width: 600px)'})

  return (
    <>

      <div className='filterContainer'>
          {!isPhone && <Menu/>}
        <div id='productContainer' className='productContainer' ref={productContainerRef} style={{ justifyContent: dynamicJustifyContent }}>
          {sneakers.length > 0 ? (
            sneakers.map((sneaker) => (

              <div key={sneaker.id} className='Product'>
                <div className='tagContainer'>

                  <div className='contentWrapper'>

                    <img className='productImage' src={sneaker.image} alt='Sneaker' />

                    <Link to={`/Product/${sneaker.id}/${sneaker.type}`}>
                      <img className='productImagenoBG' src={sneaker.image_noBG} alt='Sneaker No BG' />
                    </Link>

                  </div>

                  <Link to={`/Product/${sneaker.id}/${sneaker.type}`} style={{ textDecoration: 'none' }}>
                    <p className='productTag sName'>{sneaker.name}</p>
                  </Link>

                  <p className='productTag sType' style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', fontSize: '0.9em' }}> {sneaker.type}</p>
                  <p className='productTag sPrice' style={{ marginTop: '16px', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)', marginBottom:'4%' }}>${sneaker.price}</p>
                  <p className='productTag sYear' style={{ right: '0%', top: '0%', position: 'absolute' }}>{sneaker.release_year}</p>

                </div>
              </div>
            ))

          ) : sneakers.length === 0 ? (
            <p>No Results Found</p>
          ) : (
            <p id='loading'>Loading...</p>
          )}
        </div>
        {/* --------------------SCROLL BUTTONS-------------------- */}
      </div>

      <div className='buttonContainer'>

        <button className='scrollButton' style={{ opacity: dynamicOpacityLeft, transition: 'opacity 160ms ease-in-out, background-color 160ms ease-in-out', cursor: `${dynamicOpacityLeft === 0.4 ? 'not-allowed' : 'pointer'}` }} onClick={scrollLeft}>
          <i className='arrow left'></i>
        </button>

        <button className='scrollButton' style={{ opacity: dynamicOpacityRight, transition: 'opacity 160ms ease-in-out, background-color 160ms ease-in-out', cursor: `${dynamicOpacityRight === 0.4 ? 'not-allowed' : 'pointer'}` }} onClick={scrollRight}>
          <i className='arrow right'></i>
        </button>

      </div>

    </>
  );
}

export default Sneakers