import FourthLogo from  "../../assets/fourthicon.png"
import { useState, useEffect } from "react"

export default function LoadingPage(){
    const [dots, setDots] = useState(".")

    useEffect(() => {
        const repeatingDots = setInterval(() => {
            setDots((current) => {
                    if(current.length === 3){
                return "."
            }else{
                return current + "."
            }
        });
        return () => clearInterval(repeatingDots)
        }, 300)
    
    }, [])

    return (
        <main className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center gap-4">
                <img className="animate-bounce w-[200px]" src={FourthLogo} alt="Fourth logo." />
                <p className="text-4xl">Loading {dots}</p>
            </div>
        </main>
    )
}