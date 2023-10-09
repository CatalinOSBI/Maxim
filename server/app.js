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

app.get('/', (req,res) =>{
    res.send('Get Funcions works!')
})

app.listen(port, () =>{
    console.log(`App listening on port ${port}...`);
});

app.post('/shoelist', (req,res) =>{

    const type = req.body.type
    const release_year = req.body.release_year
    const name = req.body.name
    const image = req.body.image
    

    DB.query(
        'INSERT INTO `maxim`.`sneakers` (`type`, `release_year`, `name`, `image`) VALUES (?, ?, ?, ?);',
        [type, release_year, name, image], 

        (err, res) => {
            if (err){
                console.log(err)
            } else{
                console.log('MySql DB Updated1')
            }
        }
    )

})