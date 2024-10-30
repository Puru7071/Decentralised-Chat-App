import './App.css';
import { useContext , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatAppContext } from './context/ChatAppContext';
import MainPage from './pages/MainPage';
import GetStarted from './pages/GetStarted';
import ChangeAvatar from './pages/ChangeAvatar';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddContact from './pages/AddContact';
import ChatPage from './pages/ChatPage';

function App() { 
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/get-started' element={<GetStarted />} />
        <Route path='/all-users' element={<AddContact />}></Route>
        <Route path='/change-avatar' element={<ChangeAvatar />}></Route>
        <Route path='/chat-area' element={<ChatPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
