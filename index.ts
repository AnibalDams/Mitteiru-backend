import express, { json,urlencoded } from "express";
import path from 'path';
import { fileURLToPath } from 'url';

import cors from "cors";
import routes from './src/routes/index.routes'
import dbConnection from './src/libs/db'
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());


//Routes

app.use(routes);


  

app.listen(process.env.PORT,async ()=>{
    console.log('listening on port '+process.env.PORT)
    await dbConnection()
})

// Archivos estaticos
app.use("/static", express.static(path.join(__dirname, "static")));


