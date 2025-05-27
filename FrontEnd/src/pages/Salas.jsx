import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HallFormBootstrap() {
    const [validated, setValidated] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [salas, setSalas] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const cargarSalas = async () => {
        try {
            const response = await axios.get('http://localhost:3002/salas');
            setSalas(response.data);
        } catch (error) {
            console.error('Error al cargar las salas:', error);
        }
    };

    useEffect(() => {
        cargarSalas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            if (modoEdicion) {
                // Actualizar sala
                await axios.put(`http://localhost:3002/salas/${idEditando}`, {
                    nombre,
                    ubicacion,
                    capacidad: parseInt(capacidad),
                });
                setMensaje('Sala actualizada exitosamente');
            } else {
                // Crear nueva sala
                await axios.post('http://localhost:3002/salas', {
                    nombre,
                    ubicacion,
                    capacidad: parseInt(capacidad),
                });
                setMensaje('Sala registrada exitosamente');
            }

            setNombre('');
            setUbicacion('');
            setCapacidad('');
            setModoEdicion(false);
            setIdEditando(null);
            cargarSalas();
        } catch (error) {
            console.error(error);
            setMensaje('Error al registrar o actualizar la sala');
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta sala?')) {
            try {
                await axios.delete(`http://localhost:3002/salas/${id}`);
                setMensaje('Sala eliminada correctamente');
                cargarSalas();
            } catch (error) {
                console.error('Error al eliminar sala:', error);
                setMensaje('Error al eliminar la sala');
            }
        }
    };

    const handleEditar = (sala) => {
        setNombre(sala.nombre);
        setUbicacion(sala.ubicacion);
        setCapacidad(sala.capacidad.toString());
        setModoEdicion(true);
        setIdEditando(sala._id);
        window.scrollTo(0, 0); // Opcional: subir al formulario
    };

    return (
        <div className="register-background" style={{
            height: '100vh',
            justifyContent: 'center',   // centra horizontalmente
            //alignItems: 'center',       // centra verticalmente
        }}>
            <div className="overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

                <div className="container form-container p-5 text-white">
                    <h1 className="text-center mt-4">Bienvenido al Sistema de Salas</h1>
                    <h2 className="mb-4 text-center">{modoEdicion ? 'Editar Sala' : 'Registro Sala'}</h2>
                    <form
                        onSubmit={handleSubmit}
                        className={`needs-validation ${validated ? 'was-validated' : ''}`}
                        noValidate
                    >
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Por favor ingrese el nombre de la sala.</div>
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Capacidad"
                                value={capacidad}
                                onChange={(e) => setCapacidad(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Por favor ingrese la capacidad de la sala.</div>
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ubicación"
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Por favor ingrese la ubicación de la sala.</div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            {modoEdicion ? 'Actualizar' : 'Registrar'}
                        </button>
                    </form>
                    {mensaje && <div className="alert alert-info mt-4">{mensaje}</div>}
                </div>
                {/* Tabla de salas debajo del formulario */}
                <div className="container mt-5">
                    <h3 className="mb-3">Lista de Salas Registradas</h3>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-active">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Ubicación</th>
                                    <th>Capacidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salas.map((sala) => (
                                    <tr key={sala._id}>
                                        <td>{sala._id}</td>
                                        <td>{sala.nombre}</td>
                                        <td>{sala.ubicacion}</td>
                                        <td>{sala.capacidad}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEditar(sala)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleEliminar(sala._id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HallFormBootstrap;
