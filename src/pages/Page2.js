import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Page2 = () => {
  return (
    <>
    <div>page2</div>
    <Sneakers/>
    </>
  )
}



function Sneakers(){
  const [Sneakers, setSneakers] = useState ([])

  useEffect(()=>{
    axios.get("http://localhost:1989/result")
    
        .then(res => {
            setSneakers(res.data)
            console.log(Sneakers)
        })   
  // Putting the API Response in an array      
  },[]);
  
  return(
      <div className='middle'>
  {/* Creating a div for each comic in the array */}
      {Sneakers.length > 0 ? (
        <p>Loaded!</p>
      ) : (
        //if the comics are not loaded fast enough show a loading screen
          <p id='loading'>Loading...</p> 
      )}
    </div>
    
  )
}



export default Page2