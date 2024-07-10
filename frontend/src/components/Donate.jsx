import React, { useState } from 'react';
import donateImg from '../assets/donate.jpg';
import qrCodeImg from '../assets/qr-donate.png';

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className='my-8'>
        <div className='text-center w-full'>
          <h1 className='font-semibold text-3xl'>Donate to the foundation</h1>
        </div>
        <div className="flex flex-col md:flex-row mx-8 py-8">
          <div className="md:w-1/2 md:pr-8 lg:pl-10">
            <div className="text-xl font-semibold mb-4">Why donate?</div>
            <p className="mb-4">
              Your support helps us provide loving homes for pets in need. Every donation ensures that more animals receive the care and love they deserve, including medical treatment, food, and shelter. Join us in making a difference—together, we can give every pet a happy home. Your contribution, no matter the size, creates happy tails and brighter futures for countless pets. Donate today and be a part of the Happy Paws family!
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src={donateImg} alt="Gato" className="mx-auto w-64 rounded about-img" />
          </div>
        </div>
        <div className='flex justify-center'>
          <button 
            onClick={openModal} 
            className="inline-block bg-orange-500 text-black text-lg font-normal px-6 py-3 mt-5 rounded-md border-2 border-orange-500 hover:scale-110 transition-transform"
          >
            Donate Now
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg relative">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <img src={qrCodeImg} alt="QR Code" className="h-64" />
          </div>
        </div>
      )}
    </>
  );
};

export default Donate;
