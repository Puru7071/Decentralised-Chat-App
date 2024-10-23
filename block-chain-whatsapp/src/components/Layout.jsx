import React from 'react'
import NavBar from './NavBar';

const Layout = ({children}) => {
    return (
        <div className='relative w-[100vw] h-[100vh] bg-[#202022] flex flex-row justify-arround items-center gap-[10px]'>
            <NavBar />
            <div className='relative w-[91%] h-[98%] bg-[white] rounded-[25px] p-[20px] flex flex-row justify-around items-center'>
                {children}
            </div>
        </div>
    )
}

export default Layout ; 