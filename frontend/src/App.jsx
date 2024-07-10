import './index.css'
import Header from './components/Header'
import Home from './components/Home'
import Profile from './components/Profile'
import Adoption from './components/Adoption'
import Donate from './components/Donate'
import Footer from './components/Footer'
import Medical from './components/Medical'
import ScrollToTop from './components/ScrolltoTop'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PetDetails from './components/PetDetails'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><ScrollToTop /><Header /><Home /><Footer /></>
    },
    {
      path: "/profile",
      element: <>
      <ScrollToTop />
      <Header /><Profile />
      <footer className='flex justify-center bg-gray-700 text-white w-full'>
        <span className='py-8'>Created with ❤️ by Team HappyPaws. | 2024 All Rights Reserved.</span>
      </footer>
      </>
    },
    {
      path: "/adoption",
      element: <><ScrollToTop /><Header /><Adoption /><Footer /></>
    },
    {
      path: "/donate",
      element: <><ScrollToTop /><Header /><Donate /><Footer /></>
    },
    {
      path: "/medical",
      element: <><ScrollToTop /><Header /><Medical /><Footer /></>
    },
    {
      path: "/adoption/pet/:id",
      element: <><ScrollToTop /><Header /><PetDetails /><Footer /></>
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
