import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Update() {
  const [Info, setInfo] = useState({
    type:"",
    release_year:"",
    name:"",
    image:"",
    image_noBG:"",
    price:"",
  })

  let location = useLocation()
  let id =location.pathname.split('/')[2]


  //api call
    const [Data, setData] = useState('')

    useEffect(()=>{

      axios.get("http://localhost:1989/sneakers/"+id)
      
          .then(res => {
              const {id, ...dataWithNoId} = res.data[0]
              setData(dataWithNoId)

          })   
          
    //api call      
    },[]);

  const updateSneaker = () =>{

   console.log(Info)

    axios.put('http://localhost:1989/sneakers/'+ id, Info)
    .then(res => {
      console.log('PUT Request Successful');
      console.log('Response Data:', res.data);
    })
    .catch(error => {
      console.error('Error:', error);
    },);
    
  }

  const getData = (event) =>{
    const name = event.target.name
    const value = event.target.value

    setInfo((previous) => {
      return{...previous,[name]: value}
    })
    
  }

  const originalData = () =>{
    document.getElementById('type').value = Data.type
    document.getElementById('release_year').value = Data.release_year
    document.getElementById('name').value = Data.name
    document.getElementById('image').value = Data.image
    document.getElementById('image_noBG').value = Data.image_noBG
    document.getElementById('price').value = Data.price

    setInfo(Data)

  }


  return (
    <>
    
    <div>update</div>
    <button onClick={updateSneaker}>Update Sneaker</button>
    <input name='type' id='type' type='text' placeholder='type' onChange={getData} />
    <input name='release_year' id='release_year' type='number' placeholder='release year' onChange={getData}/>
    <input name='name' id='name' type='text' placeholder='name' onChange={getData}/>
    <input name='image' id='image' type='text' placeholder='image' onChange={getData}/>
    <input name='image_noBG' id='image_noBG' type='text' placeholder='image_noBG' onChange={getData}/>
    <input name='price' id='price' type="number" placeholder='price' min="1" step="any" onChange={getData} />

    <h1>{Info.name}</h1>
    <button onClick={originalData}>Get Original Data</button>
    </>

  )
}

export default Update