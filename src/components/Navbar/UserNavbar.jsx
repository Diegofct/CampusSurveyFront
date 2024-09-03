import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/AuthService';

const Navbar = () => {

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="absolute z-20 w-64 h-screen bg-gray-900 text-white flex flex-col text-center">
      <div className="option-logo p-4">
        <h1>User</h1>
      </div>
      <div className="sectitle py-4 text-sm font-medium text-gray-400 px-4">PRINCIPAL</div>
      <div className="ops flex flex-col gap-4 px-4">
        <div className="option flex items-center h-10 bg-gray-800 rounded-lg transition duration-150 ease-in-out transform hover:bg-gray-700 hover:scale-105">
          <div className="option-icon w-12 h-full flex items-center justify-center">
            <i className="fa fa-home" aria-hidden="true"></i>
          </div>
          <Link className="option-link w-full h-full flex items-center text-white no-underline" to="/home">Inicio</Link>
        </div>
        <div className="option flex items-center h-10 bg-gray-800 rounded-lg transition duration-150 ease-in-out transform hover:bg-gray-700 hover:scale-105">
          <div className="option-icon w-12 h-full flex items-center justify-center">
            <i className="fa fa-bar-chart" aria-hidden="true"></i>
          </div>
          <Link className="option-link w-full h-full flex items-center text-white no-underline" to="/surveys">Encuestas</Link>
        </div>
        <div className="option flex items-center h-10 bg-gray-800 rounded-lg transition duration-150 ease-in-out transform hover:bg-gray-700 hover:scale-105">
          <div className="option-icon w-12 h-full flex items-center justify-center">
            <i className="fa fa-th-list" aria-hidden="true"></i>
          </div>
          <Link className="option-link w-full h-full flex items-center text-white no-underline" to="/user/responses">Mis respuestas</Link>
        </div>
      </div>
      <div className="sectitle py-4 text-sm font-medium text-gray-400 px-4">MIS OPCIONES</div>
      <div className="ops flex flex-col gap-4 px-4">
        <div className="option flex items-center h-10 bg-gray-800 rounded-lg transition duration-150 ease-in-out transform hover:bg-gray-700 hover:scale-105">
          <div className="option-icon w-12 h-full flex items-center justify-center">
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </div>
          <Link className="option-link w-full h-full flex items-center text-white no-underline" to="/profile">Mi perfil</Link>
        </div>
        <div className="option flex items-center h-10 bg-gray-800 rounded-lg transition duration-150 ease-in-out transform hover:bg-red-600 hover:scale-105" id="logout" onClick={handleLogout}>
          <div className="option-icon w-12 h-full flex items-center justify-center">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </div>
          <Link className="option-link w-full h-full flex items-center text-white no-underline" to="/login">Cerrar Sesión</Link>
        </div>
      </div>
      <div className="credit mt-auto pb-4 text-sm text-gray-500">
        Campus Survey <br />
        v0.3.1
      </div>
    </nav>
  );
};

export default Navbar;
