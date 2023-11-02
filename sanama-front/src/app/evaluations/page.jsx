"use client";
import React, { useState } from "react";

const FormularioMedico = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    genero: "",
    edad: "",
    fechaAtencion: new Date().toISOString().split("T")[0], // Using current date as default
    hora: "",
    signosVitales: {
      temperatura: "",
      fc: "", // Frecuencia Cardiaca
      fr: "", // Frecuencia Respiratoria
      pa: "", // Presión Arterial
      sat: "", // Saturación de Oxígeno
      peso: "",
      talla: "",
    },
    personaResponsable: {
      nombre: "",
      dni: "",
    },
    antecedentes: "",
    motivoConsulta: "",
    exploracionFisica: {
      exGeneral: "",
      pielYFaneras: "",
      cabezaYCuello: "",
      toraxYPulmones: "",
      cardiovascular: "",
      abdomen: "",
      urogenital: "",
      extremidades: "",
      snc: "",
    },
    observaciones: "",
    examenesComplementarios: "",
    diagnostico: [],
    tratamiento: "",
    derivacion: "",
    proximaCita: "",
    atendidoPor: "",
    selloYFirma: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [section]: { ...prevState[section], [field]: value },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleArrayChange = (index, value) => {
    setFormData((prevState) => {
      const updatedDiagnostico = [...prevState.diagnostico];
      updatedDiagnostico[index] = value;
      return { ...prevState, diagnostico: updatedDiagnostico };
    });
  };

  const addDiagnosticoField = () => {
    setFormData((prevState) => ({
      ...prevState,
      diagnostico: [...prevState.diagnostico, ""],
    }));
  };

  const removeDiagnosticoField = (index) => {
    setFormData((prevState) => {
      const updatedDiagnostico = [...prevState.diagnostico];
      updatedDiagnostico.splice(index, 1);
      return { ...prevState, diagnostico: updatedDiagnostico };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Existing Fields... */}

          {/* Signos Vitales */}
          <div className="col-span-2">
            <h4 className="text-lg font-bold text-gray-700 mb-2">
              Signos Vitales
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Temperatura */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Temperatura (°C)
                </label>
                <input
                  type="number"
                  name="signosVitales.temperatura"
                  value={formData.signosVitales.temperatura}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md"
                />
              </div>

              {/* Frecuencia Cardiaca */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Frecuencia Cardiaca
                </label>
                <input
                  type="number"
                  name="signosVitales.fc"
                  value={formData.signosVitales.fc}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md"
                />
              </div>

              {/* Frecuencia Respiratoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Frecuencia Respiratoria
                </label>
                <input
                  type="number"
                  name="signosVitales.fr"
                  value={formData.signosVitales.fr}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md"
                />
              </div>

              {/* Presión Arterial */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Presión Arterial
                </label>
                <input
                  type="text"
                  name="signosVitales.pa"
                  value={formData.signosVitales.pa}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md"
                  placeholder="Ej. 120/80"
                />
              </div>

              {/* Saturación de Oxígeno */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Saturación de Oxígeno (%)
                </label>
                <input
                  type="number"
                  name="signosVitales.sat"
                  value={formData.signosVitales.sat}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md"
                />
              </div>

              {/* Peso */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  name="signosVitales.peso"
                  value={formData.signosVitales.peso}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md"
                />
              </div>

              {/* Talla */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Talla (cm)
                </label>
                <input
                  type="number"
                  name="signosVitales.talla"
                  value={formData.signosVitales.talla}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Examenes Complementarios */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Examenes Complementarios
            </label>
            <textarea
              name="examenesComplementarios"
              value={formData.examenesComplementarios}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Diagnostico */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Diagnostico
            </label>
            {formData.diagnostico.map((diagnose, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={diagnose}
                  onChange={(e) => handleArrayChange(index, e.target.value)}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md"
                  placeholder={`Diagnóstico ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeDiagnosticoField(index)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDiagnosticoField}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Añadir Diagnóstico
            </button>
          </div>

          {/* Tratamiento */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Tratamiento
            </label>
            <textarea
              name="tratamiento"
              value={formData.tratamiento}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Derivacion */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Derivación
            </label>
            <input
              type="text"
              name="derivacion"
              value={formData.derivacion}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Próxima Cita */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Próxima Cita
            </label>
            <input
              type="date"
              name="proximaCita"
              value={formData.proximaCita}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Atendido Por */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Atendido Por
            </label>
            <input
              type="text"
              name="atendidoPor"
              value={formData.atendidoPor}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Sello y Firma */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Sello y Firma
            </label>
            <input
              type="text"
              name="selloYFirma"
              value={formData.selloYFirma}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Botón Guardar */}
        <button
          type="submit"
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default FormularioMedico;
