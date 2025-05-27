const mongoose = require("mongoose");

const EstudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  programa: { type: String, required: true },
  correo: { type: String, required: true, unique: true }
}, { versionKey: false });

module.exports = mongoose.model("Estudiante", EstudianteSchema);
