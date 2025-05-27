const mongoose = require("mongoose");

const SalaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  capacidad: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model("Sala", SalaSchema);
