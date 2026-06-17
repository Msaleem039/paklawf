import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import WhatsAppButton from '../component/WhatsAppButton'

const Weblayout = () => {
  return (
    <div className="pt-24 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Weblayout
