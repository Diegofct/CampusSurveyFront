import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/AuthService';

const Navbar = () => {

    const handleLogout = () => {
        logout();
    };

  return (
    <nav className="fixed z-20 w-64 h-screen flex flex-col text-center bg-gray-800 text-white">
      <div className="flex justify-center py-6">
        <h1>User</h1>
      </div>

      <div className="text-sm font-semibold text-gray-400 py-3 pl-3">
        PRINCIPAL
      </div>

      <div className="flex flex-col space-y-4 px-2">
        <div className="flex items-center h-10 px-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer transform hover:scale-105 transition duration-150 ease-in-out">
          <div className="flex items-center justify-center w-12">
            <i className="fa fa-home" aria-hidden="true"></i>
          </div>
          <Link className="w-full h-full flex items-center text-white no-underline" to="/home">Inicio</Link>
        </div>
        <div className="flex items-center h-10 px-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer transform hover:scale-105 transition duration-150 ease-in-out">
          <div className="flex items-center justify-center w-12">
            <i className="fa fa-bar-chart" aria-hidden="true"></i>
          </div>
          <Link className="w-full h-full flex items-center text-white no-underline" to="/survey">Ver Encuestas</Link>
        </div>
        <div className="flex items-center h-10 px-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer transform hover:scale-105 transition duration-150 ease-in-out">
          <div className="flex items-center justify-center w-12">
            <i className="fa fa-tasks" aria-hidden="true"></i>
          </div>
          <Link className="w-full h-full flex items-center text-white no-underline" to="/admin/manage">Gestión de Encuestas</Link>
        </div>
        <div className="flex items-center h-10 px-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer transform hover:scale-105 transition duration-150 ease-in-out">
          <div className="flex items-center justify-center w-12">
            <i className="fa fa-globe" aria-hidden="true"></i>
          </div>
          <Link className="w-full h-full flex items-center text-white no-underline" to="/admin/post">Publicar Encuestas</Link>
        </div>
      </div>

      <div className="text-sm font-semibold text-gray-400 py-3 pl-3">
        MIS OPCIONES
      </div>

      <div className="flex flex-col space-y-4 px-2">
        <div className="flex items-center h-10 px-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer transform hover:scale-105 transition duration-150 ease-in-out">
          <div className="flex items-center justify-center w-12">
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </div>
          <Link className="w-full h-full flex items-center text-white no-underline" to="/profile">Mi perfil</Link>
        </div>
        <div className="flex items-center h-10 px-2 rounded bg-red-700 hover:bg-red-600 cursor-pointer transform hover:scale-105 transition duration-150 ease-in-out" id='logout' onClick={handleLogout}>
          <div className="flex items-center justify-center w-12">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </div>
          <Link className="w-full h-full flex items-center text-white no-underline" to="/login">Cerrar Sesión</Link>
        </div>
      </div>

      <div className="mt-auto flex items-end justify-center pb-6 text-sm text-gray-500">
        Campus Survey <br />
        Panel Administrador <br />
        v0.3.1
      </div>
    </nav>
  );
};

export default Navbar;
