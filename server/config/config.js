//import { url } from "inspector";

//===============
//Puerto
//==============
process.env.PORT = process.env.PORT || 3000;


//=====
//Entorno
//======
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    console.log(process.env.DB_URI);
    urlDB = process.env.DB_URI;
}

process.env.URLDB = urlDB;