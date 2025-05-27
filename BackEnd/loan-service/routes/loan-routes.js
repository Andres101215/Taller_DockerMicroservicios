const express = require("express");
const router = express.Router();
const ctrl = require("../controller/loan-controller");

router.get("/frecuencia/sala", ctrl.frecuenciaSala);
router.get("/frecuencia/estudiante", ctrl.frecuenciaEstudiante);
router.get("/reporte/semanal", ctrl.reporteSemanal);
router.get("/reporte/mensual", ctrl.reporteMensual);
router.get("/", ctrl.obtenerTodos);
router.post("/", ctrl.crear);
router.get("/:id", ctrl.obtenerPorId);
router.delete("/:id", ctrl.eliminar);

router.put("/:id",ctrl.actualizar);


module.exports = router;
