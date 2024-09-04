import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getName } from "../../services/AuthService";

const AdminHome = () => {
    const name = getName();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Inicio - Campus Survey';
    }, []);

    const handleNewSurvey = () => {
        navigate('/surveys');
    };

    const handleViewResponses = () => {
        navigate('/user/responses');
    };

    return (
        <section className="ml-64 p-6">
            <div>
                <h1 className="text-3xl font-semibold">Bienvenido, {name || "Usuario Ejemplo"}!</h1>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-medium">Panel de Administrador Campus Survey</h2>
                <p className="mt-2 text-gray-600">En este panel se encuentra toda la gestión detallada de encuestas de la plataforma Campus Survey</p>
            </div>
            <div className="mt-6 space-x-4">
                <button className="primary-button bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500" onClick={handleNewSurvey}>
                    Crear nueva encuesta
                </button>
                <button className="secondary-button bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500" onClick={handleViewResponses}>
                    Ver Encuestas
                </button>
            </div>
        </section>
    );
};

export default AdminHome;
