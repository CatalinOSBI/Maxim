import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Sneakers from './pages/Sneakers';
import Page2 from './pages/Page2';
import Update from './pages/Update';
import LoadingScreen from './pages/LoadingPage/LoadingScreen';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route index element={<Sneakers/>}/> 
        <Route path='/page2' element ={<Page2/>}/>
        <Route path='/Sneakers' element ={<Sneakers/>}/>   
        <Route path='/update/:id' element ={<Update/>}/> 
        <Route path='/Loading' element ={<LoadingScreen/>}/> 
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;