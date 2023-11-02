"use client";

import { useEffect, useState } from "react";
import { laboratoryService } from "@/services/laboratoryService"

const LaboratoryProfile = ({ params }) => {

    const [medicos, setMedicos] = useState([]);

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
        examenMedico: []
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

        console.log("los datos de laboratorio son: ", dataLaboratory)
        const laboratorioData = {
            idOrdenLaboratorio: params.idLaboratory,
            doctorFirmante: dataLaboratory.doctorFirmante,
            estado: 1, 
            examenMedico: dataLaboratory.examenMedico,
            observaciones: dataLaboratory.observaciones
        }
    
        console.log("Verificación directa:", dataLaboratory.observaciones);
    
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
    
        try {
            const result = await laboratoryService.atenderOrdenLaboratorio(laboratoryData);
    
            if (result === 1) {
                setShowModal(true);
            } else {
                alert("Ocurrió un problema al guardar la información. Por favor, inténtalo de nuevo.");
            }
    
        } catch (error) {
            console.error("Error al guardar la orden de laboratorio", error);
            alert("Hubo un error al guardar. Por favor, inténtalo de nuevo.");
        }
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
    

  return (
    
    <div className="w-full p-10 rounded-lg shadow-md">
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
            value={dataLaboratory?.citaMedica?.paciente?.sexo}
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
                defaultValue=""
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
                <input name="archivoExamenes" className="text-xl border rounded p-4 w-full" type="file" />
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
                <span className="text-right block mt-2" id="charCount">0/1000</span>
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
