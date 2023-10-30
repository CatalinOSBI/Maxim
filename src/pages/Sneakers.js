import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Sneakers = () => {

  const Update_MySql_DB = () =>{

    axios.post('http://localhost:1989/sneakers',Info )

    .then(() =>{
      console.log('MySql DB Updated2')
    })

  }

  const [Info, setInfo] = useState({
    type:"",
    release_year:"",
    name:"",
    image:"",
    image_noBG:"",
  })

  const getData = (event) =>{
    const name = event.target.name
    const value = event.target.value

    setInfo((previous) => {
      return{...previous,[name]: value}
    })

  }
  
  return (
      <>
      <div>sneakers</div>
      <button onClick={Update_MySql_DB}>Update MySql DB</button>
      <img src='https://i.ibb.co/xMQRVh6/ballers-1.png' alt='shoes' style={{width: "9%"}} />
      <input name='type' id='type' type='text' placeholder='type' onChange={getData}/>
      <input name='release_year' id='release_year' type='number' placeholder='release_year' onChange={getData}/>
      <input name='name' id='name' type='text' placeholder='name' onChange={getData}/>
      <input name='image' id='image' type='text' placeholder='image' onChange={getData}/>
      <input name='image_noBG' id='image-noBG' type='text' placeholder='image_noBG' onChange={getData}/>
      <h1>{Info.name}</h1>
      </>   
  )
}



export default Sneakers