import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@vaadin/react-components/Button';
import { Grid } from '@vaadin/react-components/Grid';
import { GridColumn } from '@vaadin/react-components/GridColumn';
import { DelegationEndpoint, UserEndpoint } from 'Frontend/generated/endpoints';

export const config: ViewConfig = {
  menu: { exclude: true },
  title: 'Successful Booking',
};

export default function SuccessfulBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const car = location.state?.car;
  const personalInfo = location.state?.personalInfo;
  const deliverDelegation = location.state?.deliverDelegation;
  const bookingData = location.state?.bookingData;
  const totalPrice = location.state?.totalToPayment;

  if (!car || !personalInfo) {
    return <div>Error: Missing booking details. Please try again.</div>;
  }

  const handlePayment = async() =>{
      try{
          // Call the correct endpoint method name: deleteDate
          await DelegationEndpoint.deleteDate(car, bookingData.startDate, bookingData.endDate);

          }catch (error) {

         console.error('Error deleting date:', error);}

     alert('Successful!!!!'); // Placeholder for payment logic
    navigate('/userBookings');
  };

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
        <strong>PickUp Delegation:</strong> {bookingData.delegationId}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Deliver delegation:</strong> {deliverDelegation.deliverDelegationId}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Start Date:</strong> {bookingData.startDate}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>End Date:</strong> {bookingData.endDate}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Car Make:</strong> {car.make}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Car Model:</strong> {car.model}
      </div>
      <div style={{ marginBottom: '1rem' }}>
              <strong>Total Price:</strong> {totalPrice} €
      </div>
    </div>
    <div className="flex gap-m">
     <Button
       theme="primary"
       style={{
         backgroundColor: '#4CAF50', // Green color for payment
         color: '#fff',
         borderRadius: '8px',
         padding: '0.75rem 1.5rem',
         fontSize: '1rem',
         fontWeight: 'bold',
         display: 'flex',
         alignItems: 'center',
         gap: '0.5rem',
         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
       }}
       onClick={handlePayment}
     >
       <span>💳</span> Pay
     </Button>
    </div>
  </div>
);
}
