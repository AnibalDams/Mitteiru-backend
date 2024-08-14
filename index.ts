import express, { json,urlencoded } from "express";


import cors from "cors";
import routes from './src/routes/index.routes'

const app = express();

// Middlewares

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());


//Routes

app.use(routes);



app.listen(process.env.PORT,()=>console.log('listening on port '+process.env.PORT))

// Archivos estaticos
app.use("/static", express.static(__dirname + "/static"));

