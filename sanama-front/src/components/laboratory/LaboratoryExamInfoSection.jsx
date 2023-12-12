import React from "react";
import Dropdown from "@/components/Dropdowns/Dropdown";

const LaboratoryExamInfoSection = ({
  medicos,
  dataLaboratory,
  setDataLaboratory,
  handleMedicoChange,
  isEditable,
}) => {
  const nombreDoctor = `${dataLaboratory?.citaMedica?.medico?.nombres} ${dataLaboratory?.citaMedica?.medico?.apellidoPaterno} ${dataLaboratory?.citaMedica?.medico?.apellidoMaterno}`;
  const downloadFile = (base64, fileName) => {
    const blob = base64ToBlob(base64, "application/pdf");

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const handleAddExamenClick = () => {
    setTimeout(() => {
      const newExamenIndex = dataLaboratory.examenMedico.length;
      const newFileInput = document.querySelector(
        `input[name="examenMedico.${newExamenIndex}.archivo"]`
      );
      if (newFileInput) {
        newFileInput.click();
      } else return;
    }, 0);

    setDataLaboratory((prevState) => {
      const lastId =
        prevState.examenMedico.length > 0
          ? Math.max(...prevState.examenMedico.map((e) => e.idExamen || 0))
          : 0;

      return {
        ...prevState,
        examenMedico: [
          ...prevState.examenMedico,
          { idExamen: lastId + 1, nombreArchivo: "", archivo: null },
        ],
      };
    });
  };

  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      try {
        const base64 = await convertFileToBase64(file);
        setDataLaboratory((prevState) => {
          const updatedExamenMedico = [...prevState.examenMedico];
          updatedExamenMedico[index] = {
            ...updatedExamenMedico[index],
            nombreArchivo: file.name,
            archivo: base64,
          };
          return {
            ...prevState,
            examenMedico: updatedExamenMedico,
          };
        });
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    } else {
      console.error("Archivo no permitido o no es un PDF.");
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleRemoveExamen = (indexToRemove) => {
    setDataLaboratory((prevState) => ({
      ...prevState,
      examenMedico: prevState.examenMedico.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleOnBlurChange = (e) => {
    const { name, value } = e.target;
    setDataLaboratory((prevData) => {
      const sections = name.split(".");
      if (sections.length === 2) {
        const section = sections[1];
        return {
          ...prevData,
          [section]: value,
        };
      }
      return prevData;
    });
  };

  return (
    <div>
      <h4 className="text-lg  font-bold rtl:text-right text-gray-500  mb-2">
        Detalles de los Exámenes
      </h4>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Dropdown
          data={medicos}
          name={"dropdown-doctor-lab"}
          defaultText={nombreDoctor || ""}
          text={"descripcion"}
          defaultValue={""}
          value={"idValue"}
          width={"w-[500px]"}
          handleChange={handleMedicoChange}
          disabled={!isEditable}
        />

        <div className="col-span-3 mb-4">
          <h4 className="text-lg  font-bold rtl:text-right text-gray-500  mb-2">
            Observaciones
          </h4>
          <textarea
            label="Observaciones"
            name="dataLaboratory.observaciones"
            defaultValue={dataLaboratory?.observaciones}
            className="resize-none mt-1 p-2 w-full border-gray-300 rounded-md"
            placeholder="Ingresa observación.."
            rows={4}
            onBlur={handleOnBlurChange}
            disabled={!isEditable}
          />
        </div>

        <div className="col-span-3">
          <div className="flex mb-4">
            <button
              onClick={handleAddExamenClick}
              className={`${
                isEditable
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-600 opacity-50 cursor-not-allowed"
              }  text-white px-4 py-2 rounded  focus:outline-none`}
              disabled={!isEditable}
            >
              <i className="fas fa-plus mr-2"></i> Añadir
            </button>
          </div>

          <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 tracking-wider">
                  Nombre del archivo
                </th>
                <th className="px-6 py-3 text-right text-lg font-medium text-gray-700 tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {dataLaboratory.examenMedico.map((examen, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {examen.nombreArchivo ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            downloadFile(examen.archivo, examen.nombreArchivo);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          {examen.nombreArchivo}
                        </a>
                      ) : (
                        <input
                          name={`examenMedico.${index}.archivo`}
                          className="border rounded p-2 text-md"
                          type="file"
                          onChange={(e) => handleFileChange(e, index)}
                          disabled={!isEditable}
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        downloadFile(examen.archivo, examen.nombreArchivo)
                      }
                      className="text-lg text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Descargar
                    </button>
                    {isEditable && (
                      <button
                        onClick={() => handleRemoveExamen(index)}
                        className="text-lg text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryExamInfoSection;
