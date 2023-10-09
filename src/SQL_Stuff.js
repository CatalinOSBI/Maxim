import express from "express";
import mysql from 'mysql';

const app = express()

app.listen(3306), ()=>{
    console.log('something')
}

const DB = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1989',
    database:'maxim'
})