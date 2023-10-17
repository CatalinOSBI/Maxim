const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 1989
const cors =require('cors')

app.use(cors());
app.use(express.json())
//-----------------ESTABLISHING THE CONNEXION-----------------//
const DB = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1989',
    database:'maxim',
})

app.listen(port, () =>{
    console.log(`App listening on ports ${port}...`);
});

//-----------------GET-----------------//
app.get('/result', (req,res) =>{
    const SQL = 'SELECT * FROM maxim.sneakers;'
    
    DB.query(SQL, (err, data) =>{
        if (err){
            return res.json(err)
        } else{
            return res.json(data)
        }
    })
})
//-----------------GET-----------------//



//-----------------POST-----------------//
app.post('/shoelist', (req,res) =>{

    const type = req.body.type
    const release_year = req.body.release_year
    const name = req.body.name
    const image = req.body.image
    const SQL = 'INSERT INTO `maxim`.`sneakers` (`type`, `release_year`, `name`, `image`) VALUES (?, ?, ?, ?);'

    DB.query(SQL,[type, release_year, name, image], (err, data) => {
            if (err){
                return res.json(err)
            } else{
                console.log('Updated DB!')
                return res.json(data)
            }
        }
    )

})
//-----------------POST-----------------//



//-----------------DELETE-----------------//
app.delete('/result/:id', (req, res) =>{

    const sneakerId = req.params.id;
    const SQL = "DELETE FROM `maxim`.`sneakers` WHERE (`id` = ?) "

    DB.query(SQL, [sneakerId], (err, data)=>{
        if (err){
            return res.json(err)
        } else{
            console.log('Removed item from DB!')
            return res.json(data)
        }
    })
})
//-----------------DELETE-----------------//