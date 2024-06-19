import './index.css'
import Header from './components/Header'
import Home from './components/Home'
import Profile from './components/Profile'
import Adoption from './components/Adoption'
import Donate from './components/Donate'
import Footer from './components/Footer'
import Medical from './components/Medical'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Header /><Home /><Footer /></>
    },
    {
      path: "/profile",
      element: <>
      <Header /><Profile />
      <footer className='flex justify-center bg-gray-700 text-white w-full'>
        <span className='py-8'>Created with ❤️ by Team HappyPaws. | 2024 All Rights Reserved.</span>
      </footer>
      </>
    },
    {
      path: "/adoption",
      element: <><Header /><Adoption /><Footer /></>
    },
    {
      path: "/donate",
      element: <><Header /><Donate /><Footer /></>
    },
    {
      path: "/medical",
      element: <><Header /><Medical /><Footer /></>
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
