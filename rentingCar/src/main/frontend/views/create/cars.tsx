import { RepairEndpoint } from 'Frontend/generated/endpoints';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button } from '@vaadin/react-components/Button';
import Car from 'Frontend/generated/dev/renting/repairs/Car';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const config: ViewConfig = {
  menu: { exclude: true },
  title: 'Crear Reparación - Información del Vehículo',
};

export default function CarsView() {
  const navigate = useNavigate();
  const location = useLocation();

  const repairData = location.state?.repairData

  const [carData, setCarData] = useState({
    repairId: repairData.repairId,
    operation: '',
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    motorType: '',
    owner: '',
    phone: '',
  });

  const handleSaveCar = async () => {
    try {
      await RepairEndpoint.saveCar(carData);
      alert('Reparación creada exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error saving car:', error);
      alert('Failed to save car');
    }
  };

  return (
    <div className="p-m max-w-4xl mx-auto">
      {/* Header with repair ID reference */}
      <div className="mb-xl flex flex-col md:flex-row md:items-center md:justify-between gap-m">
        <div>
          <h1 className="text-3xl font-bold text-header mb-xs">
            Información del Vehículo
          </h1>
          <p className="text-body text-secondary flex items-center gap-xs">
            Reparación: {repairData.repairId}
          </p>
        </div>
      </div>

      <div className="mt-xl"></div>

      {/* Main card with two-column layout */}
      <div className="mt-xl bg-base border border-contrast-10 rounded-l p-xl shadow-lg">

        {/* Step indicator */}
        <div className="flex items-center gap-s mb-l pb-m border-b border-contrast-10">
          <div>
            <h3 className="text-lg font-semibold text-header">
              Detalles del vehículo
            </h3>
            <p className="text-xs text-tertiary">Información completa del automóvil</p>
          </div>
          <div className="ml-auto flex items-center gap-s">
            <div className="w-16 h-1 bg-contrast-10 rounded-full">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Two-column grid for fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-m gap-y-0">
          {/* Car ID Field */}
          <div className="mb-m">
            <label
              htmlFor="operation"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              Car ID
            </label>
            <input
              id="operation"
              type="text"
              value={carData.operation}
              onChange={(e) => setCarData({ ...carData, operation: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="CAR#XXX"
            />
          </div>

          {/* Make Field */}
          <div className="mb-m">
            <label
              htmlFor="make"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              Marca
            </label>
            <input
              id="make"
              type="text"
              value={carData.make}
              onChange={(e) => setCarData({ ...carData, make: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="Toyota"
            />
          </div>

          {/* Model Field */}
          <div className="mb-m">
            <label
              htmlFor="model"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              Modelo
            </label>
            <input
              id="model"
              type="text"
              value={carData.model}
              onChange={(e) => setCarData({ ...carData, model: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="Camry"
            />
          </div>

          {/* Year Field */}
          <div className="mb-m">
            <label
              htmlFor="year"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              Año de fabricación
            </label>
            <input
              id="year"
              type="number"
              value={carData.year}
              onChange={(e) => setCarData({ ...carData, year: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="2023"
              min="1900"
              max="2099"
            />
          </div>

          {/* VIN Field */}
          <div className="mb-m">
            <label
              htmlFor="vin"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              VIN
            </label>
            <input
              id="vin"
              type="text"
              value={carData.vin}
              onChange={(e) => setCarData({ ...carData, vin: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="1HGCM82633A123456"
              maxLength="17"
            />
          </div>

          {/* License Plate Field */}
          <div className="mb-m">
            <label
              htmlFor="licensePlate"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              Matrícula
            </label>
            <input
              id="licensePlate"
              type="text"
              value={carData.licensePlate}
              onChange={(e) => setCarData({ ...carData, licensePlate: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="ABC-123"
            />
          </div>

          {/* Motor Type Field - full width on mobile, half on desktop */}
          <div className="mb-m md:col-span-1">
            <label
              htmlFor="motorType"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              Tipo de motor
            </label>
            <select
              id="motorType"
              value={carData.motorType}
              onChange={(e) => setCarData({ ...carData, motorType: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors bg-white"
            >
              <option value="">Selecciona el tipo de motor</option>
              <option value="gasoline">Gasolina</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electrico</option>
              <option value="hybrid">Hybrido</option>
            </select>
          </div>

          {/* Owner Field */}
          <div className="mb-m">
            <label
              htmlFor="owner"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              Propietario
            </label>
            <input
              id="owner"
              type="text"
              value={carData.owner}
              onChange={(e) => setCarData({ ...carData, owner: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="Nombre del propietario"
            />
          </div>

          {/* Phone Field */}
          <div className="mb-m">
            <label
              htmlFor="phone"
              className="block text-sm text-body font-medium mb-xs flex items-center gap-xs"
            >
              Teléfono
            </label>
            <input
              id="phone"
              type="text"
              value={carData.phone}
              onChange={(e) => setCarData({ ...carData, phone: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="+34 123 456 789"
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-xl flex flex-col md:flex-row gap-m justify-end">
        <Button
          theme="secondary"
          onClick={() => navigate(-1)}
          className="px-xl py-m"
        >
          Atrás
        </Button>
        <Button
          theme="primary"
          onClick={handleSaveCar}
          className="px-xl py-m shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <span className="flex items-center gap-s">
            GUARDAR REPARACIÓN
            <span>✓</span>
          </span>
        </Button>
      </div>

      {/* Helper message */}
      <p className="text-xs text-tertiary text-center mt-m">
        Todos los campos son opcionales excepto los que necesites para la reparación
      </p>
    </div>
  );
}