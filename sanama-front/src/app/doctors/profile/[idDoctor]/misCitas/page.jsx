"use client";
import { useEffect, useState } from "react";
import CitasMedico from "@/components/doctors/CitasMedico";
import { useParams } from "next/navigation";

export default function MisCitasDoctor() {
  const params = useParams();
  const idDoctor = params.idDoctor;
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/rrhh/post/buscarMedico",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pv_filtro: idDoctor,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener datos del médico");
        }

        const data = await response.json();
        setDoctor(data); // asume que la respuesta de la API es el objeto del médico
      } catch (error) {
        console.error("Error al obtener datos del médico:", error);
      }
    };
    fetchData();
  }, [idDoctor]);

  return (
    <>
      <h1 className="font-bold text-blue-500 text-6xl p-12">Mis citas</h1>
      <section className="pl-12 pr-14">
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
