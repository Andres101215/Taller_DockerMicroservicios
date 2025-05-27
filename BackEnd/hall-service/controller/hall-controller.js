const Sala = require("../models/hall");

exports.obtenerTodas = async (req, res) => {
  try {
    const salas = await Sala.find();
    res.json(salas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener salas", error });
  }
};

exports.crear = async (req, res) => {
  try {
    const nueva = new Sala(req.body);
    await nueva.save();
    res.status(201).json({ mensaje: "Sala creada", sala: nueva });
  } catch (error) {
    console.error(error);
res.status(400).json({ mensaje: "Error al crear sala", error: error.message });

  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const sala = await Sala.findById(req.params.id);
    if (!sala) return res.status(404).json({ mensaje: "No encontrada" });
    res.json(sala);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar sala", error });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizada = await Sala.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ mensaje: "No encontrada" });
    res.json({ mensaje: "Sala actualizada", sala: actualizada });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar sala", error });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const eliminada = await Sala.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: "No encontrada" });
    res.json({ mensaje: "Sala eliminada", sala: eliminada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar sala", error });
  }
};
