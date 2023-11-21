import React, { useState } from "react";
import swal from "sweetalert";
import { toast } from "sonner";
import { Modal } from "flowbite-react";

const LaboratoryModal = ({ isOpen, onClose, appointmentId }) => {
  const [dataLaboratorio, setDataLaboratorio] = useState({
    tipoMuestra: "",
    instrucciones: "",
  });
  const [isConfirming, setIsConfirming] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLaboratorio((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const dataParaEnviar = {
      tipoMuestra: dataLaboratorio.tipoMuestra,
      instrucciones: dataLaboratorio.instrucciones,
      citaMedica: {
        idCita: appointmentId,
      },
    };

    try {
      const response = await fetch(
        "http://localhost:8080/laboratorio/post/registrarOrdenLaboratorio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataParaEnviar),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar la orden de laboratorio");
      }
      setIsConfirming(false);
      const responseData = await response.json();
      console.log("ID de la orden de laboratorio:", responseData);
      return responseData; // Retorna la respuesta para su uso en toast.promise
    } catch (error) {
      console.error("Error al guardar los datos del laboratorio:", error);
      throw error;
    }
  };

  const confirmAndSave = () => {
    swal({
      title: "¿Confirmar Orden?",
      text: "Esta acción registrara la orden de laboratorio.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willSave) => {
      if (willSave) {
        setIsConfirming(true);
        onClose(); // Cierra el modal después de guardar
        toast.promise(handleSave(), {
          loading: "Registrando...",
          success: "Orden registrada exitosamente",
          error: "Error al guardar los datos",
        });
      }
    });
  };

  return (
    <Modal show={isOpen} size="xl" onClose={onClose}>
      <Modal.Header>Registrar Orden de Laboratorio</Modal.Header>
      <Modal.Body>
        {" "}
        <div className="mb-2 mt-2">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="tipoMuestra"
          >
            Tipo de Muestra
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tipoMuestra"
            name="tipoMuestra"
            type="text"
            placeholder="Tipo de muestra"
            value={dataLaboratorio.tipoMuestra}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 mt-2">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="instrucciones"
          >
            Instrucciones
          </label>
          <textarea
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="instrucciones"
            name="instrucciones"
            placeholder="Instrucciones para la muestra"
            value={dataLaboratorio.instrucciones}
            onChange={handleChange}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={confirmAndSave} disabled={isConfirming}>
          Confirmar
        </button>
        <button onClick={onClose} disabled={isConfirming}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default LaboratoryModal;
