"use client";
import React, { useState } from "react";

const FormularioMedico = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    // ... otros campos
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar datos a donde sea necesario
    console.log(formData);
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre y Apellidos
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="mt-1 p-2 w-full border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              DNI
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          {/* Otros campos... */}
        </div>

        {/* ... otros campos ... */}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Antecedentes personales
          </label>
          <textarea
            name="antecedentes"
            value={formData.antecedentes}
            onChange={handleChange}
            rows="4"
            className="mt-1 p-2 w-full border-gray-300 rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default FormularioMedico;
