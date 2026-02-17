import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { RepairEndpoint } from 'Frontend/generated/endpoints';
import { Button } from '@vaadin/react-components/Button';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Repair from 'Frontend/generated/dev/renting/repairs/Repair';

export const config: ViewConfig = {
  menu: {
    title: 'Crear Reparación',
    order: 1,
    icon: 'line-awesome/svg/simplybuilt.svg',
  },
};

export default function RepairView() {
  const navigate = useNavigate();
  const location = useLocation();

  const [repairData, setRepairData] = useState({
    repairId: '',
    operation: "info",
    failCode: '',
    cost: '',
    location: '',
    observations: '',
  });

  const handleSaveRepair = async () => {
    try {
      await RepairEndpoint.saveRepair(repairData);
      navigate('/create/cars', { state: { repairData } });
    } catch (error) {
      console.error('Error saving repair:', error);
      alert('Error guardando la reparación');
    }
  };

  return (
    <div className="p-m max-w-4xl mx-auto">
      {/* Header with status badges */}
      <div className="mb-xl flex flex-col md:flex-row md:items-center md:justify-between gap-m">
        <div>
          <h1 className="text-3xl font-bold text-header mb-xs">
            Registrar Reparación
          </h1>

        </div>

      </div>

      <div className="mt-xl"></div>

      {/* Main card with two-column layout */}
      <div className="mt-xl bg-base border border-contrast-10 rounded-l p-xl shadow-lg">

        {/* Step indicator */}
        <div className="flex items-center gap-s mb-l pb-m border-b border-contrast-10">

          <div>
            <h3 className="text-lg font-semibold text-header">
              Información de la reparación
            </h3>
            <p className="text-xs text-tertiary">Detalles básicos de la reparación</p>
          </div>
          <div className="ml-auto flex items-center gap-s">
            <div className="w-16 h-1 bg-contrast-10 rounded-full">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Two-column grid for fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-m">
          {/* Repair ID Field */}
          <div className="mb-m">
            <label
              htmlFor="repairId"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              Repair ID
              <span className="text-error">*</span>
            </label>
            <input
              id="repairId"
              type="text"
              value={repairData.repairId}
              onChange={(e) => setRepairData({ ...repairData, repairId: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="REP#XXX"
            />
          </div>

          {/* Fail Code Field */}
          <div className="mb-m">
            <label
              htmlFor="failCode"
              className="block text-sm text-body font-medium mb-xs"
            >
              Código de Falla
            </label>
            <input
              id="failCode"
              type="text"
              value={repairData.failCode}
              onChange={(e) => setRepairData({ ...repairData, failCode: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="Código de falla"
            />
          </div>

          {/* Cost Field */}
          <div className="mb-m">
            <label
              htmlFor="cost"
              className="block text-sm text-body font-medium mb-xs"
            >
              Costo
            </label>
            <div className="relative">

              <input
                id="cost"
                type="text"
                value={repairData.cost}
                onChange={(e) => setRepairData({ ...repairData, cost: e.target.value })}
                className="w-full p-s pl-7 border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Location Field */}
          <div className="mb-m">
            <label
              htmlFor="location"
              className="block text-sm text-body font-medium mb-xs"
            >
              Ubicación
            </label>
            <input
              id="location"
              type="text"
              value={repairData.location}
              onChange={(e) => setRepairData({ ...repairData, location: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="Ubicación"
            />
          </div>
        </div>

        {/* Observations Field - full width */}
        <div className="mb-m mt-m">
          <label
            htmlFor="observations"
            className="block text-sm text-body font-medium mb-xs"
          >
            Observaciones
          </label>
          <textarea
            id="observations"
            value={repairData.observations}
            onChange={(e) => setRepairData({ ...repairData, observations: e.target.value })}
            className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors resize-y"
            placeholder="Observaciones adicionales..."
            rows={3}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-xl flex flex-col md:flex-row gap-m justify-end">
        <Button
          theme="secondary"
          onClick={() => navigate(-1)}
          className="px-xl py-m"
        >
          Cancelar
        </Button>
        <Button
          theme="primary"
          onClick={handleSaveRepair}
          className="px-xl py-m shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <span className="flex items-center gap-s">
            CONTINUAR
            <span>→</span>
          </span>
        </Button>
      </div>

      {/* Helper message */}
      <p className="text-xs text-tertiary text-center mt-m">
        Los datos se guardarán y continuarás con la información del vehículo
      </p>
    </div>
  );
}