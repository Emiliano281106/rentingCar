import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { DelegationEndpoint } from 'Frontend/generated/endpoints';
import { Select } from '@vaadin/react-components/Select';
import { DatePicker } from '@vaadin/react-components/DatePicker';
import { Button } from '@vaadin/react-components/Button';
import { useNavigate } from 'react-router-dom';
import {useLocation } from 'react-router-dom';

export const config: ViewConfig = {
  menu: { order: 7, icon: 'line-awesome/svg/calendar-alt-solid.svg' },
  title: 'Book a car',
};

export default function FilterBookings() {
  const [delegations, setDelegations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    delegationId: undefined as any,
    startDate: '',
    endDate: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadDelegations = async () => {
      try {
        const result = await DelegationEndpoint.getAllProfileDelegations();
        setDelegations(result || []);
      } catch (error) {
        console.error('Error loading delegations:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDelegations();
  }, []);

  const handleApply = () => {
    if (!bookingData.delegationId || !bookingData.startDate || !bookingData.endDate) {
      alert('Please select a delegation and both dates.');
      return;
    }
    console.log('Filter applied with:', bookingData);
    navigate('/listCars/ListCars', { state : {bookingData}});
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-m max-w-2xl mx-auto">
      <h2 className="text-xl mb-l">Filter Bookings</h2>
      <div className="mt-xl">
        <Select
          label="Delegation"
          value={bookingData.delegationId}
          items={delegations.map(d => ({ label: d.name, value: d.delegationId }))}
          onValueChanged={e => setBookingData({ ...bookingData, delegationId: e.detail.value })}
        />
      </div>
      <div className="mt-xl">
        <DatePicker
          label="Start Date"
          required
          min={new Date().toISOString().split('T')[0]}
          onValueChanged={e => setBookingData({ ...bookingData, startDate: e.detail.value })}
        />
      </div>
      <div className="mt-xl">
        <DatePicker
          label="End Date"
          required
          min={bookingData.startDate}
          onValueChanged={e => setBookingData({ ...bookingData, endDate: e.detail.value })}
        />
      </div>
      <div className="mt-xl">
        <Button theme="primary" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}