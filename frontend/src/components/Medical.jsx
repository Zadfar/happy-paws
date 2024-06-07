import React from 'react'
import medicalImg from '../assets/medical.png'

const Medical = () => {
  return (
    <>
      <section className='m-4'>
        <div className='text-center text-3xl'>
            <h1 className='font-semibold'>Book an Appointment for your Pet</h1>
        </div>
        <div className="flex flex-col md:flex-row mx-8 py-8">
          <div className="md:w-1/2 md:pr-8 lg:pl-10">
            <div className="text-xl font-semibold mb-4">Your Pet deserves the Best</div>
              <p className="mb-4">Keeping your pets healthy has never been easier! Happy Paws offers a free service to book appointments with the nearest veterinarians, ensuring your furry friends receive the best care. Whether it’s for routine check-ups, vaccinations, or urgent medical attention, our platform connects you with trusted professionals at no cost. Prioritize your pet’s health with our convenient booking system and enjoy peace of mind. Schedule your appointment today and give your pet the care they deserve!</p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img src={medicalImg} alt="Gato" className="mx-auto w-64 rounded about-img" />
            </div>
        </div>
      </section>
    </>
  )
}

export default Medical