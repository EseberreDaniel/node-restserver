//import { url } from "inspector";

//===============
//Puerto
//==============
process.env.PORT = process.env.PORT || 3000;


//=====
//Vencimiento del Token
//======
process.env.CADUCIDAD_TOKEN = '24h';




//=====
//SEED de autenticacion
//======
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarollo';


//=====
//Entorno
//======
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.DB_URI;
}

process.env.URLDB = urlDB;