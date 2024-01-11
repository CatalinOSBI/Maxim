import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {useRef} from 'react'
import ContentBanner from './Images/ContentBanner2.png'

const Page2 = () => {
  return (
    <>
    <div className='main'>Home Page
    <div className='bannerContainer'>
      <img className='bannerImage' src={ContentBanner}/>
    </div>
    <Sneakers/>
    </div>
    </>
  )
}



function Sneakers(){
  const [Sneakers, setSneakers] = useState ([])
  const [apiUrl, setapiUrl] = useState ('http://localhost:1989/sneaker2/filter?&')
  const [dynamicjustifyContent, setdynamicjustifyContent] = useState('space-between')
  const typeRef = useRef('Any')
  const yearRef = useRef('Any')
  const productContainerRef = useRef(null)

  //SCROLL BUTTONS
  //RIGHT
  const scrollRight = () => {
    if(productContainerRef.current)
    {
      productContainerRef.current.scrollLeft += 1170;
    }
  }
  //LEFT
  const scrollLeft = () => {
    if(productContainerRef.current)
    {
      productContainerRef.current.scrollLeft -= 1170;
    }
  }

  //SCROLL BUTTONS

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
      <div id='productContainer' className='productContainer' ref={productContainerRef} style={{justifyContent: dynamicjustifyContent}}>
      {Sneakers.length > 0 ? (
        Sneakers.map(Sneakers =>
      (
        <div key={Sneakers.id} className='Product'>

          <div className='tagContainer'>
          <div className='contentWrapper'>
          <img className='productImage' src={Sneakers.image} alt='Sneaker' style={{width:'300px'}}/>
          <img className='productImagenoBG' src={Sneakers.image_noBG} alt='Sneaker No BG' style={{width:'300px'}}/>
          </div>

          <p className='productTag sName'>{Sneakers.name}</p>
          <p className='productTag sType' style={{fontFamily:'Helvetica Now Text Regular, Helvetica, Arial', fontSize:'0.9em'}}>{Sneakers.type}</p>
          <p className='productTag sPrice'style={{marginTop:'16px', textShadow:'0px 0px 25px rgba(0, 0, 0, 1)'}}>${Sneakers.price}</p>
          <p className='productTag sYear' style={{right:'0%', top:'0%',position:'absolute'}}>{Sneakers.release_year}</p>  
          </div>
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

    <button onClick={scrollRight}>Move Right</button>
    <button onClick={scrollLeft}>Move Left</button>

    </div>

{/* --------------------MENU-------------------- */}
</>    
)}



export default Page2