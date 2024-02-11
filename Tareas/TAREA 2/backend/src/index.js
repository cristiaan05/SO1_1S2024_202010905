import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const port = 3000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Connection URI
const mongoURI = 'mongodb://mongo_container:27017/DB'; // Reemplaza con tu URI de MongoDB y nombre de base de datos

// Conectar a MongoDB usando Mongoose
mongoose.connect(mongoURI);

// Manejar eventos de conexión
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');

  // Agregar el objeto de conexión Mongoose a la aplicación para su uso en rutas
  app.locals.mongooseConnection = mongoose.connection;

  // Iniciar el servidor Express
  app.listen(port, () => {
    console.log(`El servidor está ejecutándose en el puerto ${port}`);
  });
});

// Middleware para manejar errores de conexión a MongoDB
app.use((req, res, next) => {
  if (!app.locals.mongooseConnection || app.locals.mongooseConnection.readyState !== 1) {
    return res.status(500).json({ message: 'MongoDB no está conectado' });
  }
  next();
});

// ******************************Rutas**************************************
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a nuestra aplicación." });
});


// Inside your routes or middleware
app.get("/getImagenes", async (req, res) => {
  try {
    const imagenes = await db.collection('imagenes').find().toArray();
    let imagenesArray = [];
    imagenes.forEach(imagen => {
      imagenesArray.push(imagen.imagen);
    });
    res.json(imagenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los datos de la colección" });
  }

});

app.post("/addImagen", async (req, res) => {
  try {
    const imagen = new Imagen({
      imagen: req.body.imagen,
      fecha: new Date()
    });
    await imagen.save();
    res.json({ message: "Imagen agregada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar la imagen" });
  }
});


const imagenSchema = new mongoose.Schema({
  imagen: String,
  fecha: Date
});

const Imagen = mongoose.model('imagenes', imagenSchema);






// Manejar la terminación de la aplicación y cerrar la conexión a MongoDB
process.on('SIGINT', () => {
  if (app.locals.mongooseConnection) {
    app.locals.mongooseConnection.close(() => {
      console.log('Conexión a MongoDB cerrada');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
