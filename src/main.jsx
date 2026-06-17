import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreProvider from './store/StoreProvider'
import { CartProvider } from './Context/CartContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <CartProvider>
          <App />
          <ToastContainer theme="dark" newestOnTop closeOnClick pauseOnHover />
        </CartProvider>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
)
