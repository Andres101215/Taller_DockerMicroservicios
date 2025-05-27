import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentFormBootstrap() {
    const [validated, setValidated] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [codigo, setCodigo] = useState('');
    const [correo, setCorreo] = useState('');
    const [programa, setPrograma] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const cargarEstudiantes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/estudiantes');
            setEstudiantes(response.data);
        } catch (error) {
            console.error('Error al cargar estudiantes:', error);
        }
    };

    useEffect(() => {
        cargarEstudiantes();
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
                await axios.put(`http://localhost:3001/estudiantes/${idEditando}`, {
                    nombre,
                    codigo: parseInt(codigo),
                    correo,
                    programa
                });
                setMensaje('Estudiante actualizado exitosamente');
            } else {
                await axios.post('http://localhost:3001/estudiantes', {
                    nombre,
                    codigo: parseInt(codigo),
                    correo,
                    programa
                });
                setMensaje('Estudiante registrado exitosamente');
            }

            setNombre('');
            setCodigo('');
            setCorreo('');
            setPrograma('');
            setModoEdicion(false);
            setIdEditando(null);
            cargarEstudiantes();
        } catch (error) {
            console.error(error);
            setMensaje('Error al registrar o actualizar estudiante');
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este estudiante?')) {
            try {
                await axios.delete(`http://localhost:3001/estudiantes/${id}`);
                setMensaje('Estudiante eliminado correctamente');
                cargarEstudiantes();
            } catch (error) {
                console.error('Error al eliminar estudiante:', error);
                setMensaje('Error al eliminar estudiante');
            }
        }
    };

    const handleEditar = (estudiante) => {
        setNombre(estudiante.nombre);
        setCodigo(estudiante.codigo.toString());
        setCorreo(estudiante.correo);
        setPrograma(estudiante.programa);
        setModoEdicion(true);
        setIdEditando(estudiante._id);
        window.scrollTo(0, 0);
    };

    return (
        <div className="register-background" style={{
            height: '100vh',
            justifyContent: 'center',   // centra horizontalmente
            //alignItems: 'center',       // centra verticalmente
        }}>
            <div className="overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="container form-container p-5 text-white">
                    <h1 className="text-center mt-4">Bienvenido al Sistema de Estudiantes</h1>
                    <h2 className="mb-4 text-center">
                        {modoEdicion ? 'Editar Estudiante' : 'Registro Estudiante'}
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className={`needs-validation ${validated ? 'was-validated' : ''}`}
                        noValidate
                    >
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre completo"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Por favor ingrese su nombre.</div>
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Código"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Por favor ingrese su código.</div>
                        </div>

                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo electrónico"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Por favor ingrese su correo.</div>
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Programa académico"
                                value={programa}
                                onChange={(e) => setPrograma(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Por favor ingrese su programa.</div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            {modoEdicion ? 'Actualizar' : 'Registrar'}
                        </button>
                    </form>
                    {mensaje && <div className="alert alert-info mt-4">{mensaje}</div>}


                    {/* Tabla de estudiantes debajo del formulario */}
                    <div className="container mt-5">
                        <h3 className="mb-3">Lista de Estudiantes Registrados</h3>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead className="table-active">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Código</th>
                                        <th>Correo</th>
                                        <th>Programa</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estudiantes.map((est) => (
                                        <tr key={est._id}>
                                            <td>{est._id}</td>
                                            <td>{est.nombre}</td>
                                            <td>{est.codigo}</td>
                                            <td>{est.correo}</td>
                                            <td>{est.programa}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEditar(est)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleEliminar(est._id)}
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
        </div>
    );
}

export default StudentFormBootstrap;
