import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { RepairEndpoint } from 'Frontend/generated/endpoints';
import { Button } from '@vaadin/react-components/Button';
import {useState} from 'react';
import Repair from 'Frontend/generated/dev/renting/repairs/Repair';


export const config: ViewConfig = {
  menu: {
    title: '\u2003Crer Reparación',
    order: 1, // order within the Create submenu
    icon: 'line-awesome/svg/simplybuilt.svg',
  },

};


export default function RepairView() {

    const [repairData, setRepairData] = useState({
        repairId: '',
        operation: "info",
        failCode: '',
        cost: '',
        location: '',
        observations: '',

        })

  const handleSaveRepair = async () => {
    try {
      await RepairEndpoint.saveRepair(repairData);
      alert('Reparación guardada con éxito!');
    } catch (error) {
      console.error('Error saving repair:', error);
      alert('Failed to save repair');
    }
  };

  return (
      <div className="p-m max-w-2xl mx-auto">
        <div className="mt-xl"></div>

        <div className="mt-xl bg-base border border-contrast-10 rounded-l p-l">
          <h3 className="text-lg mb-m font-semibold text-header">Repair Information</h3>

          <div className="space-y-m">
            {/* Repair ID Field */}
            <div className="mb-m">
              <label
                htmlFor="repairId"
                className="block text-sm text-body font-medium mb-xs"
              >
                Repair ID
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
              <input
                id="cost"
                type="text"
                value={repairData.cost}
                onChange={(e) => setRepairData({ ...repairData, cost: e.target.value })}
                className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
                placeholder="Costo"
              />
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

            {/* Observations Field */}
            <div className="mb-m">
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
                className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
                placeholder="Observaciones"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="mt-xl">
          <Button theme="primary" onClick={handleSaveRepair}>
            Guardar Reparación
          </Button>
        </div>
      </div>

  );
}