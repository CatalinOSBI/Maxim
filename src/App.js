import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Add from './pages/Add';
import Page2 from './pages/Page2';
import Update from './pages/Update';
import LoadingScreen from './pages/LoadingPage/LoadingScreen';
import ProductPage from './pages/Product';
import Preview from './pages/Preview';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route index element={<LoadingScreen/>}/> 
        <Route path='/page2' element ={<Page2/>}/>
        <Route path='/Add' element ={<Add/>}/>   
        <Route path='/update/:id' element ={<Update/>}/> 
        <Route path='/Loading' element ={<LoadingScreen/>}/>
        <Route path='/Product/:id' element ={<ProductPage/>}/> 
        <Route path='/Preview' element ={<Preview/>}/> 
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;