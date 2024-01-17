import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import Header from '../Header';

function Product() {

    let location = useLocation()
    let id =location.pathname.split('/')[2]

  //Post request to fill in the inputs with the current data
  const [Sneakers, setSneakers] = useState('')

  useEffect(()=>{

    axios.get("http://localhost:1989/sneakers/"+id)
    
        .then(res => {
            setSneakers(res.data[0])

        })   
        
  // Putting the API Response in an array      
  },[]);    

    function getSneakers () {

        console.log(Sneakers)

        
    }

  return (
<>  

    <Header/>
    <div>{Sneakers.name}</div>
    <img src={Sneakers.image}/>
    <button onClick={getSneakers}>Get Info</button>
</>
  )
}



export default Product
