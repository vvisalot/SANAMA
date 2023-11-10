"use client";
import React, { useState } from "react";

function FeedbackForm() {
  const [form, setForm] = useState({
    punctuality: "",
    treatment: "",
    clarity: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado", form);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Cuestionario de Atención</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="punctuality"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Puntualidad
          </label>
          <select
            id="punctuality"
            name="punctuality"
            value={form.punctuality}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="excellent">Excelente</option>
            <option value="good">Buena</option>
            <option value="average">Regular</option>
            <option value="poor">Mala</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="treatment"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Trato Recibido
          </label>
          <select
            id="treatment"
            name="treatment"
            value={form.treatment}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="excellent">Excelente</option>
            <option value="good">Buena</option>
            <option value="average">Regular</option>
            <option value="poor">Mala</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="clarity"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Claridad de la Explicación
          </label>
          <select
            id="clarity"
            name="clarity"
            value={form.clarity}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="excellent">Excelente</option>
            <option value="good">Buena</option>
            <option value="average">Regular</option>
            <option value="poor">Mala</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Comentarios Adicionales
          </label>
          <textarea
            id="comments"
            name="comments"
            value={form.comments}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Enviar Respuestas
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
