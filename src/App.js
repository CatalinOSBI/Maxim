import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Add from './pages/Add';
import Home from './pages/Home';
import Update from './pages/Update';
import LoadingScreen from './pages/LoadingPage/LoadingScreen';
import ProductPage from './pages/Product';
import SecondBanner from './Components/Banner/SecondBanner';
import FirebasePage from './pages/FirebasePage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route index element={<LoadingScreen/>}/> 
        <Route path='/Home' element ={<Home/>}/>
        <Route path='/Add' element ={<Add/>}/>   
        <Route path='/update/:id' element ={<Update/>}/> 
        <Route path='/Loading' element ={<LoadingScreen/>}/>
        <Route path='/Product/:id' element ={<ProductPage/>}/> 
        <Route path='/Preview' element ={<SecondBanner/>}/> 
        <Route path='/Login' element ={<FirebasePage/>}/>
        <Route path='/AdminPage' element ={<AdminPage/>}/>
        <Route path='/Cart' element ={<CartPage/>}/>
        <Route path='/Payment' element ={<PaymentPage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;