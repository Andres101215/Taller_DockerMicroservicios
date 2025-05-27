const express = require("express");
const router = express.Router();
const ctrl = require("../controller/student-controller");

router.get("/", ctrl.obtenerTodos);
router.post("/", ctrl.crear);
router.get("/:id", ctrl.obtenerPorId);
router.put("/:id", ctrl.actualizar);
router.delete("/:id", ctrl.eliminar);

module.exports = router;
