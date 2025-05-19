import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@vaadin/react-components/Button';

export const config: ViewConfig = {
  menu: { exclude: true },
  title: 'Successful Booking',
};

export default function SuccessfulBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const car = location.state?.car;
  const personalInfo = location.state?.personalInfo;

  if (!car || !personalInfo) {
    return <div>Error: Missing booking details. Please try again.</div>;
  }

  return (
    <div className="p-m max-w-2xl mx-auto">
      <h2 className="text-xl mb-l">Booking Successful</h2>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '12px',
          padding: '1.5rem',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}
      >
        <h3 className="text-lg mb-m">Booking Details</h3>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Name:</strong> {personalInfo.name}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Surname:</strong> {personalInfo.surname}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Phone:</strong> {personalInfo.phone}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Car Make:</strong> {car.make}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Car Model:</strong> {car.model}
        </div>
      </div>
      <div className="flex gap-m">
        <Button theme="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
        <Button theme="secondary" onClick={() => navigate('/bookings')}>
          View Bookings
        </Button>
      </div>
    </div>
  );
}