import React, { useState, useEffect, useContext } from 'react';
import DatePickerComponent from './DatePicker';
import { UserContext } from '../context/UserContext';

const AppointmentModal = ({ isOpen, onClose }) => {
  const [token, setToken] = useContext(UserContext);
  const [step, setStep] = useState(1); // 1 for doctors list, 2 for date picking
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
        setLoaded(true);
      } catch (error) {
        setErrorMessage(error.message);
        setLoaded(true);
      }
    };

    fetchDoctors();
  }, []);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleDone = async () => {
    try {
      if (!selectedDoctor || !selectedDate) {
        throw new Error('Please select both a doctor and a date');
      }

      // Prepare data for the appointment creation
      const appointmentData = {
        appointment: { 
          date_of_appointment: selectedDate,
        },
        doctor: {
            name: "string",
            area: "string",
            description: "string",
            image_url: "string",
            id: selectedDoctor.id,
        },
      };

      // Make POST request to create appointment
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      // Appointment created successfully
      console.log('Appointment created successfully');
      onClose(); // Close the modal

      // Reset state
      setSelectedDoctor(null);
      setSelectedDate(null);
      setStep(1);
    } catch (error) {
      console.error('Error creating appointment:', error.message);
      // Handle error state or display error message to user
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Select a Doctor</h2>
              {loaded ? (
                <ul className="space-y-2">
                  {doctors.map(doctor => (
                    <li
                      key={doctor.id}
                      className={`cursor-pointer p-2 rounded ${
                        selectedDoctor && selectedDoctor.id === doctor.id ? 'bg-blue-100' : ''
                      }`}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      {doctor.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{errorMessage || 'Loading doctors...'}</p>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Pick a Date and Time</h2>
              <DatePickerComponent selectedDate={selectedDate} onChange={date => setSelectedDate(date)} />
            </>
          )}
          <div className="mt-4 flex justify-end">
            {step === 1 && (
              <button
                onClick={handleNext}
                disabled={!selectedDoctor}
                className={`bg-orange-500 text-black text-lg font-normal px-6 py-3 mr-2 rounded-md border-2 border-orange-500 hover:scale-105 transition-transform ${
                  !selectedDoctor ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                onClick={handleDone}
                disabled={!selectedDoctor || !selectedDate}
                className={`bg-green-500 text-white text-lg font-normal px-6 py-3 rounded-md hover:scale-105 transition-transform ${
                  !selectedDoctor || !selectedDate ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
