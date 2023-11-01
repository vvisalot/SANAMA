import { useState, useEffect } from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import SearchBar from '@/components/bars/SearchBar'
import { patientService } from '@/services/patientService'
import { parsePatientModal } from '@/util/patientParser'

const SearchPatientModal = ({ show, onClose }) => {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async (filtro) => {
        try {
            const data = await patientService.buscarPorFiltro(filtro)
            setSearchResults(data)
            console.log(data)
        } catch (error) {
            console.log("No se pudo obtener los datos de los pacientes para el modal")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (searchText) {
            fetchData(searchText)
        } else {
            setSearchResults([])
        }
    }, [searchText])


    return (
        <>
            <Modal show={show} size="6xl" popup onClose={onClose} >
                <Modal.Header>
                </Modal.Header>
                <Modal.Body>
                    <h3 className="p-4 mb-6 text-2xl font-bold text-gray-900">Buscar paciente existente</h3>
                    <div className="space-y-2 ">
                        <div className="relative">
                            <div className="flex rounded-md m-2 bg-white shadow shadow-black/20">
                                <button
                                    type="submit"
                                    className="m-1 inline-flex cursor-pointer items-center rounded-md bg-green-300 px-2 py-2 hover:bg-green-400">
                                    <svg className="text-white" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z" /></svg>
                                </button>
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="rounded block w-full flex-1  px-4 "
                                    placeholder="Ingresar el nombre o dni del paciente" />
                            </div>
                        </div>

                        <div className="w-full max-h-screen overflow-y-auto rounded-md bg-white px-4 pt-3">
                            {searchResults.slice(0, 8).map((result, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer py-2 px-3 hover:bg-slate-100 rounded">
                                    <p className="text-sm font-medium text-black">
                                        {result.nombres} {result.apellidoPaterno} {result.apellidoMaterno}
                                    </p>
                                    <p className="text-sm text-black">
                                        {result.dni}
                                    </p>
                                </div>
                            ))}
                            {loading && (
                                <div className="py-2 px-3">
                                    <p className="text-sm text-gray-500">Cargando resultados...</p>
                                </div>
                            )}
                        </div>
                    </div>


                </Modal.Body>

            </Modal>


        </>


    )
}

export default SearchPatientModal
