import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { RepairEndpoint } from 'Frontend/generated/endpoints';
import { Button } from '@vaadin/react-components/Button';
import { useState } from 'react';
import {useEffect} from 'react';
import { GridColumn } from '@vaadin/react-components/GridColumn';
import { Grid } from '@vaadin/react-components/Grid';


export const config: ViewConfig = {
  menu: {
    title: 'Reparaciones',
    order: 2,
    icon: 'line-awesome/svg/simplybuilt.svg',
  },
};

export default function RepairsView() {
    const [repairs, setRepairs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
       console.log('Fetching repairs...');

       RepairEndpoint.getAllProfileRepairs()
         .then((result) => {
           console.log('Raw API response:', result);
           console.log('Response type:', typeof result);
           console.log('Is array?', Array.isArray(result));

           if (result) {
             console.log('Number of items:', result.length);
             if (result.length > 0) {
               console.log('First repair item:', result[0]);
               console.log('First repair structure:', JSON.stringify(result[0], null, 2));
             } else {
               console.log('Result is empty array');
             }
             setRepairs(result);
           } else {
             console.log('Result is null or undefined');
             setRepairs([]);
           }
         })
         .catch((err) => {
           console.error('Failed to fetch repairs - Full error:', err);
           console.error('Error message:', err.message);
           console.error('Error stack:', err.stack);

           // Check if error has response data
           if (err.response) {
             console.error('Error response data:', err.response.data);
             console.error('Error response status:', err.response.status);
             console.error('Error response headers:', err.response.headers);
           } else if (err.request) {
             console.error('Error request (no response):', err.request);
           }

           setRepairs([]);
         })
         .finally(() => {
           console.log('Finally block - setting loading to false');
           setLoading(false);
         });
     }, []);

      return (
                <div>
                  <div className="space-y-m">
                    <p>All Repairs</p>
                  </div>
                  <Grid items={repairs}>
                    <GridColumn path="operation" header="Operation" />
                    <GridColumn path="repairId" header="Repair ID" />
                    <GridColumn path="failCode" header="Fail Code" />
                    <GridColumn path="location" header="Location" />
                    <GridColumn path="observations" header="Observations" />
                  </Grid>
                </div>
          );
}


