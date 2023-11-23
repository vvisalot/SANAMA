"use client"

import LatestAppointments from "@/components/_patients/LatestAppointments"
import PatientActions from "@/components/_patients/PatientActions"
import PatientInfo from "@/components/_patients/PatientInfo"
import ProfileCard from "@/components/cards/ProfileCard"
import { useRouter, usePathname } from "next/navigation";
import { patientService } from "@/services/patientService"
import { useEffect, useState } from "react"
import { MdArrowBack } from 'react-icons/md';

const PatientProfile = ({ params }) => {
  const router = useRouter();
  const [dataPatient, setDataPatient] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    telefono: "",
    direccion: "",
    sexo: "",
    dni: "",
    fechaNacimiento: "",
    estado: "",
    codigoSeguro: "",
    tipoSeguro: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await patientService.buscarPorFiltro(params.idPatient)
        setDataPatient(data[0])
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [params.idPatient])

  return (
    <>
      <div className="flex justify-end ">
        <div className="flex-end pr-10 pf-10">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center"
            onClick={() => router.back()}
          >
            <MdArrowBack className="mr-1" style={{ fontSize: '24px' }} />
            Volver
          </button>
        </div>
      </div>

      <article className="flex flex-row justify-between items-start p-10 box-border">

        <section className="box-border overflow-hidden p-4 w-1/3 -m-2.5">
          <ProfileCard
            name={`${dataPatient.nombres} ${dataPatient.apellidoPaterno} ${dataPatient.apellidoMaterno}`}
            email={dataPatient.correo}
            phone={dataPatient.telefono}
            address={dataPatient.direccion}
            id={params.idPatient}
            module={"patients"}
            urlEdit={"editPatientData"}
          />
          <PatientActions id={params.idPatient} />
        </section>

        <section className="box-border overflow-hidden p-4 w-2/3 -m-2.5">
          <PatientInfo
            gender={dataPatient.sexo}
            dni={dataPatient.dni}
            dateofbirth={dataPatient.fechaNacimiento}
            patientState={dataPatient.estado}
            insuranceCode={dataPatient.codigoSeguro}
            insuranceType={dataPatient.tipoSeguro}
          />
          <div className="flex">
            <LatestAppointments id={params.idPatient} />
          </div>
        </section>
      </article>
    </>
  )
}

export default PatientProfile
