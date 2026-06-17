import AdminLayout from '../Admin layout/Adminlayout'
import AdminLogin from '../Admin layout/AdminLogin'
import Weblayout from '../web layout/weblayout'
import { Route, Routes, Navigate } from 'react-router-dom'      
import Home from '../component/Home'
import Books from '../component/Books'
import BookDetail from '../component/BookDetail'
import Gallery from '../component/Gallery.jsx'
import Service from '../component/Service'
import Contact from '../component/Contact'
import Addproduct from '../Admin layout/Addproduct'
import Productlist from '../Admin layout/Productlist'
import Dashboard from '../Admin layout/Dashboard'
import Orderlist from '../Admin layout/Orderlist'
import Notifications from '../Admin layout/notification/Notifications'
import NotificationDetail from '../Admin layout/notification/NotificationDetail'
import About from '../component/About'
import Category from '../component/Category'
import Cart from '../component/Cart'
import Order from '../component/Order'
const AppRoutes = () => {
  return (
    
      <Routes>

        <Route path='/' element={<Weblayout />}>
          <Route index element={<Home />} />
          <Route path='books' element={<Books />} />
          <Route path='books/:id' element={<BookDetail />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='services' element={<Service />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='category/:slug' element={<Category />} />
          <Route path='cart' element={<Cart />} />
          <Route path='order' element={<Order />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='add-product' element={<Addproduct />} />
          <Route path='products' element={<Productlist />} />
          <Route path='orders' element={<Orderlist />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='notifications/:id' element={<NotificationDetail />} />
        </Route>





      </Routes>
    
  )
}

export default AppRoutes;