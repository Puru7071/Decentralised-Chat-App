import './App.css';
import NavBar from "./components/NavBar";
import { useEffect, useState, useContext } from 'react';
import { ChatAppContext } from './context/ChatAppContext';
import MainPage from './pages/MainPage';

function App() {
  // const {} = useContext(ChatAppContext) ; 

  return (
    <div className='h-[100vh] w-[100vw] bg-[#202022]'>
      <MainPage />
    </div>
  );
}

export default App;
