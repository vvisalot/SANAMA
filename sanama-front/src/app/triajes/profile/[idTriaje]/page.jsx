"use client"

import { useEffect, useState } from "react"
import { triajeService } from "@/services/triajeService"

const TriajeProfile = ({ params }) => {

    const [dataTriaje, setDataTriaje] = useState(null);

    const handleSave = async () => {
        try {
            const triajeData = {
                pn_id_triaje: dataTriaje.idTriaje || 2,
                pn_peso: dataTriaje.peso || 80,  
                pn_talla: dataTriaje.talla || 176,
                pn_temperatura: dataTriaje.temperatura || 37,
                pv_motivo_visita: dataTriaje.motivoVisita || "Dolor de cabeza",
                pn_presion_arterial: dataTriaje.presionArterial || 120,
                pn_estado: dataTriaje.estado || 1,
                pv_prioridad: dataTriaje.prioridad || "Media",
                pn_saturacionOxigeno: dataTriaje.saturacionOxigeno || "98",
                pn_frecuenciaCardiaca: dataTriaje.frecuenciaCardiaca || "75",
                pn_frecuenciaRespiratoria: dataTriaje.frecuenciaRespiratoria || "20",
                pv_nivelConciencia: dataTriaje.nivelConciencia || "Consciente",
                pv_nivelDolor: dataTriaje.nivelDolor || "4",
                pv_condicionesPrexistentes: dataTriaje.condicionesPreexistentes
            };
    
            const result = await triajeService.actualizarTriaje(triajeData);  
            if (result === 1) {
                alert("Información guardada exitosamente!"); 
                if (typeof window !== "undefined") {
                    window.history.back();
                }
            } else {
                alert("Ocurrió un problema al guardar la información. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al guardar el triaje", error);
            alert("Hubo un error al guardar. Por favor, inténtalo de nuevo.");
        }
    }
        

    const handleCancel = () => {
        if (typeof window !== "undefined") {
            window.history.back();
        }
    }

    function handleDolor(value) {
        setDataTriaje(prevState => ({
            ...prevState,
            nivelDolor: value
        }));
    }
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await triajeService.buscarPorFiltro(params.idTriaje)
                console.log(data)
                setDataTriaje(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

        function calcularEdad(fechaNacimiento) {
            const hoy = new Date();
            const cumpleanos = new Date(fechaNacimiento);
            let edad = hoy.getFullYear() - cumpleanos.getFullYear();
            const mes = hoy.getMonth() - cumpleanos.getMonth();
        
            if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }
        
            return edad;
        }

        function getColor(num) {
            if (num.toString() === dataTriaje?.nivelDolor) {
                return 'bg-black text-white';
            }            
            switch(num) {
                case 1: return 'bg-red-0';
                case 2: return 'bg-red-100';
                case 3: return 'bg-red-200';
                case 4: return 'bg-red-300';
                case 5: return 'bg-red-400';
                case 6: return 'bg-red-500';
                case 7: return 'bg-red-600';
                case 8: return 'bg-red-700';
                case 9: return 'bg-red-800';
                case 10: return 'bg-red-900';  
                default: return 'bg-red-500';
            }
        }

        const edad = dataTriaje?.paciente ? calcularEdad(dataTriaje.paciente.fechaNacimiento) : "";

        function TuComponente() {
        const [dataTriaje, setDataTriaje] = useState({
            // Inicializando con la estructura básica del JSON
            idTriaje: '',
            codigoTriaje: '',
            peso: '',
            talla: '',
            temperatura: '',
            motivoVisita: '',
            presionArterial: '',
            estado: '',
            prioridad: '',
            fechaTriaje: '',
            horaTriaje: '',
            saturacionOxigeno: '',
            frecuenciaCardiaca: '',
            nivelConciencia: '',
            nivelDolor: '',
            condicionesPrexistentes: '',
            paciente: {
                idPersona: '',
                nombres: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                dni: '',
                fechaNacimiento: '',
                sexo: ''
            }
        });}
    
        const handleChange = (e) => {
            const { name, value } = e.target;
    
            if (name.includes('paciente.')) {
                const field = name.split('.')[1];
                setDataTriaje(prevState => ({
                    ...prevState,
                    paciente: {
                        ...prevState.paciente,
                        [field]: value
                    }
                }));
            } else {
                setDataTriaje(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        };

    return (
        <div className="w-full p-10 rounded-lg shadow-md">
            <section className="rounded-lg p-8 w-full flex flex-col space-y-6">

                <div>
                    <h2 className="text-2xl font-bold mb-4">Información básica</h2>
                    
                    <div className="grid grid-cols-3 gap-x-20 gap-y-8">
                        <div>
                            <label className="text-black block mb-2">Nombres</label>
                            <input 
                                className="border rounded p-4 w-full bg-gray-200 cursor-not-allowed" 
                                type="text" 
                                value={dataTriaje?.paciente?.nombres} 
                                onChange={handleChange} 
                                disabled
                            />
                        </div>

                        <div>
                            <label className="text-black block mb-2">Primer Apellido</label>
                            <input disabled className="border rounded p-4 w-full bg-gray-200 cursor-not-allowed" type="text" value={dataTriaje?.paciente?.apellidoPaterno} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-black block mb-2">Segundo Apellido</label>
                            <input disabled className="border rounded p-4 w-full bg-gray-200 cursor-not-allowed" type="text" value={dataTriaje?.paciente?.apellidoMaterno} onChange={handleChange} />
                        </div>

                        <div>
                            <label className="text-black block mb-2">Documento de identidad</label>
                            <input disabled className="border rounded p-4 w-full bg-gray-200 cursor-not-allowed" type="text" value={dataTriaje?.paciente?.dni} onChange={handleChange} />
                        </div>

                        <div>
                            <label className="text-black block mb-2">Sexo</label>
                            <select disabled className="border rounded p-4 w-full bg-gray-200 cursor-not-allowed" value={dataTriaje?.sexo} onChange={handleChange}>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>

                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="text-black block mb-2">Edad</label>
                                <input 
                                    disabled 
                                    className="border rounded p-4 w-full bg-gray-200 cursor-not-allowed" 
                                    type="text" 
                                    value={edad} 
                                    onChange={handleChange} 
                                />
                            </div>

                            <div className="flex-1">
                                <label className="text-black block mb-2">Talla (cm)</label>
                                <input 
                                    className="border rounded p-4 w-full" 
                                    type="text" 
                                    name="talla" 
                                    value={dataTriaje?.talla} 
                                    onChange={handleChange} 
                                />
                            </div>

                            <div className="flex-1">
                                <label className="text-black block mb-2">Peso (kg)</label>
                                <input 
                                    className="border rounded p-4 w-full" 
                                    type="text" 
                                    name="peso" 
                                    value={dataTriaje?.peso} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>

                    </div>

                    <div className="col-span-3">
                        <h4 className="text-xl font-bold mb-4 mt-4">Motivo de consulta</h4>
                        <textarea value={dataTriaje?.motivoVisita} onChange={handleChange} name="motivoVisita" className="border rounded w-full py-2 px-3"></textarea>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-6">

                        <div className="col-span-3">
                            <h4 className="text-xl font-bold mt-4">Signos vitales</h4>
                        </div>

                        <div>
                            <label className="text-black block mb-2">Temperatura (°C)</label>
                            <input className="border rounded p-4 w-full" type="text" value={dataTriaje?.temperatura} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-black block mb-2">Frecuencia Cardíaca (lpm)</label>
                            <input className="border rounded p-4 w-full" type="text" value={dataTriaje?.frecuenciaCardiaca} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-black block mb-2">Saturación de Oxígeno (%)</label>
                            <input className="border rounded p-4 w-full" type="text" value={dataTriaje?.saturacionOxigeno} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-black block mb-2">Presión arterial (mm Hg)</label>
                            <input  className="border rounded p-4 w-full" type="text" value={dataTriaje?.presionArterial} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-black block mb-2">Frecuencia Respiratoria (rpm)</label>
                            <input className="border rounded p-4 w-full" type="text" value={dataTriaje?.frecuenciaRespiratoria} onChange={handleChange} />
                        </div>
                    </div>
     

                    <div className="flex justify-between items-center">
                        <div className="flex-grow mr-4">
                            <label className="text-black block mb-2">Nivel de conciencia</label>
                            <select value={dataTriaje?.nivelConciencia} onChange={handleChange} name="nivelConciencia" className="border rounded w-full py-4 px-3">
                                <option value="Alerta">Alerta</option>
                                <option value="Responde a la voz">Responde a la voz</option>
                                <option value="Responde al dolor">Responde al dolor</option>
                                <option value="Inconsciente">Inconsciente</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="text-black block mb-4">Evaluación del dolor</label>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <button 
                                    key={num} 
                                    className={`mx-2 py-2 px-4 border rounded focus:outline-none transition-colors ${getColor(num)} ${String(num) === dataTriaje?.nivelDolor ? 'bg-black text-white' : ''}`}
                                    onClick={() => handleDolor(String(num))}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="col-span-3">
                        <h4 className="text-xl font-bold mb-4 mt-4">Condiciones preexistentes</h4>
                        <textarea value={dataTriaje?.condicionesPrexistentes} onChange={handleChange} name="condicionesPrexistentes" className="border rounded w-full py-2 px-3"></textarea>
                    </div>

                    <div div className="flex-grow">
                        <h4 className="text-xl font-bold mb-4 mt-4">Prioridad</h4>
                        <select value={dataTriaje?.prioridad} onChange={handleChange} name="prioridad" className="border rounded w-full py-4 px-4">
                            <option value="Resucitacion" style={{backgroundColor: '#D32F2F', color: 'white'}}>Resucitación</option>
                            <option value="Emergencia" style={{backgroundColor: '#F57C00', color: 'white'}}>Emergencia</option>
                            <option value="Urgencia" style={{backgroundColor: '#FFEB3B', color: 'white'}}>Urgencia</option>
                            <option value="Urgencia menor" style={{backgroundColor: '#4CAF50', color: 'white'}}>Urgencia menor</option>
                            <option value="Sin Urgencia" style={{backgroundColor: '#2196F3', color: 'white'}}>Sin urgencia</option>
                        </select>
                    </div>


                    <div>
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            <div className="col-span-3 mt-6 flex justify-end">
                                <button className="px-4 py-2 bg-gray-300 mr-4 rounded hover:bg-gray-400" onClick={handleCancel}>Cancelar</button>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSave}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default TriajeProfile
