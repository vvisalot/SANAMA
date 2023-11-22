import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const MedicationItem = ({
  index,
  medication,
  onEditMedication,
  onDeleteMedication,
}) => {
  const [editing, setEditing] = useState(false);
  const [nombre, setNombre] = useState(medication.nombre);
  const [indicacion, setIndicacion] = useState(medication.indicacion);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setNombre(medication.nombre);
    setIndicacion(medication.indicacion);
  };

  const handleDone = () => {
    if (nombre.trim() && indicacion.trim()) {
      onEditMedication(index, {
        nombre: nombre.trim(),
        indicacion: indicacion.trim(),
      });
      setEditing(false);
    }
  };

  const handleDelete = () => {
    onDeleteMedication(index);
  };

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangeIndicacion = (e) => {
    setIndicacion(e.target.value);
  };

  return (
    <li className="mb-1 border-b border-gray-300 space-y-2">
      {editing ? (
        <div className="mb-4 w-full flex space-x-2 items-center rounded-lg px-4">
          <div className="flex items-center space-x-3 w-full">
            <input
              type="text"
              value={nombre}
              onChange={handleChangeNombre}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nombre del medicamento"
            />
            <input
              type="text"
              value={indicacion}
              onChange={handleChangeIndicacion}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Indicación"
            />
          </div>
          <div className="w-1/6 flex space-x-3">
            <button type="button" onClick={handleDone}>
              <MdOutlineDone
                size={20}
                className="hover:text-green-400 text-gray-500"
              />
            </button>
            <button type="button" onClick={handleCancel}>
              <RxCross2
                size={20}
                className="text-gray-500 hover:text-orange-400"
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-4 w-full flex space-x-2 items-center rounded-lg px-4">
          <div className="flex items-center space-x-3 w-full">
            <input
              type="text"
              readOnly
              value={nombre}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nombre del medicamento"
            />
            <input
              type="text"
              readOnly
              value={indicacion}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Indicación"
            />
          </div>
          <div className="w-1/6 flex space-x-3">
            <button type="button" onClick={handleEdit}>
              <CiEdit
                size={20}
                className="text-gray-500 hover:text-yellow-500"
              />
            </button>
            <button type="button" onClick={handleDelete}>
              <AiOutlineDelete
                size={18}
                className="text-gray-500 hover:text-red-500"
              />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default MedicationItem;
