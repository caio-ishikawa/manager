import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Main from './routes/Main';
import Register from './routes/Register';
import Login from './routes/Login';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
