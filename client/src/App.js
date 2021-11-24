import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import Register from './routes/Register';
import Login from './routes/Login';
import { useState } from 'react';
import { UserEmailContext, CurrentServerContext, CurrentChannelContext } from './global/contexts';
import Profile from './routes/Profile';


function App() {
  const [globalEmail, setGlobalEmail] = useState('');
  const [currentServer, setCurrentServer] = useState('');
  const [currentChannel, setCurrentChannel] = useState("General");
  
  return (
    <UserEmailContext.Provider value={[globalEmail, setGlobalEmail]}>
      <CurrentServerContext.Provider value={[currentServer, setCurrentServer]}>
        <CurrentChannelContext.Provider value={[currentChannel, setCurrentChannel]}>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
              </Routes>
            </BrowserRouter>
          </CurrentChannelContext.Provider>
      </CurrentServerContext.Provider>
    </UserEmailContext.Provider>
  );
}

export default App;
