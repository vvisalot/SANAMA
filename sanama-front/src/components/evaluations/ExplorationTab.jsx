import React, { useState } from "react";

const ExplorationTab = ({ clinicalData, handleInputChange }) => {
  const [visibleSections, setVisibleSections] = useState({
    exGeneral: false,
    pielYFaneras: false,
    cabezaYCuello: false,
    toraxYPulmones: false, // Changed to camelCase
    cardiovascular: false,
    abdomen: false,
    urogenital: false,
    extremidades: false,
    snc: false, // Changed to camelCase
  });

  const sectionNames = [
    "examen general",
    "pielYFaneras",
    "cabezaYCuello",
    "toraxYPulmones",
    "cardiovascular",
    "abdomen",
    "urogenital",
    "extremidades",
    "sistemaNerviosoCentral",
  ];

  const toggleSectionVisibility = (section) => {
    setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderCheckbox = (label, section) => (
    <label className="block text-sm font-medium text-gray-700">
      <input
        type="checkbox"
        checked={visibleSections[section]}
        onChange={() => toggleSectionVisibility(section)}
        className="mr-2 leading-tight"
      />
      {label}
    </label>
  );

  const renderTextArea = (label, name, section) => {
    if (!visibleSections[section]) return null;
    const value = clinicalData?.exploracionFisica?.[section] || "";
    return (
      <div className="col-span-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <textarea
          id={name}
          name={`ClinicalTab.exploracionFisica.${section}`}
          value={value}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          rows={3}
        />
      </div>
    );
  };

  return (
    <>
      <div className="col-span-2">
        <h5 className="text-base font-medium text-gray-700 mb-2">
          Añadir Exploración
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {sectionNames.map((section) =>
            renderCheckbox(
              section
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase()),
              section
            )
          )}
        </div>
        <h5 className="text-base font-medium text-gray-700 mb-2">
          Exploraciones
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionNames.map((section) =>
            renderTextArea(
              section
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase()),
              `ClinicalTab.exploracionFisica.${section}`,
              section
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ExplorationTab;
