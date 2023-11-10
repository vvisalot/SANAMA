"use client"
import React, { useState } from 'react';
import { TextInput } from "flowbite-react"
import DatePicker from "@/components/buttons/DatePicker"
import Picker from "@/components/buttons/Picker"
import Dropdown from "@/components/Dropdowns/Dropdown"
const NewDoctor = () => {
  const [showModal, setShowModal] = useState(false);
  const [isFormEnabled, setIsFormEnabled] = useState(true);
  const [isNextPart, setIsNextPart] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);

  // Estados para campos del médico
  const [nombreMedico, setNombreMedico] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [area, setArea] = useState('');
  const [cmp, setCmp] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  const handleRegister = () => {
    // Lógica para el botón "Nuevo médico"
    // ...
  };

  const handleOpenModal = () => {
    // Lógica para abrir el modal de búsqueda de médico
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Lógica para cerrar el modal de búsqueda de médico
    setShowModal(false);
  };

  const handleMedicoSelect = (selectedMedico) => {
    // Lógica para manejar la selección de un médico
    // ...
  };

  const validateTextInput = (target) => {
    // Lógica de validación para campos de texto
    // ...
  };

  const validateNumberInput = (target) => {
    // Lógica de validación para campos numéricos
    // ...
  };

  const handleCancel = () => {
    // Lógica para el botón "Cancelar"
    // ...
  };

  const handleSave = () => {
    // Lógica para el botón "Guardar"
    // ...
  };

  const handleClearForm = () => {
    // Lógica para limpiar los campos del formulario
    // ...
  };

  const validateForm = () => {
    // Lógica para validar el formulario antes de pasar a la siguiente parte
    // ...
  };

  return (
    <section id='section1'>
      <div className="pb-8 flex justify-between items-center">
        <h2 className="font-sans font-bold break-normal text-gray-700 text-2xl">Informacion del médico</h2>
        <div>
          <button
            type="button"
            onClick={handleRegister}
            className={`m-2 text-white ${cancelButton ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-400 hover:bg-orange-500'
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center`}
          >
            {cancelButton ? 'Cancelar' : 'Nuevo médico'}
          </button>
          <button
            type="button"
            disabled={isFormEnabled}
            onClick={handleOpenModal}
            className={`m-2 text-white ${isFormEnabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center ${isFormEnabled ? 'text-gray-700' : ''}`}
          >
            Buscar médico
          </button>
        </div>
  
        {/* Agrega el componente para buscar médico similar a SearchPatientModal */}
      </div>
  
      <fieldset disabled={!isFormEnabled || isNextPart}>
        <legend></legend>
  
        <div className="grid grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            {/* Componente TextInput para el nombre del médico */}
            <TextInput
              type="text"
              name="nombreMedico"
              id="nombreMedico"
              minLength={3}
              maxLength={255}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
              placeholder=" "
              value={nombreMedico}
              onChange={(event) => {
                validateTextInput(event.target);
                setNombreMedico(event.target.value);
              }}
              required
            />
            <label htmlFor="nombreMedico" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
              Nombre del médico
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            {/* Componente TextInput para el apellido paterno del médico */}
            <TextInput
              type="text"
              name="apellidoPaterno"
              id="apellidoPaterno"
              minLength={3}
              maxLength={255}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
              placeholder=" "
              value={apellidoPaterno}
              onChange={(event) => {
                validateTextInput(event.target);
                setApellidoPaterno(event.target.value);
              }}
              required
            />
            <label htmlFor="apellidoPaterno" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
              Apellido paterno del médico
            </label>
          </div>
        </div>
  
        {/* Repite este bloque de código para otros campos como apellido materno, DNI, etc. */}
  
        <div className="grid grid-cols-2 md:gap-6">
          {/* Componente DatePicker para la fecha de nacimiento del médico */}
          <DatePicker
            name={"fecha-nacimiento-medico"}
            value={fechaNacimiento}
            setValue={setFechaNacimiento}
          />
          {/* Componente Picker para elegir el género del médico */}
          <Picker
            name1={"masculino"}
            name2={"femenino"}
            text={"Elegir género:"}
            option1={"Masculino"}
            option2={"Femenino"}
            value={sexo}
            setValue={setSexo}
          />
        </div>
  
        <div className="grid grid-cols-2 md:gap-6">
          {/* Componente TextInput para el teléfono del médico */}
          <TextInput
            type="text"
            name="telefono"
            minLength={3}
            maxLength={9}
            id="telefono"
            autoComplete="off"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
            placeholder=" "
            value={telefono}
            onChange={(event) => {
              validateNumberInput(event.target);
              setTelefono(event.target.value);
            }}
            required
          />
          {/* Componente TextInput para el correo electrónico del médico */}
          <TextInput
            type="text"
            name="correo"
            minLength={3}
            maxLength={255}
            id="correo"
            autoComplete="off"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
            placeholder=" "
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
            required
          />
        </div>
  
        <div className="grid grid-cols-2 md:gap-6">
          {/* Componente Dropdown para elegir el área del médico */}
          <Dropdown
            // Agrega propiedades según la implementación de Dropdown
            data={[{descripcion: "hola"}]}
            name={"dropdown-area-medico"}
            defaultText={"Elegir área del médico"}
            text={"descripcion"}
            defaultValue={""}
            width={"w-fit"}
            value={"descripcion"}
            selectedValue={area}
            handleChange={(event) => setArea(event.target.value)}
          />
          {/* Componente TextInput para el CMP del médico */}
          <TextInput
            type="text"
            name="cmp"
            // minLength={/* Mínimo necesario para CMP */}
            // maxLength={/* Máximo necesario para CMP */}
            id="cmp"
            autoComplete="off"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent"
            placeholder=" "
            value={cmp}
            onChange={(event) => setCodigoSeguro(event.target.value)}
            required
          />
        </div>
  
        <div className="grid grid-cols-2 md:gap-6">
          {/* Componente Dropdown para elegir la especialidad del médico */}
          <Dropdown
            // Agrega propiedades según la implementación de Dropdown
            data={[{descripcion: "hola"}]}
            name={"dropdown-especialidad-medico"}
            defaultText={"Elegir especialidad del médico"}
            text={"descripcion"}
            defaultValue={""}
            width={"w-fit"}
            value={"descripcion"}
            selectedValue={especialidad}
            handleChange={(event) => setEspecialidad(event.target.value)}
          />
          {/* Otros campos y componentes necesarios */}
        </div>
      </fieldset>
  
      <div className="flex flex-row-reverse">
        <button
          type="button"
          className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
          onClick={isNextPart ? handleClearForm : validateForm}
        >
          {isNextPart ? 'Limpiar campos' : 'Siguiente'}
        </button>
        <button
          type="button"
          className="m-2 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="m-2 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>
    </section>
  );
};

export default NewDoctor;
