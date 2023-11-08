"use client";

import { useEffect, useState } from "react";
import { laboratoryService } from "@/services/laboratoryService"

const LaboratoryProfile = ({ params }) => {

    const [medicos, setMedicos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const response = await laboratoryService.listarMedicosLaboratorioValidado();
                setMedicos(response);
            } catch (error) {
                console.error("Error al obtener los médicos", error);
            }
        };
    
        fetchMedicos();
    }, []);
    

    const [dataLaboratory, setDataLaboratory] = useState({
        idOrdenLaboratorio: null,
        codigoOrden: "",
        tipoMuestra: "",
        instrucciones: "",
        doctorFirmante: "",
        observaciones: "",
        citaMedica: {
            paciente: {
                nombres: "",
                apellidoPaterno: "",
                apellidoMaterno: "",
                dni: "",
                fechaNacimiento: "",
                sexo: ""
            },
            medico: {
                nombres: "",
                apellidoPaterno: "",
                apellidoMaterno: ""
            }
        },
        examenMedico: [
            {
                idExamen: null,
                nombreArchivo: "",
                archivo: ""
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await laboratoryService.buscarOrdenLaboratorioPorId(params.idLaboratory);
                console.log(data);
                setDataLaboratory(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
       

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name.includes('citaMedica.paciente.')) {
            const field = name.split('.')[2];
            setDataLaboratory(prevState => ({
                ...prevState,
                citaMedica: {
                    ...prevState.citaMedica,
                    paciente: {
                        ...prevState.citaMedica.paciente,
                        [field]: value
                    }
                }
            }));
        } else if (name.includes('citaMedica.medico.')) {
            const field = name.split('.')[2];
            setDataLaboratory(prevState => ({
                ...prevState,
                citaMedica: {
                    ...prevState.citaMedica,
                    medico: {
                        ...prevState.citaMedica.medico,
                        [field]: value
                    }
                }
            }));
        } else {
            setDataLaboratory(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        if (name === "instrucciones" || name === "observaciones") {
            const count = value.length;
            document.getElementById('charCount').textContent = `${count}/1000`;
        }
    };
    
    const handleCancel = () => {
        if (typeof window !== "undefined") {
            window.history.back()
        }
    }

    const [missingFieldsModal, setMissingFieldsModal] = useState(false);
    const [missingFields, setMissingFields] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fieldNames = {
        idOrdenLaboratorio: "ID de la Orden de Laboratorio",
        doctorFirmante: "Médico de laboratorio",
        estado: "Estado",
        examenMedico: "Examen Médico",
        observaciones: "Observaciones del Examen"
    };
      
   
    const handleSave = async () =>{

        const laboratorioData = {
            idOrdenLaboratorio: params.idLaboratory,
            doctorFirmante: dataLaboratory.doctorFirmante,
            estado: 1, 
            examenMedico: dataLaboratory.examenMedico,
            observaciones: dataLaboratory.observaciones
        }

        console.log("los examenes son: ", dataLaboratory.examenMedico)
    
        const incompleteFields = [];
        for (let key in laboratorioData) {
            const value = laboratorioData[key];
            if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
                incompleteFields.push(fieldNames[key] || key);
            }
        }
    
        if (incompleteFields.length > 0) {
            setMissingFields(incompleteFields);
            setMissingFieldsModal(true);
            return;
        }

        setIsLoading(true);
    
        try {
            const result = await laboratoryService.atenderOrdenLaboratorio(laboratorioData);
    
            if (result === 1) {
                setShowModal(true);
            } else {
                alert("Ocurrió un problema al guardar la información. Por favor, inténtalo de nuevo.");
            }
    
        } catch (error) {
            console.error("Error al guardar la orden de laboratorio", error);
            alert("Hubo un error al guardar. Por favor, inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }

    function getSexoLabel(sexo) {
        if (sexo === 'M') {
          return 'Masculino';
        } else if (sexo === 'F') {
          return 'Femenino';
        }
        return ''; // o puedes retornar null o un mensaje como 'No especificado'
      }

      function calcularEdad(fechaNacimiento) {
        const hoy = new Date()
        const cumpleanos = new Date(fechaNacimiento)
        let edad = hoy.getFullYear() - cumpleanos.getFullYear()
        const mes = hoy.getMonth() - cumpleanos.getMonth()

        if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--
        }

        return edad
    }

    const handleMedicoChange = (event) => {
        const selectedMedicoId = Number(event.target.value); 
        console.log("Selected Medico ID:", selectedMedicoId);
    
        const selectedMedico = medicos.find(medico => medico.idValue === selectedMedicoId);
        console.log("Selected Medico:", selectedMedico);
    
        setDataLaboratory(prevData => {
            return {
                ...prevData,
                doctorFirmante: selectedMedico ? selectedMedico.descripcion : ''
            };
        });
    };

    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    const handleAnularLaboratoryClick = () => {
        
        setShowConfirmPopup(true);
    };

    const handleClosePopup = () => {
        
        setShowConfirmPopup(false);
    };

    const handleConfirmAnulacion = async () => {
        const laboratorioDataCancelled = {
            idOrdenLaboratorio: Number(params.idLaboratory),
            doctorFirmante: "Doctor por defecto", 
            estado: 3, 
            examenMedico: [], 
            observaciones: "Anulado"
        };
    
        try {
            console.log("Datos antes de anular:", laboratorioDataCancelled);
            const result = await laboratoryService.atenderOrdenLaboratorio(laboratorioDataCancelled);
            console.log("Resultado después de intentar anular:", result);
    
            if (result === 1) {
                if (typeof window !== "undefined") {
                    window.history.back();
                }
            } else {
                alert("Ocurrió un problema al anular la orden de laboratorio. Por favor, inténtalo de nuevo.");
            }
    
        } catch (error) {
            console.error("Error al anular la orden de laboratorio", error);
            alert("Hubo un error al anular la orden de laboratorio. Por favor, inténtalo de nuevo.");
        }
        setShowConfirmPopup(false);
    };

    const handleAcceptModal = () => {
        setShowModal(false)
        if (typeof window !== "undefined") {
            window.history.back()
        }
    }


    
    
    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.readyState === 2) {
                    const base64 = reader.result.split(',')[1];
                    console.log("EL CUERPO ES", base64),
                    setDataLaboratory(prevState => {
                        const updatedExamenMedico = [...prevState.examenMedico];
                        updatedExamenMedico[index] = {
                            ...updatedExamenMedico[index],
                            nombreArchivo: file.name,                            
                            archivo: base64
                        };
                        return {
                            ...prevState,
                            examenMedico: updatedExamenMedico
                        };
                    });
                }
            };
        } else {
            console.error("Archivo no permitido o no es un PDF.");
        }
    };
    
    const handleRemoveExamen = (indexToRemove) => {
        setDataLaboratory(prevState => ({
            ...prevState,
            examenMedico: prevState.examenMedico.filter((_, index) => index !== indexToRemove)
        }));
    }

    const downloadFile = (base64, fileName) => {
        // Convertir base64 a un objeto Blob
        const blob = base64ToBlob(base64, 'application/pdf');
        // Crear un enlace para la descarga
        const link = document.createElement('a');
        // Crear un URL para el Blob
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = fileName; // Asignar el nombre de archivo para la descarga
        document.body.appendChild(link); // Agregar el enlace al cuerpo del documento
        link.click(); // Simular un click para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace una vez iniciada la descarga
        URL.revokeObjectURL(url); // Liberar el objeto URL
      };
      
      // Función auxiliar para convertir Base64 a Blob
      const base64ToBlob = (base64, mimeType) => {
        // Decodificar la cadena base64 a un array de enteros
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        // Convertir el array de enteros a un Uint8Array
        const byteArray = new Uint8Array(byteNumbers);
        // Crear el Blob a partir del Uint8Array
        return new Blob([byteArray], { type: mimeType });
      };
      
    

  return (

    <div className="w-full p-10 rounded-lg shadow-md">

        {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-md">
            <div className="animate-spin w-6 h-6 border-t-4 border-blue-500 rounded-full"></div>
            <div className="mt-2 text-gray-600">Cargando...</div>
            </div>
        </div>
        )}


        <button className="text-xl bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded float-right mb-4" onClick={handleAnularLaboratoryClick}>Anular Laboratorio</button>
        
        {showConfirmPopup && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Confirmación</h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">¿Está seguro que desea anular el laboratorio?</p>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={handleConfirmAnulacion} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none">Sí, anular</button>
                    <button onClick={handleClosePopup} className="mr-2 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 focus:outline-none">Cancelar</button>
                    </div>
                </div>
                </div>
            </div>
            )}
        <section className="rounded-lg p-8 w-full flex flex-col space-y-6">

        <h4 className="text-2xl font-bold mb-4 mt-4">Información del paciente</h4>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
    <label className="text-xl text-black block mb-2">Nombres</label>
    <input
        className="text-xl border rounded p-4 w-full bg-gray-200 cursor-not-allowed"
        type="text"
        value={dataLaboratory?.citaMedica?.paciente?.nombres}
        onChange={handleChange}
        disabled
    />
    </div>
    <div>
        <label className="text-xl text-black block mb-2">Primer Apellido</label>
        <input 
            name="primerApellido"
            className="text-xl border rounded p-4 w-full bg-gray-200 cursor-not-allowed"
            type="text"
            value={dataLaboratory?.citaMedica?.paciente?.apellidoPaterno}
            onChange={handleChange}
            disabled
        />
    </div>

    <div>
        <label className="text-xl text-black block mb-2">Segundo Apellido</label>
        <input 
            name="segundoApellido"
            className="text-xl border rounded p-4 w-full bg-gray-200 cursor-not-allowed"
            type="text"
            value={dataLaboratory?.citaMedica?.paciente?.apellidoMaterno}
            onChange={handleChange}
            disabled
        />
    </div>

    <div>
        <label className="text-xl text-black block mb-2">Documento de identidad</label>
        <input 
            name="documentoIdentidad"
            className="text-xl border rounded p-4 w-full bg-gray-200 cursor-not-allowed"
            type="text"
            value={dataLaboratory?.citaMedica?.paciente?.dni}
            onChange={handleChange}
            disabled
        />
    </div>

    <div>
        <label className="text-xl text-black block mb-2">Sexo</label>
        <input 
            name="sexo"
            className="text-xl border rounded p-4 w-full bg-gray-200 cursor-not-allowed"
            type="text"
            value={getSexoLabel(dataLaboratory?.citaMedica?.paciente?.sexo)}
            onChange={handleChange}
            disabled
        />
    </div>

    <div className="w-1/4">
        <label className="text-xl text-black block mb-2">Edad</label>
        <input 
            name="edad"
            className="text-xl border rounded p-4 w-full bg-gray-200 cursor-not-allowed"
            type="number"
            value={calcularEdad(dataLaboratory?.citaMedica?.paciente?.fechaNacimiento)}
            onChange={handleChange}
            disabled
        />
    </div>

        </div>

        <h4 className="text-2xl font-bold mb-4 mt-4">Información de orden de laboratorio</h4>
        
        <div className="grid grid-cols-3 gap-6 mb-6">

        <div>
    <label className="text-xl text-black block mb-2">Tipo de muestra</label>
    <input 
        name="tipoMuestra"
        className="text-xl border rounded p-4 w-full bg-gray-200 cursor-not-allowed"
        type="text"
        value={dataLaboratory?.tipoMuestra}
        onChange={handleChange}
        disabled
    />
    </div>

    <div>
        <label className="text-xl text-black block mb-2">Médico prescriptor</label>
        <input 
            name="medicoPrescriptor"
            className="text-xl border rounded p-4 w-full bg-gray-200 cursor-not-allowed"
            type="text"
            value={`${dataLaboratory?.citaMedica?.medico?.nombres} ${dataLaboratory?.citaMedica?.medico?.apellidoPaterno} ${dataLaboratory?.citaMedica?.medico?.apellidoMaterno}`}
            onChange={handleChange}
            disabled
        />
    </div>

    <div className="text-xl col-span-3">
        <label className="text-black block mb-2">Examenes a realizar</label>
        <textarea 
            name="listaPruebas"
            style={{ fontSize: '20px' }}
            className="textarea-custom w-full bg-gray-200 cursor-not-allowed"
            value={dataLaboratory?.instrucciones}
            onChange={handleChange}
            disabled
        ></textarea>
    </div>



        </div>

        <h4 className="text-2xl font-bold mb-4 mt-4">Información de los exámenes</h4>

        <div className="grid grid-cols-3 gap-6 mb-6">
            
        <div>
            <label className="text-xl text-black block mb-2">Médico de Laboratorio</label>
            <select 
                name="medicoLaboratorio" 
                className="text-xl border rounded w-full py-4 px-3"
                onChange={handleMedicoChange}
                value={medicos.find(medico => medico.descripcion === dataLaboratory.doctorFirmante)?.idValue || ""}
            >
                <option value="" disabled className="text-xl">Seleccionar médico</option>
                {medicos.map(medico => (
                    <option key={medico.idValue} value={medico.idValue} className="text-xl">
                        {medico.descripcion}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <label className="text-xl text-black block mb-2">Subir archivo</label>
            {dataLaboratory.examenMedico.map((examen, index) => (
                <div key={index} className="mt-4">
                    <input
                        name={`examenMedico.${index}.archivo`}
                        className="text-xl border rounded p-4 w-full"
                        type="file"
                        onChange={(e) => handleFileChange(e, index)}
                    />
                    {examen.nombreArchivo && (
                        <div className="mt-2">
                            <span className="text-lg">Archivo actual: </span>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    downloadFile(examen.archivo, examen.nombreArchivo);
                                }}
                                className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 inline-block"  // Estilos de botón agregados
                            >
                                {examen.nombreArchivo}
                            </a>
                        </div>
                    )}

                    {/* Botón para eliminar este examen médico */}
                    <button 
                        onClick={() => handleRemoveExamen(index)} 
                        className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                    >
                        Eliminar Examen
                    </button>
                </div>
            ))}

            {/* Botón para agregar un nuevo examen médico */}
            <button 
                onClick={() => { 
                    setDataLaboratory(prevState => {
                        // Encuentra el idExamen más alto en la lista actual o comienza desde 1 si está vacío
                        const lastId = prevState.examenMedico.length > 0 
                            ? Math.max(...prevState.examenMedico.map(e => e.idExamen || 0))
                            : 0;

                        // Retorna el nuevo estado con el nuevo examen añadido
                        return {
                            ...prevState,
                            examenMedico: [...prevState.examenMedico, { idExamen: lastId + 1, nombreArchivo: "", archivo: "" }]
                        };
                    });
                }}
                className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
                Añadir Examen
            </button>
        </div>



            <div className="col-span-3">
                <h4 className="text-2xl font-bold mb-4 mt-4">Observaciones</h4>
                <textarea 
                    value={dataLaboratory?.observaciones} 
                    style={{ fontSize: '20px' }}
                    onChange={handleChange} 
                    name="observaciones" 
                    className="text-4xl textarea-custom w-full"
                    maxLength={1000}
                ></textarea>
                <span className="text-right block mt-2" id="charCount">{(dataLaboratory?.observaciones || '').length}/1000</span>
            </div>
        </div>

        <div>
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-3 mt-6 flex justify-end">
                    <button className="text-xl px-4 py-2 bg-gray-300 mr-4 rounded hover:bg-gray-400" onClick={handleCancel}>Cancelar</button>
                    <button className="text-xl px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSave}>Guardar</button>
                </div>
            </div>
        </div>

        
        {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                    {/* Icono de check en SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5l-1.41 1.42L9 19.84L21.41 7.41L20 6z"></path>
                    </svg>
                    <p className="text-gray-700 font-semibold">Información guardada exitosamente!</p>
                    <button onClick={handleAcceptModal} className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Aceptar</button>
                </div>
            </div>
        )}

        {missingFieldsModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                    {/* Icono de advertencia en SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
                    </svg>
                    <p className="text-gray-700 font-semibold">Por favor, completa los siguientes campos antes de guardar:</p>
                    <ul className="text-gray-600 list-disc pl-5">
                        {missingFields.map(field => (
                            <li key={field}>{field}</li>
                        ))}
                    </ul>
                    <button onClick={() => setMissingFieldsModal(false)} className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Entendido</button>
                </div>
            </div>
        )}


        </section>
    </div>

  
  );
};

export default LaboratoryProfile;
