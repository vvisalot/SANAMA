import React, { useState } from "react";

const ExplorationTab = ({ formData, handleInputChange }) => {
  const [visibleSections, setVisibleSections] = useState({
    exGeneral: false,
    pielYFaneras: false,
    cabezaYCuello: false,
    toraxYPulmones: false,
    cardiovascular: false,
    abdomen: false,
    urogenital: false,
    extremidades: false,
    snc: false,
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

  const renderCheckbox = (label, section, key) => (
    <label key={key} className="block text-sm font-medium text-gray-700">
      <input
        type="checkbox"
        checked={visibleSections[section]}
        onChange={() => toggleSectionVisibility(section)}
        className="mr-2 leading-tight"
      />
      {label}
    </label>
  );

  const renderTextArea = (label, name, section, key) => {
    if (!visibleSections[section]) return null;
    const value = formData?.exploracionFisica?.[section] || "";
    return (
      <div key={key} className="col-span-2">
        <label
          htmlFor={name}
          className="block resize-none text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          id={name}
          name={`ClinicalTab.exploracionFisica.${section}`}
          onChange={handleInputChange}
          defaultValue={value}
          className="ml-2 mt-1 p-2 mr-4 w-full border-gray-300 rounded-md"
          rows={3}
        />
      </div>
    );
  };

  return (
    <div className="col-span-2">
      <h5 className="text-base font-medium text-gray-700 mb-2">
        Añadir Exploración
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {sectionNames.map((section) =>
          renderCheckbox(
            section
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),
            section,
            `checkbox-${section}` // Agregar una clave única aquí
          )
        )}
      </div>
      <h5 className="text-base font-medium text-gray-700 mb-2">
        Exploraciones
      </h5>
      <div className="resize-none grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionNames.map((section) =>
          renderTextArea(
            section
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),
            `ClinicalTab.exploracionFisica.${section}`,
            section,
            `textarea-${section}` // Agregar una clave única aquí
          )
        )}
      </div>
    </div>
  );
};

export default ExplorationTab;
