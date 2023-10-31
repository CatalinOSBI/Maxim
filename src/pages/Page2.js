import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
  const [apiUrl, setapiUrl] = useState ('http://localhost:1989/sneaker2/filter?&')

const getValue = () => {

  let filterType ='type='+ document.getElementById('type').value

  if (filterType === 'type=Any'){
    filterType=''
  }

  let filterYear ='release_year='+ document.getElementById('year').value

  if (filterYear === 'release_year=Any'){
    filterYear=''
  }

  let newApiUrl = `http://localhost:1989/sneaker2/filter?${filterType}&${filterYear}`
  setapiUrl(newApiUrl)
 
  console.log(apiUrl)
}


  useEffect(()=>{
    axios.get(apiUrl)
    
        .then(res => {
            setSneakers(res.data)
        })   
  // Putting the API Response in an array      
  },[apiUrl]);
  

  const deleteSneaker = (id) =>{

    axios.delete("http://localhost:1989/sneakers/"+id)
    window.location.reload()
  }

  return(
    <>
      <div className='productContainer'>

      {Sneakers.length > 0 ? (
        Sneakers.map(Sneakers =>
      (
        <div key={Sneakers.id} className='Product'>
          <img src={Sneakers.image} alt='Sneaker Image' style={{width:'300px'}}/>
          <p>{Sneakers.name}</p>
          <p>{Sneakers.type}</p>
          <p>{Sneakers.release_year}</p>
          <button style={{width:'60px'}}><Link to={`/update/${Sneakers.id}`}>Update</Link></button>
          <button style={{width:'60px'}} onClick={()=>deleteSneaker(Sneakers.id)}>Delete</button>
        </div>       
      ))
      //else if there are no items show a no result screen
      ) : Sneakers.length === 0 ? (
        <p>No Result Found</p>
      
      ) : (
        //else show a loading screen
          <p id='loading'>Loading...</p>
          
  
          
      )}
    </div>


{/* --------------------MENU-------------------- */}

<div className='menu'>
    <label htmlFor='type'>Type: {""}
      <select onChange={getValue}
      name='type'
      id='type'> 
      <option value={'Any'}>Any</option>
      <option value={'Casual'}>Casual</option> 
      <option value={'Running'}>Running</option>
      <option value={'Sport'}>Sport</option>
      <option value={'Climbing'}>Climbing</option>
      <option value={'Homewear'}>Homewear</option>
      </select>
    </label>

    <label htmlFor='year'>Release Year: {""}
      <select onChange={getValue}
      name='year'
      id='year'> 
      <option value={'Any'}>Any</option>
      <option value={'2023'}>2023</option> 
      <option value={'2022'}>2022</option>
      <option value={'2021'}>2021</option>
      </select>
    </label>

    <button onClick={getValue}>get</button>
    </div>

{/* --------------------MENU-------------------- */}
</>    
)}



export default Page2