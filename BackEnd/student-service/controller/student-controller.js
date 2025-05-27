const Estudiante = require("../models/Student");

// GET /api/estudiantes
exports.obtenerTodos = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener estudiantes", error });
  }
};

// POST /api/estudiantes
exports.crear = async (req, res) => {
  try {
    const nuevo = new Estudiante(req.body);
    await nuevo.save();
    res.status(201).json({ mensaje: "Estudiante creado", estudiante: nuevo });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear estudiante", error });
  }
};

// GET /api/estudiantes/:id
exports.obtenerPorId = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    if (!estudiante) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar estudiante", error });
  }
};

// PUT /api/estudiantes/:id
exports.actualizar = async (req, res) => {
  try {
    const actualizado = await Estudiante.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Estudiante actualizado", estudiante: actualizado });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar estudiante", error });
  }
};

// DELETE /api/estudiantes/:id
exports.eliminar = async (req, res) => {
  try {
    const eliminado = await Estudiante.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Estudiante eliminado", estudiante: eliminado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar estudiante", error });
  }
};
