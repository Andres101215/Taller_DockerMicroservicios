const mongoose = require("mongoose");

const PrestamoSchema = new mongoose.Schema({
  estudianteId:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estudiante',
    required: true
  },  
  salaId:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sala',
    required: true
  },        
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Prestamo", PrestamoSchema);
