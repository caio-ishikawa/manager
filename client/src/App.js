import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import Register from './routes/Register';
import Login from './routes/Login';
import { useState } from 'react';
import { UserEmailContext, CurrentServerContext, VideoContext } from './global/contexts';
import Profile from './routes/Profile';
import io from 'socket.io-client';
import Video from './routes/Video';




function App() {
  const [globalEmail, setGlobalEmail] = useState('');
  const [currentServer, setCurrentServer] = useState('');
  const [video, setVideo] = useState(false);
  
  return (
    <UserEmailContext.Provider value={[globalEmail, setGlobalEmail]}>
      <CurrentServerContext.Provider value={[currentServer, setCurrentServer]}>
        <VideoContext.Provider value={[video, setVideo]}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login/>}/>
              <Route path="/main" element={<Main/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/video" element={<Video email={globalEmail}/>}/>
            </Routes>
          </BrowserRouter>
        </VideoContext.Provider>
      </CurrentServerContext.Provider>
    </UserEmailContext.Provider>
  );
}

export default App;
