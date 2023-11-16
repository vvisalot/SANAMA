import React, { useState } from "react";

const GlasgowComaScale = ({ formData, handleInputChange }) => {
  const [glasgowData, setGlasgowData] = useState({
    aperturaOjos: "",
    respuestaVerbal: "",
    respuestaMotora: "",
  });

  return (
    <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Apertura de Ojos
        </label>
        <select
          name="aperturaOjos"
          value={glasgowData.aperturaOjos}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          <option value="Espontánea">Espontánea</option>
          <option value="Al estímulo verbal">Al estímulo verbal</option>
          <option value="Al estímulo doloroso">Al estímulo doloroso</option>
          <option value="Sin respuesta">Sin respuesta</option>
        </select>
      </div>

      {/* Respuesta Verbal */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Respuesta Verbal
        </label>
        <select
          name="respuestaVerbal"
          value={glasgowData.respuestaVerbal}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          <option value="Orientado y conversando">
            Orientado y conversando
          </option>
          <option value="Confuso">Confuso</option>
          <option value="Palabras inapropiadas">Palabras inapropiadas</option>
          <option value="Sonidos incomprensibles">
            Sonidos incomprensibles
          </option>
          <option value="Sin respuesta">Sin respuesta</option>
        </select>
      </div>

      {/* Respuesta Motora */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Respuesta Motora
        </label>
        <select
          name="respuestaMotora"
          value={glasgowData.respuestaMotora}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          <option value="Obedece órdenes verbales">
            Obedece órdenes verbales
          </option>
          <option value="Localiza el dolor">Localiza el dolor</option>
          <option value="Retirada al dolor">Retirada al dolor</option>
          <option value="Flexión anormal al dolor">
            Flexión anormal al dolor
          </option>
          <option value="Extensión anormal al dolor">
            Extensión anormal al dolor
          </option>
          <option value="Sin respuesta">Sin respuesta</option>
        </select>
      </div>
    </div>
  );
};

export default GlasgowComaScale;
