"use client";
import SeleccionarHorarioMedico from "../SeleccionarHorarioDoctor";
import { useRouter, useParams } from "next/navigation";

export default function RegistrarDisponibilidad() {
  const params = useParams();
  const idDoctor = params.idDoctor;
  const router = useRouter();
  return (
    <>
      <h1 className="font-bold text-blue-500 text-6xl p-12">Disponibilidad</h1>
      <section className="pl-12 pr-14">
        <div className="">
          {/* <div className="flex justify-start pb-5">
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
          <div className="bg-white flex-row p-10 text-black border border-gray-200 rounded-xl shadow">
            <SeleccionarHorarioMedico doctor={idDoctor} />
          </div>
        </div>
      </section>
    </>
  );
}
