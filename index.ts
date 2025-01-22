import express, { json,urlencoded } from "express";
import path from 'path'

import cors from "cors";
import routes from './src/routes/index.routes'
import dbConnection from './src/libs/db'
const app = express();

// Middlewares

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());


//Routes

app.use(routes);

app.get('/download', (req, res) => {
    const file = path.join(__dirname, 'db.sqlite'); // Cambia 'ruta/al/archivo.txt' por la ruta de tu archivo
    res.download(file, (err) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
            res.status(500).send('Error al descargar el archivo');
        }
    });
  });
  

app.listen(process.env.PORT,async ()=>{
    console.log('listening on port '+process.env.PORT)
    await dbConnection()
})

// Archivos estaticos
app.use("/static", express.static(path.join(__dirname + "./static")));


