const express =require('express')
const mysql = require('mysql')
const app = express()
const port = 1989
const cors =require('cors')

app.use(cors());
app.use(express.json())

const DB = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1989',
    database:'maxim',
})

app.get('/result', (req,res) =>{

    const SQL = 'SELECT * FROM maxim.sneakers;'
    DB.query(SQL, (err, data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(port, () =>{
    console.log(`App listening on ports ${port}...`);
});

app.post('/shoelist', (req,res) =>{

    // const type = req.body.type
    // const release_year = req.body.release_year
    // const name = req.body.name
    // const image = req.body.image

    const type = 'B-END Type'
    const release_year = 2024
    const name = 'B-END Name'
    const image = 'B-END Image'
    


    DB.query(
        'INSERT INTO `maxim`.`sneakers` (`type`, `release_year`, `name`, `image`) VALUES (?, ?, ?, ?);',
        [type, release_year, name, image], (err, data) => {
            if (err){
                return res.json(err)
            } else{
                console.log('Updated DB!')
                return res.json(data)
            }
        }
    )

})