import React from 'react'
import adoptionImg from "../assets/Adoption-01.png"
import ActiveAdopt from './ActiveAdopt'

const Adoption = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <div className="my-8">
            <h2 className="text-3xl font-bold text-center mb-8">ADOPTION</h2>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <div className="text-xl font-semibold">Pet Adoption</div>
                    <p className="mt-4">Thank you for considering adopting a pet from HappyPaws. Our shelters have some amazing dogs/cats that are eagerly waiting to find a forever home and a loving family! Bringing home a pet is akin to welcoming a new family member and therefore a commitment to the pet’s health and wellbeing for its lifetime. This commitment has physical, emotional, and financial implications and therefore, before you decide to register with us as an adopter, please read through the following information carefully and make an informed decision.</p>
                </div>
                <div>
                    <img src={adoptionImg} alt="logo" className="mx-auto w-64" />
                </div>
            </div>
        </div>
    </div>
    <div className='bg-gray-300'>
      <ActiveAdopt />
    </div>
    </>
  )
}

export default Adoption