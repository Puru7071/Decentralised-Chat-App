import React from 'react'
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const getPadding = () => {
        return location.pathname === '/chat-area' ? '0px' : '20px';
    };
    return (
        <div className='relative w-[100vw] h-[100vh] bg-[#202022] flex flex-row justify-arround items-center gap-[10px]'>
            <NavBar />
            <div
                style={{ padding: `${getPadding()}` }}
                className='relative w-[91%] h-[98%] bg-[white] rounded-[25px] flex flex-row justify-around items-center overflow-hidden'>
                {children}
            </div>
        </div>
    )
}

export default Layout; 