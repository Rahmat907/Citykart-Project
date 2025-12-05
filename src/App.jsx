import { Route, Routes } from 'react-router-dom'
import Authlayout from './components/ui/auth/layout'
import Authlogin from './pages/authroization/login'
import AuthRagister from './pages/authroization/Ragister'
import Adminlayout from './components/admin-view-c/layout'
import Admindashboard from './pages/admin-view/Admindashboard'
import AdminProduct from './pages/admin-view/Products'
import AdminOrder from './pages/admin-view/order'
import Adminfeatures from './pages/admin-view/features'
import Shopinglayout from './components/shoping-view-c/Shopinglayout'
import Notfound from './pages/not-found/Notfound'
import ShopingHome from './pages/shoping-view/Home'
import ShopingListing from './pages/shoping-view/listing'
import ShopingCheckout from './pages/shoping-view/checkout'
import ShopingAccount from './pages/shoping-view/account'
import CheckAuth from './components/common/check-auth'
import UnAuthpage from './pages/un-authpage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturn from './pages/shoping-view/paypal-return'
import PaymentSuccessPage from './pages/shoping-view/payment-success'
function App() {
   const {user,isAuthenticated,isLoading} = useSelector(state=> state.auth)
   const dispatch = useDispatch();

   useEffect(()=>{
    dispatch(checkAuth())
   },[dispatch])
   if(isLoading) return <Skeleton className="h-[600px] w-[800px] bg-black" />

  //  console.log(isLoading,user);
   
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      
      {/* <h1>Sultan bhai op</h1> */}
      <Routes>
        <Route path='/auth'    element =
        {
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Authlayout/>
          </CheckAuth>
        }>

        <Route path='login'    element={<Authlogin/>} />
        <Route path='register' element={<AuthRagister/>} />

      </Route>

        <Route path='/admin'    element=
        {
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Adminlayout/>
          </CheckAuth>
        }>

        <Route path='dashboard' element={<Admindashboard/>}/>
        <Route path='products'   element={<AdminProduct/>}/>
        <Route path='orders'    element={<AdminOrder/>}/>
        <Route path='features'  element={<Adminfeatures/>}/>

        </Route>

      <Route path='/shop'     element =
      {
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <Shopinglayout/>
        </CheckAuth>
      }>

        <Route path='home'      element={<ShopingHome/>}/>        
        <Route path='listing'   element={<ShopingListing/>}/>        
        <Route path='checkout'  element={<ShopingCheckout/>}/>        
        <Route path='account'   element={<ShopingAccount/>}/>
        <Route path= 'paypal-return' element={<PaypalReturn/>} />
        <Route path= 'payment-success' element={<PaymentSuccessPage/>} />
      </Route>

        <Route  path='/unauth-page' element={<UnAuthpage/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
     
    </div>
  )
}

export default App
