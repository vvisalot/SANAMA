import React, { useState } from "react";

const GlasgowComaScale = ({ setMedicalRecordData }) => {
  const gcsValues = {
    aperturaOjos: {
      Espontánea: 4,
      "Al estímulo verbal": 3,
      "Al estímulo doloroso": 2,
      "Sin respuesta": 1,
    },
    respuestaVerbal: {
      "Orientado y conversando": 5,
      "Palabras inapropiadas": 3,
      "Sonidos incomprensibles": 2,
      "Sin respuesta": 1,
    },
    respuestaMotora: {
      "Obedece órdenes verbales": 6,
      "Localiza el dolor": 5,
      "Retirada al dolor": 4,
      "Flexión anormal al dolor": 3,
      "Extensión anormal al dolor": 2,
      "Sin respuesta": 1,
    },
  };

  const handleGlasgowChange = (e) => {
    const { name, value } = e.target;
    setMedicalRecordData((prevData) => {
      // Calcula la puntuación de Glasgow sobre la marcha
      const newGlasgowScore = {
        ...prevData.evaluacionMedica.glasgow,
        [name]: gcsValues[name][value],
      };

      // Suma las puntuaciones para obtener el total
      const totalScore = Object.values(newGlasgowScore).reduce(
        (acc, curr) => acc + curr,
        0
      );

      return {
        ...prevData,
        evaluacionMedica: {
          ...prevData.evaluacionMedica,
          glasgow: totalScore,
        },
      };
    });
  };
  const renderOptions = (categoryValues) => {
    return Object.entries(categoryValues).map(([key, value]) => (
      <option key={value} value={key}>
        {key}
      </option>
    ));
  };
  return (
    <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Apertura de Ojos
        </label>
        <select
          name="aperturaOjos"
          onChange={handleGlasgowChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          {renderOptions(gcsValues.aperturaOjos)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Respuesta Verbal
        </label>
        <select
          name="respuestaVerbal"
          onChange={handleGlasgowChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          {renderOptions(gcsValues.respuestaVerbal)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Respuesta Motora
        </label>
        <select
          name="respuestaMotora"
          onChange={handleGlasgowChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        >
          <option value="">Seleccione una opción</option>
          {renderOptions(gcsValues.respuestaMotora)}
        </select>
      </div>
    </div>
  );
};

export default GlasgowComaScale;
