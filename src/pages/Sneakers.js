import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Sneakers = () => {

  const Update_MySql_DB = () =>{

    axios.post('http://localhost:1989/shoelist', {
      type: Info.type,
      release_year: Info.release_year,
      name: Info.name,
      image: Info.image
    })

    .then(() =>{
      console.log('MySql DB Updated2')
    })

  }

  const [Info, setInfo] = useState({
    type:"",
    release_year:"",
    name:"",
    image:"",
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

    <h1>{Info.name}</h1>
    </>
  )
}

export default Sneakers