import { RepairEndpoint } from 'Frontend/generated/endpoints';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button } from '@vaadin/react-components/Button';
import Car from 'Frontend/generated/dev/renting/repairs/Car';
import {useState} from 'react';


export const config: ViewConfig = {
  menu: {
    title: '\u2003Create Car', // two non-breaking spaces for indentation
    order: 2,
    //icon: 'line-awesome/svg/car-side-solid.svg',
  },

};


export default function CarsView() {

  const [carData, setCarData] = useState({
    repairId: "REP#001",
    operation: '',
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    motorType: '',
  });
  const handleSaveCar = async () => {
    try {
        await RepairEndpoint.saveCar(carData);
      alert('Car saved successfully!');
    } catch (error) {
      console.error('Error saving car:', error);
      alert('Failed to save car');
    }
  };

  return (
    <div className="p-m max-w-2xl mx-auto">
      <div className="mt-xl"></div>

      <div className="mt-xl bg-base border border-contrast-10 rounded-l p-l">
        <h3 className="text-lg mb-m font-semibold text-header">Car Information</h3>

        <div className="space-y-m">
          {/* Car ID Field */}
          <div className="mb-m">
            <label
              htmlFor="carId"
              className="block text-sm text-body font-medium mb-xs"
            >
              Car ID
            </label>
            <input
              id="operation"
              type="text"
              value={carData.operation}
              onChange={(e) => setCarData({ ...carData, operation: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="Enter car ID"
            />
          </div>

          {/* Make Field */}
          <div className="mb-m">
            <label
              htmlFor="make"
              className="block text-sm text-body font-medium mb-xs"
            >
              Make
            </label>
            <input
              id="make"
              type="text"
              value={carData.make}
              onChange={(e) => setCarData({ ...carData, make: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="e.g., Toyota"
            />
          </div>

          {/* Model Field */}
          <div className="mb-m">
            <label
              htmlFor="model"
              className="block text-sm text-body font-medium mb-xs"
            >
              Model
            </label>
            <input
              id="model"
              type="text"
              value={carData.model}
              onChange={(e) => setCarData({ ...carData, model: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="e.g., Camry"
            />
          </div>

          {/* Year Field */}
          <div className="mb-m">
            <label
              htmlFor="year"
              className="block text-sm text-body font-medium mb-xs"
            >
              Year
            </label>
            <input
              id="year"
              type="number"
              value={carData.year}
              onChange={(e) => setCarData({ ...carData, year: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="e.g., 2023"
              min="1900"
              max="2099"
            />
          </div>

          {/* VIN Field */}
          <div className="mb-m">
            <label
              htmlFor="vin"
              className="block text-sm text-body font-medium mb-xs"
            >
              VIN (Vehicle Identification Number)
            </label>
            <input
              id="vin"
              type="text"
              value={carData.vin}
              onChange={(e) => setCarData({ ...carData, vin: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="e.g., 1HGCM82633A123456"
              maxLength="17"
            />
          </div>

          {/* License Plate Field */}
          <div className="mb-m">
            <label
              htmlFor="licensePlate"
              className="block text-sm text-body font-medium mb-xs"
            >
              License Plate
            </label>
            <input
              id="licensePlate"
              type="text"
              value={carData.licensePlate}
              onChange={(e) => setCarData({ ...carData, licensePlate: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
              placeholder="e.g., ABC-123"
            />
          </div>

          {/* Motor Type Field */}
          <div className="mb-m">
            <label
              htmlFor="motorType"
              className="block text-sm text-body font-medium mb-xs"
            >
              Motor Type
            </label>
            <select
              id="motorType"
              value={carData.motorType}
              onChange={(e) => setCarData({ ...carData, motorType: e.target.value })}
              className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
            >
              <option value="">Select motor type</option>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
              <option value="plug-in-hybrid">Plug-in Hybrid</option>
              <option value="hydrogen">Hydrogen</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-xl">
        <Button theme="primary" onClick={handleSaveCar}>
          Guardar Carro
        </Button>
      </div>
    </div>
  );
}
