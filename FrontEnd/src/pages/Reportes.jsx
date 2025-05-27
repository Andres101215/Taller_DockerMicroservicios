import { useState } from 'react';
import axios from 'axios';

const Reportes = () => {
  const [tipoReporte, setTipoReporte] = useState('');
  const [reporte, setReporte] = useState(null);
  const [cargando, setCargando] = useState(false);

  const mensajes = {
    semanal: 'Cantidad de préstamos registrados por semana.',
    mensual: 'Cantidad de préstamos registrados por mes.',
    'frecuencia-sala': 'Sala con mayor número de préstamos.',
    'frecuencia-estudiante': 'Estudiante con mayor número de préstamos.',
  };

  const manejarConsulta = async () => {
    if (!tipoReporte) return;
    setCargando(true);
    setReporte(null);

    try {
      let url = '';
      switch (tipoReporte) {
        case 'semanal':
          url = 'http://localhost:3003/prestamos/reporte/semanal';
          break;
        case 'mensual':
          url = 'http://localhost:3003/prestamos/reporte/mensual';
          break;
        case 'frecuencia-sala':
          url = 'http://localhost:3003/prestamos/frecuencia/sala';
          break;
        case 'frecuencia-estudiante':
          url = 'http://localhost:3003/prestamos/frecuencia/estudiante';
          break;
        default:
          return;
      }

      const { data } = await axios.get(url);
      setReporte(data);
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
    } finally {
      setCargando(false);
    }
  };

  const renderReporte = () => {
    if (!reporte) return null;

    if (tipoReporte === 'semanal' && Array.isArray(reporte)) {
      return (
        <table className="table table-bordered table-light text-black">
          <thead>
            <tr>
              <th>Semana</th>
              <th>N° de Préstamos</th>
            </tr>
          </thead>
          <tbody>
            {reporte.map((r, i) => (
              <tr key={i}>
                <td>{r._id}</td>
                <td>{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (tipoReporte === 'mensual' && Array.isArray(reporte)) {
      return (
        <table className="table table-bordered table-light text-black">
          <thead>
            <tr>
              <th>Año</th>
              <th>Mes</th>
              <th>N° de Préstamos</th>
            </tr>
          </thead>
          <tbody>
            {reporte.map((r, i) => (
              <tr key={i}>
                <td>{r._id?.año ?? '-'}</td>
                <td>{r._id?.mes ?? '-'}</td>
                <td>{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (tipoReporte === 'frecuencia-sala') {
      return (
        <div className="alert alert-info text-black">
          Sala más prestada: <strong>{reporte.nombre}</strong><br />
          Total de préstamos: <strong>{reporte.cantidad}</strong>
        </div>
      );
    }

    if (tipoReporte === 'frecuencia-estudiante') {
      return (
        <div className="alert alert-info text-black">
          Estudiante con más préstamos: <strong>{reporte.nombre}</strong><br />
          Total de préstamos: <strong>{reporte.cantidad}</strong>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mt-4 text-white"
      style={{
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
      <h2>Reportes de Préstamos</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Seleccione tipo de reporte:</label>
          <select
            className="form-select"
            value={tipoReporte}
            onChange={(e) => {
              setTipoReporte(e.target.value);
              setReporte(null); // Limpia el reporte al cambiar tipo
            }}
          >
            <option value="">-- Seleccione --</option>
            <option value="semanal">Reporte Semanal</option>
            <option value="mensual">Reporte Mensual</option>
            <option value="frecuencia-sala">Sala más prestada</option>
            <option value="frecuencia-estudiante">Estudiante con más préstamos</option>
          </select>
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <button className="btn btn-primary" onClick={manejarConsulta}>
            Generar Reporte
          </button>
        </div>
      </div>

      {tipoReporte && (
        <div className="mb-3">
          <div className="alert alert-secondary text-black">
            {mensajes[tipoReporte]}
          </div>
        </div>
      )}

      {cargando && <p className="text-info">Cargando reporte...</p>}

      {reporte && (
        <div className="mt-4 text-black">
          <h5>Resultado:</h5>
          {renderReporte()}
        </div>
      )}
    </div>
  );
};

export default Reportes;
