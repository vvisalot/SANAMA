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
    e.preventDefault();
    e.stopPropagation();
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
        <div className="flex items-center justify-between p-1 px-3 w-full">
          <div className="flex items-center space-x-3 w-full">
            <input
              type="text"
              value={nombre}
              onChange={handleChangeNombre}
              className="w-full bg-transparent py-3 text-lg"
              placeholder="Nombre del medicamento"
            />
            <input
              type="text"
              value={indicacion}
              onChange={handleChangeIndicacion}
              className="w-full bg-transparent py-3 text-lg"
              placeholder="Indicación"
            />
          </div>
          <div className="flex space-x-3">
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
        <div className="flex items-center justify-between p-4 px-3">
          <div className="flex items-center space-x-3">
            <span className="text-lg">
              {nombre} - {indicacion}
            </span>
          </div>
          <div className="flex items-center space-x-3">
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
