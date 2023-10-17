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
  

  const deleteSneaker = (id) =>{

    axios.delete("http://localhost:1989/result/"+id)
    window.location.reload()
  }


  return(
      <div className='productContainer'>

      {Sneakers.length > 0 ? (
        Sneakers.map(Sneakers =>
      (
        <div key={Sneakers.id} className='Product'>
          <h1>{Sneakers.name}</h1>
          <p>{Sneakers.type}</p>
          <p>{Sneakers.release_year}</p>
          <button style={{width:'60px'}}>Update</button>
          <button style={{width:'60px'}} onClick={()=>deleteSneaker(Sneakers.id)}>Delete</button>
        </div>       
      ))
      ) : (
        //if the items are not loaded fast enough show a loading screen
          <p id='loading'>Loading...</p> 
      )}
    </div>
    
  )
}



export default Page2