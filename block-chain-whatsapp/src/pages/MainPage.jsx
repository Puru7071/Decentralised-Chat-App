import React, { Fragment, useEffect, useContext } from 'react'
import { LuShield } from "react-icons/lu";
import { LuLock } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";
import { FiSmartphone } from "react-icons/fi";

const MainPage = () => {
  const features = [
    {
      icon: <LuLock className="w-6 h-6 text-white" />,
      title: 'Secure Communication',
      description: 'Blockchain encryption ensures only you and your contacts can read messages.',
      color: 'bg-blue-500'
    },
    {
      icon: <IoShieldOutline className="w-6 h-6 text-white" />,
      title: 'Decentralized Control',
      description: 'You control your data, no central authority involved.',
      color: 'bg-purple-500'
    },
    {
      icon: <FiSmartphone className="w-6 h-6 text-white" />,
      title: 'Seamless Experience',
      description: 'Easily connect through a simple, secure interface.',
      color: 'bg-pink-500'
    }
  ];
  const steps = [
    {
      number: '01',
      title: 'Get Started',
      description: 'Sign up easily with your wallet address.'
    },
    {
      number: '02',
      title: 'Connect with Friends',
      description: 'Add your contacts and start chatting securely.'
    },
    {
      number: '03',
      title: 'Send Encrypted Messages',
      description: 'Enjoy private conversations without fear of eavesdropping.'
    }
  ];
  return (
    <Fragment>
      <div className='w-[100%]'>
        <div className="flex flex-row items-center justify-start mb-8 gap-[20px]">
          <LuShield className="w-16 h-16 text-blue-500" />
          <div className="flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">Welcome to Cipherspace.</h1>
            </div>
            <p className="text-2xl text-gray-600 mt-[-20px] ml-[5px]">Your gateway to secure and private messaging!</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 ml-[20px]">Why Cipherspace?</h2>
        <div className="grid grid-cols-3 gap-7 px-[10px] mb-8">
          {features.map((feature) => (
            <div key={feature.title} className="shadow-lg transition-shadow bg-[#f8f9fa] rounded-lg cursor-pointer">
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-8 ml-[20px]">How to Get Started:</h2>
        <div className="grid grid-cols-3 gap-7 px-[35px]">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="text-6xl font-bold text-[#dee2e6] mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t">
          <p className="text-center text-blue-500 font-semibold text-lg">
            Join us today. Your privacy matters at Cipherspace!
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default MainPage;