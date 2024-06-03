import React from 'react'
import petLogo from "../assets/PetConnectLogo-01.png"
import { FaQuoteLeft } from "react-icons/fa";
import testImg1 from "../assets/cat3.jpeg"
import testImg2 from "../assets/dog2.jpg"
import testImg3 from "../assets/dog3.jpg"

const Home = () => {
  return (
    <>
    <section className="home flex items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat min-h-screen" id="home">
        <div className="max-w-full mx-auto ml-8">
            <div className="home-content">
                <div className="text-5xl font-bold pb-4">Happy Paws</div>
                <div className="text-2xl font-semibold">Every pet deserves</div>
                <div className="text-2xl font-semibold">a loving home</div>
                <a href="#About" className="inline-block bg-orange-500 text-black text-lg font-normal px-6 py-3 mt-5 rounded-full border-2 border-orange-500 transition duration-300 ease-in-out hover:text-white hover:bg-black">About Us</a>
            </div>
        </div>
    </section>
    <section className="bg-white py-12" id="About">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold">About Us</h2>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 md:pr-8">
                    <div className="text-xl font-semibold mb-4">Who are we?</div>
                    <p className="mb-4">Welcome to HappyPaws, a not-for-profit pet adoption website dedicated to finding loving homes for homeless animals. Our mission is simple: to connect compassionate individuals and families with furry companions in need. Through our user-friendly platform, you can browse profiles of adorable pets waiting for their forever homes, knowing that every adoption makes a difference in their lives. Join us in our journey of love, compassion, and endless tail wags as we strive to make the world a happier place, one paw at a time.</p>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img src={petLogo} alt="Gato" className="mx-auto w-64 about-img" />
                </div>
            </div>
        </div>
    </section>
    <section class="bg-white py-12" id="Donate">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold mb-8 text-center">Testimonials</h2>
            <div class="grid grid-cols-3 gap-6">
                <div class="bg-gray-100 p-6 rounded-lg shadow-md h-72 mt-6">
                    <FaQuoteLeft className='text-orange-500' size={20} />
                    <p class="text-lg mt-4">HappyPaws gave me a lot of support and information when I wanted to adopt a puppy. Today Mel has been part of my life for a week and I couldn't be happier.</p>
                    <div class="flex items-center mt-6">
                        <div class="ml-4">
                            <div class="text-lg font-semibold">Ravichandra H</div>
                        </div>
                        <div className='test-img ml-24'>
                            <img src={testImg1} alt="profile" />
                        </div>
                    </div>
                </div>
                <div class="bg-gray-100 p-6 rounded-lg shadow-md h-80">
                    <FaQuoteLeft className='text-orange-500' size={20} />
                    <p class="text-lg mt-4">I got to know HappyPaws through the referral of friends. They gave me a lot of support after I decided to adopt Joaquim, at first I didn't know anything about cats, and they helped me a lot.</p>
                    <div class="flex items-center mt-6">
                        <div class="ml-4">
                            <div class="text-lg font-semibold">Anitha</div>
                        </div>
                        <div className='test-img ml-40'>
                            <img src={testImg2} alt="profile" />
                        </div>
                    </div>
                </div>
                <div class="bg-gray-100 p-6 rounded-lg shadow-md h-72 mt-6">
                    <FaQuoteLeft className='text-orange-500' size={20} />
                    <p class="text-lg mt-4">HappyPaws services are very good, through their help I finally decided to adopt Thor, it was one of the best choices I made, I feel much happier and welcomed.</p>
                    <div class="flex items-center mt-6">
                        <div class="ml-4">
                            <div class="text-lg font-semibold">Jayadev</div>
                        </div>
                        <div className='test-img ml-36'>
                            <img src={testImg3} alt="profile" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </>
  )
}

export default Home