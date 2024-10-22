import React from 'react'
import NavBar from '../components/NavBar'

const MainPage = () => {
  return (
    <div className='w-[100%] h-[100%] flex flex-row justify-arround items-center gap-[10px]'>
        <NavBar/>
        <div className='w-[91%] h-[98%] bg-[white] rounded-[25px]'>

        </div>
    </div>
  )
}

export default MainPage