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
    <div class="flex items-center ml-12">
      <input
        type="checkbox"
        checked={visibleSections[section]}
        onChange={() => toggleSectionVisibility(section)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        key={key}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );

  const renderTextArea = (label, name, section, key) => {
    if (!visibleSections[section]) return null;
    const value = formData?.exploracionFisica?.[section] || "";
    return (
      <div key={key} className="col-span-2 ml-12">
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
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          rows={3}
        />
      </div>
    );
  };

  return (
    <div className="ml-2 mr-4 col-span-2">
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
