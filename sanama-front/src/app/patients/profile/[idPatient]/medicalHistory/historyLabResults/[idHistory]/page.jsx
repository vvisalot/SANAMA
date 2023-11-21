"use client";

import { useEffect } from "react";
import { patientService } from "@/services/patientService";

const HistoryLabResults = ({ params }) => {
  console.log(params.idHistory);
  const fetchData = async () => {
    try {
      const data = await patientService.buscarHojaMedica(params.idHistory);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const options = {
    text: "Ver archivo",
    link: "",
    icons: "/icons/eye.svg",
  };

  return (
    <div className="px-80">
      <h1 className="text-4xl font-bold mt-5 mb-10 text-primary-dusk-blue">
        Resultados de laboratorio
      </h1>
      <p>Medico consultor:</p>
      <p>Fecha de consulta:</p>

      <h2>Resultados</h2>
      {/* <section>
                <LabResultsTable
                    data={data}
                    options={options} />
            </section> */}
    </div>
  );
};

export default HistoryLabResults;
