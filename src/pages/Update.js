import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Update() {

  let location = useLocation()
  let id =location.pathname.split('/')[2]


  //Post request to fill in the inputs with the current data
    const [type, settype] = useState ('')
    const [release_year, setrelease_year] = useState ('')
    const [name, setname] = useState ('')
    const [image, setimage] = useState ('')
    const [image_noBG, setimage_noBG] = useState ('')

    useEffect(()=>{
      axios.get("http://localhost:1989/sneakers/"+id)
      
          .then(res => {
              settype(res.data[0].type)
              setrelease_year(res.data[0].release_year)
              setname(res.data[0].name)
              setimage(res.data[0].image)
              setimage_noBG(res.data[0].image_noBG)
          })   
    // Putting the API Response in an array      
    },[]);

  const updateSneaker = () =>{

   

    axios.put('http://localhost:1989/sneakers/'+ id, Info)
    .then(res => {
      console.log('PUT Request Successful');
      console.log('Response Data:', res.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
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

  const originalData = () =>{
    document.getElementById('type').value = type
    document.getElementById('release_year').value = release_year
    document.getElementById('name').value = name
    document.getElementById('image').value = image
    document.getElementById('image_noBG').value = image_noBG
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

    <h1>{Info.name}</h1>
    <button onClick={originalData}>Get Original Data</button>
    </>

  )
}

export default Update