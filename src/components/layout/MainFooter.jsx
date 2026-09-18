import FourthLogo from "../../assets/fourthtext.png"
export default function MainFooter() {
  return (
    <div className="hidden md:block py-4 mt-6">
      <div className="flex justify-between items-center">
        <img className="w-[100px]" src={FourthLogo} alt="Fourth Logo" />
        <p className="text-sm">Powered By: TMDB API</p>
      </div>
    </div>
  );
}
