// Importamos el array en memoria desde el modelo
let recyclingPoints = require('../models/RecyclingModel');

// Obtener todos los puntos de reciclaje
exports.getRecyclingPoints = (req, res) => {
  try {
    res.status(200).json(recyclingPoints); // Devolvemos el array de puntos de reciclaje
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener puntos de reciclaje', error });
  }
};

// Añadir un nuevo punto de reciclaje
exports.addRecyclingPoint = (req, res) => {
  const { location, materials, collectionDate } = req.body;

  // Validar que se envíen todos los campos necesarios
  if (!location || !materials || !collectionDate) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Crear un nuevo punto de reciclaje con un ID único
  const newPoint = {
    id: recyclingPoints.length + 1, // ID generado automáticamente basado en la longitud del array
    location,
    materials,
    collectionDate
  };

  // Añadir el nuevo punto al array en memoria
  recyclingPoints.push(newPoint);

  // Devolver el nuevo punto añadido
  res.status(201).json(newPoint);
};
