"use client";
import React from "react";

const Evaluations = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Información de Atención:</h1>
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">N° de Cita:</label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              placeholder="xxxxx"
            />
          </div>
        </div>

        <div className="mb-6 space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Nueva Evalución médica
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Solicitar Orden de Laboratorio
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Hojas Medicas Existentes:</h2>
        <div className="grid grid-cols-7 gap-6 mb-6 border-b-2 pb-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Desde:</label>
            <input className="border rounded p-2 w-full" type="date" />
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">N° de Atención</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Nombre del Doctor</th>
              <th className="p-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b">12345</td>
              <td className="p-2 border-b">xx/xx/xxxx</td>
              <td className="p-2 border-b">Dr. John Doe</td>
              <td className="p-2 border-b flex space-x-2">
                <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">
                  Open
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                  Link
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Evaluations;
