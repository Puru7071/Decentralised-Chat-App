import React, { Fragment } from 'react'
import images from '../assets/index'
import { FaEthereum } from "react-icons/fa";
import { TbDeviceMobileQuestion } from "react-icons/tb";
import { RiGuideFill } from "react-icons/ri";



const MainPage = () => {
  const features = [
    {
      title: "Secure Communication",
      description: "Blockchain encryption ensures only you and your contacts can read messages."
    },
    {
      title: "Decentralized Control",
      description: "You control your data, no central authority involved."
    },
    {
      title: "Seamless Experience",
      description: "Easily connect through a simple, secure interface."
    }
  ];
  const steps = [
    {
      "title": "Get Started",
      "description": "Sign up easily with your wallet address."
    },
    {
      "title": "Connect with Friends",
      "description": "Add your contacts and start chatting securely."
    },
    {
      "title": "Send Encrypted Messages",
      "description": "Enjoy private conversations without fear of eavesdropping."
    }
  ]


  return (<Fragment>
      <div className='w-[46%] h-[100%] flex flex-col justify-center ml-[40px]'>
        <h1 className='text-[36px] text-[#1976d2] font-[700] capitalize flex flex-row flex-nowrap items-center'>
          <FaEthereum className='text-gray-700 mr-[10px] text-[42px]' /> Welcome to Cipherspace.
        </h1>
        <h4 className='mt-[5px] ml-[10px] text-gray-600 font-[500]'>
          Welcome to Cipherspace, your gateway to secure and private messaging!
        </h4>
        <h4 className='mt-[20px] ml-[5px] text-[#ff930a] font-[600] text-[24px] flex flex-row items-center flex-nowrap'>
          <TbDeviceMobileQuestion className='mr-[10px]' /> Why Cipherspace ?
        </h4>
        <ul className='ml-[10px]'>
          {features?.map((feature, index) => (
            <li key={index} className='text-[#220135] mb-[10px] before:content-["🌟"] before:mr-[5px]'>
              <strong>{feature.title}:</strong> {feature.description}
            </li>
          ))}
        </ul>
        <h4 className='mt-[20px] ml-[5px] text-[#ff930a] font-[600] text-[24px] flex flex-row items-center flex-nowrap'>
        <RiGuideFill className='mr-[10px]' /> How to Get Started:
      </h4>
      <ul className='ml-[10px]'>
        {steps?.map((feature, index) => (
          <li
            key={index}
            className="relative text-[#220135] mb-[10px] pl-[20px]"
          >
            <span className="absolute left-0 mr-[5px] text-[#220135]">
              {index + 1}.
            </span>
            <strong>{feature.title}:</strong> {feature.description}
          </li>
        ))}
      </ul>

        <h1 className='text-[17px] text-[#1976d2] mt-[10px] font-[600] ml-[6px]'>
          Join us today.
          Your privacy matters at Cipherspace!
        </h1>
      </div>
      <div className='w-[53%] h-[100%] flex justify-center items-center'>
        <img src={images?.intro} className='w-[70%] h-[70%] object-contain' />
      </div>
    </Fragment>)
}

export default MainPage