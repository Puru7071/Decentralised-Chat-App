import React from 'react'

const Loader = () => {
  return (
    <div className='h-[100%] w-[100%] absolute top-0 backdrop-blur-sm rounded-[100px] flex justify-center items-center'>
      <div className='custom-loader'>
      </div>
    </div>
  )
}

export default Loader;