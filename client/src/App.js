import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Main from './routes/Main';
import Register from './routes/Register';
import Login from './routes/Login';
import { useContext, createContext, useState } from 'react';
import { UserEmailContext, SocketContext } from './global/contexts';
import io from 'socket.io-client';


function App() {
  const [globalEmail, setGlobalEmail] = useState('');
  
  return (
    <UserEmailContext.Provider value={[globalEmail, setGlobalEmail]}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
    </UserEmailContext.Provider>
  );
}

export default App;
