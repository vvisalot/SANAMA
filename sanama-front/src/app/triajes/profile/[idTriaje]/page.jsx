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
                pv_condicionesPrexistentes: dataTriaje.condicionesPreexistentes || "Ninguna"
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
        <article className="flex flex-row justify-between items-start p-10 rounded-lg shadow-md">
            <section className="rounded-lg p-8 w-2/3 -m-2.5">
                
                



            <div>
                <h2 className="text-2xl font-bold mb-6">Información del Triaje</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="text-black block mb-2">Nombres</label>
                        <input type="text" value={dataTriaje?.paciente?.nombres} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Primer Apellido</label>
                        <input type="text" value={dataTriaje?.paciente?.apellidoPaterno} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Segundo Apellido</label>
                        <input type="text" value={dataTriaje?.paciente?.apellidoMaterno} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Edad</label>
                        <input type="number" value={dataTriaje?.edad} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Sexo</label>
                        <select value={dataTriaje?.sexo} onChange={handleChange}>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-black block mb-2">Documento de identidad</label>
                        <input type="text" value={dataTriaje?.dni} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Talla (m)</label>
                        <input type="number" step="0.01" value={dataTriaje?.talla} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Peso (kg)</label>
                        <input type="number" step="0.01" value={dataTriaje?.peso} onChange={handleChange} />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="text-black block mb-2">Motivo de consulta</label>
                    <textarea value={dataTriaje?.motivo} onChange={handleChange} rows="4"></textarea>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="text-black block mb-2">Temperatura (°C)</label>
                        <input type="number" value={dataTriaje?.temperatura} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Frecuencia Cardíaca (lpm)</label>
                        <input type="number" value={dataTriaje?.frecuenciaCardiaca} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Saturación de Oxígeno (%)</label>
                        <input type="number" value={dataTriaje?.saturacionOxigeno} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Presión arterial (mm Hg)</label>
                        <input type="text" value={dataTriaje?.presionArterial} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-black block mb-2">Frecuencia Respiratoria (rpm)</label>
                        <input type="number" value={dataTriaje?.frecuenciaRespiratoria} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div>
                    <label className="text-black block mb-2">Nivel de conciencia</label>
                    <select value={dataTriaje?.nivelConciencia} onChange={handleChange} name="nivelConciencia" className="border rounded w-full py-2 px-3">
                        <option value="Alerta">Alerta</option>
                        <option value="Responde a la voz">Responde a la voz</option>
                        <option value="Responde al dolor">Responde al dolor</option>
                        <option value="Inconsciente">Inconsciente</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="text-black block mb-2">Evaluación del dolor</label>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <button key={num} className="mx-1">{num}</button> // Este es un botón básico, puedes estilizarlo o añadirle funcionalidad
                    ))}
                </div>

                <div className="col-span-3">
                    <label className="text-black block mb-2">Condiciones preexistentes</label>
                    <textarea value={dataTriaje?.condicionesPrexistentes} onChange={handleChange} name="condicionesPrexistentes" className="border rounded w-full py-2 px-3"></textarea>
                </div>

                <div>
                    <label className="text-black block mb-2">Prioridad</label>
                    <select value={dataTriaje?.prioridad} onChange={handleChange} name="prioridad" className="border rounded w-full py-2 px-3">
                        <option value="">Nivel</option>
                        <option value="RESUCITACION">RESUCITACION</option>
                        <option value="EMERGENCIA">EMERGENCIA</option>
                        <option value="URGENCIA">URGENCIA</option>
                        <option value="URGENCIA MENOR">URGENCIA MENOR</option>
                        <option value="SIN URGENCIA">SIN URGENCIA</option>
                    </select>
                </div>




                <div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {/* Botones de Guardar y Cancelar */}
                        <div className="col-span-3 mt-6 flex justify-end">
                            <button className="px-4 py-2 bg-gray-300 mr-4 rounded hover:bg-gray-400" onClick={handleCancel}>Cancelar</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSave}>Guardar</button>
                        </div>
                    </div>
                </div>




            </section>
        </article>
    )
}

export default TriajeProfile
