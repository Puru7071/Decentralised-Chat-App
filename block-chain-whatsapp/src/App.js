import './App.css';
import {useContext } from 'react';
import { ChatAppContext } from './context/ChatAppContext';
import MainPage from './pages/MainPage';
import GetStarted from './pages/GetStarted';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/get-started' element={<GetStarted />} />
      </Routes>
    </Layout>
  );
}

export default App;
