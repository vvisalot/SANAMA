"use client"
import ProfileCard from "@/components/cards/ProfileCard";
import { doctorService } from "@/services/doctorService";
import { useState, useEffect } from "react";
import SeleccionarHorarioMedico from "./SeleccionarHorarioDoctor";

const DoctorProfile = ({ params }) => {
  const [dataDoctor, setDataDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await doctorService.buscarPorNombre(params.idDoctor);
        if (data && data.length > 0) {
          setDataDoctor(data[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Marca la carga como completa
      }
    };
    fetchData();
  }, [params.idDoctor]); // Asegúrate de depender de 'params.idDoctor'

  if (loading) {
    return ""; // Muestra un mensaje de carga mientras los datos se obtienen
  }

  return (
    <article className="flex-column box-content p-10">
      <div className="flex">

        <div className="w-1/2 flex-row p-10">
          <ProfileCard
            name={`${dataDoctor?.apellidoPaterno ?? ''} ${dataDoctor?.apellidoMaterno ?? ''}, ${dataDoctor?.nombres ?? ''}`}
            email={dataDoctor?.correoElectronico ?? ''}
            phone={dataDoctor?.telefono ?? ''}
            address={dataDoctor?.direccion ?? 'No especifica'}
          />
        </div>

        <div className="w-1/2 flex-row p-10">
          <section className="block p-6 h-[300px] bg-white border border-gray-200 rounded-2xl shadow">
            <header className="p-5 text-2xl font-bold tracking-wider text-gray-900">
              Informacion personal:
            </header>

            <section className="flex text-large pt-4 text-gray-700">
              <dl className="basis-1/3">
                <dt className="text-sm px-5">Especialidad</dt>
                <dd className="font-bold px-5">{dataDoctor?.especialidad?.nombre ?? 'No especifica'}</dd>

                <dt className="text-sm px-5">CMP</dt>
                <dd className="font-bold px-5 pb-10">{dataDoctor?.cmp ?? 'No especifica'}</dd>
              </dl>
              <dl className="basis-1/3">
                <dt className="text-sm px-5">DNI</dt>
                <dd className="text-l font-bold px-5">{dataDoctor?.dni ?? 'No especifica'}</dd>
                <dt className="text-sm px-5">Género</dt>
                <dd className="text-l font-bold px-5 pb-10">
                  {dataDoctor?.sexo === "F"
                    ? "Femenino"
                    : dataDoctor?.sexo === "M"
                      ? "Masculino"
                      : 'No especifica'}
                </dd>
              </dl>
            </section>
          </section>
        </div>
      </div>
      {/* <div className="bg-white w-1/3 flex-row p-10 text-black">
        <SeleccionarHorarioMedico doctor={dataDoctor} />
      </div> */}
      <div className="p-10 ">
        <div className="bg-white flex-row p-10 text-black border border-gray-200 rounded-xl shadow">
          <SeleccionarHorarioMedico doctor={dataDoctor} />
        </div>
      </div>
    </article>
  );

};

export default DoctorProfile;
