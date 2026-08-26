import FourthIcon from "../../assets/fourthicon.png"
import { useState, useRef, useEffect } from "react"
import { useClickOutside } from "../../hooks/clickOutsideDiv.js";

export default function MainHeader(){

    const [dropDownOpen, setDropDownOpen] = useState(false)
    const dropDownRef = useRef(null);
        
    function handleDropDown(){
        setDropDownOpen((current) => !current)
    }

    function closeDropDown(){
        setDropDownOpen(false)
    }

    useClickOutside(dropDownRef, closeDropDown)

    return (
        <header className="flex justify-between py-3 px-2 shadow-[var(--shadow-bottom)]">
            <div className="flex gap-2 items-center">
                <img src={FourthIcon} alt="Fourth Logo" className="w-[3rem] h-[3rem]"/>
                <p className="text-xl font-bold">Home</p>
            </div>
            <div ref={dropDownRef} className="relative flex items-center justify-center border-2 border-[var(--accent-dark)] px-2 py-2 rounded-full cursor-pointer">
                <button onClick={handleDropDown}>
                    <img src={FourthIcon} alt="User's account information." className="w-[2rem] h-[2rem] cursor-pointer"/>
                </button>
                { dropDownOpen && <div className="fixed sm:absolute py-4 px-2 sm:right-full bg-[var(--surface)] top-0 sm:top-14 left-0 sm:left-auto w-[100vw] sm:w-[400px] h-[100dvh] sm:h-[500px] z-20000 rounded-lg">
                    <p>Log Out</p>
                </div> }
            </div>
        </header>
    )
}