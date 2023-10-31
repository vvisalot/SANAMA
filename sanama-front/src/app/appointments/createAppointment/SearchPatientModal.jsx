import React, { useState } from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import SearchBar from '@/components/bars/SearchBar'

const SearchPatientModal = ({ show, onClose }) => {
    const [email, setEmail] = useState("")


    return (

        <Modal show={show} size="3xl" popup onClose={onClose}>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6 pl-4">
                    <h3 className="text-xl font-bold text-gray-900">Buscar un paciente</h3>
                    <SearchBar width={'w-full'} />


                    <div className="space-y-6 pl-4">
                        <div className="w-full">
                            <Button>Confirmar paciente</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            ¿No se encuentra registrado?&nbsp;
                            <a href="/appointments/createAppointment" className="text-cyan-700 hover:underline dark:text-cyan-500">
                                Registrar paciente
                            </a>
                        </div>
                    </div>

                </div>
            </Modal.Body>
        </Modal>

    )
}

export default SearchPatientModal
