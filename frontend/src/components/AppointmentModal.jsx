import React, { useState, useEffect, useContext } from 'react';
import DatePickerComponent from './DatePicker';
import { UserContext } from '../context/UserContext';
import emailjs from '@emailjs/browser';

const AppointmentModal = ({ isOpen, onClose }) => {
  const [token] = useContext(UserContext);
  const [step, setStep] = useState(1); // 1 for doctors list, 2 for date picking
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

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

    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);
        setLoaded(true);
      } catch (error) {
        setErrorMessage(error.message);
        setLoaded(true);
      }
    };

    fetchUser();
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
      const email_params = {
        to_name: 'User',
        to_email: user.email,
        from_name: 'Happy Paws',
        message: `Appointment has been booked successfully. Date of the appointment: ${selectedDate}`,
      }

      emailjs
        .send('service_s4rjuik', 'template_94wfpnk', email_params, {
          publicKey: 'cKGkVpAxx4RxYjEZt',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );

      setSuccessMessage('Appointment is created successfully! Check your Email.'); // Set success message
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 3000);

      setSelectedDoctor(null);
      setSelectedDate(null);
      setStep(1);
    } catch (error) {
      console.error('Error creating appointment:', error.message);
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
                      className={`cursor-pointer p-2 rounded ${selectedDoctor && selectedDoctor.id === doctor.id ? 'bg-blue-100' : ''}`}
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
                className={`bg-orange-500 text-black text-lg font-normal px-6 py-3 mr-2 rounded-md border-2 border-orange-500 hover:scale-105 transition-transform ${!selectedDoctor ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                onClick={handleDone}
                disabled={!selectedDoctor || !selectedDate}
                className={`bg-green-500 text-white text-lg font-normal px-6 py-3 rounded-md hover:scale-105 transition-transform ${!selectedDoctor || !selectedDate ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Done
              </button>
            )}
          </div>
          {successMessage && (
            <div className="mt-4 text-green-500 text-center">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
