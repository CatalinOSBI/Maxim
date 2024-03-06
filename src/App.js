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
        <Route path='/Home' element ={<Home/>}/>
        <Route path='/update/:id' element ={<Update/>}/> 
        <Route path='/Loading' element ={<LoadingScreen/>}/>
        <Route path='/Product/:id/:Type' element ={<ProductPage/>}/> 
        <Route path='/Preview' element ={<SecondBanner/>}/> 
        <Route path='/Login' element ={<FirebasePage/>}/>
        <Route path='/AdminPage' element ={<AdminPage/>}/>
        <Route path='/Cart' element ={<CartPage/>}/>
        <Route path='/Payment' element ={<PaymentPage/>}/>
        <Route path='/Success' element ={<Success/>}/>
        <Route path='/Cancel' element ={<Cancel/>}/>
        <Route path='/Profile' element ={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;