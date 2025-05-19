
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

  const car = location.state?.car;

  const [delegations, setDelegations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sameDelegation, setSameDelegation] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
      name: '',
      surname: '',
      email: '',
      phone: ''
      });
  const [formData, setFormData] = useState({
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

  // Keep deliverDelegationId in sync if sameDelegation is checked
  useEffect(() => {
    if (sameDelegation) {
      setFormData(prev => ({
        ...prev,
        deliverDelegationId: prev.pickupDelegationId
      }));
    }
  }, [sameDelegation, formData.pickupDelegationId]);

  const handleSubmit = async () => {
    if (!car) {
      alert('Car data is missing.');
      return;
    }
    if (!formData.pickupDelegationId || (!sameDelegation && !formData.deliverDelegationId)) {
      alert('Please select pickup and delivery delegations');
      return;
    }

    try {
      await UserEndpoint.saveBooking({
        userId: "USER#001",
        operation: 'booking#2025#009',
        car: car,
        deliverDelegation: formData.deliverDelegationId,
        statusPayment: "PENDING",
        statusBooking: "CREATED"
      });
      alert('Booking successfully created!');
      navigate('/bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to complete booking');
    }
  };

  if (!car) {
    return <div>Error: Car data not found. Please navigate from the car list.</div>;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-m max-w-2xl mx-auto">
      <div className="mt-xl">
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

      </div>
      <div className="mt-xl flex items-center gap-m">
        <input
          type="checkbox"
          id="sameDelegation"
          checked={sameDelegation}
          onChange={(e) => setSameDelegation(e.target.checked)}
        />
        <label htmlFor="sameDelegation">Same location for pickup and return</label>
      </div>
      {!sameDelegation && (
        <div className="mt-xl">
          <Select
            label="Return Location"
            value={formData.deliverDelegationId}
            items={delegations.map(d => ({ label: d.name, value: d.id }))}
            onValueChanged={e => setFormData({ ...formData, deliverDelegationId: e.detail.value })}
          />
        </div>
      )}
      <div className="mt-xl">
        <Button theme="primary" onClick={handleSubmit}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}


