
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { DelegationEndpoint, UserEndpoint } from 'Frontend/generated/endpoints';
import { Select } from '@vaadin/react-components/Select';
import { Button } from '@vaadin/react-components/Button';

export const config: ViewConfig = {
  menu: { exclude: true },
  title: 'Complete Booking'
};

export default function BookingCar() {
  const { idHashBookingCar } = useParams<{ idHashBookingCar: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const bookingData = location.state?.bookingData;
  const car = location.state?.car;

  const [delegations, setDelegations] = useState<any[]>([]);
  const [totalToPayment, setTotalToPayment] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [personalInfo, setPersonalInfo] = useState({
      name: '',
      surname: '',
      email: '',
      phone: ''
      });
  const [deliverDelegation, setDeliverDelegation] = useState({
    deliverDelegationId: undefined as any
  });

    // Load delegations on component
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

  const calculateTotalPayment = (startDate: string,endDate: string, price: number) => {
    if (!startDate || !endDate || !price) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const qtyDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (qtyDays <= 0) return 0;
    const totalBeforeTax = qtyDays * price;
    const tax = totalBeforeTax * 0.23;
    return +(totalBeforeTax + tax).toFixed(2);
  };


const successfulBooking = async () => {
  if (!deliverDelegation.deliverDelegationId) {
    alert('Please select delivery delegation');
    return;
  }

  const total = calculateTotalPayment(bookingData.startDate, bookingData.endDate, car.price);
  if (total <= 0) {
    alert('Invalid dates selected.');
    return;
  }

  setTotalToPayment(total);

  // Find the full delegation objects
  const pickUpDelegation = delegations.find(d => d.delegationId === bookingData.delegationId);
  const deliverDelegationObj = delegations.find(d => d.delegationId === deliverDelegation.deliverDelegationId);
  console.log('pickUpDelegation:', pickUpDelegation);
  console.log('deliverDelegationObj:', deliverDelegationObj);

  try {
    await UserEndpoint.saveBooking({
      userId: "USER#001",
      operation: 'booking#2025#009',
      car: car,
      pickUpDelegation: pickUpDelegation,
      deliverDelegation: deliverDelegationObj,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      totalToPayment: total,
    });
  } catch {
    alert('Error saving booking. Please try again.');
    return;
  }
  alert('Booking successfully created!');
  navigate('/listCars/bookingCar/SuccessfulBooking', {
    state: { car, personalInfo, bookingData, deliverDelegation, totalToPayment: total }
  });
};

  if (!car) {
    return <div>Error: Car data not found. Please navigate from the car list.</div>;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-m max-w-2xl mx-auto">
      <div className="mt-xl">
      </div>
        <div className="mt-xl bg-base border border-contrast-10 rounded-l p-l">
          <h3 className="text-lg mb-m font-semibold text-header">Personal Information</h3>
          <div className="space-y-m">
            {/* Name Field */}
            <div className="mb-m">
              <label
                htmlFor="name"
                className="block text-sm text-body font-medium mb-xs"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
                placeholder="John"
              />
            </div>

            {/* Surname Field */}
            <div className="mb-m">
              <label
                htmlFor="surname"
                className="block text-sm text-body font-medium mb-xs"
              >
                Surname
              </label>
              <input
                id="surname"
                type="text"
                value={personalInfo.surname}
                onChange={(e) => setPersonalInfo({ ...personalInfo, surname: e.target.value })}
                className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
                placeholder="Doe"
              />
            </div>

            {/* Email Field */}
            <div className="mb-m">
              <label
                htmlFor="email"
                className="block text-sm text-body font-medium mb-xs"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
                placeholder="john.doe@example.com"
              />
            </div>

            {/* Phone Field */}
            <div className="mb-m">
              <label
                htmlFor="phone"
                className="block text-sm text-body font-medium mb-xs"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full p-s border border-contrast-20 rounded-s hover:border-contrast-30 focus:border-primary focus:shadow-[0_0_0_2px_theme(colors.primary)] transition-colors"
                placeholder="+1 (123) 456-7890"
              />
            </div>
          </div>
        </div>
          <div className="p-m max-w-2xl mx-auto">
            <h2 className="text-xl mb-l">Car Booking Details</h2>
            <div className="space-y-m">
              {/* Car Make */}
              <div className="mb-m">
                <label htmlFor="make" className="block text-sm text-body font-medium mb-xs">
                  Make
                </label>
                <input
                  id="make"
                  type="text"
                  value={car.make}
                  disabled
                  className="w-full p-s border border-contrast-20 rounded-s bg-gray-100"
                />
              </div>

              {/* Car Model */}
              <div className="mb-m">
                <label htmlFor="model" className="block text-sm text-body font-medium mb-xs">
                  Model
                </label>
                <input
                  id="model"
                  type="text"
                  value={car.model}
                  disabled
                  className="w-full p-s border border-contrast-20 rounded-s bg-gray-100"
                />
              </div>

              {/* Car Year */}
              <div className="mb-m">
                <label htmlFor="year" className="block text-sm text-body font-medium mb-xs">
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  value={car.year}
                  disabled
                  className="w-full p-s border border-contrast-20 rounded-s bg-gray-100"
                />
              </div>

              {/* Car Color */}
              <div className="mb-m">
                <label htmlFor="color" className="block text-sm text-body font-medium mb-xs">
                  Color
                </label>
                <input
                  id="color"
                  type="text"
                  value={car.color}
                  disabled
                  className="w-full p-s border border-contrast-20 rounded-s bg-gray-100"
                />
              </div>

              {/* Car Price */}
              <div className="mb-m">
                <label htmlFor="price" className="block text-sm text-body font-medium mb-xs">
                  Price
                </label>
                <input
                  id="price"
                  type="text"
                  value={`${car.price} €`}
                  disabled
                  className="w-full p-s border border-contrast-20 rounded-s bg-gray-100"
                />
              </div>
            </div>
          </div>
           <div className="mt-xl">
                                <Select
                                  label="Deliver Location"
                                  value={deliverDelegation.deliverDelegationId}
                                  items={delegations.map(d => ({ label: d.name, value: d.delegationId }))}
                                  onValueChanged={e => {
                                    const deliverId = e.detail.value;
                                    setDeliverDelegation(prev => ({
                                      ...prev,
                                      deliverDelegationId: deliverId,
                                    }));
                                  }}
                                />
                              </div>
              <div className="mt-xl">
                <Button theme="primary" onClick={successfulBooking}>
                  Confirm Booking
                </Button>
              </div>
            </div>
  );
}


