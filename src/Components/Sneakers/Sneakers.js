import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sneakers.css'
import { useCart } from '../Cart/CartContext';

function Sneakers() {
  const [sneakers, setSneakers] = useState([]);
  const [apiUrl, setApiUrl] = useState('http://localhost:1989/sneaker2/filter?&');
  const [dynamicJustifyContent, setDynamicJustifyContent] = useState('space-between');
  const [dynamicOpacityRight, setDynamicOpacityRight] = useState(1);
  const [dynamicOpacityLeft, setDynamicOpacityLeft] = useState(1);
  const [currentScroll, setCurrentScroll] = useState(0);
  const typeRef = useRef('Any');
  const yearRef = useRef('Any');
  const productContainerRef = useRef(null);

  //Cart States(Variabless)
  const [cartList, setCartList] = useState({
    CartList:[]
  });
  const [quantity, setQuantity] = useState(0);

  const { handleAddCartNumberStorage } = useCart();
  const storedCartNumber = localStorage.getItem('cNumber Local Storage')

//Check quantity  
  const addQuantity = (newSneaker) => {

  const update = {...newSneaker, Quantity: quantity}

  setCartList((prev) => ({
    CartList: [...prev.CartList, update],
  }));

  };

//Add item to cart
  const handleAddToCart = (newSneaker) => { 

    addQuantity(newSneaker)

    console.log(cartList.CartList)

   }

//Remove item from cart   
   const handleRemoveFromCart = (removedSneakerName) => { 

    setCartList((prev) => ({
      CartList: prev.CartList.filter((sneaker) => sneaker.name !== removedSneakerName),
    }));

    console.log(cartList.CartList)

    }

  // SCROLL RIGHT

  const scrollRight = () => {
    if (productContainerRef.current) {

      productContainerRef.current.scrollLeft += 1170;

    }
  };

  // SCROLL LEFT

  const scrollLeft = () => {
    if (productContainerRef.current) {

      productContainerRef.current.scrollLeft -= 1170;

    }
  };

  //API FILTER

  const getValue = () => {

    setTimeout(() => {

      productContainerRef.current.scrollLeft = 0;

    }, 500);

    let filterType = 'type=' + typeRef.current.value;

    if (filterType === 'type=Any') {
      filterType = '';
    }

    let filterYear = 'release_year=' + yearRef.current.value;

    if (filterYear === 'release_year=Any') {
      filterYear = '';
    }

    const newApiUrl = `http://localhost:1989/sneaker2/filter?${filterType}&${filterYear}`;
    setApiUrl(newApiUrl);

  };

  // CHECK ANY START - dynamic arrangement of the products (CSS justify content)

  useEffect(() => {

    if (typeRef.current.value === 'Any' && yearRef.current.value === 'Any') {
      setDynamicJustifyContent('space-between');
    } else {
      setDynamicJustifyContent('center');
    }

    //Check if container is scrollable horizontally done with freaking timeout
    setTimeout(() => {

      const container = productContainerRef.current;

      if (container.scrollWidth > container.clientWidth) {
        setDynamicOpacityRight(1)
        console.log('Turn on')
      }
      else {
        setDynamicOpacityRight(0.4)
        console.log('Turn off')
      }

    }, 160);

  }, [typeRef.current.value, yearRef.current.value]);

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

  return (
    <>
      <div id='productContainer' className='productContainer' ref={productContainerRef} style={{ justifyContent: dynamicJustifyContent }}>
        {sneakers.length > 0 ? (
          sneakers.map((sneaker) => (

            <div key={sneaker.id} className='Product'>
              <div className='tagContainer'>

                <div className='contentWrapper'>

                  <img className='productImage' src={sneaker.image} alt='Sneaker' />

                  <Link to={`/Product/${sneaker.id}`}>
                    <img className='productImagenoBG' src={sneaker.image_noBG} alt='Sneaker No BG' />
                  </Link>

                </div>

                <Link to={`/Product/${sneaker.id}`} style={{ textDecoration: 'none' }}>
                  <p className='productTag sName'>{sneaker.name}</p>
                </Link>

                <p className='productTag sType' style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', fontSize: '0.9em' }}> {sneaker.type}</p>
                <p className='productTag sPrice' style={{ marginTop: '16px', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)' }}>${sneaker.price}</p>
                <p className='productTag sYear' style={{ right: '0%', top: '0%', position: 'absolute' }}>{sneaker.release_year}</p>

              </div>

              <button style={{ width: '60px' }}>
                <Link to={`/update/${sneaker.id}`}>Update</Link>
              </button>

              <button style={{ width: '60px' }} onClick={() => deleteSneaker(sneaker.id)}>
                {/* add name here to show the button */}
              </button>

              <button style={{ width: '60px' }} onClick={() => handleAddToCart(sneaker)}>
                Add To Cart
              </button>

              <button style={{ width: '60px' }} onClick={() => handleRemoveFromCart(sneaker.name)}>
                Remove
              </button>

              <button style={{ width: '60px' }} onClick={() => console.log(cartList.CartList)}>
                log
              </button>

            </div>
          ))

        ) : sneakers.length === 0 ? (
          <p>No Result Found</p>
        ) : (
          <p id='loading'>Loading...</p>
        )}
      </div>
      {/* --------------------SCROLL BUTTONS-------------------- */}

      <div className='buttonContainer'>
        <button className='scrollButton' style={{ opacity: dynamicOpacityLeft, transition: 'opacity 160ms ease-in-out, background-color 160ms ease-in-out' }} onClick={scrollLeft}>
          <i className='arrow left'></i>
        </button>

        <button className='scrollButton' style={{ opacity: dynamicOpacityRight, transition: 'opacity 160ms ease-in-out, background-color 160ms ease-in-out' }} onClick={scrollRight}>
          <i className='arrow right'></i>
        </button>
      </div>

      {/* --------------------MENU-------------------- */}

      <div className='menu'>
        <label htmlFor='type'>
          Type: {''}
          <select onChange={getValue} ref={typeRef} name='type' id='type'>
            <option value={'Any'}>Any</option>
            <option value={'Casual'}>Casual</option>
            <option value={'Running'}>Running</option>
            <option value={'Sport'}>Sport</option>
            <option value={'Climbing'}>Climbing</option>
            <option value={'Homewear'}>Homewear</option>
          </select>
        </label>

        <label htmlFor='year'>
          Release Year: {''}
          <select onChange={getValue} ref={yearRef} name='year' id='year'>
            <option value={'Any'}>Any</option>
            <option value={'2023'}>2023</option>
            <option value={'2022'}>2022</option>
            <option value={'2021'}>2021</option>
          </select>
        </label>

      </div>

    </>
  );
}

export default Sneakers