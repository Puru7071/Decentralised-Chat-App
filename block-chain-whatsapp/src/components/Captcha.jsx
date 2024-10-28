import React from 'react'
import { useState, useEffect } from 'react'

import { FaCameraRetro } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { GiCardAceDiamonds } from "react-icons/gi";
import { FaGun } from "react-icons/fa6";
import { IoTv } from "react-icons/io5";
import { GiElephant } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { FaJetFighterUp } from "react-icons/fa6";
import { GiBattleTank } from "react-icons/gi";
import { LuRefreshCcw } from "react-icons/lu";

const Captcha = ({setIsCaptchaCorrect , refreshCaptcha}) => {
    const iconsArray = [
        { id: 1, icon: <GiBattleTank className='text-[48px]' />, name: "GiBattleTank" },
        { id: 2, icon: <FaCameraRetro className='text-[48px]' />, name: "FaCameraRetro" },
        { id: 3, icon: <IoCarSportSharp className='text-[48px]' />, name: "IoCarSportSharp" },
        { id: 4, icon: <GiCardAceDiamonds className='text-[48px]' />, name: "GiCardAceDiamonds" },
        { id: 5, icon: <FaGun className='text-[48px]' />, name: "FaGun" },
        { id: 6, icon: <IoTv className='text-[48px]' />, name: "IoTv" },
        { id: 7, icon: <GiElephant className='text-[48px]' />, name: "GiElephant" },
        { id: 8, icon: <FaStar className='text-[48px]' />, name: "FaStar" },
        { id: 9, icon: <IoHeart className='text-[48px]' />, name: "IoHeart" },
        { id: 10, icon: <FaJetFighterUp className='text-[48px]' />, name: "FaJetFighterUp" },
    ];
    const [mainCaptcha, setMainCaptcha] = useState("");
    const [userCaptcha, setUserCaptcha] = useState("");
    const [userCaptchaArr, setUserCaptchaArr] = useState([]);
    const [captchaArr, setCaptchaArr] = useState([]);
    const checkMatching = (curCaptcha) => {
        if(mainCaptcha === curCaptcha){
            setIsCaptchaCorrect(true) ; 
        }
        else{
            setIsCaptchaCorrect(false) ; 
        }
    }
    const isOverlapping = (pos, x, y) => {
        console.log("Hello");
        let iconSize = 55;
        if (pos.x === x || pos.y === y) return true;
        if ((x + iconSize > pos.x && x + iconSize < pos.x + iconSize) && (y + iconSize > pos.y && y + iconSize < pos.y + iconSize)) {
            return true;
        }
        if ((x > pos.x && x < pos.x + iconSize) && (y + iconSize > pos.y && y + iconSize < pos.y + iconSize)) {
            return true;
        }
        if ((x > pos.x && x < pos.x + iconSize) && (y > pos.y && y < pos.y + iconSize)) {
            return true;
        }
        if ((x + iconSize > pos.x && x + iconSize < pos.x + iconSize) && (y > pos.y && y < pos.y + iconSize)) {
            return true;
        }

        return false;
    }
    const generateRandomArr = () => {
        const obj = {}; let count = 0;
        const captchaArr = [];
        while (count < 5) {
            const random = Math.floor(Math.random() * 10);
            if (!(!!obj[random])) {
                obj[random] = true;
                count = count + 1;
                captchaArr.push(iconsArray[random]);
            }
        }
        const mainCaptcha = captchaArr.map(icon => icon.name).join(" -> ");
        positionIcons(captchaArr);
        setMainCaptcha(mainCaptcha);
        setUserCaptcha("") ; 
    }
    const positionIcons = (captchArr) => {
        const positions = []; let count = 0;
        while (count < 5) {
            const randomX = Math.floor(Math.random() * (550 - 40 + 1)) + 40;
            const randomY = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
            const randomRot = Math.random() * 360;

            const isOverlappingWithExisting = positions.some(pos => isOverlapping(pos, randomX, randomY));
            if (!isOverlappingWithExisting) {
                captchArr[count].x = randomX;
                captchArr[count].y = randomY;
                captchArr[count].rotate = randomRot;
                positions.push({ x: randomX, y: randomY });
                count = count + 1;
            }
        }
        setCaptchaArr(captchArr);
        setUserCaptchaArr([])
    }
    const handleClick = (icon) => {
        console.log(icon);
        const curCaptcha = [...userCaptchaArr,icon].map(icon => icon.name).join(" -> ");
        console.log(curCaptcha) ; 
        setUserCaptchaArr((prev) => [...prev, icon])
        setUserCaptcha(curCaptcha) ; 
        checkMatching(curCaptcha) ; 
    }
    useEffect(() => {
        generateRandomArr()
        setInterval(() => {
            generateRandomArr()
        }, 600000);
    }, [refreshCaptcha])
    return (
        <div className='h-[100%] w-[100%] relative overflow-hidden'>
            <div className='h-[40px] w-[620px] absolute left-0 top-0 flex flex-row justify-start items-center border-b-[3px] border-[#757575] gap-[20px]'>
                <div className='flex flex-row justify-start items-center pl-[10px]'>
                    <h2 className='text-[16px] font-[600]'>Desired Order:</h2>
                    {captchaArr?.map((icon) => (<div
                        className={`h-[25px] w-[25px] flex justify-center items-center ml-[10px]`}>
                        {icon?.icon}
                    </div>))}
                </div>
                <div className='flex flex-row justify-start items-center'>
                    <h2 className='text-[16px] font-[600]'>Your Order:</h2>
                    {userCaptchaArr?.map((icon) => (<div
                        className={`h-[25px] w-[25px] flex justify-center items-center ml-[10px]`}>
                        {icon?.icon}
                    </div>))}
                </div>
            </div>
            {captchaArr?.map((icon) => (<button
                style={{ left: `${icon.x}px`, top: `${icon.y}px`, transform: `rotate(${icon.rotate}deg)`, position: "absolute" }}
                className={`h-[50px] w-[50px flex justify-center items-center absolute cursor-pointer`}
                id={icon?.name}
                disabled = {userCaptchaArr.filter(item => item.name === icon.name).length > 0}
                onClick={() => handleClick(icon)}
            >
                {icon?.icon}
            </button>))}
            <button className='absolute h-[30px] w-[30px] right-0 bottom-0' onClick={generateRandomArr}>
                <LuRefreshCcw className='text-[24px] text-[#0077b6] font-[700]'/>
            </button>
        </div>
    )
}

export default Captcha; 