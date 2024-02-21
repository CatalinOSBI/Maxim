const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 1989
const cors =require('cors')
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
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
app.get('/sneakers', (req,res) =>{
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
app.post('/sneakers', (req,res) =>{

    const values=[
        req.body.type,
        req.body.release_year,
        req.body.name,
        req.body.image,
        req.body.image_noBG,
        req.body.price
    ]
    const SQL = 'INSERT INTO `maxim`.`sneakers` (`type`, `release_year`, `name`, `image`, `image_noBG`, `price`) VALUES (?);'

    DB.query(SQL,[values], (err, data) => {
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
app.delete('/sneakers/:id', (req, res) =>{

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



//-----------------PUT-----------------//
app.put('/sneakers/:id', (req, res) =>{

    const sneakerId = req.params.id;
    const SQL = "UPDATE `maxim`.`sneakers` SET `type` = ?, `release_year` = ?, `name` = ?, `image` = ?, `image_noBG` = ?, `price` = ? WHERE (`id` = ?); "

    const values=[
        req.body.type,
        req.body.release_year,
        req.body.name,
        req.body.image,
        req.body.image_noBG,
        req.body.price
    ]

    DB.query(SQL, [...values,sneakerId], (err, data)=>{
        if (err){
            return res.json(err)
        } else{
            console.log('Updated item from DB!')
            return res.json(data)
        }
    })
})
//-----------------PUT-----------------//



//-----------------CUSTOM GET-----------------//
app.get('/sneakers/:id', (req,res) =>{
    const SQL = 'SELECT * FROM maxim.sneakers WHERE id=?;'
    const sneakerId = req.params.id
    
    DB.query(SQL,[sneakerId], (err, data) =>{
        if (err){
            return res.json(err)
        } else{
            return res.json(data)
        }
    })
})
//-----------------CUSTOM GET-----------------//


//---------------------------SAME WAY MARVEL DOES IT------------------------------//

app.get('/sneaker2/filter', (req, res) => {
    const { type, release_year } = req.query;
  
    let query = 'SELECT * FROM sneakers WHERE 1'; // Start with a true condition
  
    const queryParams = [];
  
    if (type) {
      query += ' AND type = ?';
      queryParams.push(type);
    }
  
    if (release_year) {
      query += ' AND release_year = ?';
      queryParams.push(release_year);
    }
  
    DB.query(query, queryParams, (err, data) => {
        if (err){
            return res.json(err)
        } else{
            return res.json(data)
        }
  
    });
  });
                               
  //--------------------------------------------------------------------------------//

//------------------------------STRIPE--------------------------------------//

const stripe = require('stripe')('sk_test_51OlrifGuYcLzddVWgAIIETyA5yE3y2WlUdU0A4ghl2cVbmcqTIkV2g0Zuciemv2VfvJFmIzrPEN16lsanLBVUQO100MRLit9Qp');

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/api/create-checkout-session', async (req, res) => {
    const {ShoppingCart} = req.body;
  
    const lineItems = ShoppingCart.map(product => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price * 100, // Convert to cents
      },
      quantity: product.Quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });

      res.json({ id: session.id });
    });

//------------------------------STRIPE--------------------------------------//