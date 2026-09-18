import { ChevronLeft } from "lucide-react";
import { getCastDetails } from "../../services/tmdb";

import { useEffect, useState } from "react";

export default function CastMemberModal({
  showCastModal,
  closeCastModal,
  castMemberId,
}) {
  const [castMemberDetails, setCastMemberDetails] = useState(null);

  useEffect(() => {
    if (!castMemberId) {
      return;
    }
    const fetchCastData = async () => {
      const castDetails = await getCastDetails(castMemberId);
      setCastMemberDetails(castDetails);
    };
    fetchCastData();
  }, [castMemberId]);

  return (
    <main
      className={`${showCastModal ? "translate-y-0" : "translate-y-full"} overflow-y-scroll fixed inset-0 z-1000 bg-[var(--background)] transition-transform duration-300`}
    >
      <div className="relative md:flex">
          <div className="h-[550px] w-full md:w-[400px] shrink-0">
            <img className="h-full w-full object-cover object-top" src={castMemberDetails?.picture} alt={`Picture of ${castMemberDetails?.name}`} />
          </div>
          <div className="absolute top-3">
            <ChevronLeft
              onClick={closeCastModal}
              size={36}
              className="cursor-pointer text-[var(--accent-dark)]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 mt-3 px-4">
            <div>
              <p className="text-4xl">{castMemberDetails?.name}</p>
              <hr className="w-[85%] bg-[var(--accent)]/92" />
            </div>
            <div className="mt-2 text-[var(--primary-text)]/80">
              <p>{castMemberDetails?.birthday}</p>
              <p>{castMemberDetails?.birthplace}</p>
            </div>
            <p className="pb-4">{castMemberDetails?.biography}</p>
          </div>
      </div>

    </main>
  );
}
