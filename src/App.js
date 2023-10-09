import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Sneakers from './pages/Sneakers';
import Page2 from './pages/Page2';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route index element={<Sneakers/>}/> 
        <Route path='/page2' element ={<Page2/>}/>   
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
