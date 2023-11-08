"use client";

import React, { useState } from "react";

const AddLabPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataLaboratorio, setDataLaboratorio] = useState({
    paciente: {
      nombreCompleto: "Eduardo Jose Pezo Nieves",
      dni: "76543281",
      sexo: "Masculino",
      edad: 24,
    },
    medico: {
      nombreCompleto: "Damian Luis Quinteros Darko",
      especialidad: "Pediatria",
    },
    muestra: "",
    examenesMedicos: "",
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [key, subkey] = name.split('.');
  
    if (subkey) {
      setDataLaboratorio(prevState => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [subkey]: value
        }
      }));
    } else {
      setDataLaboratorio(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    const charCountElementId = `charCount${name.charAt(0).toUpperCase() + name.slice(1)}`;
    const countElement = document.getElementById(charCountElementId);
    if (countElement) {
      countElement.textContent = `${value.length}/1000`;
    }
  };

  return (
    <section className="p-10 flex justify-center items-center h-screen">
      <button
        onClick={toggleModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Añadir Laboratorio
      </button>

      {isModalOpen && (
        <div
          className="modal-bg fixed w-full h-full top-0 left-0 flex items-center justify-center"
          onClick={toggleModal}
        >
          <div
            className="modal-container bg-white p-5 rounded shadow-lg overflow-y-auto"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header flex flex-col items-start">
              <p className="text-4xl font-bold">Nueva Orden de Laboratorio</p>
            </div>

            {/* Datos del paciente */}
            <p className="text-3xl font-semibold mt-6 mb-2">
              Datos del paciente
            </p>
            <form className="modal-content w-full max-w-2xl">
              <div className="mb-2">
                <div className="mb-2">
                  {" "}
                  <div className="flex space-x-4 mb-2">
                    {" "}
                    <div className="flex-1">
                      <label
                        className="block text-gray-700 text-xl font-bold mb-2"
                        htmlFor="nombreCompleto"
                      >
                        Nombre completo
                      </label>
                      <input
                        className="shadow border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nombreCompleto"
                        type="text"
                        placeholder="Nombre completo del paciente"
                        value={dataLaboratorio.paciente.nombreCompleto}
                        disabled
                      />
                    </div>
                    <div className="w-1/6">
                      <label
                        className="block text-gray-700 text-xl font-bold mb-2"
                        htmlFor="edad"
                      >
                        Edad
                      </label>
                      <input
                        className="shadow border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="edad"
                        type="text"
                        placeholder="Edad"
                        value={dataLaboratorio.paciente.edad}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    {" "}
                    <div className="flex-1">
                      <label
                        className="block text-gray-700 text-xl font-bold mb-2"
                        htmlFor="sexo"
                      >
                        Sexo
                      </label>
                      <input
                        className="shadow border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sexo"
                        type="text"
                        placeholder="Sexo"
                        value={dataLaboratorio.paciente.sexo}
                        disabled
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-gray-700 text-xl font-bold mb-2"
                        htmlFor="dni"
                      >
                        DNI
                      </label>
                      <input
                        className="shadow border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dni"
                        type="text"
                        placeholder="DNI"
                        value={dataLaboratorio.paciente.dni}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Datos del doctor */}
                <p className="text-3xl font-semibold mt-6 mb-2">
                  Datos del doctor
                </p>
                <div className="mb-2 mt-2">
                  {" "}
                  <label
                    className="block text-gray-700 text-xl font-bold mb-2"
                    htmlFor="nombreMedico"
                  >
                    Nombre completo
                  </label>
                  <input
                    className="shadow border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombreMedico"
                    type="text"
                    placeholder="Nombre completo del médico"
                    value={dataLaboratorio.medico.nombreCompleto}
                    disabled
                  />
                </div>
                <div className="mb-2 mt-2">
                  {" "}
                  <label
                    className="block text-gray-700 text-xl font-bold mb-2"
                    htmlFor="especialidad"
                  >
                    Especialidad
                  </label>
                  <input
                    className="shadow border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="especialidad"
                    type="text"
                    placeholder="Especialidad"
                    value={dataLaboratorio.medico.especialidad}
                    disabled
                  />
                </div>

                {/* Datos de la orden de laboratorio */}
                <p className="text-3xl font-semibold mt-6 mb-2">
                  Datos de la orden de laboratorio
                </p>
                <div className="mb-2 mt-2">
                  {" "}
                  <label
                    className="block text-gray-700 text-xl font-bold mb-2"
                    htmlFor="tipoMuestra"
                  >
                    Tipo de muestra
                  </label>
                  <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tipoMuestra"
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option>Sangre</option>
                    <option>Orina</option>
                    <option>Heces</option>
                  </select>
                  <label
                    className="block text-gray-700 text-xl font-bold mt-2 mb-2"
                    htmlFor="tipoMuestra"
                  >
                    Examenes solicitados
                  </label>
                  <textarea
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none mt-1"
                    id="examenesMedicos"
                    rows="4"
                    placeholder="Escriba los exámenes médicos solicitados aquí"
                    style={{ overflow: "auto" }} 
                    value={dataLaboratorio.examenesMedicos}
                    name="examenesMedicos"
                    onChange={handleChange}
                    maxLength={1000}
                  ></textarea>
                  <span className="text-right block mt-2" id="charCountExamenesMedicos">{(dataLaboratorio?.examenesMedicos || '').length}/1000</span>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    //Gonzalo aqui creas el onClick que llama al modal para guardar donde quieras
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddLabPage;
