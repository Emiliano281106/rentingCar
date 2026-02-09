import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { RepairEndpoint } from 'Frontend/generated/endpoints';
import { Button } from '@vaadin/react-components/Button';
import Repair from 'Frontend/generated/dev/renting/repairs/Repair';


export const config: ViewConfig = {
  menu: {
    title: '\u2003Create Repair',
    order: 1, // order within the Create submenu
    //icon: 'line-awesome/svg/simplybuilt.svg',
  },

};

const [repairData, setRepairData] = useState({
    repairId: '',
    operation: "info",
    failCode: '',
    cost: '',
    location: '',
    owner: '',
    phone: '',
    observations: '',

    })

export default function RepairView() {
  const handleSaveRepair = async () => {
    try {
      await RepairEndpoint.saveRepair(repairData);
      alert('Repair saved successfully!');
    } catch (error) {
      console.error('Error saving repair:', error);
      alert('Failed to save repair');
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <img style={{ width: '200px' }} src="images/empty-plant.png" />
      <h2>Repair Management</h2>

      <div className="card p-m">
        <pre className="text-left">
          {JSON.stringify(sampleRepair, null, 2)}
        </pre>
        <Button
          onClick={handleSaveRepair}

        >
          Save Repair
        </Button>
      </div>

      <p>Manage business trip repairs and approvals</p>
    </div>
  );
}