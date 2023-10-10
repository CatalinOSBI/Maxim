import React from 'react'
import axios from 'axios'

const Sneakers = () => {

  const Update_MySql_DB = () =>{

    const type = 'Hackig'
    const release_year = 2024
    const name = 'MaximM Joggers'
    const image = 'Image Link from site'

    axios.post('http://localhost:1989/shoelist', {
      type: type, 
      release_year: release_year ,
      name: name  ,
      image: image 
    })

    .then(() =>{
      console.log('MySql DB Updated2')
    })

  }

  return (
    <>
    <div>sneakers</div>
    <button onClick={Update_MySql_DB}>Update MySql DB</button>
    </>
  )
}

export default Sneakers