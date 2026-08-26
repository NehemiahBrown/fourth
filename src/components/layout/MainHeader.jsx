import FourthIcon from "../../assets/fourthicon.png"

export default function MainHeader(){
    return (
        <header className="flex justify-between py-3 px-2 shadow-[var(--shadow-bottom)]">
            <div className="flex gap-2 items-center">
                <img src={FourthIcon} alt="Fourth Logo" className="w-[3rem] h-[3rem]"/>
                <p className="text-xl font-bold">Home</p>
            </div>
            <div className="flex items-center justify-center border border-2 border-[var(--accent-dark)] px-2 py-2 rounded-full">
                <img src={FourthIcon} alt="User's account information." className="w-[2rem] h-[2rem]"/>
            </div>
        </header>
    )
}