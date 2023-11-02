"use client";

import { useEffect, useState } from "react";
import { laboratoryService } from "@/services/laboratoryService";
import { parseDoctorsDropdown } from "@/util/doctorParser";
import Dropdown from "@/components/bars/Dropdown";
import { doctorService } from "@/services/doctorService";

const LaboratoryProfile = ({ params }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorService.buscarPorMedicoEspecialidad("", "");

        const doctorData = parseDoctorsDropdown(data);
        setDoctors(doctorData);
        // console.log("LOS DOCTORES SON: ", doctors);
      } catch (error) {
        console.error("No se pudo obtener el listado de los doctores");
      }
    };
    fetchDoctors();
  }, []);

  const [dataLaboratory, setDataLaboratory] = useState({
    tipoOrden: "",
    instrucciones: "",
    citaMedica: {
      paciente: {
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        dni: "",
      },
      medico: {
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      },
      requiereTriaje: null,
      tieneAcompanhante: null,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await laboratoryService.buscarOrdenLaboratorioPorId(
          params.idLaboratory
        );
        console.log(data);
        setDataLaboratory(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    if (event.target.name === "observaciones") {
      const count = event.target.value.length;
      document.getElementById("charCount").textContent = `${count}/1000`;
    }
  };

  return (
    <div className="w-full p-10 rounded-lg shadow-md text-xl">
      <section className="rounded-lg p-8 w-full flex flex-col space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Información de Laboratorio
          </h2>
          <div className="grid grid-cols-3 gap-x-20 gap-y-8">
            <div>
              <label className="text-black block mb-2">Paciente</label>
              <input
                className="border rounded p-4 w-full bg-gray-200 cursor-not-allowed"
                type="text"
                value={`${
                  dataLaboratory?.citaMedica?.paciente?.nombres || ""
                } ${
                  dataLaboratory?.citaMedica?.paciente?.apellidoPaterno || ""
                } ${
                  dataLaboratory?.citaMedica?.paciente?.apellidoMaterno || ""
                }`}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="relative z-0 w-full mb-6 group">
              {/* <Dropdown
                data={doctors}
                name={"dropdown-doctor"}
                defaultText={"Selecciona un medico"}
                text={"nombreCompleto"}
                defaultValue={""}
                value={"idPersona"}
                width={"w-[500px]"}
                handleChange={(event) => {
                  setSelectedDoctor(event.target.value);
                }}
              /> */}

              <label
                htmlFor="dropdown-tipo-seguro"
                className="peer-focus:font-medium absolute text-sm  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Doctores
              </label>
            </div>

            <div>
              <label className="text-black block mb-2">Tipo de prueba</label>
              <input
                className="border rounded p-4 w-full"
                type="text"
                value={dataLaboratory?.tipoPrueba}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-3">
              <h2 className="text-2xl font-bold mb-2 mt-2">Observaciones</h2>
              <textarea
                value={dataLaboratory?.observaciones}
                onChange={handleChange}
                name="observaciones"
                className="textarea-custom w-full"
                maxLength={1000}
              ></textarea>
              <span className="text-right block mt-2" id="charCount">
                0/1000
              </span>
            </div>

            <div>
              <label className="text-black block mb-2">
                Subir archivo (PDF)
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaboratoryProfile;
