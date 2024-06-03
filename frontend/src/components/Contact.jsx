import React from 'react'
import { MapPinIcon,EnvelopeIcon,PhoneIcon } from '@heroicons/react/24/solid'

const Contact = () => {
  return (
    <>
        <section className="bg-white py-12" id='contact-us'>
            <div className="max-w-7xl px-4 mx-20">
                <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
                <div className="flex flex-row justify-center">
                    <div className="mr-20">
                        <div className="text-xl font-semibold mb-4">Contact Details</div>
                        <p className="mb-4">Contact us to adopt or make a donation</p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <MapPinIcon className='w-8' />
                                <div className="ml-4">
                                    <div className="text-lg font-semibold">Address</div>
                                    <div className="text-gray-700">Cusat, Kalamassery, Ernakulam, Kerala, India 682022</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <EnvelopeIcon className='w-8' />
                                <div className="ml-4">
                                    <div className="text-lg font-semibold">Email</div>
                                    <div className="text-gray-700">happypaws-in@gmail.com</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className='w-8' />
                                <div className="ml-4">
                                    <div className="text-lg font-semibold">Phone</div>
                                    <div className="text-gray-700">(91) 98459 60343 or (91) 91486 81697</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.6823119910755!2d76.32171031142397!3d10.043052490023156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c377917e985%3A0xb0fd4b1e85a6e51f!2sCochin%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1713338328500!5m2!1sen!2sin" width="600" height="450" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Contact