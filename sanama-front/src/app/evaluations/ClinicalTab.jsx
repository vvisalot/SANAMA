import React from "react";

const ClinicalTab = ({ clinicalData, handleInputChange }) => {
  return (
    <>
      {/* Fecha de Atención */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de Atención
        </label>
        <input
          type="date"
          name="fechaAtencion"
          value={clinicalData.fechaAtencion}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        />
      </div>

      {/* Hora */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Hora</label>
        <input
          type="time"
          name="hora"
          value={clinicalData.hora}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
        />
      </div>

      {/* Signos Vitales */}
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">Signos Vitales</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Temperatura */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Temperatura (°C)
            </label>
            <input
              type="number"
              name="signosVitales.temperatura"
              value={clinicalData.signosVitales.temperatura}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Frecuencia Cardiaca */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Frecuencia Cardiaca
            </label>
            <input
              type="number"
              name="signosVitales.fc"
              value={clinicalData.signosVitales.fc}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Frecuencia Respiratoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Frecuencia Respiratoria
            </label>
            <input
              type="number"
              name="signosVitales.fr"
              value={clinicalData.signosVitales.fr}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Presión Arterial */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Presión Arterial
            </label>
            <input
              type="text"
              name="signosVitales.pa"
              value={clinicalData.signosVitales.pa}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              placeholder="Ej. 120/80"
            />
          </div>

          {/* Saturación de Oxígeno */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Saturación de Oxígeno (%)
            </label>
            <input
              type="number"
              name="signosVitales.sat"
              value={clinicalData.signosVitales.sat}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Peso */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Peso (kg)
            </label>
            <input
              type="number"
              name="signosVitales.peso"
              value={clinicalData.signosVitales.peso}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Talla */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Talla (cm)
            </label>
            <input
              type="number"
              name="signosVitales.talla"
              value={clinicalData.signosVitales.talla}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Antecedentes */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Antecedentes
        </label>
        <textarea
          name="antecedentes"
          value={clinicalData.antecedentes}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          rows="3"
        ></textarea>
      </div>

      {/* Motivo de Consulta */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Motivo de Consulta
        </label>
        <textarea
          name="motivoConsulta"
          value={clinicalData.motivoConsulta}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          rows="3"
        ></textarea>
      </div>

      {/* Exploración Física */}
      <div className="col-span-2">
        <h4 className="text-lg font-bold text-gray-700 mb-2">
          Exploración Física
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Examen General */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Examen General
            </label>
            <textarea
              name="exploracionFisica.exGeneral"
              value={clinicalData.exploracionFisica.exGeneral}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Piel y Faneras */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Piel y Faneras
            </label>
            <textarea
              name="exploracionFisica.pielYFaneras"
              value={clinicalData.exploracionFisica.pielYFaneras}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Cabeza y Cuello */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cabeza y Cuello
            </label>
            <textarea
              name="exploracionFisica.cabezaYCuello"
              value={clinicalData.exploracionFisica.cabezaYCuello}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Torax y Pulmones */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Torax y Pulmones
            </label>
            <textarea
              name="exploracionFisica.toraxYPulmones"
              value={clinicalData.exploracionFisica.toraxYPulmones}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Cardiovascular */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cardiovascular
            </label>
            <textarea
              name="exploracionFisica.cardiovascular"
              value={clinicalData.exploracionFisica.cardiovascular}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Abdomen */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Abdomen
            </label>
            <textarea
              name="exploracionFisica.abdomen"
              value={clinicalData.exploracionFisica.abdomen}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Urogenital */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Urogenital
            </label>
            <textarea
              name="exploracionFisica.urogenital"
              value={clinicalData.exploracionFisica.urogenital}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Extremidades */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Extremidades
            </label>
            <textarea
              name="exploracionFisica.extremidades"
              value={clinicalData.exploracionFisica.extremidades}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* SNC */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              SNC (Sistema Nervioso Central)
            </label>
            <textarea
              name="exploracionFisica.snc"
              value={clinicalData.exploracionFisica.snc}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Observaciones */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Observaciones
        </label>
        <textarea
          name="observaciones"
          value={clinicalData.observaciones}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          rows="3"
        ></textarea>
      </div>

      {/* Examenes Complementarios */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Examenes Complementarios
        </label>
        <textarea
          name="examenesComplementarios"
          value={clinicalData.examenesComplementarios}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md"
          rows="3"
        ></textarea>
      </div>
    </>
  );
};

export default ClinicalTab;
