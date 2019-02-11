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
    urlDB = 'mongodb://danieleseberre:hyjo9696@cluster0-shard-00-00-lcm6p.mongodb.net:27017,cluster0-shard-00-01-lcm6p.mongodb.net:27017,cluster0-shard-00-02-lcm6p.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
}

process.env.URLDB = urlDB;