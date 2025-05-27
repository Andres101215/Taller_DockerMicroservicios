import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

function PrestamoForm() {
  const [salas, setSalas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [estudianteId, setEstudianteId] = useState('');
  const [salaId, setSalaId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    cargarSalas();
    cargarEstudiantes();
    cargarPrestamos();
  }, []);

  const cargarSalas = async () => {
    try {
      const res = await axios.get('http://localhost:3002/salas');
      setSalas(res.data);
    } catch (error) {
      console.error('Error al cargar salas', error);
    }
  };

  const cargarEstudiantes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/estudiantes');
      setEstudiantes(res.data);
    } catch (error) {
      console.error('Error al cargar estudiantes', error);
    }
  };

  const cargarPrestamos = async () => {
    try {
      const res = await axios.get('http://localhost:3003/prestamos');
      setPrestamos(res.data);
    } catch (error) {
      console.error('Error al cargar préstamos', error);
    }
  };

  const formatearFechaColombia = (fecha) =>
    new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      hour12: true,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(fecha));


 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!estudianteId || !salaId || !fechaInicio || !fechaFin) {
    setMensaje('Todos los campos son obligatorios');
    return;
  }

  try {
    // Convertir fecha local (Bogotá) a UTC antes de enviarla al backend
    const fechaInicioUTC = DateTime.fromISO(fechaInicio, { zone: 'America/Bogota' }).toUTC().toISO();
    const fechaFinUTC = DateTime.fromISO(fechaFin, { zone: 'America/Bogota' }).toUTC().toISO();

    if (modoEdicion) {
      await axios.put(`http://localhost:3003/prestamos/${idEditando}`, {
        estudianteId,
        salaId,
        fechaInicio: fechaInicioUTC,
        fechaFin: fechaFinUTC
      });
      setMensaje('Préstamo actualizado exitosamente');
    } else {
      await axios.post('http://localhost:3003/prestamos', {
        estudianteId,
        salaId,
        fechaInicio: fechaInicioUTC,
        fechaFin: fechaFinUTC
      });
      setMensaje('Préstamo registrado exitosamente');
    }

    setEstudianteId('');
    setSalaId('');
    setFechaInicio('');
    setFechaFin('');
    setModoEdicion(false);
    setIdEditando(null);
    cargarPrestamos();
  } catch (error) {
    console.error('Error al registrar/actualizar préstamo', error);
    setMensaje('Error al procesar el préstamo');
  }
};

  const handleEliminar = async (id) => {
    if (window.confirm('¿Desea eliminar este préstamo?')) {
      try {
        await axios.delete(`http://localhost:3003/prestamos/${id}`);
        setMensaje('Préstamo eliminado');
        cargarPrestamos();
      } catch (error) {
        console.error('Error al eliminar préstamo', error);
        setMensaje('Error al eliminar');
      }
    }
  };

  const handleEditar = (prestamo) => {
    setEstudianteId(prestamo.estudianteId);
    setSalaId(prestamo.salaId);
    setFechaInicio(prestamo.fechaInicio.slice(0, 16));
    setFechaFin(prestamo.fechaFin.slice(0, 16));
    setModoEdicion(true);
    setIdEditando(prestamo._id);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container form-container p-5 text-white "
      style={{
        height: '100vh',
        justifyContent: 'center',   // centra horizontalmente
      }}>
      <div className="overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <h2 className="text-center mb-4">{modoEdicion ? 'Editar Préstamo' : 'Registrar Préstamo'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Sala:</label>
            <select className="form-select" value={salaId} onChange={(e) => setSalaId(e.target.value)} required>
              <option value="">Seleccione una sala</option>
              {salas.map(sala => (
                <option key={sala._id} value={sala._id}>
                  {sala.nombre} ({sala._id.slice(-4)})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Estudiante:</label>
            <select className="form-select" value={estudianteId} onChange={(e) => setEstudianteId(e.target.value)} required>
              <option value="">Seleccione un estudiante</option>
              {estudiantes.map(est => (
                <option key={est._id} value={est._id}>
                  {est.codigo} - {est.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Fecha y hora de inicio:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Fecha y hora de fin:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            {modoEdicion ? 'Actualizar Préstamo' : 'Registrar Préstamo'}
          </button>
        </form>

        {mensaje && <div className="alert alert-info mt-4">{mensaje}</div>}

        <hr className="mt-5" />
        <h4>Préstamos Registrados</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-hover mt-3">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Sala</th>
                <th>Estudiante</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map(p => (
                <tr key={p._id}>
                  <td>{p._id}</td>
                  <td>{p.sala.nombre}</td>
                  <td>{p.estudiante.nombre}</td>
                  <td>{formatearFechaColombia(p.fechaInicio)}</td>
                  <td>{formatearFechaColombia(p.fechaFin)}</td>

                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(p)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(p._id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PrestamoForm;
