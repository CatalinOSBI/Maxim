import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {useRef} from 'react'

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
  const [dynamicjustifyContent, setdynamicjustifyContent] = useState('space-between')
  const typeRef = useRef('Any')
  const yearRef = useRef('Any')

  // GET VALUE START

const getValue = () => {

  console.log(typeRef.current.value)

  let filterType ='type='+ typeRef.current.value

  if (filterType === 'type=Any')
  {
    filterType=''
  }

  let filterYear ='release_year='+ yearRef.current.value

  if (filterYear === 'release_year=Any')
  {
    filterYear=''
  }

  let newApiUrl = `http://localhost:1989/sneaker2/filter?${filterType}&${filterYear}`
  setapiUrl(newApiUrl)
 
}

  // GET VALUE END

  // CHECK ANY START - dynamic arrangement of the products (CSS justify content)

  useEffect(() => {


    if (typeRef.current.value === 'Any' && yearRef.current.value === 'Any' )
    {
    setdynamicjustifyContent('space-between')
    }
    else
    {
      setdynamicjustifyContent('center')
    } 

  },[typeRef.current.value, yearRef.current.value])

  // CHECK ANY END

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
      <div className='productContainer' style={{justifyContent: dynamicjustifyContent}}>
      {Sneakers.length > 0 ? (
        Sneakers.map(Sneakers =>
      (
        <div key={Sneakers.id} className='Product'>
          <img className='productImage' src={Sneakers.image} alt='Sneaker' style={{width:'300px'}}/>
          <img className='productImagenoBG' src={Sneakers.image_noBG} alt='Sneaker No BG' style={{width:'300px'}}/>
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
      ref={typeRef}
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
      ref={yearRef}
      name='year'
      id='year'> 
      <option value={'Any'}>Any</option>
      <option value={'2023'}>2023</option> 
      <option value={'2022'}>2022</option>
      <option value={'2021'}>2021</option>
      </select>
    </label>

    </div>

{/* --------------------MENU-------------------- */}
</>    
)}



export default Page2