import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Survey from "./pages/Survey";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/survey" element={<PrivateRoute><Survey /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
