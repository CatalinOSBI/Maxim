import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Update from './pages/Update';
import LoadingScreen from './pages/LoadingPage/LoadingScreen';
import ProductPage from './pages/Product';
import SecondBanner from './Components/Banner/SecondBanner';
import FirebasePage from './pages/FirebasePage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import PaymentPage from './Components/Stripe/Payment';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route index element={<LoadingScreen/>}/> 
        <Route path='/Maxim/Home' element ={<Home/>}/>
        <Route path='/Maxim/update/:id' element ={<Update/>}/> 
        <Route path='/Maxim/loading' element ={<LoadingScreen/>}/>
        <Route path='/Maxim/Product/:id/:Type' element ={<ProductPage/>}/> 
        <Route path='/Maxim/Preview' element ={<SecondBanner/>}/> 
        <Route path='/Maxim/Login' element ={<FirebasePage/>}/>
        <Route path='/Maxim/AdminPage' element ={<AdminPage/>}/>
        <Route path='/Maxim/Cart' element ={<CartPage/>}/>
        <Route path='/Maxim/Payment' element ={<PaymentPage/>}/>
        <Route path='/Maxim/Success' element ={<Success/>}/>
        <Route path='/Maxim/Cancel' element ={<Cancel/>}/>
        <Route path='/Maxim/Profile' element ={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;