import React from "react";
import InputField from "../common/InputField";

const LaboratoryExamInfoSection = ({
  medicos,
  dataLaboratory,
  setDataLaboratory,
  handleMedicoChange,
  isEditable,
}) => {
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
  const handleCancel = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
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

    setTimeout(() => {
      const newExamenIndex = dataLaboratory.examenMedico.length;
      const newFileInput = document.querySelector(
        `input[name="examenMedico.${newExamenIndex}.archivo"]`
      );
      if (newFileInput) {
        newFileInput.click();
      }
    }, 0);
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          const base64 = reader.result.split(",")[1];
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
        }
      };
    } else {
      console.error("Archivo no permitido o no es un PDF.");
    }
  };

  const handleRemoveExamen = (indexToRemove) => {
    setDataLaboratory((prevState) => ({
      ...prevState,
      examenMedico: prevState.examenMedico.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleAddExamen = (event) => {
    const files = event.target.files;

    if (!files.length) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setDataLaboratory((prevState) => {
        const lastId =
          prevState.examenMedico.length > 0
            ? Math.max(...prevState.examenMedico.map((e) => e.idExamen || 0))
            : 0;
        return {
          ...prevState,
          examenMedico: [
            ...prevState.examenMedico,
            {
              idExamen: lastId + 1,
              nombreArchivo: file.name,
              archivo: reader.result,
            },
          ],
        };
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleOnBlurChange = (e) => {
    const { name, value } = e.target;
    setDataLaboratory((prevData) => {
      const sections = name.split(".");
      if (sections.length === 2) {
        const section = sections[1];
        return {
          ...prevData,
          evaluacionMedica: {
            ...prevData.evaluacionMedica,
            [section]: value,
          },
        };
      }
      return prevData;
    });
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold mt-5">Información de los exámenes</h2>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="flex justify-start">
          <div style={{ flex: "0 0 350px", marginRight: "14rem" }}>
            <InputField
              label="Médico de Laboratorio"
              name="medicoLaboratorio"
              value={
                medicos.find(
                  (medico) =>
                    medico.descripcion === dataLaboratory.doctorFirmante
                )?.idValue || ""
              }
              type="select"
              onChange={handleMedicoChange}
              options={medicos.map((medico) => ({
                value: medico.idValue,
                label: medico.descripcion,
              }))}
              isEditable={isEditable}
              labelWidth="w-full"
              width="w-full"
            />
          </div>
        </div>

        <div className="col-span-3">
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
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        downloadFile(examen.archivo, examen.nombreArchivo)
                      }
                      className="text-lg text-indigo-600 hover:text-indigo-900"
                    >
                      Descargar
                    </button>
                    <button
                      onClick={() => handleRemoveExamen(index)}
                      className="text-lg text-red-600 hover:text-red-900 ml-4"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleAddExamen}
            />
            <button
              onClick={handleAddExamenClick}
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 mt-4 rounded"
            >
              <i className="fas fa-plus mr-2"></i> Añadir
            </button>
          </div>
        </div>

        <div className="col-span-3">
          <h2 className="text-3xl font-bold mb-4">Observaciones</h2>
          <textarea
            label="Observaciones"
            name="dataLaboratory.observaciones"
            className="resize-none mt-1 p-2 w-full border-gray-300 rounded-md"
            placeholder="Ingresa observación.."
            rows={4}
            onBlur={handleOnBlurChange}
          />
          <span className="text-right block">
            {(dataLaboratory?.observaciones || "").length}/1000
          </span>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryExamInfoSection;
