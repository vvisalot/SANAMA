"use client"
import { useEffect, useState } from 'react';
import CitasMedico from '../CitasMedico';
import { useRouter, useParams } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';
export default function MisCitasDoctor() {
  const router = useRouter();
  const params = useParams();
  const idDoctor = params.idDoctor;
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/rrhh/post/buscarMedico', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pv_filtro: idDoctor,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener datos del médico');
        }

        const data = await response.json();
        setDoctor(data); // asume que la respuesta de la API es el objeto del médico
      } catch (error) {
        console.error('Error al obtener datos del médico:', error);
      }
    };

    fetchData();
  }, [idDoctor]); // se ejecutará cuando idDoctor cambie

  return (
    <>
      <h1 className="font-bold text-blue-500 text-6xl p-12">Mis citas</h1>

      <section className="pl-12 pr-14">
        {/* <div className="flex justify-start pl-10">
          <div className="flex-start justify-start">
            <button
              type="button"
              className="text-black hover:bg-gray-300 hover:underline font-medium rounded-lg text-sm px-2 py-2 flex items-center"
              onClick={() => router.back()}>
              <MdArrowBack className="mr-2 h-5 w-5" />
              Volver
            </button>
          </div>
        </div> */}
        <div className="p-10 ">
          <div className="bg-white flex-row p-10 text-black border border-gray-200 rounded-xl shadow">
            {doctor ? (
              <CitasMedico dataDoctor={doctor} />
            ) : (
              <p>Cargando datos del médico...</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
