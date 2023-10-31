// "use client"

// import { useEffect, useState } from "react";
// import { laboratoryService } from "@/services/laboratoryService"; 

// const LaboratoryProfile = ({ params }) => {
//     const [dataLaboratory, setDataLaboratory] = useState(null);

    
//     const handleSave = async () => {
//         // falta
//     }

//     const handleCancel = () => {
//         if (typeof window !== "undefined") {
//             window.history.back();
//         }
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await laboratoryService.buscarExamenMedico(params.idLaboratory); 
//                 setDataLaboratory(data);
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         fetchData();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setDataLaboratory(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     return (
//         <div className="p-8 rounded-lg shadow-md text-black space-y-16">
//             <div>
//                 <h2 className="text-2xl font-bold mb-8">Información General del Paciente</h2>

//                 <div className="grid grid-cols-3 gap-x-20 gap-y-8">
//                     {/* Nombres */}
//                     <div>
//                         <label className="block mb-2">Nombres</label>
//                         <input className="border rounded p-4 w-full" type="text" readOnly />
//                     </div>
                    
//                     {/* Primer Apellido */}
//                     <div>
//                         <label className="block mb-2">Primer Apellido</label>
//                         <input className="border rounded p-4 w-full" type="text" readOnly />
//                     </div>
                    
//                     {/* Segundo Apellido */}
//                     <div>
//                         <label className="block mb-2">Segundo Apellido</label>
//                         <input className="border rounded p-4 w-full" type="text" readOnly />
//                     </div>
//                 </div>

//                 <h2 className="text-2xl font-bold mb-8">Orden de Laboratorio</h2>
//                 <div className="grid grid-cols-2 gap-20">
//                     <div>
//                         <label className="block mb-2">Tipo de Orden</label>
//                         <input className="border rounded p-4 w-full" type="text" value={dataLaboratory?.tipoOrden} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <label className="block mb-2">Instrucciones</label>
//                         <input className="border rounded p-4 w-full" type="text" value={dataLaboratory?.instrucciones} onChange={handleChange} />
//                     </div>
//                 </div>

//                 <h2 className="text-2xl font-bold mb-8">Cita Médica</h2>
//                 <div className="grid grid-cols-2 gap-20">
//                     <div>
//                         <label className="block mb-2">Médico asignado</label>
//                         <input className="border rounded p-4 w-full" type="text" value={dataLaboratory?.medicoAsignado} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <label className="block mb-2">Requiere Triaje</label>
//                         <select className="border rounded p-4 w-full" value={dataLaboratory?.requiereTriaje} onChange={handleChange}>
//                             <option value={1}>Sí</option>
//                             <option value={0}>No</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block mb-2">Tiene Acompañante</label>
//                         <select className="border rounded p-4 w-full" value={dataLaboratory?.tieneAcompanhante} onChange={handleChange}>
//                             <option value={true}>Sí</option>
//                             <option value={false}>No</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-20 mt-8">
//                     <div className="col-span-3 flex justify-end">
//                         <button className="px-8 py-4 bg-gray-300 mr-8 rounded hover:bg-gray-400" onClick={handleCancel}>Cancelar</button>
//                         <button className="px-8 py-4 bg-blue-500 text-black rounded hover:bg-blue-600" onClick={handleSave}>Guardar</button>
//                     </div>
//                 </div>
//             </div>
//         </div>

    
//     );
// }

// export default LaboratoryProfile;


"use client"

import { useEffect, useState } from "react"
import { laboratoryService } from "@/services/laboratoryService"

const LaboratoryProfile = ({ params }) => {
    
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [observations, setObservations] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [doctorLabSeleccionado, setDoctorLabSeleccionado] = useState("seleccionar");
    const [medicosLab, setMedicosLab] = useState([]);

    const handleSave = async () => {
        // Logic for saving...
    }

    const handleCancel = () => {
        if (typeof window !== "undefined") {
            window.history.back();
        }
    }

    const handleDoctorChange = (event) => {
        setDoctorLabSeleccionado(event.target.value);
    };

    return (
        <div className="container mx-auto px-4">
            <h4 className="text-2xl font-bold mb-4">Registrar Examen N°{params.idLaboratorio}</h4>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-4">Paciente</h5>
                <input 
                    className="border rounded w-full py-2 px-3 text-gray-700 mb-4" 
                    type="text"                      
                    name="nombre"
                />
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Doctor:</label>
                    <select 
                        value={doctorLabSeleccionado} 
                        onChange={handleDoctorChange} 
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    >
                        {medicosLab.map(medico => (
                            <option key={medico.id} value={medico.id}>
                                {medico.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Observaciones:</label>
                    <textarea 
                        value={observations} 
                        onChange={(e) => setObservations(e.target.value)} 
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Archivos:</label>
                    <input 
                        type="file" 
                        multiple 
                        onChange={(e) => setSelectedFiles(e.target.files)} 
                        className="border rounded py-2 px-3 text-gray-700"
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleCancel}>
                        Cancelar
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LaboratoryProfile;

