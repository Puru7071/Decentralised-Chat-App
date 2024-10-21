import './App.css';
import NavBar from "./components/NavBar" ; 
import { useEffect , useState , useContext } from 'react';
import { ChatAppContext } from './context/ChatAppContext';

function App() {
  // const {} = useContext(ChatAppContext) ; 

  return (
    <div>
      <NavBar/>
      Hola Gracis !! 
    </div>
  );
}

export default App;
